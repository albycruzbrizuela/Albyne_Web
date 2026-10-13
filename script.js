(()=>{const p=document.getElementById("playDemo"),r=document.getElementById("resetDemo"),b=[...document.querySelectorAll(".bubble[data-step]")],s=[...document.querySelectorAll(".circuit-step")],o=document.getElementById("demoResult"),c=document.getElementById("chatStream");let t=[],running=false;const clear=()=>{t.forEach(clearTimeout);t=[]};function step(n){s.forEach(e=>{let x=+e.dataset.step;e.classList.toggle("active",x===n);e.classList.toggle("done",x<n);e.classList.toggle("recorded",x<n)});b.filter(e=>+e.dataset.step===n).forEach((e,i)=>t.push(setTimeout(()=>{e.classList.add("visible");c.scrollTo({top:c.scrollHeight,behavior:"smooth"})},i*420)))}function reset(){clear();running=false;p.disabled=false;p.textContent="▶ Ver demo";b.forEach(e=>e.classList.remove("visible"));s.forEach(e=>e.classList.remove("active","done","recorded"));o.classList.remove("visible");c.scrollTo({top:0,behavior:"auto"})}function run(){if(running)return;reset();running=true;p.disabled=true;p.textContent="Demo en curso…";for(let n=1;n<=6;n++)t.push(setTimeout(()=>step(n),(n-1)*1800));t.push(setTimeout(()=>{s.forEach(e=>{e.classList.remove("active");e.classList.add("done","recorded")});o.classList.add("visible");running=false;p.disabled=false;p.textContent="▶ Ver de nuevo"},11000))}p.addEventListener("click",run);r.addEventListener("click",reset)})();
;(()=>{const panel=document.getElementById("albyneAssistant"),launcher=document.getElementById("albyneLauncher"),close=document.getElementById("closeAlbyne"),form=document.getElementById("albyneForm"),input=document.getElementById("albyneInput"),chat=document.getElementById("albyneLiveChat");if(!panel)return;
const flow=[
 {q:"Gracias. ¿Qué tipo de negocio tienes?"},
 {q:"¿Cómo resuelves hoy esa parte del proceso?"},
 {q:"¿Qué te gustaría que haga un Empleado Digital ahí? Por ejemplo: responder preguntas, ordenar a los interesados, tomar pedidos, hacer seguimiento o quitarte trabajo repetitivo."},
 {q:"¿En qué momento debería intervenir una persona de tu equipo?"},
 {q:"Muy bien: ese es el recorrido del cliente que mapeamos antes de proponer una implementación."}
];let i=0;
function toggle(show){panel.classList.toggle("open",show);panel.setAttribute("aria-hidden",String(!show));if(show)setTimeout(()=>input.focus(),150)}
function msg(text,who){const d=document.createElement("div");d.className="live-msg "+who;d.textContent=text;chat.appendChild(d);chat.scrollTop=chat.scrollHeight}
launcher&&launcher.addEventListener("click",()=>toggle(true));close.addEventListener("click",()=>toggle(false));
form.addEventListener("submit",e=>{e.preventDefault();const value=input.value.trim();if(!value)return;msg(value,"user");input.value="";if(i<flow.length){const q=flow[i].q;i++;setTimeout(()=>msg(q,"bot"),350)}if(i===flow.length){setTimeout(()=>{const d=document.createElement("div");d.className="live-msg bot";d.innerHTML='¿Quieres verlo aplicado a tu negocio real? <a href="https://www.linkedin.com/in/albinacb/" target="_blank" rel="noopener" style="color:#5f4fbd;font-weight:800">Pídele a Alby una demo a medida →</a>';chat.appendChild(d);chat.scrollTop=chat.scrollHeight;input.disabled=true;form.querySelector("button").disabled=true},900)}});})();
;(()=>{const form=document.getElementById("qualificationForm"),result=document.getElementById("qualificationResult");if(!form||!result)return;
form.addEventListener("submit",e=>{e.preventDefault();const fd=new FormData(form);const volume=fd.get("volume"),budget=fd.get("budget"),timing=fd.get("timing");const highVolume=["200–500","500–1.000","Más de 1.000"].includes(volume);const budgetFit=["1500-3000","3000plus"].includes(budget);const midBudget=budget==="500-1500";const urgent=["Este mes","En 1 a 3 meses"].includes(timing);const strong=budgetFit&&(highVolume||urgent);const possible=midBudget||highVolume;
const budgetSelect=form.querySelector('select[name="budget"]');const budgetLabel=budgetSelect.options[budgetSelect.selectedIndex].text;const summary=[
"Negocio: "+fd.get("company"),
"Nombre: "+fd.get("name"),
"Email: "+fd.get("email"),
"Personas en el equipo: "+fd.get("teamSize"),
"Consultas por mes: "+fd.get("volume"),
"Canal principal: "+fd.get("channel"),
"Principal problema: "+fd.get("pain"),
"Inversión pensada: "+budgetLabel,
"Plazo: "+fd.get("timing")
].join("\n");
const mailto="mailto:albycruzbrizuela@gmail.com?subject="+encodeURIComponent("ALBYNE — Pedido de demo a medida de "+fd.get("company"))+"&body="+encodeURIComponent("Hola Alby:\n\nCompleté el diagnóstico de 60 segundos en ALBYNE.\n\n"+summary+"\n\nMe gustaría conversar sobre cómo sería un Empleado Digital para mi negocio.");
const contactButtons='<div style="display:flex;gap:12px;flex-wrap:wrap;justify-content:center"><a class="pill" href="'+mailto+'">Enviarle mis respuestas a Alby →</a><a href="https://www.linkedin.com/in/albinacb/" target="_blank" rel="noopener" style="align-self:center;font-weight:800;color:#5f4fbd">LinkedIn ↗</a></div><p style="margin-top:14px;font-size:.9rem">Contacto directo: <a href="mailto:albycruzbrizuela@gmail.com">albycruzbrizuela@gmail.com</a></p>';
form.hidden=true;result.hidden=false;
if(strong){result.innerHTML='<h3>Tu caso encaja muy bien para una demo a medida.</h3><p>Por el volumen, la urgencia o la inversión que indicaste, vale la pena una conversación concreta.</p>'+contactButtons;}
else if(possible){result.innerHTML='<h3>Puede haber una primera etapa útil.</h3><p>Tu caso podría empezar con una versión más acotada o una conversación de diagnóstico antes de una implementación completa.</p>'+contactButtons;}
else{result.innerHTML='<h3>Quizás todavía no sea el momento de una implementación completa.</h3><p>Con el volumen, el plazo o la inversión actuales, un Empleado Digital completo puede ser prematuro. Igual puedes escribirle a Alby y retomar cuando la necesidad sea más concreta.</p>'+contactButtons;}
result.scrollIntoView({behavior:"smooth",block:"center"});});})();