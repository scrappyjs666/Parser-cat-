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
      let linkAll = d.querySelectorAll('.title');
      linkAll.forEach((linkAll) => {
        let linkhref = ((linkAll.getAttribute('href')));
        data.push({
          link: linkhref
        });
      });
      let nameAll = d.querySelectorAll('.title');
      nameAll.forEach((nameAll) => {
        let nameText = nameAll.textContent;
        data.push({
          name: nameText
        });
      });
      let priceAll = d.querySelectorAll('.type_button');
      priceAll.forEach((priceAll) => {
        let priceText = priceAll.textContent;
        data.push({
          price: priceText
        });
      });
      console.log(`Обработка страницы ${url}`);
      const catsCard = d.querySelectorAll('.item_outer_in');
      catsCard.forEach(catsCard => {
        const linkCat = catsCard.querySelector('.title');
        if (linkCat) {
          const detailedUrl = linkCat.href;
          q.push({
            url: detailedUrl,
            isDetailed: true
          });
        }
      });
      const next = d.querySelector('.title');
      if (next) {
        const nextUrl = 'https://zooby.by/' + next.getAttribute('href');
        q.push({
          url: nextUrl,
          isDetailed: false
        });
      }
    } else {
      console.log(`Обработка карточки товара ${url}`);
      const imgCat = d.querySelector('#djc_mainimage').getAttribute('src');
      console.log(imgCat);
      data.push({
        img: imgCat
      });
      const updateCat = d.querySelector('.general_det_in').childNodes[2].textContent.trim();
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
  url: 'https://zooby.by/v-dobrye-ruki/vozmu-kota',
  isDetailed: false
});
(async() => {
  await q.drain();
  if (data.length > 0) {
    fs.writeFileSync('./resultZooCat.txt', JSON.stringify(data));
    console.log(`Сохранено ${data.length} записей`);
  }
})();