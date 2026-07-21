
document.addEventListener('DOMContentLoaded',()=>{
  const btn=document.querySelector('.nav-toggle');
  const menu=document.getElementById('site-menu');
  if(!btn||!menu) return;
  const set=(open)=>{
    document.body.classList.toggle('nav-open', open);
    btn.setAttribute('aria-expanded', open?'true':'false');
  };
  btn.addEventListener('click',()=> set(!document.body.classList.contains('nav-open')) );
  // Close on nav link click (mobile)
  menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=> set(false)));
  // Close on ESC
  document.addEventListener('keydown',e=>{ if(e.key==='Escape') set(false); });
});
