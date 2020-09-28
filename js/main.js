document.addEventListener('DOMContentLoaded', function(){
	render();
});

window.onload = function () {
	alignHeight();
	window.onresize = alignHeight;
	checkCard();
	renderToCart();
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
	{id: 1, title: 'Branded Shoe', price: 300, img: 'assets/img/products/product_1.png', attribute: 'first'},
	{id: 2, title: 'Branded Tees', price: 250, img: 'assets/img/products/product_2.png', attribute: 'second'},
	{id: 3, title: 'Branded Shoe', price: 350, img: 'assets/img/products/product_3.png', attribute: 'third'},
	{id: 4, title: 'Branded Shoe', price: 325, img: 'assets/img/products/product_4.png', attribute: 'fourth'},
	{id: 5, title: 'EMS Woman Bag', price: 275, img: 'assets/img/products/product_5.png', attribute: 'fifth'},
	{id: 6, title: 'Branded Cargos', price: 225, img: 'assets/img/products/product_6.png', attribute: 'sixth'}
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
let cart = [];
let cartModal = [];

document.addEventListener('click', event => {
	event.preventDefault();
	if(event.target.dataset.id){
		addToCart(event);
	}
});


function addToCart(event) {
	const count = event.target.dataset.id;
	if(cart[count] != undefined){
		cart[count]++;
	} else {	
		cart[count] = 1;
	}
	// localStorage.setItem('cart', JSON.stringify(cart));
	// console.log(cart);

	for(let g of products){
		let price = `${g.price}`;
		if(cart[price] != undefined){
			cart[price] = price * cart[count];
		} else {
			cart[price] = price;
		}

		let productObject = {id: `${g.id}`, img: `${g.img}`, title: `${g.title}`, price: cart[price], count: cart[count]};
		
		if(count == `${g.attribute}`) {
			let productArray = JSON.parse(localStorage.getItem('prod')) || [];
			let i = productArray.findIndex(o => o.id === `${g.id}`);

			if (productArray[i]) {
				productArray[i] = productObject;
				// console.log('if');
			} else {
				productArray.push(productObject);
				// console.log('else');
			}
			localStorage.setItem('prod', JSON.stringify(productArray));
			console.log(productArray);
			console.log(productObject);
		}
		checkCard();
		renderToCart();
	} // for
}

function checkCard() {
	let items = localStorage.getItem('prod');
	if(items != null){
		cartModal = JSON.parse(items);
	}
	// console.log(cart);
	renderToCart(cartModal);
}


//====================================
//*************DRAW*TO****************
//**************CART******************
//====================================

const drawCart = cart => ` 
	<div class="modal__item">
		<div class="modal__product">
			<p class="modal__title">${cart.title}</p>
			<img src="${cart.img}" alt="${cart.title}" class="modal__img">
		</div>
		<div class="modal__quant">
			<button class="btn-minus">-</button>
			<span class="modal__numb">${cart.count}</span>
			<button class="btn-plus">+</button>
		</div>
		<span class="modal__price">${cart.price}$</span>
		<button class="modal__btn btn-delete">Delete</button>
	</div>
`



function renderToCart() {
	const html = cartModal.map(drawCart).join('');
	document.querySelector('#modal-wrap').innerHTML = html;

}


