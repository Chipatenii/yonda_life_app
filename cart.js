
(function(){
  const price=window.yondaPrice;
  const esc=window.yondaEscape;

  function render(){
    const wrap=document.getElementById('cart-items');
    const sum=document.getElementById('cart-summary');
    if(!wrap||!sum) return;
    const cart=window.yondaCart.load(); const rows=[]; let total=0;
    cart.forEach(i=>{
      const p=window.yondaFindProduct(i.id)||{title:'Unknown item', price:0};
      const line=p.price*i.qty; total+=line;
      rows.push(`<div class="card cart-row">
        <strong>${esc(p.title)}</strong><br>
        <small>${price(p.price)} × </small>
        <label class="sr-only" for="qty-${esc(i.id)}">Quantity for ${esc(p.title)}</label>
        <input type="number" min="1" step="1" id="qty-${esc(i.id)}" value="${i.qty}" data-qty="${esc(i.id)}" class="qty-input">
        <small>= <strong>${price(line)}</strong></small>
        <button class="btn btn-outline cart-remove" data-del="${esc(i.id)}">Remove</button>
      </div>`);
    });
    wrap.innerHTML = rows.join('') || '<p class="card-body">Your cart is empty.</p>';
    sum.innerHTML = `<div class="summary-row"><span>Subtotal</span><strong>${price(total)}</strong></div>`;
    wrap.querySelectorAll('[data-del]').forEach(b=>b.addEventListener('click',()=>remove(b.getAttribute('data-del'))));
    wrap.querySelectorAll('[data-qty]').forEach(inp=>inp.addEventListener('change',()=>setQty(inp.getAttribute('data-qty'), parseInt(inp.value,10))));
    window.yondaCart.updateBadge(cart);
  }
  function remove(id){
    const c=window.yondaCart.load().filter(i=>i.id!==id);
    window.yondaCart.save(c); render();
  }
  function setQty(id, qty){
    const c=window.yondaCart.load();
    const it=c.find(i=>i.id===id);
    if(it){ it.qty=Math.max(1, parseInt(qty,10)||1); }
    window.yondaCart.save(c); render();
  }
  document.addEventListener('DOMContentLoaded',()=>{
    render();
    const btn=document.getElementById('btn-clear');
    if(btn) btn.addEventListener('click',()=>{ window.yondaCart.clear(); render(); });
  });
})();
