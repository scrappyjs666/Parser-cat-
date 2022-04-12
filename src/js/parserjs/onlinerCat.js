const {
JSDOM
} = require('jsdom');
const queue = require('async/queue');
const fs = require('fs/promises');
const data = [];
async function onlinerCat() {
async function parse(url, isDetailed) {
  try {
    const dom = await JSDOM.fromURL(url);
    const d = dom.window.document;
    if (!isDetailed) {
      d.querySelectorAll('tr').forEach((i) => {
        if(i !== null && i.querySelector('.lst')) {
          let update = i.querySelector('.ba-post-up')?.textContent;
          let link = i.querySelector('.wraptxt > a')?.href;
          let price = i.querySelector('.price-primary')?.textContent?.trim()
          if(i.querySelector('.cost .price-primary') == null ) {
            price = 'Не указано/ Бесплатно!';
          }
          data.push({update: update},{link: link}, {price: price});
        }
      });
      d.querySelectorAll('.img-va > a').forEach(i => {
        if (i) {q.push({url: i,isDetailed: true});}
      });
    } 
      const img = d.querySelector('.msgpost-img').getAttribute('src');
      const name = d.querySelector('.title').textContent;
      data.push({name: name}, {img: img,});
  } catch (e) {
    console.error(e);
  }
}
const q = queue(async(data, done) => {
  await parse(data.url, data.isDetailed);
  done();
});
q.push({
  url: 'https://baraholka.onliner.by/viewforum.php?f=607&cat=1',
  isDetailed: false
});
  await q.drain();
  if (data.length > 0) {
    fs.appendFile('./data.txt', JSON.stringify(data));
    console.log(`Сохранено ${data.length} записей onliner`);
  }
}

module.exports = onlinerCat;
