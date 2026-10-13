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
form.addEventListener("submit",e=>{e.preventDefault();const value=input.value.trim();if(!value)return;msg(value,"user");input.value="";if(i<flow.length){const q=flow[i].q;i++;setTimeout(()=>msg(q,"bot"),350)}if(i===flow.length){setTimeout(()=>{const d=document.createElement("div");d.className="live-msg bot";d.innerHTML='¿Quieres verlo aplicado a tu negocio real? <a href="#qualification" style="color:#5f4fbd;font-weight:800">Pide tu demo a medida →</a>';chat.appendChild(d);chat.scrollTop=chat.scrollHeight;input.disabled=true;form.querySelector("button").disabled=true},900)}});})();
;(()=>{const form=document.getElementById("qualificationForm"),result=document.getElementById("qualificationResult");if(!form||!result)return;
const WA="5491162027121";
// Embudo corto: nadie queda descartado; todo termina en una conversación por WhatsApp.
form.addEventListener("submit",e=>{e.preventDefault();const fd=new FormData(form);const v=k=>String(fd.get(k)||"").trim();
const text="Hola Alby, vengo de la web de ALBYNE.\n\nMi negocio: "+v("company")+" ("+v("rubro")+").\nMis clientes me escriben más por: "+v("channel")+".\nMe gustaría resolver: "+v("pain")+".\n\n¿Me muestras cómo funcionaría un Empleado Digital en mi negocio?";
const wa="https://wa.me/"+WA+"?text="+encodeURIComponent(text);
const mail="mailto:albycruzbrizuela@gmail.com?subject="+encodeURIComponent("Demo a medida para "+v("company"))+"&body="+encodeURIComponent(text);
const opened=window.open(wa,"_blank","noopener");
const r=document.createElement("div");
r.innerHTML='<h3></h3><p>Te preparo una demo pensada para tu negocio. Si WhatsApp no se abrió, toca el botón.</p><div style="display:flex;gap:12px;flex-wrap:wrap;align-items:center"><a class="pill" target="_blank" rel="noopener">Enviar por WhatsApp →</a><a style="font-weight:800;color:#5f4fbd;background:none;margin-top:12px">Prefiero por email</a></div>';
r.querySelector("h3").textContent=opened?"¡Listo! Ya se abrió WhatsApp con tu mensaje.":"Tu mensaje está listo.";
const links=r.querySelectorAll("a");links[0].href=wa;links[1].href=mail;
result.replaceChildren(...r.childNodes);form.hidden=true;const alt=document.querySelector(".qualification-alt");if(alt)alt.hidden=true;result.hidden=false;
result.scrollIntoView({behavior:"smooth",block:"center"});});})();
