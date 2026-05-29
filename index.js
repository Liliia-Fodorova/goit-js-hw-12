import{a as L,S as b,i as c}from"./assets/vendor-oeUMx5o4.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&a(i)}).observe(document,{childList:!0,subtree:!0});function r(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(e){if(e.ep)return;e.ep=!0;const o=r(e);fetch(e.href,o)}})();const w="https://pixabay.com/api/",S="54644062-931f8757c3983fa8d6dda8238",P=15;async function q(t,s){return(await L.get(w,{params:{key:S,q:t,image_type:"photo",orientation:"horizontal",safesearch:!0,page:s,per_page:P}})).data}const p=document.querySelector(".gallery"),m=document.querySelector(".loader"),y=document.querySelector(".load-more"),E=new b(".gallery a",{captionsData:"alt",captionDelay:250});function $(t){const s=t.map(({webformatURL:r,largeImageURL:a,tags:e,likes:o,views:i,comments:h,downloads:v})=>`
      <li class="gallery-item">
        <a href="${a}">
          <img src="${r}" alt="${e}" />
        </a>
       <div class="info">
        <div class="info-item">
         <p class="info-title">Likes</p>
         <p class="info-value">${o}</p>
        </div>
        <div class="info-item">
         <p class="info-title">Views</p>
         <p class="info-value">${i}</p>
        </div>
        <div class="info-item">
          <p class="info-title">Comments</p>
          <p class="info-value">${h}</p>
        </div>
        <div class="info-item">
         <p class="info-title">Downloads</p>
         <p class="info-value">${v}</p>
        </div>
       </div>
      </li>
    `).join("");p.insertAdjacentHTML("beforeend",s),E.refresh()}function B(){p.innerHTML=""}function M(){m.classList.add("is-visible")}function R(){m.classList.remove("is-visible")}function A(){y.classList.add("is-visible")}function l(){y.classList.remove("is-visible")}const u=document.querySelector(".form"),O=document.querySelector(".load-more");let d="",n=1,f=0;const _=15;u.addEventListener("submit",async t=>{t.preventDefault(),d=t.target.elements["search-text"].value.trim(),d&&(n=1,B(),l(),await g(),u.reset())});O.addEventListener("click",async()=>{n+=1,await g(),x()});async function g(){try{M(),l();const t=await q(d,n);if(t.hits.length===0){c.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});return}$(t.hits),f=t.totalHits;const s=Math.ceil(f/_);n>=s?(l(),c.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"})):A()}catch{c.error({message:"Something went wrong. Please try again later.",position:"topRight"})}finally{R()}}function x(){const t=document.querySelector(".gallery-item");if(!t)return;const{height:s}=t.getBoundingClientRect();window.scrollBy({top:s*2,behavior:"smooth"})}
//# sourceMappingURL=index.js.map
