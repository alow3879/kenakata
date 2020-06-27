'use strict'

const url = './js/goods.json'
let cart = {}
let cards = document.querySelectorAll('.cards')
let cssTEXT = 	`transition: .5s;
				 color: #f72464;
				 background: #fff;
				 border-radius: 4px;
				 cursor: default;`

if (localStorage.getItem('cart') != null) {
	cart = JSON.parse(localStorage.getItem('cart'))
}

main()

async function main() {
	let response = await fetch(url)
	let goods = await response.json()

	await uploadingGoods()
	await test()
	await addToCart()

	function uploadingGoods(){
		for(let i = 0; i < goods.length; i++) {
			if(goods[i].price !== "undefined"){
				let row = cards[0].children[0]
				row.innerHTML += 	`<div class="card">
										<div class="card-menu">
											<img class="card-img" src="${goods[i].img}" alt="${goods[i].productName}">
											<div class="card-buttons">
												<button class="card-button addToCart" index-commodity="${goods[i].id}">Add To Cart</button>
												<button class="card-button">Quick View</button>
											</div>
										</div>
										<p class="card-title">${goods[i].productName}</p>
										<div class="card-price">
											<span class="price">${goods[i].price}</span>
											<span class="new-price">${goods[i].discountPrice}</span>
										</div>
									</div>`
			} else if(goods[i].price === "undefined") {
				let row = cards[1].children[0]
				row.innerHTML += 	`<div class="card">
										<div class="card-menu">
											<img class="card-img" src="${goods[i].img}" alt="${goods[i].productName}">
											<div class="card-buttons">
												<button class="card-button addToCart" index-commodity="${+goods[i].id}" >Add To Cart</button>
												<button class="card-button">Quick View</button>
											</div>
										</div>
										<p class="card-title">${goods[i].productName}</p>
										<div class="card-price">
											<span class="new-price">${goods[i].discountPrice}</span>
										</div>
									</div>`
			} 
		}
	}

	function addToCart() {
		let addToCartBtns = document.getElementsByClassName('addToCart')
		for (let item of addToCartBtns) {
			item.onclick = () => {
				let indexCommodity = item.getAttribute('index-commodity')		
				if(cart[indexCommodity] == undefined) {
					cart[indexCommodity] = 1
				} else {
					cart[indexCommodity]++
				}

				console.log(cart)
				item.innerHTML = `In The Cart`
				item.style.cssText = cssTEXT
				item.disabled = "true"
				localStorage.setItem('cart', JSON.stringify(cart))
			}
		}
	}
}

function test() {
	let d = document.querySelectorAll('.addToCart')

	for (let a of d) {
		let indexCommodity = a.getAttribute("index-commodity")
		if (indexCommodity in cart) {
			a.innerHTML = `In The Cart`
			a.style.cssText = cssTEXT
			a.disabled = "true"
		}
	}
}

// ====================================================

let menuBtn = document.querySelector('.menu-btn')
menuBtn.addEventListener('click', () => {
	menuBtn.classList.toggle("menu-active")
	let nav = document.querySelector('.navigation')
	if(window.getComputedStyle(nav).transform != 'matrix(1, 0, 0, 1, 0, 0)') {
		nav.style.transform = 'translateX(0%)'
	} else {
		nav.style.transform = 'translateX(100%)'
	}
})