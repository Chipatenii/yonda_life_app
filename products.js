
window.YONDA_PRODUCTS=[
  // Courses
  {id:'c1', type:'course', format:'Course', title:'Sustainable Weight Loss 101', price:599.00,
   blurb:'Build lasting habits around food and movement, with no crash diets and no guilt.'},
  {id:'c2', type:'course', format:'Course', title:'Productivity & Mental Wellness Mastery', price:549.00,
   blurb:'Focus, energy, and calm: a practical system for a fuller, less frantic week.'},
  {id:'c3', type:'course', format:'Course', title:'Financial Freedom Foundations', price:649.00,
   blurb:'Budgeting, saving, and growing money with confidence, one clear step at a time.'},
  {id:'c4', type:'course', format:'Course', title:'The 30-Day Habit Reset', price:499.00,
   blurb:'A guided month to rebuild your routines and make good habits stick for good.'},

  // eBooks
  {id:'e1', type:'ebook', format:'eBook', title:'Healing Your Mind for a Healthier Body', price:129.00,
   blurb:'How mindset shapes wellbeing, and the gentle tools to shift it.'},
  {id:'e2', type:'ebook', format:'eBook', title:'Mindful Eating & Lifestyle Habits', price:99.00,
   blurb:'Slow down, listen to your body, and rebuild your relationship with food.'},
  {id:'e3', type:'ebook', format:'eBook', title:'The Calm Morning Blueprint', price:89.00,
   blurb:'A simple, repeatable morning routine to start every day grounded.'},
  {id:'e4', type:'ebook', format:'eBook', title:'Money Mindset Journal', price:79.00,
   blurb:'Prompts and exercises to unlearn money stress and build a healthier outlook.'},

  // Paperbacks
  {id:'b1', type:'book', format:'Paperback', title:'Financial Growth Basics', price:199.00,
   blurb:'Plain-language foundations for saving, investing, and long-term security.'},
  {id:'b2', type:'book', format:'Paperback', title:'The Yonda Wellness Handbook', price:249.00,
   blurb:'Your all-in-one companion for mind, body, money, and habits.'},
  {id:'b3', type:'book', format:'Paperback', title:'Roots & Routines', price:179.00,
   blurb:'Stories and rituals for building a life that feels steady and your own.'}
];
window.yondaFindProduct=(id)=>window.YONDA_PRODUCTS.find(p=>p.id===id)||null;
