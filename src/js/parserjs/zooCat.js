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
        let img
        if(row.querySelector('.item_img_box_in>a>img').getAttribute('src')) {
          img = 'https://zooby.by/' + row.querySelector('.item_img_box_in>a>img').getAttribute('src').replace('ths', 'thb');
        } else {img = 'Картинки нет'}
        const update = 'Недавно обновлено/добавлено!'
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
  go();
  function go() {
    const fs = require('fs')
    let database = []
    let dataintermediateResult = []
    let name = []
    let link = []
    let img = []
    let update = []
    let price = []
    let result = [];
    let num = 0;
    fs.readFile('./data.txt', 'utf8', 
    async (error, dataRes) => {
      if (error) throw error;
      database = await JSON.parse(('[' + dataRes + ']').replace(/\]\[/g, '],['));
      database = await database.flat(Infinity)
      if (database.length) {
        const prevData = database;
        let prevDataEdited = prevData.map((el) => {
          const oldEl = el;
          oldEl.oldItem = true;
          return oldEl;
        });
        const {filterSourceData} = require('../main')
        filterSourceData(data, dataintermediateResult, name, link, img, update, price, result, num)
        const newDataIndexes = [];
        for (let i = 0; i < prevDataEdited.length; i++) {
          const existedItemIndex = result.findIndex((el) => {
            return el.link === prevDataEdited[i].link;
          });
          if (existedItemIndex !== -1) {newDataIndexes.push(existedItemIndex)}
        }
        let newData = result;
        newData = newData.filter((el, i) => {
        return !newDataIndexes.includes(i);
        });
        const fullData = [...prevDataEdited, ... newData];
        fs.writeFileSync('./data.txt', JSON.stringify(fullData));
        console.log(`Сохранено ${fullData.length} записей zoo`);
      }
      if (!database.length) {
        const  {filterSourceData} = require('../main')
        filterSourceData(data, dataintermediateResult, name, link, img, update, price, result, num)
        fs.appendFileSync('./data.txt', JSON.stringify(result));
      }
    })
  }}
  return new Promise(res=>setTimeout(()=>{res(2000)}, 2000))
}

module.exports = zooCat;

