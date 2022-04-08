const async = require("async");
const fs = require('fs');
const doskaCat = require('./parserjs/doskaCat')
// const irrCat = require('./parserjs/irrCat')
// const kufarCat = require('./parserjs/kufarCat')
// const onlinerCat = require('./parserjs/onlinerCat')
// const zooCat = require('./parserjs/zooCat')
// irrCat();
// kufarCat();
// onlinerCat();
// zooCat();
// doskaCat()






function startBot() {
let data = []

fs.readFile("resultDoskaCat.txt", "utf8", 
async function(error,dataRes){
  if(error) throw error; 
  data = await JSON.parse(dataRes)
});


console.log(data);
let nameAr = []
let hreflink = []
let imgAr = []
let priceAr = []
let updateAr = []
function createitem() {
  console.log("Запускаю функцию")
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
  console.log(nameAr)
  console.log(hreflink)
  console.log(imgAr)
  console.log(priceAr)
  console.log(updateAr)
}

createitem();
const TelegramBot = require('node-telegram-bot-api');
console.log('1')

const token = '5238636103:AAFHRSxSXN1NmjkfQiz9gminJ-KB_VO_iw4';

const bot = new TelegramBot(token, {polling: true});

function pushMessage(i) {
  const html = `
<strong>${nameAr[i]}</strong>

<strong>Цена</strong>: ${priceAr[i]}❗

<strong>Изменено</strong>: ${updateAr[i]}

<a href ='${imgAr[i]}'>Фото</a> 📷

<a href="${hreflink[i]}">Ссылка</a>🙏🏻
  `
bot.sendMessage(-1001517877678, html, {parse_mode: 'HTML'} )
}

for(let i = 0; nameAr.length> i; i++) {
  setTimeout(() => {pushMessage(i)}, 5000*i);
}
}
