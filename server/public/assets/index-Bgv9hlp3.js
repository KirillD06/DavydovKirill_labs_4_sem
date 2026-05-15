(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))a(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const n of i.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&a(n)}).observe(document,{childList:!0,subtree:!0});function e(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function a(s){if(s.ep)return;s.ep=!0;const i=e(s);fetch(s.href,i)}})();class l{constructor(t){this.parent=t}getHTML(t){return`
      <article class="catalog-card">
        <img src="${t.src}" alt="${t.title}" class="catalog-card-image" loading="lazy">
        <div class="catalog-card-body">
          <h3 class="catalog-card-title">${t.title}</h3>
          <p class="catalog-card-meta">${t.year} · ${t.route}</p>
          <p class="catalog-card-text">${t.text}</p>
          <button class="primary-btn" id="open-item-${t.id}" data-id="${t.id}">Подробнее</button>
        </div>
      </article>
    `}addListeners(t,e){document.getElementById(`open-item-${t.id}`).addEventListener("click",e)}render(t,e){this.parent.insertAdjacentHTML("beforeend",this.getHTML(t)),this.addListeners(t,e)}}class h{constructor(){this.basePath="/api/discoveries"}async request(t,e={}){const a=await fetch(t,e);if(a.status===204)return null;const s=await a.text();let i=null;if(s)try{i=JSON.parse(s)}catch{i={error:s}}if(!a.ok){const n=(i==null?void 0:i.error)||"Ошибка запроса к API";throw new Error(n)}return i}getListUrl(t){const e=new URL(this.basePath,window.location.origin);return t&&e.searchParams.set("title",t),`${e.pathname}${e.search}`}async getDiscoveries(t){const e=this.getListUrl(t);return this.request(e)}async getDiscoveryById(t){return this.request(`${this.basePath}/${t}`)}async deleteDiscoveryById(t){return this.request(`${this.basePath}/${t}`,{method:"DELETE"})}}const o=new h;class u{constructor(t,e){this.parent=t,this.onOpenItem=e,this.cardsPerPage=2,this.currentPage=0,this.searchValue="",this.limitValue=0,this.items=[]}get listRoot(){return document.getElementById("catalog-list")}get dotsRoot(){return document.getElementById("catalog-dots")}get stateRoot(){return document.getElementById("catalog-state")}getHTML(){return`
      <header class="topbar">
        <a class="brand" href="#" aria-label="Главная">Эпоха географических открытий</a>
      </header>

      <main class="layout">
        <section class="panel">
          <h1>Каталог экспедиций</h1>
          <p class="subtitle">ЛР 6: загрузка карточек с сервера через fetch</p>

          <div class="controls">
            <label class="field">
              <span>Фильтр по названию</span>
              <input id="search-title-input" type="text" placeholder="Например: Магеллан">
            </label>

            <button id="search-title-button" class="primary-btn">Найти</button>

            <label class="field field-small">
              <span>Лимит карточек</span>
              <input id="limit-input" type="number" min="1" placeholder="Без лимита">
            </label>

            <button id="limit-apply-button" class="secondary-btn">Применить лимит</button>
            <button id="reset-button" class="secondary-btn">Сбросить</button>
          </div>

          <div id="catalog-state" class="state"></div>
          <div id="catalog-list" class="cards-grid"></div>
          <div id="catalog-dots" class="dot-pagination" aria-label="Навигация по карточкам"></div>
        </section>
      </main>
    `}getLimitedItems(){return!this.limitValue||this.limitValue<=0?this.items:this.items.slice(0,this.limitValue)}getPageCount(){const t=this.getLimitedItems();return Math.max(1,Math.ceil(t.length/this.cardsPerPage))}getCurrentPageItems(){const t=this.getLimitedItems(),e=this.currentPage*this.cardsPerPage;return t.slice(e,e+this.cardsPerPage)}renderState(t,e="info"){this.stateRoot.textContent=t,this.stateRoot.className=`state state-${e}`}clickCard(t){const e=Number(t.currentTarget.dataset.id);this.onOpenItem(e)}setCurrentPage(t){this.currentPage=t,this.renderCards(),this.renderPagination()}renderCards(){this.listRoot.innerHTML="";const t=this.getCurrentPageItems();if(t.length===0){this.renderState("По вашему запросу ничего не найдено.","warning");return}t.forEach(a=>{new l(this.listRoot).render(a,this.clickCard.bind(this))});const e=this.getLimitedItems().length;this.renderState(`Показано ${e} карточек.`,"success")}renderPagination(){this.dotsRoot.innerHTML="";const t=this.getPageCount();if(!(t<=1)){for(let e=0;e<t;e+=1){const a=e===this.currentPage;this.dotsRoot.insertAdjacentHTML("beforeend",`
          <button
            type="button"
            class="dot-button ${a?"active":""}"
            data-page="${e}"
            aria-label="Страница ${e+1}"
          ></button>
        `)}this.dotsRoot.querySelectorAll(".dot-button").forEach(e=>{e.addEventListener("click",()=>{this.setCurrentPage(Number(e.dataset.page))})})}}async fetchData(){this.renderState("Загрузка данных с сервера...","info");try{const t=await o.getDiscoveries(this.searchValue.trim());this.items=Array.isArray(t)?t:[],this.currentPage=0,this.renderCards(),this.renderPagination()}catch(t){this.items=[],this.listRoot.innerHTML="",this.dotsRoot.innerHTML="",this.renderState(t.message||"Не удалось загрузить карточки.","error")}}applyLimitFromInput(){const t=document.getElementById("limit-input"),e=Number.parseInt(t.value,10);Number.isNaN(e)||e<=0?this.limitValue=0:this.limitValue=e,this.currentPage=0,this.renderCards(),this.renderPagination()}addListeners(){const t=document.getElementById("search-title-input"),e=document.getElementById("search-title-button"),a=document.getElementById("limit-apply-button"),s=document.getElementById("reset-button");e.addEventListener("click",()=>{this.searchValue=t.value,this.fetchData()}),t.addEventListener("keydown",i=>{i.key==="Enter"&&(this.searchValue=t.value,this.fetchData())}),a.addEventListener("click",()=>{this.applyLimitFromInput()}),s.addEventListener("click",()=>{this.searchValue="",this.limitValue=0,t.value="",document.getElementById("limit-input").value="",this.fetchData()})}render(){this.parent.innerHTML=this.getHTML(),this.addListeners(),this.fetchData()}}class g{constructor(t){this.parent=t}getHTML(t){return`
      <article class="detail-card">
        <img src="${t.src}" alt="${t.title}" class="detail-image">
        <div class="detail-body">
          <h2>${t.title}</h2>
          <p class="detail-meta">Год: ${t.year} · Маршрут: ${t.route}</p>
          <p>${t.text}</p>
          <button id="delete-item-button" class="danger-btn">Удалить карточку</button>
        </div>
      </article>
    `}render(t,e){this.parent.innerHTML=this.getHTML(t);const a=document.getElementById("delete-item-button");a&&a.addEventListener("click",e)}}class m{constructor(t,e,a){this.parent=t,this.id=e,this.onBack=a}get detailRoot(){return document.getElementById("item-detail")}get stateRoot(){return document.getElementById("item-state")}getHTML(){return`
      <header class="topbar">
        <a id="logo-back-link" class="brand" href="#" aria-label="Назад к каталогу">Эпоха географических открытий</a>
      </header>

      <main class="layout">
        <section class="panel">
          <h1>Карточка экспедиции</h1>
          <p class="subtitle">ЛР 6: данные получаются через fetch</p>
          <div id="item-state" class="state state-info">Загрузка карточки...</div>
          <div id="item-detail"></div>
        </section>
      </main>
    `}renderState(t,e="info"){this.stateRoot.textContent=t,this.stateRoot.className=`state state-${e}`}goBack(t){t.preventDefault(),this.onBack()}async deleteItem(){if(window.confirm("Удалить эту карточку? Действие нельзя отменить.")){this.renderState("Удаление карточки...","info");try{await o.deleteDiscoveryById(this.id),this.onBack()}catch(e){this.renderState(e.message||"Не удалось удалить карточку.","error")}}}async fetchItem(){try{const t=await o.getDiscoveryById(this.id);new g(this.detailRoot).render(t,this.deleteItem.bind(this)),this.renderState("Карточка загружена.","success")}catch(t){if(t.message.toLowerCase().includes("не найд")){this.renderState("Карточка не найдена.","warning");return}this.renderState(t.message||"Ошибка загрузки карточки.","error")}}addListeners(){document.getElementById("logo-back-link").addEventListener("click",this.goBack.bind(this))}render(){this.parent.innerHTML=this.getHTML(),this.addListeners(),this.fetchItem()}}const c=document.getElementById("root");function d(){new u(c,p).render()}function p(r){new m(c,r,d).render()}d();
