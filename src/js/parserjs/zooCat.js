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
          q.push({url: detailedUrl,isDetailed: true});
        }
      });
      const next = d.querySelector('.title');
      if (next) {
        const nextUrl = 'https://zooby.by/' + next.getAttribute('href');
        q.push({url: nextUrl,isDetailed: false});
      }
    } else {
      let item = d.querySelector('.localization_det > div > span').textContent.trim();
      if (item !== 'Минск, Беларусь') return
      let img;
      if(d.querySelector('#djc_mainimage')) {
        img = 'https://zooby.by/' + d.querySelector('#djc_mainimage').getAttribute('src');
      } else {
        img = 'Картинки нету'
      }
      const update = d.querySelector('.general_det_in').childNodes[1].textContent.trim()
      const updateFixed = update.substr(25, 9);
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
  url: 'https://zooby.by/v-dobrye-ruki/vozmu-kota',
  isDetailed: false
});
await q.drain();
if (data.length > 0) {
  go(data);
  async function go() {
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
        const {filterSourceData, botMessagePush} = require('../main')
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
        botMessagePush(fullData)
        fs.writeFileSync('./data.txt', JSON.stringify(fullData));
        console.log(`Сохранено ${fullData.length} записей zoo`);
      }
      // if (!database.length) {
      //   const  {filterSourceData} = require('../main')
      //   filterSourceData(data, dataintermediateResult, name, link, img, update, price, result, num)
      //   fs.appendFileSync('./data.txt', JSON.stringify(result));
      // }
    })
  }
}
// return new Promise(res=>setTimeout(()=>{res(2000)}, 2000))
}

module.exports = zooCat;