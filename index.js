const { JSDOM } = require('jsdom');
const queue = require('async/queue');
const fs = require('fs');
// import 'kufarCat';



// const dataKufarDog = [];
// (async () => {
//     try {
//         const dom = await JSDOM.fromURL('https://www.kufar.by/l/r~minsk/sobaki');
//         const d = dom.window.document;
//         let linkAll = d.querySelectorAll('section > a'); 
//         linkAll.forEach(function(linkAll) { 
//             let linkhref = ((linkAll.getAttribute('href')));
//             dataKufarDog.push({link: linkhref});
//         });
//         let imgAll = d.querySelectorAll('section > a > div > div > div > img');
//         imgAll.forEach(function(imgAll) { 
//             let imgLink = ((imgAll.getAttribute('data-src')));
//             dataKufarDog.push({img: imgLink});
//         });
        
//         let nameAll = d.querySelectorAll('section > a > div > div > div > h3');
//         nameAll.forEach(function(nameAll) {
//             let nameText = nameAll.textContent;
//             dataKufarDog.push({name: nameText});
//         });
//         let priceAll = d.querySelectorAll('section > a > div > div > div > p > span:nth-child(1)');
//         priceAll.forEach(function(priceAll) { 
//             let priceText = priceAll.textContent;
//             dataKufarDog.push({price: priceText});
//         });
//         let updateAll = d.querySelectorAll('section > a > div > div > div > span');
//         updateAll.forEach(async function(updateAll) {
//             let updateText = updateAll.innerHTML;
//             dataKufarDog.push({update: updateText});
//         });
//         if (dataKufarDog.length > 0) {
//             // fs.writeFileSync('./resultKufarCat.txt', JSON.stringify(dataKufarDog));
//             console.log(JSON.stringify(dataKufarDog, null, ' '));
//             console.log(dataKufarDog.length);
//         }
//     } catch (e) {
//         console.log(e);
//     }
// })();





// ==================================================





// onliner cat parser
// const dataOnlinerCat = [];

// (async () => {
//     try {
//         const dom = await JSDOM.fromURL('https://baraholka.onliner.by/viewforum.php?f=607&cat=0');
//         const d = dom.window.document;
//         let linkAll = d.querySelectorAll('.img-va > a');
//         linkAll.forEach(function(linkAll) { 
//             let linkhref = linkAll.href;
//             dataOnlinerCat.push({link: linkhref});
//         });
//         let imgAll = d.querySelectorAll('.msgpost-img');
//         imgAll.forEach(function(imgAll) { 
//             let imgLink = ((imgAll.getAttribute('src')));
//             data.push({img: imgLink});
//         });
//         let nameAll = d.querySelectorAll('.wraptxt');
//         nameAll.forEach(function(nameAll) {
//             let nameText = nameAll.textContent;
//             dataOnlinerCat.push({name: nameText});
//         });
//         let priceAll = d.querySelectorAll('.price-primary');
//         priceAll.forEach(function(priceAll) { 
//             let priceText = priceAll.textContent;
//             dataOnlinerCat.push({price: priceText});
//         });
//         let updateAll = d.querySelectorAll('.ba-post-up');
//         updateAll.forEach(function(updateAll) { 
//             let updateText = updateAll.textContent;
//             dataOnlinerCat.push({update: updateText});
//         });
//         if (dataOnlinerCat.length > 0) {
//             // fs.writeFileSync('./resultOnlinerCat.txt', JSON.stringify(dataOnlinerCat));
//             console.log(JSON.stringify(dataOnlinerCat, null, ' '));
//             console.log(dataOnlinerCat.length);
//         }
//     } catch (e) {
//         console.log(e);
//     }
// })();



// EDC.SALE cat parser
// дата апдейта в карточке товара!!!!!!!!!!!!!!!!!!!
// const dataEDCrCat = [];
// (async () => {
//     try {
//         const dom = await JSDOM.fromURL('https://edc.sale/ru/minsk/cats/?lt=list&cur=2');
//         const d = dom.window.document;
//         let linkAll = d.querySelectorAll('.it-img-box'); 
//         linkAll.forEach(function(linkAll) { 
//             let linkhref = ((linkAll.getAttribute('href')));
//             dataEDCrCat.push({link: linkhref});
//         });
//         let imgAll = d.querySelectorAll('.it-img');
//         imgAll.forEach(function(imgAll) { 
//             let imgLink = ((imgAll.getAttribute('src')));
//             dataEDCrCat.push({img: imgLink});
//         });
//         let nameAll = d.querySelectorAll('.it-item-title');
//         nameAll.forEach(function(nameAll) {
//             let nameText = nameAll.textContent;
//             let nameTextFixed = nameText.trim();
//             dataEDCrCat.push({name: nameTextFixed});
//         });
//         let priceAll = d.querySelectorAll('.price-item');
//         priceAll.forEach(function(priceAll) { 
//             let priceText = priceAll.textContent;
//             dataEDCrCat.push({price: priceText});
//         });
//         let updateAll = d.querySelectorAll('.kf-Yoxb-09b98 > span');
//         updateAll.forEach(function(updateAll) { 
//             let updateText = updateAll.textContent;
//             dataEDCrCat.push({update: updateText});
//         });
//         if (dataEDCrCat.length > 0) {
//             // fs.writeFileSync('./resultKufarCat.txt', JSON.stringify(dataEDCrCat));
//             console.log(JSON.stringify(dataEDCrCat, null, ' '));
//             console.log(dataEDCrCat.length);
//         }
//     } catch (e) {
//         console.log(e);
//     }
// })();



// EDC.SALE dog parser

