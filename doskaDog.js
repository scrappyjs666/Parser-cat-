const { JSDOM } = require('jsdom');
const queue = require('async/queue');
const fs = require('fs');

const dataDoskaDogs = [];

/**
 * @param {string} url - ссылка для парсинга
 * @param {boolean} isDetailed - истина, если парсим страницу с карточкой товара
 * @return {Promise<void>}
 */
async function parse(url, isDetailed) {
    try {
        const dom = await JSDOM.fromURL(url);
        const d = dom.window.document;

        if (!isDetailed) {

            let linkAll = d.querySelectorAll('.msga2 > a'); 
            linkAll.forEach(function(linkAll) { 
            let linkhref = ((linkAll.getAttribute('href')));
            let linkhreffixed = 'doska.by' + linkhref;
            dataDoskaDogs.push({link: linkhreffixed});
            });

            let nameAll = d.querySelectorAll('.d1> a');
            nameAll.forEach(function(nameAll) {
                let nameText = nameAll.textContent;
                dataDoskaDogs.push({name: nameText});
            });

            let priceAll = d.querySelectorAll('td:nth-child(6)');
            priceAll.forEach(function(priceAll) { 
            let priceText = priceAll.textContent.replace(/\s+/g, ' ').trim();
            dataDoskaDogs.push({price: priceText});
            });


            console.log(`Обработка страницы ${url}`);
            const catsCard = d.querySelectorAll('.msga2');
            catsCard.forEach(catsCard => {
                const linkCat = catsCard.querySelector('.msga2 > a');
                if (linkCat) {
                    const detailedUrl = linkCat.href;
                    q.push({url: detailedUrl, isDetailed: true});
                }
            });

            const next = d.querySelector('msga2 > a');
            if (next) {
                const nextUrl = 'doska.by' + next.getAttribute('href');
                q.push({url: nextUrl, isDetailed: false});
            }
        } else {
            console.log(`Обработка карточки товара ${url}`);
            const imgCat = d.querySelector('.ads_photo_label > div > div > a').getAttribute('href');
            console.log(imgCat);
            dataDoskaDogs.push({img: imgCat});

            const updateCat = d.querySelector("td > table > tbody > tr:nth-child(2) > td:nth-child(3)").textContent;
            dataDoskaDogs.push({update: updateCat});
        }
    } catch (e) {
        console.error(e);
    }
}

const q = queue(async (dataDoskaDogs, done) => {
    await parse(dataDoskaDogs.url, dataDoskaDogs.isDetailed);
    done();
} );

q.push({url: 'https://www.doska.by/animals/dogs/', isDetailed: false});

(async () => {
    await q.drain();
    if (dataDoskaDogs.length > 0) {
        fs.writeFileSync('./resultDoskaDog.txt', JSON.stringify(dataDoskaDogs));
        console.log(`Сохранено ${dataDoskaDogs.length} записей`);
    }
})();

