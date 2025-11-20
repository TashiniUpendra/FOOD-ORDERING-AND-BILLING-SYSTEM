// ---------- Mock menu data ----------

const MENU = [
  {
    id: 1,
    name: "Classic Burger",
    price: 550,
    category: "Main",
    img: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=70",
    desc: "Beef patty, lettuce, cheese, special sauce."
  },
  {
    id: 2,
    name: "Crispy Chicken",
    price: 620,
    category: "Main",
    img: "https://images.unsplash.com/photo-1606756790138-3b5dd78c8a0f?auto=format&fit=crop&w=800&q=80",
    desc: "Fried chicken with house spices."
  },
  {
    id: 3,
    name: "Veggie Salad",
    price: 420,
    category: "Starters",
    img: "https://images.unsplash.com/photo-1556912998-c57cc6b63cd7?auto=format&fit=crop&w=800&q=70",
    desc: "Fresh greens with citrus dressing."
  },
  {
    id: 4,
    name: "French Fries",
    price: 250,
    category: "Sides",
    img: "https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?auto=format&fit=crop&w=800&q=80",
    desc: "Crispy golden fries."
  },
  {
    id: 5,
    name: "Chocolate Cake",
    price: 390,
    category: "Desserts",
    img: "https://images.unsplash.com/photo-1605478522018-4e7a5f16c0dc?auto=format&fit=crop&w=800&q=80",
    desc: "Decadent chocolate fudge cake."
  },
  {
    id: 6,
    name: "Lemon Soda",
    price: 180,
    category: "Drinks",
    img: "https://images.unsplash.com/photo-1551022377-3a1830a7e56b?auto=format&fit=crop&w=800&q=70",
    desc: "Refreshing lemon soda."
  }
];


// ---------- Cart helpers ----------
const CART_KEY = 'snapEats_cart';
function loadCart(){ return JSON.parse(localStorage.getItem(CART_KEY)||'[]'); }
function saveCart(cart){ localStorage.setItem(CART_KEY, JSON.stringify(cart)); }
function addToCart(itemId, qty=1){
  const item = MENU.find(m=>m.id===Number(itemId));
  if(!item) return;
  const cart = loadCart();
  const found = cart.find(c=>c.id===item.id);
  if(found) found.qty += Number(qty);
  else cart.push({id:item.id,name:item.name,price:item.price,img:item.img,qty:Number(qty)});
  saveCart(cart);
  showToast(`${item.name} added to cart`);
  updateCartBadge();
}
function updateCartBadge(){
  const count = loadCart().reduce((s,i)=>s+i.qty,0);
  const el = document.querySelector('#cart-count');
  if(el) el.textContent = count;
}

// ---------- Toast ----------
function showToast(msg){
  const toast = document.createElement('div');
  toast.className='toast align-items-center show';
  toast.style.position='fixed';
  toast.style.right='20px';
  toast.style.bottom='20px';
  toast.style.zIndex='1060';
  toast.innerHTML=`<div class="d-flex p-2"><div class="toast-body">${msg}</div><button class="btn-close ms-2 me-1" onclick="this.closest('.toast').remove()"></button></div>`;
  document.body.appendChild(toast);
  setTimeout(()=>toast.remove(),3000);
}

// ---------- Render Menu ----------
function renderMenu(containerSelector, filterCategory=null){
  const container = document.querySelector(containerSelector);
  if(!container) return;
  container.innerHTML='';
  const items = MENU.filter(i => !filterCategory || i.category===filterCategory);
  items.forEach(it=>{
    const col = document.createElement('div');
    col.className='col-md-4';
    col.innerHTML=`
      <div class="food-card">
        <img src="${it.img}" alt="${it.name}">
        <div class="p-3">
          <h5>${it.name}</h5>
          <small class="text-muted">${it.category}</small>
          <p class="small text-muted mt-1">${it.desc}</p>
          <div class="d-flex gap-2 mt-2">
            <a href="item.html?id=${it.id}" class="btn btn-outline-secondary btn-sm">View</a>
            <button class="btn btn-primary btn-sm" onclick="addToCart(${it.id},1)">
              <i class="bi bi-cart-plus"></i> Add
            </button>
          </div>
        </div>
      </div>`;
    container.appendChild(col);
  });
}

// ---------- Init ----------
document.addEventListener('DOMContentLoaded', ()=>{
  updateCartBadge();
  if(document.querySelector('#menu-grid')) renderMenu('#menu-grid');
});
