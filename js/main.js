document.addEventListener('DOMContentLoaded', function(){
	render();
	checkCard();
	showMiniCart();
});

window.onload = function () {
	alignHeight();
	window.onresize = alignHeight;
}

let price = document.querySelector('.header__price'),
	dotQuant = document.querySelector('.header__quant'),
	modalQuant = document.querySelector('.modal__numb');

window.onscroll = function() {
	scrollFunc();
};

function scrollFunc() {
	let scrollPos = 50;
	let header = document.getElementById('header');

	if(document.body.scrollTop > scrollPos || document.documentElement.scrollTop > scrollPos) {
		header.classList.add('active');
	} else {
		header.classList.remove('active');
	}
}

price.innerHTML = '0$';
dotQuant.innerHTML = 0;

let products = [
	{id: 1, title: 'Branded Shoe', price: 300, img: 'assets/img/products/product_1.png', attribute: 'first', count: 1},
	{id: 2, title: 'Branded Tees', price: 250, img: 'assets/img/products/product_2.png', attribute: 'second', count: 1},
	{id: 3, title: 'Branded Shoe', price: 350, img: 'assets/img/products/product_3.png', attribute: 'third', count: 1},
	{id: 4, title: 'Branded Shoe', price: 325, img: 'assets/img/products/product_4.png', attribute: 'fourth', count: 1},
	{id: 5, title: 'EMS Woman Bag', price: 275, img: 'assets/img/products/product_5.png', attribute: 'fifth', count: 1},
	{id: 6, title: 'Branded Cargos', price: 225, img: 'assets/img/products/product_6.png', attribute: 'sixth', count: 1}
];

const drawHTML = product => `
	<div class="col-lg-4 products__item-wrap">
		<div class="products__item" id="items_${product.id}">
			<img src="${product.img}" alt="${product.title}" class="products__img">
			<p class="products__name">${product.title}</p>
			<div class="products__cost">
				<p class="products__price">$${product.price}</p>
				<a href="#" class="products__btn" data-id="${product.attribute}">Buy now</a>
			</div>
		</div>
	</div>
`

function render() {
	const html = products.map(drawHTML).join('');
	document.querySelector('#products__cards').innerHTML = html;
}

function alignHeight() {
	let maxH = 0;
	let items = document.querySelectorAll(".products__item");
	items.forEach(function (item, index) {
		let height = item.offsetHeight;
		if(height > maxH){
			maxH = height;
		}
	});
	items.forEach(function (item, index) {
		item.style.height = `${maxH}px`;
	});
}

//================================
//*************COUNT**************
//*************MODAL**************
//================================

// const btnPlus = document.querySelector('.btn-plus'),
// 	  btnMinus = document.querySelector('.btn-minus');
// const maxAmound = 9; 
// let count = 1;

// function modalPlus() {
// 	for(let i = 1; i < maxAmound; i++){
// 		if(count < maxAmound) {
// 			count++;
// 			modalQuant.innerHTML = count;
// 			dotQuant.innerHTML = count;
// 			break;
// 		} else {
// 			alert('Sorry, max amount products(');
// 			break;
// 		}
// 	}	
// }

// function modalMinus() {
// 	for(let i = count; i > 1; i--){
// 		if(count > 1) {
// 			count--;
// 			modalQuant.innerHTML = count;
// 			dotQuant.innerHTML = count;
// 			break;
// 		} 
// 	}	
// }

// btnPlus.addEventListener('click', modalPlus);
// btnMinus.addEventListener('click', modalMinus);


//=================================
//************LOCAL****************
//***********STORAGE***************
//=================================
let cart = {};

document.addEventListener('click', event => {
	event.preventDefault();
	if(event.target.dataset.id){
		addToCart(event);
	}
});


function addToCart(event) {
	const art = event.target.dataset.id;
	if(cart[art] != undefined){
		cart[art]++;
	} else {	
		cart[art] = 1;
	}
	localStorage.setItem('cart', JSON.stringify(cart));
	console.log(cart);

	let obj = {};
	let arr = [];
	let mergedArr;
	for(let g of products){		
		if(art == `${g.attribute}`) {
				arr = JSON.parse(localStorage.getItem('prod')) || [];
			if(obj.id !== `${g.id}`){
				obj = {id: `${g.id}`, price: `${g.price}`, img: `${g.img}`, title: `${g.title}`, count: 1};
				// mergedArr = arr.concat(obj);
				// localStorage.setItem('prod', JSON.stringify(mergedArr));
			} else {
				obj.count++;
				// arr = JSON.parse(localStorage.getItem('prod')) || [];
				
			}
			mergedArr = arr.concat(obj);
				localStorage.setItem('prod', JSON.stringify(mergedArr));
			
		console.log(mergedArr);
		} 
	}

	showMiniCart();
}

function checkCard() {
	let items = localStorage.getItem('cart');
	if(items != null){
		cart = JSON.parse(items);
	}
}

function showMiniCart() {
	let out = '';
	for(let w in cart){
		out += w + '-------' + cart[w]+'<br>';
	}
	const miniCart = document.getElementById("mini-cart");
	miniCart.innerHTML = out;
}






