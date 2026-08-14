const nav=document.getElementById("nav");
document.getElementById("hamburger")?.addEventListener("click",()=>nav.classList.toggle("open"));
document.querySelectorAll(".nav a").forEach(a=>a.addEventListener("click",()=>nav.classList.remove("open")));

const bookingModal=document.getElementById("bookingModal");
const infoModal=document.getElementById("infoModal");
const infoContent=document.getElementById("infoContent");
const toast=document.getElementById("toast");

function openModal(m){m.classList.add("open");m.setAttribute("aria-hidden","false");document.body.style.overflow="hidden"}
function closeModal(m){m.classList.remove("open");m.setAttribute("aria-hidden","true");document.body.style.overflow=""}

document.querySelectorAll("[data-open-booking]").forEach(b=>b.addEventListener("click",()=>openModal(bookingModal)));
document.querySelectorAll("[data-close]").forEach(b=>b.addEventListener("click",()=>{closeModal(bookingModal);closeModal(infoModal)}));
[bookingModal,infoModal].forEach(m=>m?.addEventListener("click",e=>{if(e.target===m)closeModal(m)}));
document.addEventListener("keydown",e=>{if(e.key==="Escape"){closeModal(bookingModal);closeModal(infoModal)}});

const hallInfo={
 "Asosiy zal":"1500 kishigacha mo‘ljallangan katta premium zal. Katta to‘ylar va tantanali marosimlar uchun mos.",
 "VIP zal":"500 kishigacha mo‘ljallangan nafis zal. Alohida va premium tadbirlar uchun qulay.",
 "Oila zali":"250 kishigacha mo‘ljallangan shinam zal. Oila davrasidagi marosimlar uchun mos.",
 "Kichik zal":"150 kishigacha mo‘ljallangan ixcham zal. Kichik tadbirlar va ziyofatlar uchun qulay."
};
document.querySelectorAll("[data-hall]").forEach(btn=>btn.addEventListener("click",()=>{
 const hall=btn.dataset.hall;
 infoContent.innerHTML=`<p class="eyebrow">ZAL HAQIDA</p><h2>${hall}</h2><p style="color:#b8b2a6;line-height:1.8">${hallInfo[hall]}</p><button class="btn btn-gold" id="hallBook">Shu zalni bron qilish</button>`;
 openModal(infoModal);
 document.getElementById("hallBook").onclick=()=>{closeModal(infoModal);openModal(bookingModal);document.querySelector('[name="hall"]').value=hall};
}));

document.getElementById("menuBtn")?.addEventListener("click",()=>{
 infoContent.innerHTML=`<p class="eyebrow">HAVAS PREMIUM</p><h2>Menyu</h2>
 <div style="display:grid;gap:14px;color:#ddd">
 <div><b style="color:#f1c65b">🥗 Salatlar</b><br>Milliy va zamonaviy salatlar</div>
 <div><b style="color:#f1c65b">🍲 Issiq taomlar</b><br>Osh, go‘shtli taomlar va maxsus taomlar</div>
 <div><b style="color:#f1c65b">🍰 Shirinliklar</b><br>Turli desert va shirinliklar</div>
 <div><b style="color:#f1c65b">🥤 Ichimliklar</b><br>Mehmonlar uchun turli ichimliklar</div></div>`;
 openModal(infoModal);
});

document.getElementById("galleryBtn")?.addEventListener("click",()=>{
 infoContent.innerHTML=`<p class="eyebrow">GALEREYA</p><h2>Havas Premium</h2><p style="color:#b8b2a6;line-height:1.8">Bu demo galereya. Haqiqiy to‘yxona rasmlarini assets papkasiga joylashtirib, shu blokka ulash mumkin.</p>`;
 openModal(infoModal);
});

document.getElementById("mapBtn")?.addEventListener("click",()=>{
 window.open("https://www.google.com/maps/search/?api=1&query=Buxoro+Havas+Premium","_blank");
});

document.getElementById("bookingForm")?.addEventListener("submit",async e=>{
 e.preventDefault();
 const form=e.target;
 const data=Object.fromEntries(new FormData(form).entries());
 if(!data.phone || data.phone.replace(/\D/g,"").length<7){showToast("Telefon raqamingizni tekshiring.");return}
 const button=form.querySelector("button[type=submit]");
 button.disabled=true; button.textContent="Yuborilmoqda...";
 try{
   const res=await fetch("/api/booking",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(data)});
   const out=await res.json();
   if(!res.ok) throw new Error(out.message||"Xatolik");
   closeModal(bookingModal); form.reset();
   showToast("Bron so‘rovi Telegram botga yuborildi!");
 }catch(err){
   showToast("Ulanish sozlanmagan yoki server ishlamayapti.");
 }finally{button.disabled=false;button.textContent="So‘rov yuborish"}
});

function showToast(text){toast.textContent=text;toast.classList.add("show");setTimeout(()=>toast.classList.remove("show"),3500)}
const sections=[...document.querySelectorAll("main section[id]")],links=[...document.querySelectorAll(".nav a")];
window.addEventListener("scroll",()=>{let current="home";sections.forEach(s=>{if(scrollY>=s.offsetTop-130)current=s.id});links.forEach(a=>a.classList.toggle("active",a.getAttribute("href")==="#"+current))});
