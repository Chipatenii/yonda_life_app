
(function(){
  function price(n){return 'K'+Number(n).toFixed(2)}
  function addToCart(id){
    const cart=JSON.parse(localStorage.getItem('yonda_cart')||'[]');
    const existing=cart.find(i=>i.id===id);
    if(existing){existing.qty+=1}else{cart.push({id,qty:1})}
    localStorage.setItem('yonda_cart', JSON.stringify(cart));
    const badge=document.getElementById('cart-count');
    if(badge) badge.textContent=String(cart.reduce((a,b)=>a+(b.qty||1),0));
  }
  function card(p){
    const el=document.createElement('div'); el.className='card';
    el.innerHTML=`<div class="card-tag">${p.format||p.type}</div>
      <h3 class="card-title">${p.title}</h3>
      <p class="card-body">Price: <strong>${price(p.price)}</strong></p>
      <div class="card-body"><button class="btn btn-primary" data-add="${p.id}">Add to Cart</button></div>`;
    return el;
  }
  function render(filter='all'){
    const g=document.getElementById('product-grid'); if(!g) return; g.innerHTML='';
    (window.YONDA_PRODUCTS||[]).filter(p=>filter==='all'||p.type===filter).forEach(p=>g.appendChild(card(p)));
    g.querySelectorAll('[data-add]').forEach(btn=>btn.addEventListener('click',()=>addToCart(btn.getAttribute('data-add'))));
  }
  document.addEventListener('DOMContentLoaded',()=>{
    document.querySelectorAll('[data-filter]').forEach(b=>b.addEventListener('click',()=>render(b.getAttribute('data-filter'))));
    render('all');
  });
})();
