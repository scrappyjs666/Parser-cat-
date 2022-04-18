// nodejs modules
const fs = require('fs');
const { ToadScheduler, SimpleIntervalJob, Task } = require('toad-scheduler')
require('dotenv').config()
//Telegram bot
const TelegramBot = require('node-telegram-bot-api');
const token = process.env.BOT_TOKEN;
const bot = new TelegramBot(token, {polling: true});
//import modules(parser dosk file)
const doskaCat = require('./parserjs/doskaCat')
const irrCat = require('./parserjs/irrCat')
const kufarCat = require('./parserjs/kufarCat')
const onlinerCat = require('./parserjs/onlinerCat')
const zooCat = require('./parserjs/zooCat');
const { data } = require('autoprefixer');
const scheduler = new ToadScheduler()
const task = new Task('simple task', () => allFn())
const job = new SimpleIntervalJob({ seconds: 42000, }, task)
scheduler.addSimpleIntervalJob(job)







// async function doskaCat() {
//   return new Promise(res=>setTimeout(()=>{res(1000)}, 1000))
// }
// async function fnTwo() {
//   return new Promise(res=>setTimeout(()=>{res(2000)}, 1200))
// }


const allFn = async ()=>{
  try {
    await onlinerCat()
    console.log('Выполнилась 1-я ф-ция')
    await irrCat()
    console.log('Выполнилась 2-я ф-ция')
    await doskaCat()
    console.log('Выполнилась 3-я ф-ция')
    await zooCat()
    console.log('Выполнилась 4-я ф-ция')
  }catch (e) {
    console.error(e)
  }
}

allFn()


module.exports = {filterSourceData, botMessagePush}


function filterSourceData(data, dataintermediateResult, name, link, img, update, price, result, num) {
    console.log('work')
    for (let i = 0; i < data.length; i++) {
        if (data[i].name) {name.push(data[i])}
        if (data[i].link) {link.push(data[i])}
        if (data[i].img) {img.push(data[i])}
        if (data[i].update) {update.push(data[i])}
        if (data[i].price) {price.push(data[i])}}
    for (let i = 0; i < name.length; i++) {
        dataintermediateResult.push(name[i], link[i], img[i], update[i], price[i])
    }
    let obj;
    dataintermediateResult.forEach(e => {
    if (num++ === 0) result.push(obj = {});
        Object.assign(obj, e);
    if (num === 5) num = 0;
    });
}

// async function botMessagePush() {
// let database = []
// let filteredData = []
// fs.readFile('./data.txt', 'utf8', 
// async (error, dataRes) => {
// if (error) throw error;
// database = await JSON.parse(('[' + dataRes + ']').replace(/\]\[/g, '],['));
// database =  database.flat(Infinity)
// filteredData = database.filter((el) => {
// return el.oldItem === undefined;
// });
// console.log(database.length, 'database')
// console.log(filteredData.length, 'filteredData')

// for(let i = 0; filteredData.length> i; i++) {
// setTimeout(() => {pushMessage(i)}, 6000*i);
// }
// })
// function pushMessage(i) {
// const html = `
// <strong>${filteredData[i].name}</strong>
// <strong>Цена</strong>: ${filteredData[i].price}❗
// <strong>Изменено/добавлено</strong>: ${filteredData[i].update}
// <a href ='${filteredData[i].img}'>Фото</a> 📷
// <a href="${filteredData[i].link}">Ссылка</a>🙏🏻
// `
// bot.sendMessage(-1001517877678, html, {parse_mode: 'HTML'} )
// }
// // return new Promise(res=>setTimeout(()=>{res(2000)}, 1600))
// }





// function findDublicate() {
// let database = []
// let filteredData = []
// fs.readFile('./data.txt', 'utf8', 
// async (error, dataRes) => {
// if (error) throw error;
// database = await JSON.parse(('[' + dataRes + ']').replace(/\]\[/g, '],['));
// database =  database.flat(Infinity)
// filteredData = database.filter((el) => {
// return el.oldItem === undefined;
// });
// console.log(database.length, 'database')
// console.log(filteredData.length, 'filteredData')})
// const prevData = database;
// let prevDataEdited = prevData.map((el) => {
//     const oldEl = el;
//     oldEl.oldItem = true;
//     return oldEl;
// });
// const {filterSourceData} = require('../main')
// filterSourceData(data, dataintermediateResult, name, link, img, update, price, result, num)
// const newDataIndexes = [];
// for (let i = 0; i < prevDataEdited.length; i++) {
//     const existedItemIndex = result.findIndex((el) => {
//     return el.link === prevDataEdited[i].link;
//     });
//     if (existedItemIndex !== -1) {newDataIndexes.push(existedItemIndex)}
// }
// let newData = result;
// newData = newData.filter((el, i) => {
// return !newDataIndexes.includes(i);
// });
// }










// comment 
// const prevData = database;
// let prevDataEdited = prevData.map((el) => {
//     const oldEl = el;
//     oldEl.oldItem = true;
//     return oldEl;
// });
// const {filterSourceData} = require('../main')
// filterSourceData(data, dataintermediateResult, name, link, img, update, price, result, num)
// const newDataIndexes = [];
// for (let i = 0; i < prevDataEdited.length; i++) {
//     const existedItemIndex = result.findIndex((el) => {
//     return el.link === prevDataEdited[i].link;
//     });
//     if (existedItemIndex !== -1) {newDataIndexes.push(existedItemIndex)}
// }
// let newData = result;
// newData = newData.filter((el, i) => {
// return !newDataIndexes.includes(i);
// });


function botMessagePush(fullData) {
console.log('запуск пуша')
let filteredData = fullData.filter((el) => {
return el.oldItem === undefined;
});
console.log(filteredData.length, 'filterData111')
for(let i = 0; filteredData.length> i; i++) {
setTimeout(() => {pushMessage(i)}, 6000*i);
}
function pushMessage(i) {
const html = `
<strong>${filteredData[i].name}</strong>
<strong>Цена</strong>: ${filteredData[i].price}❗
<strong>Изменено/добавлено</strong>: ${filteredData[i].update}
<a href ='${filteredData[i].img}'>Фото</a> 📷
<a href="${filteredData[i].link}">Ссылка</a>🙏🏻
`
bot.sendMessage(-1001517877678, html, {parse_mode: 'HTML'} )
}
}