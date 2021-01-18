import axios from 'axios';

const Card = (article) => {
  // TASK 5
  // ---------------------
  // Implement this function, which should return the markup you see below.
  // It takes as its only argument an "article" object with `headline`, `authorPhoto` and `authorName` properties.
  // The tags used, the hierarchy of elements and their attributes must match the provided markup exactly!
  // The text inside elements will be set using their `textContent` property (NOT `innerText`).
  // Add a listener for click events so that when a user clicks on a card, the headline of the article is logged to the console.
  //
  // <div class="card">
  //   <div class="headline">{ headline }</div>
  //   <div class="author">
  //     <div class="img-container">
  //       <img src={ authorPhoto }>
  //     </div>
  //     <span>By { authorName }</span>
  //   </div>
  // </div>
  //

  // console.log(article);
//making the elements here
const mCard = document.createElement("div");
const headlineS = document.createElement("div");
const author = document.createElement("div");
const imgContainer = document.createElement("div");
const aIMG = document.createElement('img');
const aName = document.createElement('span');

// making the structure here
mCard.appendChild(headlineS);
mCard.appendChild(author);
author.appendChild(imgContainer);
imgContainer.appendChild(aIMG);
author.appendChild(aName);

// class names here
mCard.classList.add('card');
headlineS.classList.add('headline');
author.classList.add('author');
imgContainer.classList.add('img-container');

//text content
aName.textContent = article.authorName;
headlineS.textContent = article.headline;
aIMG.src = article.authorPhoto;

// event listener
mCard.addEventListener('click', (e) => {
  console.log(e);
});

//return

return mCard
}

const cardAppender = (selector) => {
  // TASK 6
  // ---------------------
  // Implement this function that takes a css selector as its only argument.
  // It should obtain articles from this endpoint: `https://lambda-times-api.herokuapp.com/articles`
  // However, the articles do not come organized in a single, neat array. Inspect the response closely!
  // Create a card from each and every article object in the response, using the Card component.
  // Append each card to the element in the DOM that matches the selector passed to the function.
  //
  axios.get('https://lambda-times-api.herokuapp.com/topics')
// this took me forever and a lot of googleing haha
  .then(res => {
    res.data.topics.forEach(topic => {
      axios.get('https://lambda-times-api.herokuapp.com/articles')
      .then(r => {
        console.log('HERE', r.data);
        let target = document.querySelector(selector);
        
        if(topic === 'node.js'){
          topic = 'node';
        } 
        let cData = (r.data.articles[topic])
        
        for(let i = 0; i < cData.length; i++){
          target.append(Card(cData[i]));
        }
      })
    })
  })
  
}

export { Card, cardAppender }
