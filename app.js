'use strict';



let totalVotes = 25;
let allProducts = [];

let imgContainer = document.getElementById('img-container');
let imgOne = document.getElementById('img-one');
let imgTwo = document.getElementById('img-two');
let imgThree = document.getElementById('img-three');

let resultBtn = document.getElementById('show-result-button');
let resultsList = document.getElementById('results-list');

console.dir(resultsList);

function Product(name, photoExtension = 'jpg') {
  this.name = name;
  this.photo = `img/${name}.${photoExtension}`;
  this.views = 0;
  this.votes = 0;

  allProducts.push(this);
}

new Product('sweep', 'png');
new Product('bag');
new Product('banana');
new Product('bathroom');
new Product('boots');
new Product('breakfast');
new Product('bubblegum');
new Product('chair');
new Product('cthulhu');
new Product('dog-duck');
new Product('dragon');
new Product('pen');
new Product('pet-sweep');
new Product('scissors');
new Product('shark');
new Product('tauntaun');
new Product('unicorn');
new Product('water-can');
new Product('wine-glass');


function randonIndexGenerator() {
  return Math.floor(Math.random() * allProducts.length);
}


function renderImg() {
  let imgOneIndex = randonIndexGenerator();
  let imgTwoIndex = randonIndexGenerator();
  let imgThreeIndex = randonIndexGenerator();

  while (imgOneIndex === imgTwoIndex) {
    imgTwoIndex = randonIndexGenerator;
  }
  while (imgOneIndex === imgThreeIndex) {
    imgOneIndex = randonIndexGenerator;
  }
  while (imgTwoIndex === imgThreeIndex) {
    imgThreeIndex = randonIndexGenerator;
  }

  imgOne.src = allProducts[imgOneIndex].photo;
  imgOne.alt = allProducts[imgOneIndex].name;
  allProducts[imgOneIndex].views++;

  imgTwo.src = allProducts[imgTwoIndex].photo;
  imgTwo.alt = allProducts[imgTwoIndex].photo;
  allProducts[imgTwoIndex].views++;

  imgThree.src = allProducts[imgThreeIndex].photo;
  imgThree.alt = allProducts[imgThreeIndex].photo;
  allProducts[imgThreeIndex].views++;
}

renderImg();


function handleClick(event) {
  let imgClicked = event.target.alt;

  console.log('imgClicked:', imgClicked);

  for (let i = 0; i < allProducts.length; i++) {
    if (imgClicked === allProducts[i].name) {
      allProducts[i].votes++;
    }
  }
  totalVotes--;

  renderImg();

  if (totalVotes === 0) {
    imgContainer.removeEventListener('click', handleClick);
  }
}

function handleResult() {

for(let i = 0; i < allProducts.length; i++){
  productNames.push(allProducts[i].name);
}

  if (totalVotes === 0) {
    // renderChart();
    // console.log('totalVote is:', totalVotes);

    // for (let i = 0; i < allProducts.length; i++) {
    //   let liElem = document.createElement('li');
    //   liElem.textContent = `${allProducts[i].name}: views: ${allProducts[i].views}, votes: ${allProducts[i].votes}`;
    //   console.log('liElem is:', liElem);

    //   resultsList.appendChild(liElem);

    }
    resultBtn.removeEventListener('click', handleResult);
  }
  console.log('resultsList:', resultsList);
}

let canvasElem = document.getElementById('my-chart');

function renderChart(){

  let productNames = [];

  let myObj = 

    type: 'bar',
    data: {
        labels: productNames,
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }

    new Chart(canvasElem, myObj);
}


imgContainer.addEventListener('click', handleClick);

resultBtn.addEventListener('click', handleResult);

