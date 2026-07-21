
(function(){
  const price=window.yondaPrice;
  const esc=window.yondaEscape;

  function card(p){
    const el=document.createElement('div'); el.className='card';
    el.innerHTML=`<div class="card-tag">${esc(p.format||p.type)}</div>
      <h3 class="card-title">${esc(p.title)}</h3>
      <p class="card-body">Price: <strong>${price(p.price)}</strong></p>
      <div class="card-body"><button class="btn btn-primary" data-add="${esc(p.id)}">Add to Cart</button></div>`;
    return el;
  }
  function flash(btn){
    const original=btn.textContent;
    btn.textContent='Added ✓';
    btn.classList.add('btn-added');
    btn.disabled=true;
    setTimeout(()=>{ btn.textContent=original; btn.classList.remove('btn-added'); btn.disabled=false; }, 1200);
  }
  function render(filter='all'){
    const g=document.getElementById('product-grid'); if(!g) return; g.innerHTML='';
    const items=(window.YONDA_PRODUCTS||[]).filter(p=>filter==='all'||p.type===filter);
    if(!items.length){
      g.innerHTML='<p class="card-body">No products in this category yet.</p>';
      return;
    }
    items.forEach(p=>g.appendChild(card(p)));
    g.querySelectorAll('[data-add]').forEach(btn=>btn.addEventListener('click',()=>{
      window.yondaCart.add(btn.getAttribute('data-add'));
      flash(btn);
    }));
  }
  function setActive(buttons, active){
    buttons.forEach(b=>b.setAttribute('aria-pressed', b===active?'true':'false'));
  }
  document.addEventListener('DOMContentLoaded',()=>{
    const buttons=Array.from(document.querySelectorAll('[data-filter]'));
    buttons.forEach(b=>b.addEventListener('click',()=>{
      setActive(buttons, b);
      render(b.getAttribute('data-filter'));
    }));
    const initial=buttons.find(b=>b.getAttribute('data-filter')==='all')||buttons[0];
    if(initial) setActive(buttons, initial);
    render('all');
  });
})();
