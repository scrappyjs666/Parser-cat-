const fs = require('fs');
//Доделать дату апдейта
const data = [];

const puppeteer = require('puppeteer');
(async () => {
const browser = await puppeteer.launch()
const page = await browser.newPage()
await page.goto('https://www.kufar.by/l/koshki')
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
  fs.writeFileSync('./resultKufarCat.txt', JSON.stringify(data))
}
})()