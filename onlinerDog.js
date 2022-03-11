const { JSDOM } = require('jsdom');
const queue = require('async/queue');
const fs = require('fs');

const dataOnlinerDog = [];

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
        priceAll.forEach(function(priceAll) {
            if(priceAll.querySelector('.cost .price-primary') !== null) {
                let priceText = d.querySelector('.price-primary');
                let priceTextFixed = priceText.textContent.trim();
                console.log(priceText);
                dataOnlinerDog.push({price: priceTextFixed});
            } else {
                let priceText = priceAll.innerText = 'Не указана/ Бесплатно!'
                console.log(priceText);
                dataOnlinerDog.push({price: priceText});
            }
            });

            let updateAll = d.querySelectorAll('.ba-post-up');
            updateAll.forEach(function(updateAll) { 
            let updateText = updateAll.textContent;
            dataOnlinerDog.push({update: updateText});
            }); 


            console.log(`Обработка страницы ${url}`);
            const dogsCard = d.querySelectorAll('.img-va');
            dogsCard.forEach(dogsCard => {
                const linkDog = dogsCard.querySelector('.img-va > a');
                if (linkDog) {
                    const detailedUrl = linkDog.href;
                    q.push({url: detailedUrl, isDetailed: true});
                }
            });

            const next = d.querySelector('li.next > a');
            if (next) {
                const nextUrl = 'https://books.toscrape.com/catalogue/' + next.getAttribute('href');
                q.push({url: nextUrl, isDetailed: false});
            }
        } else {
            console.log(`Обработка карточки товара ${url}`);
            const imgDog = d.querySelector('.msgpost-img').getAttribute('src');
            const nameDog = d.querySelector('.title').textContent;

            dataOnlinerDog.push({name: nameDog, img: imgDog});
        }
    } catch (e) {
        console.error(e);
    }
}

const q = queue(async (dataOnlinerDog, done) => {
    await parse(dataOnlinerDog.url, dataOnlinerDog.isDetailed);
    done();
} );

q.push({url: 'https://baraholka.onliner.by/viewforum.php?f=608', isDetailed: false});

(async () => {
    await q.drain();
    if (dataOnlinerDog.length > 0) {
        fs.writeFileSync('./resultOnlinerDog.txt', JSON.stringify(dataOnlinerDog));
        console.log(`Сохранено ${dataOnlinerDog.length} записей`);
    }
})();

