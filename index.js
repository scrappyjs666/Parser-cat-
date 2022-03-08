const { JSDOM } = require('jsdom');
const data = [];
const fs = require('fs');


//kufar parser
// (async () => {
//     try {
//         const dom = await JSDOM.fromURL('https://www.kufar.by/l/r~minsk/zhivotnye?sort=lst.d');
//         const d = dom.window.document;
//         let linkAll = d.querySelectorAll('.kf-Yop-a43ab'); 
//         linkAll.forEach(function(linkAll) { 
//             let linkhref = ((linkAll.getAttribute('href')));
//             data.push({link: linkhref});
//         });
//         let imgAll = d.querySelectorAll('.kf-MPpg-8a381');
//         imgAll.forEach(function(imgAll) { 
//             let imgLink = ((imgAll.getAttribute('data-src')));
//             data.push({img: imgLink});
//         });
        
//         let nameAll = d.querySelectorAll('div.kf-Yoxp-b5ab1 > h3');
//         nameAll.forEach(function(nameAll) {
//             let nameText = nameAll.textContent;
//             data.push({name: nameText});
//         });
//         let priceAll = d.querySelectorAll('.kf-YopJ-ded05');
//         priceAll.forEach(function(priceAll) { 
//             let priceText = priceAll.textContent;
//             data.push({price: priceText});
//         });
//         if (data.length > 0) {
            // fs.writeFileSync('./resultKufarCat.txt', JSON.stringify(dataKufarCat));
//             console.log(JSON.stringify(data, null, ' '));
//             console.log(data.length);
//         }
//     } catch (e) {
//         console.log(e);
//     }
// })();



//onliner cat parser
const dataOnlinerCat = [];

(async () => {
    try {
        const dom = await JSDOM.fromURL('https://baraholka.onliner.by/viewforum.php?f=607&cat=0');
        const d = dom.window.document;
        let linkAll = d.querySelectorAll('.img-va > a');
        linkAll.forEach(function(linkAll) { 
            let linkhref = link.href;
            dataOnlinerCat.push({link: linkhref}); 
        });
        let imgAll = d.querySelectorAll('.kf-MPpg-8a381');
        imgAll.forEach(function(imgAll) { 
        let imgLink = ((imgAll.getAttribute('data-src')));
        data.push({img: imgLink});
        });
        let nameAll = d.querySelectorAll('.wraptxt');
        nameAll.forEach(function(nameAll) {
            let nameText = nameAll.textContent;
            dataOnlinerCat.push({name: nameText});
        });
        let priceAll = d.querySelectorAll('.price-primary');
        priceAll.forEach(function(priceAll) { 
            let priceText = priceAll.textContent;
            dataOnlinerCat.push({price: priceText});
        });
        let updateAll = d.querySelectorAll('.ba-post-up');
        updateAll.forEach(function(updateAll) { 
            let updateText = updateAll.textContent;
            dataOnlinerCat.push({update: updateText});
        });
        if (dataOnlinerCat.length > 0) {
            // fs.writeFileSync('./resultOnlinerCat.txt', JSON.stringify(dataOnlinerCat));
            console.log(JSON.stringify(dataOnlinerCat, null, ' '));
            console.log(dataOnlinerCat.length);
        }
    } catch (e) {
        console.log(e);
    }
})();