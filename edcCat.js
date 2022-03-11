const { JSDOM } = require('jsdom');
const queue = require('async/queue');
const fs = require('fs');

const dataEDCDog = [];

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
        linkAll.forEach(function(linkAll) { 
            let linkhref = ((linkAll.getAttribute('href')));
            dataEDCDog.push({link: linkhref});
        });

        let nameAll = d.querySelectorAll('.it-item-title');
        nameAll.forEach(function(nameAll) {
            let nameText = nameAll.textContent;
            let nameTextFixed = nameText.trim();
            dataEDCDog.push({name: nameTextFixed});
        });

        let priceAll = d.querySelectorAll('.price-item');
        priceAll.forEach(function(priceAll) { 
            let priceText = priceAll.textContent;
            dataEDCDog.push({price: priceText});
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
            dataEDCDog.push({update: updateDog});
            // есть проблема с тем, что свайпер выдает много фоток
            let imgAll = d.querySelector('.hvr-slider-image-wrap> img');
            imgAll.forEach(function(imgAll) { 
            let imgSrc = ((imgAll.getAttribute('src')));
            dataEDCDog.push({img: imgSrc});
        });
        }
    } catch (e) {
        console.error(e);
    }
}


const q = queue(async (dataEDCDog, done) => {
    await parse(dataEDCDog.url, dataEDCDog.isDetailed);
    done();
} );

q.push({url: 'https://edc.sale/ru/by/cats/', isDetailed: false});


(async () => {
    await q.drain();
    if (dataEDCDog.length > 0) {
        fs.writeFileSync('./result.txt', JSON.stringify(dataEDCDog));
        console.log(`Сохранено ${dataEDCDog.length} записей`);
    }
})();

// const dataEDCDog = [];
// (async () => {
//     try {
//         const dom = await JSDOM.fromURL('https://edc.sale/ru/minsk/dogs/');
//         const d = dom.window.document;
//         let imgAll = d.querySelectorAll('.it-img');
//         imgAll.forEach(function(imgAll) { 
//             let imgLink = ((imgAll.getAttribute('src')));
//             dataEDCDog.push({img: imgLink});
//         });
//         let nameAll = d.querySelectorAll('.it-item-title');
//         nameAll.forEach(function(nameAll) {
//             let nameText = nameAll.textContent;
//             let nameTextFixed = nameText.trim();
//             dataEDCDog.push({name: nameTextFixed});
//         });
//         let priceAll = d.querySelectorAll('.price-item');
//         priceAll.forEach(function(priceAll) { 
//             let priceText = priceAll.textContent;
//             dataEDCDog.push({price: priceText});
//         });
//         let updateAll = d.querySelectorAll('.kf-Yoxb-09b98 > span');
//         updateAll.forEach(function(updateAll) { 
//             let updateText = updateAll.textContent;
//             dataEDCDog.push({update: updateText});
//         });
//         if (dataEDCDog.length > 0) {
//             fs.writeFileSync('./resultKufarCat.txt', JSON.stringify(dataEDCDog));
//             console.log(JSON.stringify(dataEDCDog, null, ' '));
//             console.log(dataEDCDog.length);
//         }
//     } catch (e) {
//         console.log(e);
//     }
// })();
