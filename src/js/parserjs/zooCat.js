const {
  JSDOM
} = require('jsdom');
const queue = require('async/queue');
const fs = require('fs/promises');
const data = [];
async function zooCat() {
async function parse(url, isDetailed) {
  try {
    const dom = await JSDOM.fromURL(url);
    const d = dom.window.document;
    if (!isDetailed) {
      d.querySelectorAll('.item_row').forEach(row => {
        const region = row.querySelector('.item_region > a')?.textContent?.trim();
        if (region !== 'Минск') return
        const price = row.querySelector('.type_button')?.textContent;
        const name = row.querySelector('.title')?.textContent;
        const link = 'https://zooby.by/' + row.querySelector('.title').getAttribute('href');
        const img = 'https://zooby.by/' + row.querySelector('.item_img_box_in>a>img').getAttribute('src').replace('ths.jpg', 'thb.jpg');;
        const update = 'Новое!'
        data.push({name: name}, {link: link}, {price: price}, {img: img}, {update: update});
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
  await q.drain();
  if (data.length > 0) {
    fs.appendFile('./data.txt', JSON.stringify(data));
    console.log(`Сохранено ${data.length} записей zoo`);
  }
}

module.exports = zooCat;