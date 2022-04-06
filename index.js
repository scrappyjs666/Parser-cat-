const {
  JSDOM
} = require('jsdom');
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
      priceAll.forEach((i) => {
        if (i.querySelector('.cost .price-primary') !== null) {
          let priceText = d.querySelector('.price-primary');
          let priceTextFixed = priceText.textContent.trim();
          data.push({
            price: priceTextFixed
          });
        } else {
          let priceText = i.innerText = 'Не указана/ Бесплатно!'
          data.push({
            price: priceText
          });
        }
      });
        document.querySelectorAll('tr').forEach((i) => {
          let update = i.querySelector('.ba-post-up')?.textContent;
          data.push({update: update});
      });
      document.querySelectorAll('tr').forEach((i) => {
        let link = i.querySelector('.wraptxt > a')?.href;
        data.push({link: link});
      });
      console.log(`Обработка страницы ${url}`);
      const dogsCard = d.querySelectorAll('.img-va');
      dogsCard.forEach(dogsCard => {
        const linkDog = dogsCard.querySelector('.img-va > a');
        if (linkDog) {
          const detailedUrl = linkDog.href;
          q.push({
            url: detailedUrl,
            isDetailed: true
          });
        }
      });
      if (next) {}
    } else {
      console.log(`Обработка карточки товара ${url}`);
      const imgDog = d.querySelector('.msgpost-img').getAttribute('src');
      const nameDog = d.querySelector('.title').textContent;
      data.push({name: nameDog}, {img: imgDog,});
    }
  } catch (e) {
    console.error(e);
  }
}
const q = queue(async(data, done) => {
  await parse(data.url, data.isDetailed);
  done();
});
q.push({
  url: 'https://baraholka.onliner.by/viewforum.php?f=607&cat=1',
  isDetailed: false
});
(async() => {
  await q.drain();
  if (data.length > 0) {
    const now = new Date();
    const current = now.getHours() + ':' + now.getMinutes();
    data.push({currentDate: current})
    fs.writeFileSync('./resultOnlinerCat.txt', JSON.stringify(data));
    console.log(`Сохранено ${data.length} записей`);
  }
})();





// function createNewitem() {
//   for(let i = 0; nameAr.length> i; i++) {
//     const sample = `      
//       <div class="cat-item">
//         <h3 class="cat-title">${nameAr[i]}</h3>
//         <img src="${imgAr[i]}" alt="" class="cat-photo" />
//         <h4 class="cat-price">${priceAr[i]}</h4>
//         <h5 class="cat-update">Обновлено/добавлено:${updateAr[i]}</h5>
//         <a href="${hreflink[i]}" class="cat-link">Ссылка на объявление</a>
//         <button class="button1">MEM1</button>
//       </div>`
//       allcats.insertAdjacentHTML('beforeend', sample);
//   }
// }

// let nameAr = []
// let hreflink = []
// let imgAr = []
// let priceAr = []
// let updateAr = []
// const allcats = document.querySelector('.allcats')
// let data = '';
// let btn = document.querySelector('.button1');
// btn.addEventListener('click', createitem)
// async function createitem() {
//   try {
//     await fetch("/resultOnlinerCat.txt")
//     .then(r => r.json())
//     .then(arr => data = arr)
//     console.log(data);
//     for(let i = 0; i < data.length-1; i++) {
//       data[i].name !==  undefined ? nameAr.push(data[i].name) : ''
//       data[i].link !==  undefined ? hreflink.push(data[i].link) : ''
//       data[i].img !==  undefined ? imgAr.push(data[i].img) : ''
//       data[i].price !==  undefined ? priceAr.push(data[i].price) : ''
//       data[i].update !==  undefined ? updateAr.push(data[i].update) : ''
//     }
//   } catch(error) {
//     console.log(error);
//   }
//   createNewitem();
//   console.log(nameAr.length)
//   console.log(hreflink.length)
//   console.log(imgAr.length)
//   console.log(priceAr.length)
//   console.log(updateAr.length)
// }

