const { JSDOM } = require('jsdom');
const queue = require('async/queue');
const fs = require('fs');



// kufar parser
// const dataKufarCat = [];
// (async () => {
//     try {
//         const dom = await JSDOM.fromURL('https://www.kufar.by/l/r~minsk/koshki');
//         const d = dom.window.document;
//         let linkAll = d.querySelectorAll('.kf-Yop-a43ab'); 
//         linkAll.forEach(function(linkAll) { 
//             let linkhref = ((linkAll.getAttribute('href')));
//             dataKufarCat.push({link: linkhref});
//         });
//         let imgAll = d.querySelectorAll('.kf-MPpg-8a381');
//         imgAll.forEach(function(imgAll) { 
//             let imgLink = ((imgAll.getAttribute('data-src')));
//             dataKufarCat.push({img: imgLink});
//         });
        
//         let nameAll = d.querySelectorAll('div.kf-Yoxp-b5ab1 > h3');
//         nameAll.forEach(function(nameAll) {
//             let nameText = nameAll.textContent;
//             dataKufarCat.push({name: nameText});
//         });
//         let priceAll = d.querySelectorAll('.kf-YopJ-ded05');
//         priceAll.forEach(function(priceAll) { 
//             let priceText = priceAll.textContent;
//             dataKufarCat.push({price: priceText});
//         });
//         let updateAll = d.querySelectorAll('.kf-Yoxb-09b98');
//         updateAll.forEach(function(updateAll) { 
//             let updateText = updateAll.innerHTML;
//             dataKufarCat.push({update: updateText});
//         });
//         if (dataKufarCat.length > 0) {
//             // fs.writeFileSync('./resultKufarCat.txt', JSON.stringify(dataKufarCat));
//             console.log(JSON.stringify(dataKufarCat, null, ' '));
//             console.log(dataKufarCat.length);
//         }
//     } catch (e) {
//         console.log(e);
//     }
// })();

// const dataKufarDog = [];
// (async () => {
//     try {
//         const dom = await JSDOM.fromURL('https://www.kufar.by/l/r~minsk/sobaki');
//         const d = dom.window.document;
//         let linkAll = d.querySelectorAll('.kf-Yop-a43ab'); 
//         linkAll.forEach(function(linkAll) { 
//             let linkhref = ((linkAll.getAttribute('href')));
//             dataKufarDog.push({link: linkhref});
//         });
//         let imgAll = d.querySelectorAll('.kf-MPpg-8a381');
//         imgAll.forEach(function(imgAll) { 
//             let imgLink = ((imgAll.getAttribute('data-src')));
//             dataKufarDog.push({img: imgLink});
//         });
        
//         let nameAll = d.querySelectorAll('div.kf-Yoxp-b5ab1 > h3');
//         nameAll.forEach(function(nameAll) {
//             let nameText = nameAll.textContent;
//             dataKufarDog.push({name: nameText});
//         });
//         let priceAll = d.querySelectorAll('.kf-YopJ-ded05');
//         priceAll.forEach(function(priceAll) { 
//             let priceText = priceAll.textContent;
//             dataKufarDog.push({price: priceText});
//         });
//         let updateAll = d.querySelectorAll('.kf-Yoxb-09b98 > span');
//         updateAll.forEach(function(updateAll) { 
//             let updateText = updateAll.textContent;
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



www.doska.by dog parser
Картинки надо получать с карточки!!
обновление с карточек, а так же капут татйлами
const dataDoskaDog = [];
(async () => {
    try {
        const dom = await JSDOM.fromURL('https://www.doska.by/animals/cats/minsk-r/');
        const d = dom.window.document;
        let linkAll = d.querySelectorAll('.msga2 > a'); 
        linkAll.forEach(function(linkAll) { 
            let linkhref = ((linkAll.getAttribute('href')));
            let linkhreffixed = 'doska.by' + linkhref;
            dataDoskaDog.push({link: linkhreffixed});
        });
        let imgAll = d.querySelectorAll('.msga2 > a> img');
        imgAll.forEach(function(imgAll) { 
            let imgLink = ((imgAll.getAttribute('src')));
            dataDoskaDog.push({img: imgLink});
        });
            let nameAll = d.querySelectorAll('.d1> a');
            nameAll.forEach(function(nameAll) {
                let nameText = nameAll.textContent;
                dataDoskaDog.push({name: nameText});
            });
        let priceAll = d.querySelectorAll('.msga2-o pp6 >a');
        priceAll.forEach(function(priceAll) { 
            let priceText = priceAll.textContent;
            dataDoskaDog.push({price: priceText});
        });
        // let updateAll = d.querySelectorAll('.kf-Yoxb-09b98 > span');
        // updateAll.forEach(function(updateAll) { 
        //     let updateText = updateAll.textContent;
        //     dataDoskaDog.push({update: updateText});
        // });
        if (dataDoskaDog.length > 0) {
            // fs.writeFileSync('./resultKufarCat.txt', JSON.stringify(dataDoskaDog));
            console.log(JSON.stringify(dataDoskaDog, null, ' '));
            console.log(dataDoskaDog.length);
        }
    } catch (e) {
        console.log(e);
    }
})();
