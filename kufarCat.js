const { JSDOM } = require('jsdom');
const queue = require('async/queue');
const fs = require('fs');

//Доделать дату апдейта

const dataKufarCat = [];
(async () => {
    try {
        const dom = await JSDOM.fromURL('https://www.kufar.by/l/r~minsk/koshki');
        const d = dom.window.document;
        let linkAll = d.querySelectorAll('section > a'); 
        linkAll.forEach(function(linkAll) { 
            let linkhref = ((linkAll.getAttribute('href')));
            dataKufarCat.push({link: linkhref});
        });
        let imgAll = d.querySelectorAll('section > a > div > div > div > img');
        imgAll.forEach(function(imgAll) { 
            let imgLink = ((imgAll.getAttribute('data-src')));
            dataKufarCat.push({img: imgLink});
        });
        
        let nameAll = d.querySelectorAll('section > a > div > div > div > h3');
        nameAll.forEach(function(nameAll) {
            let nameText = nameAll.textContent;
            dataKufarCat.push({name: nameText});
        });
        let priceAll = d.querySelectorAll('section > a > div > div > div > p > span:nth-child(1)');
        priceAll.forEach(function(priceAll) { 
            let priceText = priceAll.textContent;
            dataKufarCat.push({price: priceText});
        });
        let updateAll = d.querySelectorAll('section > a > div > div > div > span');
        updateAll.forEach(async function(updateAll) {
            let updateText = updateAll.innerHTML;
            dataKufarCat.push({update: updateText});
        });
        if (dataKufarCat.length > 0) {
            // fs.writeFileSync('./resultKufarCat.txt', JSON.stringify(dataKufarCat));
            console.log(JSON.stringify(dataKufarCat, null, ' '));
            console.log(dataKufarCat.length);
        }
    } catch (e) {
        console.log(e);
    }
})();