
(function(){
  function price(n){return 'K'+Number(n).toFixed(2)}
  function load(){return JSON.parse(localStorage.getItem('yonda_cart')||'[]')}
  function renderSummary(){
    const list=load(); let total=0; const lines=[];
    list.forEach(i=>{const p=window.yondaFindProduct(i.id)||{title:'Unknown',price:0}; const line=p.price*i.qty; total+=line;
      lines.push(`<div style="display:flex;justify-content:space-between;margin:6px 0"><span>${p.title} × ${i.qty}</span><strong>${price(line)}</strong></div>`);
    });
    document.getElementById('co-summary').innerHTML = (lines.join('')||'<p>No items.</p>')+`<hr><div style="display:flex;justify-content:space-between"><span>Total</span><strong>${price(total)}</strong></div>`;
    const badge=document.getElementById('cart-count');
    if(badge) badge.textContent = String(list.reduce((a,b)=>a+(b.qty||1),0));
  }
  function bind(){
    const hint=document.getElementById('method-hint');
    document.querySelectorAll('input[name="co-method"]').forEach(r=>r.addEventListener('change',()=>{
      const v=document.querySelector('input[name="co-method"]:checked').value;
      hint.textContent = v==='card' ? 'You will be redirected to a secure card page.' : 'You will receive a Mobile Money prompt to approve the payment on your phone.';
    }));
    const btn=document.getElementById('btn-place');
    btn.addEventListener('click',()=>{
      btn.disabled=true; btn.textContent='Processing…';
      setTimeout(()=>{ document.getElementById('co-msg').style.display='block'; btn.disabled=false; btn.textContent='Place Order'; }, 1000);
    });
  }
  document.addEventListener('DOMContentLoaded',()=>{renderSummary(); bind()});
})();
