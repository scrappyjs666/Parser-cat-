const fs = require('fs');
const doskaCat = require('./parserjs/doskaCat')
const irrCat = require('./parserjs/irrCat')
const kufarCat = require('./parserjs/kufarCat')
const onlinerCat = require('./parserjs/onlinerCat')
const zooCat = require('./parserjs/zooCat')
// irrCat() 
// kufarCat();
// onlinerCat();
// zooCat();
// doskaCat();

const TelegramBot = require('node-telegram-bot-api');
console.log('Запускаю бота')

const token = '5238636103:AAFHRSxSXN1NmjkfQiz9gminJ-KB_VO_iw4';

const bot = new TelegramBot(token, {polling: true});

start()
async function start() {
  await Promise.all([kufarCat(), doskaCat()]);
  createData();
}



async function createData() {
console.log('start')
let data = []
let c = []
fs.readFile("./data.txt", "utf8", 
function(error,dataRes){
  console.log('Читаю данные')
  if(error) throw error; 
  data = JSON.parse(dataRes.replace(/\]\[/g,'],['));
  console(data)
  createitem();
});

let nameAr = []
let hreflink = []
let imgAr = []
let priceAr = []
let updateAr = []
function createitem() {
  console.log('createitm')
  try {
    for(let i = 0; i < data.length-1; i++) {
      if(data[i].name) {nameAr.push(data[i].name)}
      if(data[i].link) {hreflink.push(data[i].link)} 
      if(data[i].img)  {imgAr.push(data[i].img)} 
      if(data[i].price) {priceAr.push(data[i].price)}
      if(data[i].update) {updateAr.push(data[i].update)}
    }
  } catch(error) {
    console.log(error);
  }
  console.log(nameAr.length)
  console.log(hreflink.length)
  console.log(imgAr.length)
  console.log(priceAr.length)
  console.log(updateAr.length)
  for(let i = 0; nameAr.length> i; i++) {
  setTimeout(() => {pushMessage(i)}, 5000*i);
}
}
function pushMessage(i) {
  const html = `
<strong>${nameAr[i]}</strong>

<strong>Цена</strong>: ${priceAr[i]}❗

<strong>Изменено/добавлено</strong>: ${updateAr[i]}

<a href ='${imgAr[i]}'>Фото</a> 📷

<a href="${hreflink[i]}">Ссылка</a>🙏🏻
  `
bot.sendMessage(-1001517877678, html, {parse_mode: 'HTML'} )
}
}
