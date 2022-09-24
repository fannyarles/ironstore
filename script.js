//Variables, Arrays, and Objects, dotNotation, bracketNotation
//Dom manipulation


let items = [
  {
    name: 'Ironhack T',
    price: 10,
    image: 'https://miro.medium.com/max/5190/1*aVsUjp1zvlRb1799gDjbLA@2x.jpeg'
  },
  {
    name: 'Ironhack Hoodie',
    price: 15,
    image: 'https://m.media-amazon.com/images/I/B1i3u9-Q-KS._AC_CLa%7C2140%2C2000%7CB1wqstnnTfS.png%7C0%2C0%2C2140%2C2000%2B0.0%2C0.0%2C2140.0%2C2000.0_UL1500_.png'
  },
  {
    name: 'Ironhack Sticker',
    price: 2,
    image:'https://e7.pngegg.com/pngimages/887/803/png-clipart-ironhack-web-development-job-startup-company-design-blue-user-interface-design-thumbnail.png'
  },
  {
    name: 'Ironhack Mug',
    price: 8,
    image: 'https://d0bb7f9bf11b5ad1a6b2-6175f06f5e3f64e15abbf67415a276ec.ssl.cf1.rackcdn.com/product-images/designlab/11-oz-traditional-ceramic-coffee-mugs-7102-white1582888132.jpg'
  },
]

let cart = [];

const itemsList = document.getElementById('items');

items.forEach((item, i) => {

  itemsList.innerHTML += `
    <li>
        <div class="item-infos">
          <img src="${item.image}" alt="${item.name}" />  
          ${item.name} (${item.price} €)
        </div>
        <div class="buy-infos">
          <input type="number" placeholder="quantity" onchange="inputChange(${i}, '${item.name}', '${item.price}', '${item.image}' )" />
          <button>Buy item</button>
        </div>
    </li>  
  `;

})

function inputChange(i, name, price, image) {

  let listItem = document.querySelectorAll('li')[i];
  let quantity = listItem.querySelector('input').value;
  let button = listItem.querySelector('button');

  console.log(`Je veux acheter le produit #${i} (${name}, prix unitaire: ${price}) en ${quantity} exemplaires.`);

  button.onclick = function(){

    // Si l'item exsite déjà dans le panier, UPDATE
    if (cart.find(({id}) => id === i)) {
      console.log(cart)
      let findItemInCart = cart.find(({id}) => id === i)
      let indexOfExistingItem = cart.indexOf(findItemInCart)
      let newQuantity = parseInt(cart[indexOfExistingItem].quantity) + parseInt(quantity)
      cart[indexOfExistingItem].quantity = newQuantity
    } else {
      cart.push({
        id: i,
        name: name,
        quantity: quantity,
        price: price,
        image: image
      });
    }
    showCart();
  }

}


function showCart() {
  
  const cartList = document.getElementById('cart');
  cartList.innerHTML = '';

  cart.forEach((item, i) => {

    cartList.innerHTML += `
      <li>
          <div class="item-infos">
            <img src="${item.image}" alt="${item.name}" />  
            ${item.name} (${item.price} €) - ${item.quantity} exemplaires.
          </div>
          <div class="buy-infos">
            <button onclick='removeItem(${i})'>Remove item</button>
          </div>
      </li>  
    `;
  
  })

}

function removeItem(i) {
  const selectedItem = cart[i];
  if (selectedItem.quantity === 1) {
    cart.splice(i,1);
  } else if (selectedItem.quantity > 1) {
    selectedItem.quantity -= 1;
  }
  
  showCart();
}

//document.querySelector('#two').style.backgroundColor = 'blue'