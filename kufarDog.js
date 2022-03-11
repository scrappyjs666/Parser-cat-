const { JSDOM } = require('jsdom');
const queue = require('async/queue');
const fs = require('fs');

//Доделать дату апдейта

const dataKufarDog = [];
(async () => {
    try {
        const dom = await JSDOM.fromURL('https://www.kufar.by/l/r~minsk/koshki');
        const d = dom.window.document;
        let linkAll = d.querySelectorAll('section > a'); 
        linkAll.forEach(function(linkAll) { 
            let linkhref = ((linkAll.getAttribute('href')));
            dataKufarDog.push({link: linkhref});
        });
        let imgAll = d.querySelectorAll('section > a > div > div > div > img');
        imgAll.forEach(function(imgAll) { 
            let imgLink = ((imgAll.getAttribute('data-src')));
            dataKufarDog.push({img: imgLink});
        });
        
        let nameAll = d.querySelectorAll('section > a > div > div > div > h3');
        nameAll.forEach(function(nameAll) {
            let nameText = nameAll.textContent;
            dataKufarDog.push({name: nameText});
        });
        let priceAll = d.querySelectorAll('section > a > div > div > div > p > span:nth-child(1)');
        priceAll.forEach(function(priceAll) { 
            let priceText = priceAll.textContent;
            dataKufarDog.push({price: priceText});
        });
        let updateAll = d.querySelectorAll('section > a > div > div > div > span');
        updateAll.forEach(async function(updateAll) {
            let updateText = updateAll.innerHTML;
            dataKufarDog.push({update: updateText});
        });
        if (dataKufarDog.length > 0) {
            // fs.writeFileSync('./resultKufarDog.txt', JSON.stringify(dataKufarDog));
            console.log(JSON.stringify(dataKufarDog, null, ' '));
            console.log(dataKufarDog.length);
        }
    } catch (e) {
        console.log(e);
    }
})();