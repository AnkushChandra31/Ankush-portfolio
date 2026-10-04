// ---- Content: edit or add items here ----
const skills=[
 {t:"Programming",i:"⌨️",s:["Java","C","C++","Python"]},
 {t:"Computer Science",i:"🧩",s:["Data Structures & Algorithms","Object-Oriented Programming","DBMS","SQL"]},
 {t:"Machine Learning",i:"📈",s:["Python","Pandas","NumPy","Matplotlib","Scikit-learn","Linear Regression","Classification"]},
 {t:"Tools",i:"🛠️",s:["Git","GitHub","VS Code"]}
];
const projects=[
 {t:"Smart Expense Tracker",d:"A Python-based expense tracking application with a GUI, SQLite database, expense management, validation, reports, and CSV export.",tech:["Python","Tkinter","SQLite"],links:[["GitHub","https://github.com/AnkushChandra31/Smart-Expense-Tracker"]]},
 {t:"College Placement System",d:"A Python-based college placement project focused on handling placement-related information and workflows.",tech:["Python"],links:[]},
 {t:"Crop Recommendation ML Project",d:"A machine learning project that uses agricultural data to recommend suitable crops based on input parameters.",tech:["Python","Pandas","NumPy","Scikit-learn","Machine Learning"],links:[]}
];
const dsa=[["Arrays","🔢"],["Strings","🔤"],["Stack","📚"],["Queue","🚶"],["Linked List","🔗"],["Searching","🔍"],["Sorting","↕️"],["Problem Solving","🧠"]];

const $=s=>document.querySelector(s);
$("#skillGrid").innerHTML=skills.map(g=>`<article class="card skill"><h3><span class="ico" aria-hidden="true">${g.i}</span>${g.t}</h3><div class="chips">${g.s.map(x=>`<span class="chip">${x}</span>`).join("")}</div></article>`).join("");
$("#projGrid").innerHTML=projects.map(p=>`<article class="card proj"><h3>${p.t}</h3><p>${p.d}</p><div class="chips">${p.tech.map(x=>`<span class="chip">${x}</span>`).join("")}</div><div class="row">${p.links.length?"":`<span class="chip">In development</span>`}${p.links.map((l,i)=>`<a class="btn sm${i?"":" primary"}" href="${l[1]}" target="_blank" rel="noopener">${l[0]}</a>`).join("")}</div></article>`).join("");
$("#dsaGrid").innerHTML=dsa.map(d=>`<div class="card dsa"><span class="ico" aria-hidden="true">${d[1]}</span><b style="margin-top:.7rem">${d[0]}</b><small>Practicing in Java</small></div>`).join("");

// LeetCode progress: update solved/streak here whenever you practice.
// "Days since I started" counts up automatically every day from START.
const LC={solved:6,streak:6,start:"2026-10-01"};
const days=Math.max(1,Math.floor((Date.now()-new Date(LC.start+"T00:00:00"))/864e5)+1);
const target={"st-solved":LC.solved,"st-streak":LC.streak,"st-days":days};
const countUp=()=>Object.entries(target).forEach(([id,n])=>{const el=$("#"+id);let i=0;const t=setInterval(()=>{el.textContent=i;if(i>=n)clearInterval(t);i++},n?Math.min(120,700/n):0)});
new IntersectionObserver((es,o)=>{if(es[0].isIntersecting){countUp();o.disconnect()}}).observe($(".stats"));

// Mobile menu
const burger=$(".burger"),menu=$("#menu");
const setMenu=o=>{menu.classList.toggle("open",o);burger.setAttribute("aria-expanded",o)};
burger.onclick=()=>setMenu(!menu.classList.contains("open"));
menu.addEventListener("click",e=>{if(e.target.tagName==="A")setMenu(false)});
document.addEventListener("keydown",e=>{if(e.key==="Escape")setMenu(false)});

// Scroll fade-in + active link
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target)}}),{threshold:.12});
document.querySelectorAll(".fade").forEach(el=>io.observe(el));
const links=[...document.querySelectorAll(".links a")];
const spy=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)links.forEach(a=>a.classList.toggle("on",a.getAttribute("href")==="#"+e.target.id))}),{rootMargin:"-45% 0px -50% 0px"});
document.querySelectorAll("main section").forEach(s=>spy.observe(s));

// Contact form: validate and open the user's email client.
$("#form").addEventListener("submit",e=>{
 e.preventDefault();
 const f=[["name",v=>v.trim().length>=2,"Enter your name."],["email",v=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),"Enter a valid email address."],["msg",v=>v.trim().length>=10,"Write at least 10 characters."]];
 let ok=true;
 f.forEach(([id,test,m])=>{const el=$("#"+id),bad=!test(el.value);el.setAttribute("aria-invalid",bad);$("#e-"+id).textContent=bad?m:"";if(bad&&ok){el.focus();ok=false}});
 if(!ok){$("#status").textContent="";return;}
 const name=$("#name").value.trim();
 const email=$("#email").value.trim();
 const message=$("#msg").value.trim();
 const subject=encodeURIComponent(`Portfolio contact from ${name}`);
 const body=encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
 $("#status").textContent="Opening your email app…";
 window.location.href=`mailto:chandraankush31@gmail.com?subject=${subject}&body=${body}`;
});
