const fs = require('fs');
//Доделать дату апдейта
const data = [];

const puppeteer = require('puppeteer');
(async () => {
const browser = await puppeteer.launch()
const page = await browser.newPage()
await page.goto('https://www.kufar.by/l/sobaki')
const update = await page.evaluate(() => {
return [...document.querySelectorAll('section > a > div > div > div > span')].map(i => ({
update: i.innerText}));})
const img = await page.evaluate(() => {
return [...document.querySelectorAll('section > a > div > div > div > img')].map(i => ({
img: i.getAttribute('data-src')}));})
const link = await page.evaluate(() => {
return [...document.querySelectorAll('section > a')].map(i => ({
link: i.getAttribute('href')}));})
const name = await page.evaluate(() => {
return [...document.querySelectorAll('section > a > div > div > div > h3')].map(i => ({
name: i.textContent}));})
const price = await page.evaluate(() => {
return [...document.querySelectorAll('section > a > div > div > div > p > span:nth-child(1)')].map(i => ({
price: i.textContent}));})
const now = new Date();
const current = now.getHours() + ':' + now.getMinutes();
data.push(...update, ...img, ...link, ...name, ...price, {currentDate: current});
if (data.length > 0) {
  fs.writeFileSync('./data.txt', JSON.stringify(data))
}
})()





// let nameAr = []
// let hreflink = []
// let imgAr = []
// let priceAr = []
// let updateAr = []
// const allcats = document.querySelector('.allcats')
// let data = '';
// let btn = document.querySelector('.button1');
// btn.addEventListener('click', createitem)
// async function createitem() {
//   try {
//     await fetch("/resultKufarDog.txt")
//     .then(r => r.json())
//     .then(arr => data = arr)
//     for(let i = 0; i < data.length-1; i++) {
//       if(data[i].name !==  undefined) {nameAr.push(data[i].name)}
//       if(data[i].link !==  undefined) {hreflink.push(data[i].link)}
//       if(data[i].img !==  undefined && data[i].img !==null) {imgAr.push(data[i].img)}
//       if(data[i].price !==  undefined) {priceAr.push(data[i].price)}
//       if(data[i].update !==  undefined) {updateAr.push(data[i].update)}
//     }
//   } catch(error) {
//     console.log(error);
//   }
//   nameAr.splice(0,3)
//   hreflink.splice(0,3)
//   imgAr.splice(0,3)
//   priceAr.splice(0,3)
//   createNewitem();
//   console.log(data)
//   console.log(nameAr.length)
//   console.log(hreflink.length)
//   console.log(imgAr.length)
//   console.log(priceAr.length)
//   console.log(updateAr.length)
// }
