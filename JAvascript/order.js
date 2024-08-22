const menu = {
    mainDishes: [
        { name: "Tandoori Chicken", img: "../pic/item1.jpg", price:1500},
        { name: "Lemon Tikka", img: "https://www.archanaskitchen.com/images/archanaskitchen/1-Author/sibyl_sunitha/Chicken_Tikka_Recipe__400.jpg", price:1550},
        { name: "Tandoori Platter", img: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=1080/assets/search/usecase/tandoori_platter_zdish.png", price:1350},
        { name: "Chicken Tikka", img: "https://pinchofyum.com/wp-content/uploads/Chicken-Tikka-Masala-Square.jpg",
        price:1400}
    ],
    curries: [
        { name: "Butter Chicken", img: "https://www.indianhealthyrecipes.com/wp-content/uploads/2023/04/butter-chicken-recipe.jpg", price:1250},
        { name: "Keema Curry", img: "https://www.kitchensanctuary.com/wp-content/uploads/2024/01/Keema-Curry-square-FS.jpg", price:1150},
       { name: "Mutton Curry", img: "https://www.licious.in/blog/wp-content/uploads/2020/12/Mutton-Curry-750x750.jpg", price:1350},
      { name: "Palak Curry", img: "https://www.marionskitchen.com/wp-content/uploads/2021/08/Paneer-Curry8279.jpg", price:1050}
      
    ],
    bread: [
        { name: "Naan", img: "https://hips.hearstapps.com/hmg-prod/images/211021-delish-seo-naan-horizontal-0128-eb-1635447725.jpg?crop=0.8896296296296295xw:1xh;center,top&resize=1200:*", price:200 },
        { name: "Cheese Naan", img: "https://lh6.googleusercontent.com/proxy/0ZFnoWU9lOF-dtZ-U2D4ZhHJ2saoqdvc5JUk2llvfxQCP6spWP4I0qPkbd2xD8qoN45DqvhcKxuo9ijIiejAWHRN7zurLZD58r2N0aa9KnQyd_35XGBQ", price:400},
      { name: "Garlic Naan", img: "https://thewhiskaddict.com/wp-content/uploads/2021/02/IMG_6493-1-scaled.jpg", price:400},
       { name: "Plain Roti", img: "https://indianbusinesscanada.com/admin/uploads/2019/05/29/fresh-and-soft-homemade-roti-with-whole-wheat-flour-45028-2-367.jpeg", price:150}
      
    ],
    drinks: [
        { name: "Mango Lassi", img: "https://www.simplyrecipes.com/thmb/M3LEdeKC37xv52FUmIBFJVXKBFY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Simply-Recipes-Mango-Lassi-LEAD-13-73719759cc3f4a2ca7fe8be72baaeaab.jpg", price:300},
       { name: "Lassi", img: "../pic/OIP.jpg", 
        price:250},
      { name: "Coca-Cola", img: "https://i.pinimg.com/originals/5c/47/1e/5c471e2a557ba186776418935e484103.jpg", 
        price:200},
      { name: "Asahi-Beer", img: "https://i.pinimg.com/originals/c4/47/94/c44794fac80be8ae4baf1b59682a04ff.jpg", 
        price:400}
      
    ]
};

function showCategory(category) {
    const itemsContainer = document.getElementById('items-container');
    itemsContainer.innerHTML = '';
    menu[category].forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'item';
        
        const img = document.createElement('img');
        img.src = item.img;
        img.alt = item.name;

        const name = document.createElement('p');
        name.textContent = item.name;
        
        const price = document.createElement('p');
        price.textContent=item.price;
        const button = document.createElement('button');
        button.textContent = 'ADD';
        button.onclick = () => addToCart(item.name);

        itemDiv.appendChild(img);
        itemDiv.appendChild(name);
        itemDiv.appendChild(price);
        itemDiv.appendChild(button);

        itemsContainer.appendChild(itemDiv);
    });
}


const cart = {};

function addToCart(itemName) {
  if (cart[itemName]) {
    cart[itemName].quantity+=1;
  } else {
    cart[itemName] = {
      name: itemName,
      quantity: 1,
      ...menu.mainDishes.find(item => item.name === itemName),
      ...menu.curries.find(item => item.name === itemName),
      ...menu.bread.find(item => item.name === itemName),
      ...menu.drinks.find(item => item.name === itemName)
    };
  }
  updateCartDisplay();
}

function updateCartDisplay() {
  const cartContainer = document.getElementById('cart-container');
  const totalPrice = document.getElementById('total-price');
  cartContainer.innerHTML = '';
  let total = 0;

  Object.values(cart).forEach(item => {
    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');

    const itemName = document.createElement('span');
    itemName.classList.add('item-name');
    itemName.textContent = `${item.name} x ${item.quantity}`;

    const itemPrice = document.createElement('span');
    itemPrice.classList.add('item-price');
    itemPrice.textContent = `${item.price * item.quantity} yen`;
    
    const del = document.createElement('button');
    del.classList.add('del-btn');
    del.textContent="Remove";
    del.onclick = () => Remove(item.name);
    
    cartItem.appendChild(itemName);
    cartItem.appendChild(itemPrice);
    cartItem.appendChild(del);
    cartContainer.appendChild(cartItem);

    total += item.price * item.quantity;
  });

  totalPrice.textContent = `${total} yen`;

  const cartElement = document.querySelector('.cart');
  if (Object.keys(cart).length > 0) {
    cartElement.classList.add('show');
  } else {
    cartElement.classList.remove('show');
  }
}
const proceedButton = document.getElementById('proceed-btn');
proceedButton.onclick = () => {
  if (confirm('Are you sure you want to proceed? ')) {
    alert('Your order has been noted. Pay your delivery man in cash!!');
  }
};

function Remove(itemName) {
  if (cart[itemName]) {
    if (cart[itemName].quantity > 1) {
      cart[itemName].quantity--;
    } else {
      if (confirm(`Are you sure you want to remove ${itemName} from the cart?`)) {
        delete cart[itemName];
      }
    }
    updateCartDisplay();
  }
}