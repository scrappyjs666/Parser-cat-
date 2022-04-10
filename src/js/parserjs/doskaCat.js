const {
  JSDOM
} = require('jsdom');
const queue = require('async/queue');
const fs = require('fs/promises');
const data = [];
async function doskaCat() {
  async function parse(url, isDetailed) {
  try {
    const dom = await JSDOM.fromURL(url);
    const d = dom.window.document;
    if (!isDetailed) {
      d.querySelectorAll('form>:nth-child(3)>tbody>tr').forEach(i => {
        const url = i.querySelector('.msga2 > a')?.getAttribute('href');
        const link = url ? `https://www.doska.by/${url}` : undefined;
        const name = i.querySelector('.d1> a')?.textContent?.trim();
        let price = i.querySelector('td:nth-child(6)')?.textContent?.replace(/\s+/g, ' ')?.trim().replace(/(\r\n|\n|\r)/gm, "");
        if(price == '-' || undefined || null)
        {price = 'Не указано/ Бесплатно!'}
        data.push({link: link},{name: name},{price: price});
      })
      d.querySelectorAll('.msga2>a').forEach(i => {
        if (i) {
          q.push({
            url: i,
            isDetailed: true
          });
        }
      });
      const next = d.querySelector('msga2 > a');
      if (next) {
        const nextUrl ='https://www.doska.by/'+next.getAttribute('href');
        q.push({
          url: nextUrl,
          isDetailed: false
        });
      }
    } else {
      const imgCat = d.querySelector('.ads_photo_label > div > div > a').getAttribute('href');
      data.push({img: imgCat});
      const updateCat = d.querySelector("td > table > tbody > tr:nth-child(2) > td:nth-child(3)").textContent.substr(17, 5);
      data.push({update: updateCat});
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
  url: 'https://www.doska.by/animals/cats/minsk-r/',
  isDetailed: false
});
  await q.drain();
  if (data.length > 0) {
    await  fs.appendFile('./data.txt', JSON.stringify(data));
    console.log(`Сохранено ${data.length} записей doska`);
  }
}


module.exports = doskaCat;




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
//     await fetch("/resultDoskaDog.txt")
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
//   console.log(priceAr)
// }

