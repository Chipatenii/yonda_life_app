
(function(){
  const price=window.yondaPrice;
  const esc=window.yondaEscape;

  function isMobileMoney(method){ return method==='mtn'||method==='airtel'; }

  function methodMessage(method){
    if(method==='paypal') return 'Order placed. You will be redirected to PayPal to complete payment.';
    if(method==='amex') return 'Order placed. You will be redirected to a secure American Express payment page.';
    if(method==='card') return 'Order placed. You will be redirected to a secure card payment page.';
    if(method==='airtel') return 'Order placed. Check your phone for the Airtel Money prompt to approve payment.';
    return 'Order placed. Check your phone for the MTN Mobile Money prompt to approve payment.';
  }

  function methodHint(method){
    if(isMobileMoney(method)) return 'You will receive a Mobile Money prompt to approve the payment on your phone.';
    if(method==='paypal') return 'You will be redirected to PayPal to complete your payment.';
    if(method==='amex') return 'You will be redirected to a secure American Express card page.';
    return 'You will be redirected to a secure card page.';
  }

  function renderSummary(){
    const el=document.getElementById('co-summary');
    if(!el) return { total:0, count:0 };
    const list=window.yondaCart.load(); let total=0; const lines=[];
    list.forEach(i=>{
      const p=window.yondaFindProduct(i.id)||{title:'Unknown item', price:0};
      const line=p.price*i.qty; total+=line;
      lines.push(`<div class="summary-line"><span>${esc(p.title)} × ${i.qty}</span><strong>${price(line)}</strong></div>`);
    });
    el.innerHTML = (lines.join('')||'<p>Your cart is empty.</p>')
      + `<hr><div class="summary-row"><span>Total</span><strong>${price(total)}</strong></div>`;
    window.yondaCart.updateBadge(list);
    return { total, count: window.yondaCart.count(list) };
  }

  function selectedMethod(){
    const checked=document.querySelector('input[name="co-method"]:checked');
    return checked ? checked.value : 'mtn';
  }

  function validate(){
    const errors=[];
    const name=document.getElementById('co-name');
    const email=document.getElementById('co-email');
    const phone=document.getElementById('co-phone');
    [name,email,phone].forEach(f=>f&&f.classList.remove('input-error'));

    if(!name||!name.value.trim()){ errors.push('Please enter your full name.'); name&&name.classList.add('input-error'); }
    if(!email||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())){ errors.push('Please enter a valid email address.'); email&&email.classList.add('input-error'); }

    const method=selectedMethod();
    if(isMobileMoney(method)){
      const digits=(phone&&phone.value||'').replace(/\D/g,'');
      if(digits.length<9){ errors.push('Enter the phone number registered for Mobile Money.'); phone&&phone.classList.add('input-error'); }
    }
    return errors;
  }

  function bind(){
    const hint=document.getElementById('method-hint');
    document.querySelectorAll('input[name="co-method"]').forEach(r=>r.addEventListener('change',()=>{
      if(hint) hint.textContent = methodHint(selectedMethod());
    }));

    const btn=document.getElementById('btn-place');
    const msg=document.getElementById('co-msg');
    if(!btn) return;

    // Surface validation errors in an accessible live region.
    let err=document.getElementById('co-error');
    if(!err){
      err=document.createElement('div');
      err.id='co-error';
      err.className='form-error';
      err.setAttribute('role','alert');
      err.style.display='none';
      btn.parentNode.insertBefore(err, btn);
    }

    btn.addEventListener('click',()=>{
      err.style.display='none'; err.innerHTML='';
      if(msg) msg.style.display='none';

      const cart=window.yondaCart.load();
      if(!cart.length){
        err.innerHTML='Your cart is empty. Add an item before placing an order.';
        err.style.display='block';
        return;
      }
      const errors=validate();
      if(errors.length){
        err.innerHTML=errors.map(e=>esc(e)).join('<br>');
        err.style.display='block';
        const firstInvalid=document.querySelector('.input-error');
        if(firstInvalid) firstInvalid.focus();
        return;
      }

      const method=selectedMethod();
      btn.disabled=true; btn.textContent='Processing…';
      setTimeout(()=>{
        window.yondaCart.clear();
        renderSummary();
        if(msg){ msg.textContent=methodMessage(method); msg.style.display='block'; }
        btn.textContent='Order Placed';
        // Leave button disabled after a successful, cleared order.
      }, 1000);
    });
  }

  document.addEventListener('DOMContentLoaded',()=>{ renderSummary(); bind(); });
})();
