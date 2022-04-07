const doskaCat = require('./parserjs/doskaCat')
const irrCat = require('./parserjs/irrCat')
const kufarCat = require('./parserjs/kufarCat')
const onlinerCat = require('./parserjs/onlinerCat')
const zooCat = require('./parserjs/zooCat')
doskaCat();
irrCat();
kufarCat();
onlinerCat();
zooCat();
// function createNewitem() {
//   for(let i = 0; nameAr.length> i; i++) {
//     const sample = `      
//       <div class="cat-item">
//         <h3 class="cat-title">${nameAr[i]}</h3>
//         <img src="${imgAr[i]}" alt="" class="cat-photo" />
//         <h4 class="cat-price">${priceAr[i]}</h4>
//         <h5 class="cat-update">Обновлено/добавлено:${updateAr[i]}</h5>
//         <a href="${hreflink[i]}" class="cat-link">Ссылка на объявление</a>
//         <button class="button1">MEM1</button>
//       </div>`
//       allcats.insertAdjacentHTML('beforeend', sample);
//   }
// }

// let nameAr = []
// let hreflink = []
// let imgAr = []
// let priceAr = []
// let updateAr = []
// const allcats = document.querySelector('.allcats')
// let btn = document.querySelector('.button1');
// btn.addEventListener('click', createitem)
// async function createitem() {
//   try {
//     await fetch("/resultDoskaCat.txt")
//     .then(r => r.json())
//     .then(arr => data = arr)
//     let data = '';
//     console.log(data);
//     for(let i = 0; i < data.length-1; i++) {
//       if(data[i].name) {nameAr.push(data[i].name)}
//       if(data[i].link) {hreflink.push(data[i].link)} 
//       if(data[i].img)  {imgAr.push(data[i].img)} 
//       if(data[i].price) {priceAr.push(data[i].price)}
//       if(data[i].update) {updateAr.push(data[i].update)}
//     }
//   } catch(error) {
//     console.log(error);
//   }
//   createNewitem();
//   console.log(nameAr.length)
//   console.log(hreflink.length)
//   console.log(imgAr.length)
//   console.log(priceAr.length)
//   console.log(updateAr.length)
//   console.log(priceAr)
// }




// "dependencies": {
//     "async": "^3.2.3",
//     "jsdom": "^19.0.0",
//     "puppeteer": "^13.5.2"
//   }