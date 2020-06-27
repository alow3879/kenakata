const url = '../js/goods.json'
const menuBtn = document.querySelector('.menu-btn')

menuBtn.addEventListener('click', () => {
  menuBtn.classList.toggle("menu-active")
  let nav = document.querySelector('.navigation')
  if(window.getComputedStyle(nav).transform != 'matrix(1, 0, 0, 1, 0, 0)') {
    nav.style.transform = 'translateX(0%)'
  } else {
    nav.style.transform = 'translateX(100%)'
  }
})

let items = new Vue({
  el: '.section-commodities',
  data: {
    inTheCart: [],
    quantity: {},
    allCommodities: [],
    cart: JSON.parse(localStorage.getItem('cart')),
    totalPrice: 0
  },
  methods: {
    totalPriceCalc() {
      this.totalPrice = 0
      for (const key in this.quantity) {
        for (const item of this.inTheCart) {
          if (key == item.id) {
            this.totalPrice += this.quantity[key] * item.discountPrice
          }
        }
      }
    },
    increment (item) {
      this.quantity[item.id]++
      this.totalPrice += +item.discountPrice
    },
    decrement (item) {
      if (this.quantity[item.id] === 0) {
        this.deleteItem(item)
      } else {
        this.quantity[item.id]--
        this.totalPrice -= +item.discountPrice
      }
    },
    priceForItems (item) {
      return item.discountPrice * this.quantity[item.id]
    },
    pushInTheCart (response) {
      for (let key in this.cart) {
        for (let item of response) {
          if (key == item.id) {
            this.quantity[key] = 1
            this.inTheCart.push(Object.assign(item))
          }
        }
      }
    },
    deleteItem (item) {
      this.inTheCart = []
      delete localStorage.cart
      delete this.cart[item.id]
      console.log(this.cart)
      localStorage.setItem('cart', JSON.stringify(this.cart))
      this.pushInTheCart(this.allCommodities)
      this.totalPriceCalc()
    },
    clearCart () {
      this.cart = {}
      this.inTheCart = []
      delete localStorage.cart
      this.totalPriceCalc()
    }
  },
  created () {
    fetch('../js/goods.json')
      .then(response => response.json())
      .then(response => this.allCommodities = response)
      .then(response => {
        this.pushInTheCart(response)
        this.totalPriceCalc()
      })
  }
})