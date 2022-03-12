const { JSDOM } = require('jsdom');
const queue = require('async/queue');
const fs = require('fs');

//Доделать дату апдейта

const data = [];
(async () => {
    try {
        const dom = await JSDOM.fromURL('https://www.kufar.by/l/r~minsk/koshki');
        const d = dom.window.document;
        
        const link = [ ...d.querySelectorAll('section > a') ].map( a => ( { link: a.getAttribute('href') } ) );
        const img = [ ...d.querySelectorAll('section > a > div > div > div > img') ].map( i => ( { img: i.getAttribute('data-src') } ) );
        const name = [ ...d.querySelectorAll('section > a > div > div > div > h3') ].map( h => ( { name: h.textContent } ) );
        const price = [ ...d.querySelectorAll('section > a > div > div > div > p > span:nth-child(1)') ].map( p => ( { price: p.textContent } ) );
        const update = [ ...d.querySelectorAll('section > a > div > div > div > span') ].map( u => ( { update: u.innerHTML } ) );
        data.push(link.concat(img, name, price, update));
        if (data.length > 0) {
            fs.writeFileSync('./resultKufarCat.txt', JSON.stringify(data));
            console.log(JSON.stringify(data, null, ' '));
        }
    } catch (e) {
        console.log(e);
    }
})();