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

let retreivedProducts = localStorage.getItem('allProucts');

console.log('retrievedProducts', retreivedProducts);

let parsedProducts = JSON.parse(retreivedProducts);

console.log('parsed Goats >>> ', parsedProducts
);

function Product(name, photoExtension = 'jpg') {
    this.name = name;
    this.photo = `img/${name}.${photoExtension}`;
    this.views = 0;
    this.votes = 0;

    allProducts.push(this);
}

if (retreivedProducts) {
    allProducts = parsedProducts;

} else {


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
}

function randonIndexGenerator() {
    return Math.floor(Math.random() * allProducts.length);
}


let productIndexArr = [];

function renderImg() {

    while (productIndexArr.length < 6) {
        let randomNum = randonIndexGenerator();
        if (!productIndexArr.includes(randomNum)) {
            productIndexArr.push(randomNum);
        }
    }

    let imgOneIndex = productIndexArr.shift();
    let imgTwoIndex = productIndexArr.shift();
    let imgThreeIndex = productIndexArr.shift();


    imgOne.src = allProducts[imgOneIndex].photo;
    imgOne.alt = allProducts[imgOneIndex].name;
    imgOne.name = allProducts[imgOneIndex].name;
    allProducts[imgOneIndex].views++;

    imgTwo.src = allProducts[imgTwoIndex].photo;
    imgTwo.alt = allProducts[imgTwoIndex].name;
    imgTwo.name = allProducts[imgTwoIndex].name;
    allProducts[imgTwoIndex].views++;

    imgThree.src = allProducts[imgThreeIndex].photo;
    imgThree.alt = allProducts[imgThreeIndex].name;
    imgThree.name = allProducts[imgThreeIndex].name;
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
        let stringifiedProducts = JSON.stringify(allProducts);
        localStorage.setItem('myProducts', stringifiedProducts);

        imgContainer.removeEventListener('click', handleClick);
    }
}

function handleResult() {
    if (totalVotes === 0) {
        renderChart();
    }
    resultBtn.removeEventListener('click', handleResult);
}

let canvasElem = document.getElementById('myChart');

function renderChart() {
    const ctx = document.getElementById('myChart').getContext('2d');

    let productsNames = [];
    let productsVotes = [];
    let productsViews = [];

    for (let i = 0; i < allProducts.length; i++) {
        productsNames.push(allProducts[i].name);
        productsVotes.push(allProducts[i].votes);
        productsViews.push(allProducts[i].views);
    }

    let myObj = {

        type: 'bar',
        data: {
            labels: productsNames,
            datasets: [{
                label: '# of Views',
                data: productsViews,
                backgroundColor: [
                    'red',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                ],
                borderWidth: 1
            },
            {
                label: '# of Votes',
                data: productsVotes,
                backgroundColor: [
                    'blue',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
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
    };



    new Chart(ctx, myObj);
}

imgContainer.addEventListener('click', handleClick);

resultBtn.addEventListener('click', handleResult);

