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
            console.log(`Обработка страницы ${url}`);
            const allSection = d.querySelectorAll('section');
            allSection.forEach(allSection => {
                const link = allSection.querySelector('section > a');
                if (link) {
                    const detailedUrl = ((link.getAttribute('href')));
                    q.push({url: detailedUrl, isDetailed: true});
                }
            });

            const next = d.querySelector('li.next > a');
            if (next) {
                const nextUrl = next.getAttribute('href');
                q.push({url: nextUrl, isDetailed: false});
            }
        } else {
            console.log(`Обработка карточки товара ${url}`);
            const titleCat = d.querySelector('.kf-eWcY-fd9a3').textContent;
            console.log(titleCat);
            data.push({name: titleCat});
        }
    } catch (e) {
        console.error(e);
    }
}

const q = queue(async (data, done) => {
    await parse(data.url, data.isDetailed);
    done();
} );

q.push({url: 'https://www.kufar.by/l/r~minsk/koshki', isDetailed: false});

(async () => {
    await q.drain();
    if (data.length > 0) {
        // fs.writeFileSync('./result.txt', JSON.stringify(data));
        console.log(`Сохранено ${data.length} записей`);
    }
})();

export {kufarCat};
