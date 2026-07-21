
window.YONDA_PRODUCTS=[
  {id:'c1', type:'course', format:'Course', title:'Sustainable Weight Loss 101', price:599.00},
  {id:'c2', type:'course', format:'Course', title:'Productivity & Mental Wellness Mastery', price:549.00},
  {id:'e1', type:'ebook',  format:'eBook', title:'Healing Your Mind for a Healthier Body', price:129.00},
  {id:'e2', type:'ebook',  format:'eBook', title:'Mindful Eating & Lifestyle Habits', price:99.00},
  {id:'b1', type:'book',   format:'Paperback', title:'Financial Growth Basics', price:199.00}
];
window.yondaFindProduct=(id)=>window.YONDA_PRODUCTS.find(p=>p.id===id)||null;
