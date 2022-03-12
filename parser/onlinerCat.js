const { JSDOM } = require('jsdom');
const queue = require('async/queue');
const fs = require('fs');

const data = [];

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

        let priceAll = d.querySelectorAll('.cost');
        priceAll.forEach((priceAll) => {
            if(priceAll.querySelector('.cost .price-primary') !== null) {
                let priceText = d.querySelector('.price-primary');
                let priceTextFixed = priceText.textContent.trim();
                console.log(priceText);
                data.push({price: priceTextFixed});
            } else {
                let priceText = priceAll.innerText = 'Не указана/ Бесплатно!'
                console.log(priceText);
                data.push({price: priceText});
            }
            });

            let updateAll = d.querySelectorAll('.ba-post-up');
            updateAll.forEach((updateAll) => { 
            let updateText = updateAll.textContent;
            data.push({update: updateText});
            }); 

            let linkAll = d.querySelectorAll('.wraptxt > a');
            linkAll.forEach((linkAll) => { 
            let linkteText = linkAll.href;
            data.push({link: linkteText});
            }); 

            
            console.log(`Обработка страницы ${url}`);
            const catsCard = d.querySelectorAll('.img-va');
            catsCard.forEach(catsCard => {
                const linkCat = catsCard.querySelector('.img-va > a');
                if (linkCat) {
                    const detailedUrl = linkCat.href;
                    q.push({url: detailedUrl, isDetailed: true});
                }
            });
        if (next) {
        }
        } else {
            console.log(`Обработка карточки товара ${url}`);
            const imgCat = d.querySelector('.msgpost-img').getAttribute('src');
            const nameCat = d.querySelector('.title').textContent;

            data.push({name: nameCat, img: imgCat});
        }
    } catch (e) {
        console.error(e);
    }
}

const q = queue(async (data, done) => {
    await parse(data.url, data.isDetailed);
    done();
} );

q.push({url: 'https://baraholka.onliner.by/viewforum.php?f=607&cat=1&start=0', isDetailed: false});

(async () => {
    await q.drain();
    if (data.length > 0) {
        fs.writeFileSync('./resultOnlinerCat.txt', JSON.stringify(data));
        console.log(`Сохранено ${data.length} записей`);
    }
})();
