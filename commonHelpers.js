import{a as w,S as E,i}from"./assets/vendor-6e0bf343.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))l(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&l(n)}).observe(document,{childList:!0,subtree:!0});function s(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function l(t){if(t.ep)return;t.ep=!0;const r=s(t);fetch(t.href,r)}})();const L="https://pixabay.com/api/",b="43059810-21766dfeafea29ca9c24ae0e2";async function f(e="",o=1){try{return(await w.get(L,{params:{key:b,q:e,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:15,page:o}})).data}catch(s){throw new Error(s.response.status)}}function y(e){return e.map(({webformatURL:o,largeImageURL:s,tags:l,likes:t,views:r,comments:n,downloads:v})=>`
        <li class="pictureCard">
          <a href="${s}" class="lightbox-image">
            <img src="${o}" alt="${l}" class="picture-icon">
          </a>
          <div class="picture-info">
            <div>
              <span>Likes:</span>
              <span class="likes">${t}</span>
            </div>
            <div>
              <span>Views:</span>
              <span class="views">${r}</span>
            </div>
            <div>
              <span>Comments:</span>
              <span class="comments">${n}</span>
            </div>
            <div>
              <span>Downloads:</span>
              <span class="downloads">${v}</span>
            </div>
          </div>
        </li>`).join("")}const m=document.getElementById("search-form"),u=document.getElementById("list"),a=document.getElementById("load-button"),p=document.querySelector(".loader"),g=new E(".pictureCard a",{captionType:"attr",captionsData:"alt",captionDelay:250});let c=1,d="";m.addEventListener("submit",B);a.addEventListener("click",e=>{e.preventDefault(),S()});function P(){u.innerHTML=""}a.style.display="none";async function B(e){e.preventDefault();const{picture:o}=e.currentTarget.elements;d=o.value,p.style.display="block",P();try{const s=await f(d,c);s.hits.length===0?(a.style.display="none",i.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!"})):(u.innerHTML=y(s.hits),h(s.totalHits),g.refresh())}catch(s){console.error("Error:",s),i.error({title:"Error",message:"An error occurred while fetching images. Please try again later!"})}finally{p.style.display="none",m.reset()}}async function S(){c+=1;try{const e=await f(d,c);if(e.hits.length>0){u.insertAdjacentHTML("beforeend",y(e.hits)),h(e.totalHits);const o=document.querySelector(".pictureCard").getBoundingClientRect().height;window.scrollBy({top:o*3,behavior:"smooth"}),g.refresh()}else i.info({title:"Info",message:"No more images to load!"});c*15>=e.totalHits&&(a.style.display="none",i.info({title:"End of search results",message:"We're sorry, but you're nearing the end of the search results."}))}catch(e){console.error("Error:",e),i.error({title:"Error",message:"An error occurred while fetching more images. Please try again later!"})}}function h(e){c*15<e?a.style.display="block":a.style.display="none"}
//# sourceMappingURL=commonHelpers.js.map
