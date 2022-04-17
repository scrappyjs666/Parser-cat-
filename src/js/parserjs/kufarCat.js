const fs = require('fs/promises');
//Доделать дату апдейта
const data = [];
const puppeteer = require('puppeteer');
async function kufarCat(c) {
try {
const browser = await puppeteer.launch()
const page = await browser.newPage()
await page.goto('https://www.kufar.by/l/r~minsk/koshki')
const update = await page.evaluate(() => {
return [...document.querySelectorAll('section > a > div > div > div > span')].map(i => ({
update: i.innerText}));})
const img = await page.evaluate(() => {
return [...document.querySelectorAll('section > a')].filter((value, index) => index > 2).map(i => ({
img: i.querySelector('div > div > div > img:nth-child(2)').getAttribute('data-src')}));})
const link = await page.evaluate(() => {
return [...document.querySelectorAll('section > a')].filter((value, index) => index > 2).map(i => ({
link: i.getAttribute('href')}));})
const name = await page.evaluate(() => {
return [...document.querySelectorAll('section > a > div > div > div > h3')].filter((value, index) => index > 2).map(i => ({
name: i.textContent.trim()}));})
const price = await page.evaluate(() => {
return [...document.querySelectorAll('section > a > div > div > div > p > span:nth-child(1)')].filter((value, index) => index > 2).map(i => ({
price: i.textContent.trim()}));})
data.push(...update, ...img, ...link, ...name, ...price);
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
      if(database.length > 2000) {
        const length  = database.length - 2000
        data.splice(0, length)
      }
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
        console.log(`Сохранено ${fullData.length} записей kufar`);
      }
      if (!database.length) {
        const  {filterSourceData} = require('../main')
        filterSourceData(data, dataintermediateResult, name, link, img, update, price, result, num)
        fs.appendFileSync('./data.txt', JSON.stringify(result));
      }
    })
  }}
} catch(error) {
  console.log(error)
}
return new Promise(res=>setTimeout(()=>{res(2000)}, 1600))
}
module.exports = kufarCat;

