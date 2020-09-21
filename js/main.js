document.addEventListener('DOMContentLoaded', function(){
	render();
	checkCard();
	showMiniCart();
});

window.onload = function () {
	alignHeight();
	window.onresize = alignHeight;
}


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
	let arr = [];
	const art = event.target.dataset.id;
	if(cart[art] != undefined){
		cart[art]++;
	} else {	
		cart[art] = 1;
	}
	
	localStorage.setItem('cart', JSON.stringify(cart));
	for(let g of products){
		if(art == `${g.attribute}`){
			arr = [
				{price: `${g.price}`, img: `${g.img}`, title: `${g.title}`}
			];
		localStorage.setItem('arr', JSON.stringify(arr));
		console.log(arr);
		}
	}
	console.log(cart);
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






