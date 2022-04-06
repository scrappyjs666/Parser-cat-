const {
  JSDOM
} = require('jsdom');
const queue = require('async/queue');
const fs = require('fs');
const data = [];
/**
 * @param {string} url - ссылка для парсинга
 * @param {boolean} isDetailed - истина, если парсим страницу с карточкой товара
 * @return {Promise<void>}
 */
async function parse(url, isDetailed) {
  try {
    const dom = await JSDOM.fromURL(url);
    const d = dom.window.document;
    if (!isDetailed) {
      d.querySelectorAll('form>:nth-child(3)>tbody>tr').forEach(i => {
        const url = i.querySelector('.msga2 > a')?.getAttribute('href');
        const link = url ? `https://www.doska.by/${url}` : undefined;
        const name = i.querySelector('.d1> a')?.textContent;
        let price = i.querySelector('td:nth-child(6)')?.textContent?.replace(/\s+/g, ' ')?.trim()
        if(price == undefined || null || '' || ' ' || '-'){price = 'Не указано'}
        data.push({link: link},{name: name},{price: price});
      })
      const catsCard = d.querySelectorAll('.msga2');
      catsCard.forEach(i => {
        const linkCat = i.querySelector('.msga2 > a');
        if (linkCat) {
          const detailedUrl = linkCat.href;
          q.push({
            url: detailedUrl,
            isDetailed: true
          });
        }
      });
      const next = d.querySelector('msga2 > a');
      if (next) {
        const nextUrl ='https://www.doska.by/'+next.getAttribute('href');
        q.push({
          url: nextUrl,
          isDetailed: false
        });
      }
    } else {
      const imgCat = d.querySelector('.ads_photo_label > div > div > a').getAttribute('href');
      data.push({img: imgCat});
      const updateCat = d.querySelector("td > table > tbody > tr:nth-child(2) > td:nth-child(3)").textContent.substr(17, 5);
      data.push({update: updateCat});
    }
  } catch (e) {
    console.error(e);
  }
}
const q = queue(async(data, done) => {
  await parse(data.url, data.isDetailed);
  done();
});
q.push({
  url: 'https://www.doska.by/animals/cats/',
  isDetailed: false
});
(async() => {
  await q.drain();
  if (data.length > 0) {
    const now = new Date();
    const current = now.getHours() + ':' + now.getMinutes();
    data.push({currentDate: current})
    fs.writeFileSync('./resultDoskaCat.txt', JSON.stringify(data));
    console.log(`Сохранено ${data.length} записей`);
  }
})();