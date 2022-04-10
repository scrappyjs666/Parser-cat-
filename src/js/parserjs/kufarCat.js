const fs = require('fs/promises');
//Доделать дату апдейта
const data = [];
const puppeteer = require('puppeteer');
async function kufarCat() {
try {
const browser = await puppeteer.launch()
const page = await browser.newPage()
await page.goto('https://www.kufar.by/l/r~minsk/koshki')
const update = await page.evaluate(() => {
return [...document.querySelectorAll('section > a > div > div > div > span')].map(i => ({
update: i.innerText}));})
const img = await page.evaluate(() => {
return [...document.querySelectorAll('section > a > div > div > div > img:nth-child(2)')].filter((value, index) => index > 2).map(i => ({
img: i.getAttribute('data-src')}));})
const link = await page.evaluate(() => {
return [...document.querySelectorAll('section > a')].filter((value, index) => index > 2).map(i => ({
link: i.getAttribute('href')}));})
const name = await page.evaluate(() => {
return [...document.querySelectorAll('section > a > div > div > div > h3')].filter((value, index) => index > 2).map(i => ({
name: i.textContent?.trim().replace(/(\r\n|\n|\r)/gm, "")}));})
const price = await page.evaluate(() => {
return [...document.querySelectorAll('section > a > div > div > div > p > span:nth-child(1)')].filter((value, index) => index > 2).map(i => ({
price: i.textContent}));})
data.push(...update, ...img, ...link, ...name, ...price);
if (data.length > 0) {
  await fs.appendFile('./data.txt', JSON.stringify(data))
  console.log(`Сохранено ${data.length} записей kufar`);
}
} catch(error) {
  console.log(error)
}
}
module.exports = kufarCat;

