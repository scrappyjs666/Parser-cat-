const {
  JSDOM
} = require('jsdom');
const queue = require('async/queue');
const fs = require('fs/promises');
const data = [];
async function doskaCat() {
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
        if(price == '-' || undefined || null)
        {price = 'Не указано/ Бесплатно!'}
        data.push({link: link},{name: name},{price: price});
      })
      d.querySelectorAll('.msga2>a').forEach(i => {
        if (i) {q.push({url: i,isDetailed: true})}
      });
      const next = d.querySelector('msga2 > a');
      if (next) {
        const nextUrl ='https://www.doska.by/'+next.getAttribute('href');
        q.push({url: nextUrl,isDetailed: false});
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
  url: 'https://www.doska.by/animals/cats/minsk-r/',
  isDetailed: false
});
await q.drain();
if (data.length > 0) {
  go();

  function go() {
    const fs = require('fs')
    let database = []
    let dataResult = []
    let name = []
    let link = []
    let img = []
    let update = []
    let price = []
    let result = [];
    let num = 0;
    fs.readFile('./data.txt', 'utf8', (error, dataRes) => {
      if (error) throw error;
      database = JSON.parse(('[' + dataRes + ']').replace(/\]\[/g, '],['));
      database = database.flat(Infinity)
      const parseData = require('../main')
      })
      if (database.length) {
      
      }
      if (!database.length) {
        console.log('NE eeeeeeeeeeeeeeeeeeee')
        for (let i = 0; i < data.length; i++) {
          if (data[i].name) {
            name.push(data[i])
          }
          if (data[i].link) {
            link.push(data[i])
          }
          if (data[i].img) {
            img.push(data[i])
          }
          if (data[i].update) {
            update.push(data[i])
          }
          if (data[i].price) {
            price.push(data[i])
          }
        }
        for (let i = 0; i < name.length; i++) {
          dataResult.push(name[i], link[i], img[i], update[i], price[i])
        }
        let obj;
        dataResult.forEach(e => {
          if (num++ === 0) result.push(obj = {});
          Object.assign(obj, e);
          if (num === 5) num = 0;
        });
        console.log(`Сохранено ${result.length} записей doska`);
        console.log(result, 'result')
        const fs = require('fs')
        fs.appendFileSync('./data.txt', JSON.stringify(result));
      }
  }
}
}


module.exports = doskaCat;



