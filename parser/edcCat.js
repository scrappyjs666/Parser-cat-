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
        let linkAll = d.querySelectorAll('.j-item > a'); 
        linkAll.forEach((linkAll) => { 
            let linkhref = ((linkAll.getAttribute('href')));
            data.push({link: linkhref});
        });

        let nameAll = d.querySelectorAll('.it-item-title');
        nameAll.forEach((nameAll) => {
            let nameText = nameAll.textContent;
            let nameTextFixed = nameText.trim();
            data.push({name: nameTextFixed});
        });

        let priceAll = d.querySelectorAll('.price-item');
        priceAll.forEach((priceAll) => { 
            let priceText = priceAll.textContent;
            data.push({price: priceText});
        });


        console.log(`Обработка страницы ${url}`);
        const dogsCard = d.querySelectorAll('.j-item');
        dogsCard.forEach(dogsCard => {
        const linkDog = dogsCard.querySelector('.j-item > a');
            if (linkDog) {
                const detailedUrl = linkDog.href;
                q.push({url: detailedUrl, isDetailed: true});
        }
        });
        // Если я по всем страницам захочу парсить
        // const next = d.querySelector('li.next > a');
        if (next) {
            // const nextUrl = 'https://books.toscrape.com/catalogue/' + next.getAttribute('href');
            // q.push({url: nextUrl, isDetailed: false});
        }
        } else {
            console.log(`Обработка карточки товара ${url}`);
            const updateDog = d.querySelector('.nowrap').textContent;
            data.push({update: updateDog});
            // есть проблема с тем, что свайпер выдает много фоток
            let imgAll = d.querySelector('.hvr-slider-image-wrap> img');
            imgAll.forEach((imgAll) => { 
            let imgSrc = ((imgAll.getAttribute('src')));
            data.push({img: imgSrc});
        });
        }
    } catch (e) {
        console.error(e);
    }
}


const q = queue(async (data, done) => {
    await parse(data.url, data.isDetailed);
    done();
} );

q.push({url: 'https://edc.sale/ru/by/cats/', isDetailed: false});


(async () => {
    await q.drain();
    if (data.length > 0) {
        fs.writeFileSync('./resultEdcCat.txt', JSON.stringify(data));
        console.log(`Сохранено ${data.length} записей`);
    }
})();

