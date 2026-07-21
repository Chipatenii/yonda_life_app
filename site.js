
document.addEventListener('DOMContentLoaded',()=>{
  const badge=document.getElementById('cart-count');
  const items=JSON.parse(localStorage.getItem('yonda_cart')||'[]');
  if(badge) badge.textContent=String(items.reduce((a,b)=>a+(b.qty||1),0));
});
