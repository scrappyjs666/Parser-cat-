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
      d.querySelectorAll('.item_row').forEach(row => {
        const region = row.querySelector('.item_region > a')?.textContent?.trim();
        if (region !== 'Минск') return;
        const price = row.querySelector('.type_button')?.textContent;
        const name = row.querySelector('.title')?.textContent;
        const link = 'https://zooby.by/' + row.querySelector('.title').getAttribute('href');
        data.push({name: name}, {link: link}, {price: price});
      });
      const catsCard = d.querySelectorAll('.item_outer_in');
      catsCard.forEach(i => {
        const linkCat = i.querySelector('.title');
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
      let item = d.querySelector('.localization_det > div > span').textContent.trim();
      if (item !== 'Минск, Беларусь') return
      const img = 'https://zooby.by/' + d.querySelector('#djc_mainimage').getAttribute('src');
      const update = d.querySelector('.general_det_in').childNodes[1].textContent.trim()
      const updateFixed = update.substr(21, 9);
      data.push({img: img}, {update: updateFixed});
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
  url: 'https://zooby.by/v-dobrye-ruki/otdam-sobaku',
  isDetailed: false
});
(async() => {
  await q.drain();
  if (data.length > 0) {
    const now = new Date();
    const current = now.getHours() + ':' + now.getMinutes();
    data.push({currentDate: current})
    fs.writeFileSync('./resultZooDog.txt', JSON.stringify(data));
  }
})();