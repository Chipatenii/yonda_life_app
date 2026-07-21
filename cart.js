
(function(){
  function price(n){return 'K'+Number(n).toFixed(2)}
  function load(){return JSON.parse(localStorage.getItem('yonda_cart')||'[]')}
  function save(c){localStorage.setItem('yonda_cart',JSON.stringify(c))}
  function remove(id){const c=load().filter(i=>i.id!==id); save(c); render()}
  function setQty(id,qty){const c=load(); const it=c.find(i=>i.id===id); if(it){it.qty=Math.max(1,qty)} save(c); render()}
  function render(){
    const wrap=document.getElementById('cart-items'); const sum=document.getElementById('cart-summary');
    const cart=load(); const rows=[]; let total=0;
    cart.forEach(i=>{ const p=window.yondaFindProduct(i.id)||{title:'Unknown',price:0}; const line=p.price*i.qty; total+=line;
      rows.push(`<div class="card" style="padding:12px;margin-bottom:8px">
        <strong>${p.title}</strong><br>
        <small>${price(p.price)} × </small>
        <input type="number" min="1" value="${i.qty}" data-qty="${i.id}" style="width:70px;margin:0 6px"> 
        <small>= <strong>${price(line)}</strong></small>
        <button class="btn btn-outline" data-del="${i.id}" style="float:right">Remove</button>
      </div>`)
    });
    wrap.innerHTML = rows.join('') || '<p class="card-body">Your cart is empty.</p>';
    sum.innerHTML = `<div style="display:flex; justify-content:space-between"><span>Subtotal</span><strong>${price(total)}</strong></div>`;
    wrap.querySelectorAll('[data-del]').forEach(b=>b.addEventListener('click',()=>remove(b.getAttribute('data-del'))));
    wrap.querySelectorAll('[data-qty]').forEach(inp=>inp.addEventListener('change',()=>setQty(inp.getAttribute('data-qty'), Number(inp.value||1))));
    const badge=document.getElementById('cart-count');
    if(badge) badge.textContent = String(cart.reduce((a,b)=>a+(b.qty||1),0));
  }
  document.addEventListener('DOMContentLoaded',render);
  document.addEventListener('DOMContentLoaded',()=>{
    const btn=document.getElementById('btn-clear'); if(btn) btn.addEventListener('click',()=>{localStorage.removeItem('yonda_cart'); location.reload()});
  });
})();
