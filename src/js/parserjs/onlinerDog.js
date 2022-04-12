const {
  JSDOM
} = require('jsdom');
const queue = require('async/queue');
const fs = require('fs');
const data = [];
async function parse(url, isDetailed) {
  try {
    const dom = await JSDOM.fromURL(url);
    const d = dom.window.document;
    if (!isDetailed) {
      d.querySelectorAll('tr').forEach((i) => {
        if(i !== null && i.querySelector('.lst')) {
          let update = i.querySelector('.ba-post-up')?.textContent;
          let link = i.querySelector('.wraptxt > a')?.href;
          let price = i.querySelector('.price-primary')?.textContent?.trim()
          if(i.querySelector('.cost .price-primary') == null ) {
            price = 'Не указана/ Бесплатно!';
          }
          data.push({update: update},{link: link}, {price: price});
        }
      });
      d.querySelectorAll('.img-va > a').forEach(i => {
        if (i) {q.push({url: i,isDetailed: true});}
      });
    } 
      const imgDog = d.querySelector('.msgpost-img').getAttribute('src');
      const nameDog = d.querySelector('.title').textContent;
      data.push({name: nameDog}, {img: imgDog,});
  } catch (e) {
    console.error(e);
  }
}
const q = queue(async(data, done) => {
  await parse(data.url, data.isDetailed);
  done();
});
q.push({
  url: 'https://baraholka.onliner.by/viewforum.php?f=608&cat=1',
  isDetailed: false
});
(async() => {
  await q.drain();
  if (data.length > 0) {
    const now = new Date();
    const current = now.getHours() + ':' + now.getMinutes();
    data.push({currentDate: current})
    fs.writeFileSync('./data.txt', JSON.stringify(data));
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
//     await fetch("/resultOnlinerDog.txt")
//     .then(r => r.json())
//     .then(arr => data = arr)
//     console.log(data);
//     for(let i = 0; i < data.length-1; i++) {
//       if(data[i].name) {nameAr.push(data[i].name)}
//       if(data[i].link) {hreflink.push(data[i].link)} 
//       if(data[i].img)  {imgAr.push(data[i].img)} 
//       if(data[i].price) {priceAr.push(data[i].price)}
//       if(data[i].update) {updateAr.push(data[i].update)}
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

