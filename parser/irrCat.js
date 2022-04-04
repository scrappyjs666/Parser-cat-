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
      let linkAll = d.querySelectorAll('.listingItem');
      linkAll.forEach((linkAll) => {
        let linkhref = ((linkAll.getAttribute('href')));
        data.push({
          link: linkhref
        });
      });
      let priceAll = d.querySelectorAll('div.listingItem__info > span');
      
      priceAll.forEach((priceAll) => {
        let priceText = priceAll.textContent.trim();
        if(priceText == '') {
          let priceText = priceAll.innerText = 'Не указана/ Бесплатно!'
          data.push({
          price: priceText
        });
        }
        data.push({
          price: priceText
        });
      });
      let updateAll = d.querySelectorAll('div.listingItem__info > p:nth-child(5)');
      updateAll.forEach((updateAll) => {
        let updateText = updateAll.textContent.replace(/\s+/g, ' ').trim();
        data.push({
          update: updateText
        });
      });
      let nameAll = d.querySelectorAll('.js-listingItemTitle');
      nameAll.forEach((nameAll) => {
        let nameText = nameAll.textContent;
        data.push({
          name: nameText
        });
      });
      console.log(`Обработка страницы ${url}`);
      const catsCard = d.querySelectorAll('.listingItem');
      catsCard.forEach(catsCard => {
        const linkCat = catsCard;
        if (linkCat) {
          const detailedUrl = linkCat.href;
          q.push({
            url: detailedUrl,
            isDetailed: true
          });
        }
      });
      const next = d.querySelector('li.next > a');
      if (next) {
        const nextUrl = 'https://books.toscrape.com/catalogue/' + next.getAttribute('href');
        q.push({
          url: nextUrl,
          isDetailed: false
        });
      }
    } else {
      console.log(`Обработка карточки товара ${url}`);
      const imgCat = d.querySelector('.carousel__image').getAttribute('data-src');
      console.log(imgCat);
      data.push({
        img: imgCat
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
  url: 'http://minsk.m.irr.by/animalsandplants/animals/cats/',
  isDetailed: false
});
(async() => {
  await q.drain();
  if (data.length > 0) {
    fs.writeFileSync('./resultIrrCat.txt', JSON.stringify(data));
    console.log(`Сохранено ${data.length} записей`);
  }
})();

