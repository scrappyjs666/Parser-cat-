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
      let linkAll = d.querySelectorAll('.msga2 > a');
      linkAll.forEach((linkAll) => {
        let linkhref = ((linkAll.getAttribute('href')));
        let linkhreffixed = 'doska.by' + linkhref;
        data.push({
          link: linkhreffixed
        });
      });
      let nameAll = d.querySelectorAll('.d1> a');
      nameAll.forEach((nameAll) => {
        let nameText = nameAll.textContent;
        data.push({
          name: nameText
        });
      });
      let priceAll = d.querySelectorAll('td:nth-child(6)');
      priceAll.forEach((priceAll) => {
        let priceText = priceAll.textContent.replace(/\s+/g, ' ').trim();
        data.push({
          price: priceText
        });
      });
      console.log(`Обработка страницы ${url}`);
      const catsCard = d.querySelectorAll('.msga2');
      catsCard.forEach(catsCard => {
        const linkCat = catsCard.querySelector('.msga2 > a');
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
        const nextUrl = 'doska.by' + next.getAttribute('href');
        q.push({
          url: nextUrl,
          isDetailed: false
        });
      }
    } else {
      console.log(`Обработка карточки товара ${url}`);
      const imgCat = d.querySelector('.ads_photo_label > div > div > a').getAttribute('href');
      console.log(imgCat);
      data.push({
        img: imgCat
      });
      const updateCat = d.querySelector("td > table > tbody > tr:nth-child(2) > td:nth-child(3)").textContent;
      data.push({
        update: updateCat
      });
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
    fs.writeFileSync('./resultDoskaCat.txt', JSON.stringify(data));
    console.log(`Сохранено ${data.length} записей`);
  }
})();