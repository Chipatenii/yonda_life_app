
// Shared Yonda helpers: safe cart storage + HTML escaping.
// Loaded on every page (after products.js, before page-specific scripts).
(function(){
  const KEY='yonda_cart';

  function load(){
    try{
      const data=JSON.parse(localStorage.getItem(KEY)||'[]');
      if(!Array.isArray(data)) return [];
      // Keep only well-formed { id, qty } entries.
      return data
        .filter(i=>i&&typeof i.id==='string')
        .map(i=>({id:i.id, qty:Math.max(1, parseInt(i.qty,10)||1)}));
    }catch(e){
      return [];
    }
  }
  function save(cart){
    try{ localStorage.setItem(KEY, JSON.stringify(cart)); }catch(e){}
  }
  function count(cart){
    return (cart||load()).reduce((a,b)=>a+(b.qty||1),0);
  }
  function updateBadge(cart){
    const badge=document.getElementById('cart-count');
    if(badge) badge.textContent=String(count(cart));
  }
  function add(id){
    const cart=load();
    const existing=cart.find(i=>i.id===id);
    if(existing){ existing.qty+=1; } else { cart.push({id, qty:1}); }
    save(cart);
    updateBadge(cart);
    return cart;
  }
  function clear(){
    try{ localStorage.removeItem(KEY); }catch(e){}
    updateBadge([]);
  }
  function escapeHtml(str){
    return String(str).replace(/[&<>"']/g, c=>({
      '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
    }[c]));
  }
  function price(n){ return 'K'+Number(n||0).toFixed(2); }

  window.yondaCart={load, save, count, updateBadge, add, clear};
  window.yondaEscape=escapeHtml;
  window.yondaPrice=price;

  document.addEventListener('DOMContentLoaded',()=>updateBadge());
})();
