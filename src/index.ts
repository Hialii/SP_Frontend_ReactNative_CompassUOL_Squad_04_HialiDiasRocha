
//===================FIRST PAGE================================
 interface Mock {
    id: number;
    title: string;
    image: string;
    url: string;
    alt: string;
    text: string;
 } 

  fetch('../api/article.json')
    .then(res => res.json())
     .then((data: {articles: Mock[]}) => {
        createNewArticle(data.articles);
          
    })
    .catch(error => console.error('ERROR', error.mesage))

  
//============POSTS================
 function createNewArticle(items: Mock[]): any {
   const HTMLElement = document.getElementById('article');

   if(HTMLElement) {
      const article = document.createElement('article');
      article.className = 'principal flexbox';

      items.map(art => {
         const articleLink =  document.createElement('a');
         articleLink.className = ('posts')
         articleLink.href = `${art.url}`;

         articleLink.innerHTML =
         `<div class="">
         <img class="article-img" src="${art.image}" alt="${art.alt}">
         <div class="article-text text">
            <h3>${art.title}</h3>
            <p>${art.text}</p>
            <a href=""></a>
         </div>
         </div>`
       article.appendChild(articleLink);
      })

      HTMLElement.appendChild(article); 
   }
}


//=================SECOND PAGE=========================================

interface Content {
   id: number;
   image: string;
   image2: string;
   alt: string;
   title: string;
   subtitle: string;
   text: string
}

interface Coments {
   id: number;
   img: string;
   alt: string;
   text: string;
   name: string;
   data: string
}

const params= new URLSearchParams(window.location.search);
const getId = params.get('id');
if (getId) {
   fetch('../api/matter.json')
      .then(res => res.json())
      .then((data: { matter: Content[] }) => {
         searchItem(parseInt(getId), data.matter);
      })
      .catch(error => console.error('ERROR', error.message));
   
      fetch('../api/coments.json')
      .then(res => res.json())
      .then((data: { coments: Coments[] }) => {
         searchComent(parseInt(getId), data.coments);
      })
      .catch(error => console.error('ERROR', error.message));     
};





//==================MATTER=========================
function searchItem(id: number, pageContent: Content[]): any {
   const findItem = pageContent.find(cont => cont.id === id);
   
   if(findItem){
      const section = document.getElementById('article-content');
      section!.innerHTML = 
      `
      <h1 class="principal-text text">${findItem.title}</h1>
     <img class="principal-img center" src="${findItem.image}" alt="${findItem.alt}">   
      <p class="principal-text text">${findItem.subtitle}</p> 
      <div class="divider"></div>  
      <p class="container p">${findItem.text}</p>
      <img class="principal-img center" src="${findItem.image2}" alt="${findItem.alt}">
      <p class="container p">${findItem.text}</p> 
      </div>`
   }
}
//====================COMENTS============================
function searchComent(id: number, coment: Coments[]) {
   console.log('Searching for comment with ID:', id);
   const findItem = coment.find(com => com.id === id);
   
   if(findItem) {
      const coments = document.getElementById('coment');
      coments!.innerHTML =
      `<div class="p">
      <h3 class="author-coment">Author Coment</h3>
      <div class="divider"></div>
      <div class="coment-header">
         <div class="coment-header">
            <img class="coment-img" src="${findItem.img}" alt="${findItem.alt}">
            <div>
               <h4 class="coment-name">${findItem.name}</h4>
               <p class="coment-data">${findItem.data}</p>
            </div>
         </div>
         <div>
            <a href="https://pt-br.facebook.com/" target="_blank"><img class="social-img" src="../assets/5279111_network_fb_social media_facebook_facebook logo_icon.svg" alt="facebook logo"></a>
            <a href="https://medium.com/" target="_blank"><img class="social-img" src="../assets/7088889_medium_medium logo_icon.svg" alt="$medium logo"></a>
         </div>
      </div>  
         <p class="coment-text">${findItem.text}</p>
       
      `
   }
   
}












