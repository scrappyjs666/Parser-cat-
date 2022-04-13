
// // nodejs modules
// const fs = require('fs');
// const { ToadScheduler, SimpleIntervalJob, Task } = require('toad-scheduler')
// //Telegram bot
// const TelegramBot = require('node-telegram-bot-api');
// const token = '5238636103:AAFHRSxSXN1NmjkfQiz9gminJ-KB_VO_iw4';
// const bot = new TelegramBot(token, {polling: true});
// //import modules(parser dosk file)
// const doskaCat = require('./parserjs/doskaCat')
// const irrCat = require('./parserjs/irrCat')
// const kufarCat = require('./parserjs/kufarCat')
// const onlinerCat = require('./parserjs/onlinerCat')
// const zooCat = require('./parserjs/zooCat')


// // const scheduler = new ToadScheduler()
// // const task = new Task('simple task', () => startApp())
// // const job = new SimpleIntervalJob({ seconds: 2100, }, task)
// // scheduler.addSimpleIntervalJob(job)
// let data = [];

// // setInterval(() => {
// //     startApp()
// // }, 20000);
// startApp()


// function startApp() {
// console.log('start app')

// start()
// async function start() {
// await Promise.all([zooCat()]);
// createData();
// }


// async function createData() {
// fs.readFile("./data.txt", "utf8", 
// function(error,dataRes){
// console.log('Читаю данные')
// if(error) throw error; 
// data =  JSON.parse(('['+dataRes+']').replace(/\]\[/g,'],['));
// data = data.flat(Infinity)
// console.log(data.length)



// // console.log(data)
// // fs.truncateSync('./data.txt', 0, err => {
// // if(err) throw err; 
// // });
// // fs.appendFileSync('./data.txt', JSON.stringify(data))
// createitem();
// });

// let nameAr = []
// let hreflink = []
// let imgAr = []
// let priceAr = []
// let updateAr = []
// function createitem() {
// console.log('createitm')
// try {
// for(let i = 0; i < data.length; i++) {
//     if(data[i].name) {nameAr.push(data[i].name)}
//     if(data[i].link) {hreflink.push(data[i].link)} 
//     if(data[i].img)  {imgAr.push(data[i].img)} 
//     if(data[i].price) {priceAr.push(data[i].price)}
//     if(data[i].update) {updateAr.push(data[i].update)}
// }
// } catch(error) {
// console.log(error);
// }
// console.log(nameAr.length)
// console.log(hreflink.length)
// console.log(imgAr.length)
// console.log(priceAr.length)
// console.log(updateAr.length)
// for(let i = 0; nameAr.length> i; i++) {
// setTimeout(() => {pushMessage(i)}, 5000*i);
// }
// }
// function pushMessage(i) {
// const html = `
// <strong>${nameAr[i]}</strong>
// <strong>Цена</strong>: ${priceAr[i]}❗
// <strong>Изменено/добавлено</strong>: ${updateAr[i]}
// <a href ='${imgAr[i]}'>Фото</a> 📷
// <a href="${hreflink[i]}">Ссылка</a>🙏🏻
// `
// bot.sendMessage(-1001517877678, html, {parse_mode: 'HTML'} )
// }
// }}



