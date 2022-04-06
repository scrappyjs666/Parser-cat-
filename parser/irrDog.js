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
      linkAll.forEach((i) => {
        data.push({link: i.getAttribute('href')});
      });
      let priceAll = d.querySelectorAll('div.listingItem__info > span');
      priceAll.forEach((i) => {
        let priceText = i.textContent.trim();
        if(priceText == '') 
        {priceText = 'Не указана/ Бесплатно!'}
        data.push({price: priceText});
      });
      let updateAll = d.querySelectorAll('div.listingItem__info > p:nth-child(5)');
      updateAll.forEach((i) => {
        let updateText = i.textContent.replace(/\s+/g, ' ').trim();
        data.push({update: updateText});
      });
      let nameAll = d.querySelectorAll('.js-listingItemTitle');
      nameAll.forEach((i) => {
        data.push({name: i.textContent});
      });
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
      const next = d.querySelector('.listingItem');
      if (next) {
        const nextUrl = next;
        q.push({url: nextUrl,isDetailed: false});
      }
    } else {
      const imgCat = d.querySelector('.carousel__image').getAttribute('data-src');
      data.push({img: imgCat});
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
  url: 'http://minsk.m.irr.by/animalsandplants/animals/dogs/',
  isDetailed: false
});
(async() => {
  await q.drain();
  if (data.length > 0) {
    const now = new Date();
    const current = now.getHours() + ':' + now.getMinutes();
    data.push({currentDate: current})
    fs.writeFileSync('./resultIrrDog.txt', JSON.stringify(data));
  }
})();