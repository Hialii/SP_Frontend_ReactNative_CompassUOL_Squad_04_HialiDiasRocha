"use strict";
fetch('../api/article.json')
    .then(res => res.json())
    .then((data) => {
    createNewArticle(data.articles);
})
    .catch(error => console.error('ERROR', error.mesage));
function createNewArticle(items) {
    const HTMLElement = document.getElementById('article');
    if (HTMLElement) {
        const article = document.createElement('article');
        article.className = 'principal';
        items.map(art => {
            const articleLink = document.createElement('a');
            articleLink.href = `${art.url}`;
            articleLink.innerHTML =
                `<img class="article-img" src="${art.image}" alt="${art.alt}">
         <div class="article-text text">
            <h3>${art.title}</h3>
            <p>${art.text}</p>
            <a href=""></a>
         </div>`;
            article.appendChild(articleLink);
        });
        HTMLElement.appendChild(article);
    }
}
const params = new URLSearchParams(window.location.search);
const getId = params.get('id');
if (getId) {
    fetch('../api/matter.json')
        .then(res => res.json())
        .then((data) => {
        searchItem(parseInt(getId), data.matter);
    })
        .catch(error => console.error('ERROR', error.message));
    fetch('../api/coments.json')
        .then(res => res.json())
        .then((data) => {
        searchComent(parseInt(getId), data.coments);
    })
        .catch(error => console.error('ERROR', error.message));
}
;
//==================MATTER=========================
function searchItem(id, pageContent) {
    const findItem = pageContent.find(cont => cont.id === id);
    if (findItem) {
        const section = document.getElementById('aticle-content');
        section.innerHTML =
            `<img class="principal-img"" src="${findItem.image}" alt="${findItem.alt}"> 
      <div class="principal-text text">
      <h1>${findItem.title}</h1>
      <p>${findItem.subtitle}</p>
      </div>
      <div class="divider"></div>
      <p class="container">${findItem.text}</p>`;
    }
}
//====================COMENTS============================
function searchComent(id, coment) {
    console.log('Searching for comment with ID:', id);
    const findItem = coment.find(com => com.id === id);
    if (findItem) {
        const coments = document.getElementById('coment');
        coments.innerHTML =
            `<div class="coment-header">
         <img class="coment-img" src="${findItem.img}" alt="${findItem.alt}">
         <div>
         <h4 class="coment-name">${findItem.name}</h4>
         <p class="coment-data">${findItem.data}</p>
         </div>
       </div>
       <p class="coment-text">${findItem.text}</p>`;
    }
}