// const dataEDCrDog = [];
// (async () => {
//     try {
//         const dom = await JSDOM.fromURL('https://edc.sale/ru/minsk/dogs/');
//         const d = dom.window.document;
//         let linkAll = d.querySelectorAll('.it-img-box'); 
//         linkAll.forEach(function(linkAll) { 
//             let linkhref = ((linkAll.getAttribute('href')));
//             dataEDCrDog.push({link: linkhref});
//         });
//         let imgAll = d.querySelectorAll('.it-img');
//         imgAll.forEach(function(imgAll) { 
//             let imgLink = ((imgAll.getAttribute('src')));
//             dataEDCrDog.push({img: imgLink});
//         });
//         let nameAll = d.querySelectorAll('.it-item-title');
//         nameAll.forEach(function(nameAll) {
//             let nameText = nameAll.textContent;
//             let nameTextFixed = nameText.trim();
//             dataEDCrDog.push({name: nameTextFixed});
//         });
//         let priceAll = d.querySelectorAll('.price-item');
//         priceAll.forEach(function(priceAll) { 
//             let priceText = priceAll.textContent;
//             dataEDCrDog.push({price: priceText});
//         });
//         let updateAll = d.querySelectorAll('.kf-Yoxb-09b98 > span');
//         updateAll.forEach(function(updateAll) { 
//             let updateText = updateAll.textContent;
//             dataEDCrDog.push({update: updateText});
//         });
//         if (dataEDCrDog.length > 0) {
//             // fs.writeFileSync('./resultKufarCat.txt', JSON.stringify(dataEDCrDog));
//             console.log(JSON.stringify(dataEDCrDog, null, ' '));
//             console.log(dataEDCrDog.length);
//         }
//     } catch (e) {
//         console.log(e);
//     }
// })();



// www.doska.by dog parser
// Картинки надо получать с карточки!!
// обновление с карточек, а так же капут татйлами
// const dataDoskaCat = [];
// (async () => {
//     try {
//         const dom = await JSDOM.fromURL('https://www.doska.by/animals/cats/minsk-r/');
//         const d = dom.window.document;
//         let linkAll = d.querySelectorAll('.msga2 > a'); 
//         linkAll.forEach(function(linkAll) { 
//             let linkhref = ((linkAll.getAttribute('href')));
//             let linkhreffixed = 'doska.by' + linkhref;
//             dataDoskaCat.push({link: linkhreffixed});
//         });
//         let imgAll = d.querySelectorAll('.msga2 > a> img');
//         imgAll.forEach(function(imgAll) { 
//             let imgLink = ((imgAll.getAttribute('src')));
//             dataDoskaCat.push({img: imgLink});
//         });
//             let nameAll = d.querySelectorAll('.d1> a');
//             nameAll.forEach(function(nameAll) {
//                 let nameText = nameAll.textContent;
//                 dataDoskaCat.push({name: nameText});
//             });
//         let priceAll = d.querySelectorAll('td:nth-child(6)');
//         priceAll.forEach(function(priceAll) { 
//             let priceText = priceAll.textContent;
//             dataDoskaCat.push({price: priceText});
//         });
//         // let updateAll = d.querySelectorAll('.kf-Yoxb-09b98 > span');
//         // updateAll.forEach(function(updateAll) { 
//         //     let updateText = updateAll.textContent;
//         //     dataDoskaCat.push({update: updateText});
//         // });
//         if (dataDoskaCat.length > 0) {
//             fs.writeFileSync('./resultKufarCat.txt', JSON.stringify(dataDoskaCat));
//             console.log(JSON.stringify(dataDoskaCat, null, ' '));
//             console.log(dataDoskaCat.length);
//         }
//     } catch (e) {
//         console.log(e);
//     }
// })();




// // https://egida.by/ cat parser
// const dataEgidaCat = [];
// (async () => {
//     try {
//         const dom = await JSDOM.fromURL('https://www.doska.by/animals/cats/minsk-r/');
//         const d = dom.window.document;
//         let linkAll = d.querySelectorAll('.msga2 > a'); 
//         linkAll.forEach(function(linkAll) { 
//             let linkhref = ((linkAll.getAttribute('href')));
//             let linkhreffixed = 'doska.by' + linkhref;
//             dataEgidaCat.push({link: linkhreffixed});
//         });
//         let imgAll = d.querySelectorAll('.msga2 > a> img');
//         imgAll.forEach(function(imgAll) { 
//             let imgLink = ((imgAll.getAttribute('src')));
//             dataEgidaCat.push({img: imgLink});
//         });
//             let nameAll = d.querySelectorAll('.d1> a');
//             nameAll.forEach(function(nameAll) {
//                 let nameText = nameAll.textContent;
//                 dataEgidaCat.push({name: nameText});
//             });
//         let priceAll = d.querySelectorAll('.msga2-o pp6 >a');
//         priceAll.forEach(function(priceAll) { 
//             let priceText = priceAll.textContent;
//             dataEgidaCat.push({price: priceText});
//         });
//         // let updateAll = d.querySelectorAll('.kf-Yoxb-09b98 > span');
//         // updateAll.forEach(function(updateAll) { 
//         //     let updateText = updateAll.textContent;
//         //     dataEgidaCat.push({update: updateText});
//         // });
//         if (dataEgidaCat.length > 0) {
//             // fs.writeFileSync('./resultKufarCat.txt', JSON.stringify(dataEgidaCat));
//             console.log(JSON.stringify(dataEgidaCat, null, ' '));
//             console.log(dataEgidaCat.length);
//         }
//     } catch (e) {
//         console.log(e);
//     }
// })();
