// ---- Content: edit or add items here ----
const skills=[
 {t:"Languages",s:["Java","Python","C","C++"]},
 {t:"Core CS",s:["Data Structures","Algorithms","OOP","DBMS","SQL"]},
 {t:"Data & ML",s:["Pandas","NumPy","Scikit-learn","Matplotlib"]},
 {t:"Workflow",s:["Git","GitHub","VS Code"]}
];
const projects=[
 {t:"Smart Expense Tracker",d:"A Python-based expense tracking application with a GUI, SQLite database, expense management, validation, reports, and CSV export.",tech:["Python","Tkinter","SQLite"],links:[["GitHub","https://github.com/AnkushChandra31/Smart-Expense-Tracker"]]},
{t:"College Placement System",d:"A Python-based college placement project focused on handling placement-related information and workflows.",tech:["Python"],links:[["GitHub","https://github.com/AnkushChandra31/CollegePlacementSystem"]]},
 {t:"Crop Recommendation ML Project",d:"A machine learning project that uses agricultural data to recommend suitable crops based on input parameters.",tech:["Python","Pandas","NumPy","Scikit-learn","Machine Learning"],links:[["GitHub","https://github.com/AnkushChandra31/SmartCropRecommendationSystem"]]}
];
const dsa=[["Arrays","🔢"],["Strings","🔤"],["Stack","📚"],["Queue","🚶"],["Linked List","🔗"],["Searching","🔍"],["Sorting","↕️"],["Problem Solving","🧠"]];

const $=s=>document.querySelector(s);
$("#skillGrid").innerHTML=skills.map((g,i)=>`<article class="capability"><span class="capability-number">0${i+1}</span><h3>${g.t}</h3><div class="chips">${g.s.map(x=>`<span class="chip">${x}</span>`).join("")}</div></article>`).join("");
$("#projGrid").innerHTML=projects.map((p,i)=>`<article class="project"><span class="project-index">0${i+1}</span><h3>${p.t}</h3><p>${p.d}</p>${p.links.map(l=>`<a class="project-link" aria-label="View ${p.t} on ${l[0]}" href="${l[1]}" target="_blank" rel="noopener">↗</a>`).join("")}</article>`).join("");
$("#dsaGrid").innerHTML=dsa.map(d=>`<span class="topic">${d[0]}</span>`).join("");

// LeetCode progress: update solved/streak here whenever you practice.
// "Days since I started" counts up automatically every day from START.
const LC={solved:40,streak:2,start:"2026-10-01"};
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
