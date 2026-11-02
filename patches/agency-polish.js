(function(){
const G=window.GSportPatches=window.GSportPatches||{};

G.initOuterAgency=function(){
  if(document.getElementById('gs-agency-outer-style'))return;
  const s=document.createElement('style');
  s.id='gs-agency-outer-style';
  s.textContent=`
  :root{--gs-gold:#d8aa67;--gs-bg:#040405}
  html,body{background:var(--gs-bg)!important}
  body:before{content:"";position:fixed;inset:0;z-index:0;pointer-events:none;background:radial-gradient(circle at 18% 18%,rgba(216,170,103,.055),transparent 28%),radial-gradient(circle at 82% 75%,rgba(95,72,180,.035),transparent 30%)}
  #app{position:relative;z-index:1;filter:contrast(1.015) saturate(1.025);transition:filter .35s ease,transform .35s cubic-bezier(.2,.8,.2,1)!important}
  #detailDock{overflow:hidden!important;border-color:rgba(216,170,103,.23)!important;background:linear-gradient(145deg,rgba(8,10,14,.80),rgba(18,12,18,.74))!important;backdrop-filter:blur(28px) saturate(1.14)!important;-webkit-backdrop-filter:blur(28px) saturate(1.14)!important;box-shadow:0 24px 90px rgba(0,0,0,.48),0 0 55px rgba(216,170,103,.045),inset 0 1px rgba(255,255,255,.045)!important}
  #detailDock:after{content:"";position:absolute;inset:0;pointer-events:none;background:linear-gradient(112deg,transparent 24%,rgba(255,255,255,.028) 47%,transparent 68%);transform:translateX(-90%);animation:gsDockSweep 8s ease-in-out infinite}
  @keyframes gsDockSweep{0%,30%{transform:translateX(-90%);opacity:0}43%{opacity:.75}65%{transform:translateX(90%);opacity:.15}100%{transform:translateX(90%);opacity:0}}
  .detailBody h3{letter-spacing:-.04em!important}.detailBody p{color:#c8ccd1!important;line-height:1.72!important}.detailMeta{color:#e3bd7c!important}
  .detailTabs{gap:7px!important}.detailTabs button{padding:7px 10px!important;border-color:rgba(255,255,255,.09)!important;background:rgba(255,255,255,.032)!important;color:#adb3ba!important;transition:transform .18s ease,border-color .18s ease,background .18s ease,color .18s ease,box-shadow .18s ease!important}
  .detailTabs button:hover{transform:translateY(-1px);color:#fff!important;border-color:rgba(216,170,103,.42)!important;background:rgba(216,170,103,.10)!important}
  .detailTabs button.active{color:#fff!important;border-color:rgba(216,170,103,.64)!important;background:linear-gradient(180deg,rgba(216,170,103,.19),rgba(216,170,103,.08))!important;box-shadow:0 8px 25px rgba(216,170,103,.08),inset 0 1px rgba(255,255,255,.07)!important}
  .detailToggle{transition:transform .2s ease,border-color .2s ease!important}.detailToggle:hover{transform:rotate(90deg);border-color:rgba(216,170,103,.45)!important}
  #liveBadge{border-color:rgba(216,170,103,.30)!important;background:rgba(5,6,8,.54)!important;box-shadow:0 10px 34px rgba(0,0,0,.26),inset 0 1px rgba(255,255,255,.035)}
  #outerSheen{opacity:.72}
  @media(max-width:900px){#detailDock{backdrop-filter:blur(20px) saturate(1.1)!important;-webkit-backdrop-filter:blur(20px) saturate(1.1)!important}}
  `;
  document.head.appendChild(s);
};

G.injectAgencyPolish=function(d){
  if(!d||d.getElementById('gs-agency-polish-style'))return;
  const w=d.defaultView;
  const s=d.createElement('style');
  s.id='gs-agency-polish-style';
  s.textContent=`
  :root{--agency-gold:#d8aa67;--agency-cream:#f1e7d7;--agency-bg:#040506;--agency-line:rgba(255,255,255,.085)}
  html{scroll-behavior:smooth!important;background:#040506}
  body{background:#040506!important;text-rendering:optimizeLegibility;-webkit-font-smoothing:antialiased;overflow-x:hidden}
  body:before{content:"";position:fixed;inset:0;z-index:0;pointer-events:none;background-image:radial-gradient(rgba(255,255,255,.028) .55px,transparent .65px);background-size:4px 4px;opacity:.16;mix-blend-mode:soft-light}

  h1,h2,h3,.display,.headline{letter-spacing:-.052em!important;text-wrap:balance}
  p,.copy p{color:rgba(232,235,239,.70)!important;text-wrap:pretty}
  .kicker,.eyebrow,[class*="kicker"]{letter-spacing:.21em!important;font-weight:800!important}

  section,.scene,[class*="journey-"],.catalog-footer,.finale-quote{isolation:isolate}
  section,.scene,[class*="journey-"]{position:relative}
  section[data-agency-seam]::after,.scene[data-agency-seam]::after,[class*="journey-"][data-agency-seam]::after{content:"";position:absolute;left:4vw;right:4vw;bottom:0;height:1px;z-index:7;pointer-events:none;background:linear-gradient(90deg,transparent,rgba(216,170,103,.13),rgba(255,255,255,.06),rgba(216,170,103,.13),transparent);box-shadow:0 0 26px rgba(216,170,103,.045)}
  .gs-agency-fade{position:absolute;left:0;right:0;bottom:0;height:10vh;pointer-events:none;z-index:5;background:linear-gradient(to bottom,transparent,rgba(4,5,7,.22) 48%,rgba(4,5,7,.54));opacity:.72}

  button,a,[role="button"],.tab,.chip,.swatch{transition:transform .22s cubic-bezier(.2,.8,.2,1),border-color .22s ease,background .22s ease,color .22s ease,box-shadow .22s ease,opacity .22s ease!important}
  button:hover,[role="button"]:hover,.tab:hover,.chip:hover{transform:translateY(-1px)}
  button:active,[role="button"]:active,.tab:active,.chip:active{transform:scale(.985)}
  button:focus-visible,a:focus-visible,[role="button"]:focus-visible{outline:1px solid rgba(216,170,103,.78)!important;outline-offset:3px!important}

  nav,.nav,.topbar,.menu,.floating-nav,[class*="nav-"]{backdrop-filter:blur(22px) saturate(1.14);-webkit-backdrop-filter:blur(22px) saturate(1.14)}
  .tabs,.tab-list,.nav-tabs,[class*="tabs"]{gap:7px!important}
  .tabs button,.tab-list button,.nav-tabs button,[class*="tabs"] button{border-radius:999px!important}

  #stage,.stage,[class*="watch-stage"],[class*="viewer"]{position:relative;filter:none!important}
  .gs-watch-aura{position:absolute;left:50%;top:50%;width:min(66vw,860px);aspect-ratio:1;border-radius:50%;transform:translate(-50%,-50%);pointer-events:none!important;z-index:0;background:radial-gradient(circle,rgba(216,170,103,.072),rgba(216,170,103,.024) 36%,transparent 68%);filter:blur(18px);animation:gsWatchAura 6.8s ease-in-out infinite}
  @keyframes gsWatchAura{0%,100%{opacity:.5;transform:translate(-50%,-50%) scale(.96)}50%{opacity:.88;transform:translate(-50%,-50%) scale(1.025)}}
  canvas{image-rendering:auto!important;filter:contrast(1.055) saturate(1.055) brightness(1.008)!important;transition:filter .35s ease,transform .35s ease!important;will-change:transform}
  #stage:hover canvas,.stage:hover canvas{filter:contrast(1.07) saturate(1.07) brightness(1.015)!important}

  img{image-rendering:auto!important;backface-visibility:hidden;transform:translateZ(0)}
  img[src*="upscayl" i],img[alt*="upscayl" i],img[class*="upscayl" i]{filter:none!important;opacity:1!important;image-rendering:auto!important}
  .blurred,.blur-image,.image-blur,[class*="blurred-image"]{filter:none!important}
  .gs-agency-image{filter:none!important;opacity:1!important;transform:translateZ(0) scale(1.002);transition:transform .75s cubic-bezier(.2,.8,.2,1),filter .35s ease!important}
  .gs-agency-image:hover{transform:translateZ(0) scale(1.01)}

  .copy,.tester-copy,.watch-explain-intro,.gate-copy{position:relative;z-index:8}
  .copy::before,.tester-copy::before,.watch-explain-intro::before{content:"";position:absolute;left:-17px;top:2px;width:2px;height:43px;border-radius:3px;background:linear-gradient(var(--agency-gold),transparent);opacity:.42;transform:scaleY(.55);transform-origin:top;transition:.4s ease}
  .copy:hover::before,.tester-copy:hover::before,.watch-explain-intro:hover::before{opacity:.9;transform:scaleY(1)}

  .config-panel,.tester-hud,.explain-grid>*,.lab-panel,[class*="panel"],[class*="card"]{border-color:rgba(255,255,255,.095)!important;box-shadow:0 24px 80px rgba(0,0,0,.27),inset 0 1px rgba(255,255,255,.035);backdrop-filter:blur(20px) saturate(1.10);-webkit-backdrop-filter:blur(20px) saturate(1.10)}
  .config-panel:hover,.tester-hud:hover,.explain-grid>*:hover{border-color:rgba(216,170,103,.19)!important;box-shadow:0 28px 90px rgba(0,0,0,.33),0 0 38px rgba(216,170,103,.025),inset 0 1px rgba(255,255,255,.045)}
  .swatch{position:relative;overflow:visible!important}.swatch::before{content:"";position:absolute;inset:-5px;border:1px solid transparent;border-radius:50%;transition:.2s ease}.swatch:hover::before,.swatch.active::before{border-color:rgba(216,170,103,.33);box-shadow:0 0 18px rgba(216,170,103,.09)}

  .agency-reveal{opacity:0!important;transform:translateY(18px) scale(.995)!important;transition:opacity .76s cubic-bezier(.2,.8,.2,1),transform .76s cubic-bezier(.2,.8,.2,1)!important}
  .agency-reveal.agency-in{opacity:1!important;transform:none!important}

  #gsAgencyCursor{position:fixed;left:0;top:0;width:180px;height:180px;border-radius:50%;z-index:9998;pointer-events:none;background:radial-gradient(circle,rgba(216,170,103,.072),rgba(216,170,103,.018) 35%,transparent 70%);transform:translate(-50%,-50%);mix-blend-mode:screen;opacity:0;transition:opacity .25s ease;will-change:left,top}
  #gsAgencyRail{position:fixed;right:12px;top:50%;transform:translateY(-50%);z-index:90;display:flex;flex-direction:column;gap:6px;pointer-events:none}
  .gsAgencyRailDot{width:3px;height:13px;border-radius:999px;background:rgba(255,255,255,.12);transition:.25s ease}.gsAgencyRailDot.on{height:27px;background:linear-gradient(#f0d09d,#946433);box-shadow:0 0 14px rgba(216,170,103,.2)}

  @media(max-width:900px){#gsAgencyCursor,#gsAgencyRail{display:none!important}.gs-agency-fade{height:7vh}.copy::before,.tester-copy::before,.watch-explain-intro::before{left:-10px}canvas{filter:contrast(1.04) saturate(1.045)!important}}
  @media(prefers-reduced-motion:reduce){*,*::before,*::after{animation-duration:.001ms!important;animation-iteration-count:1!important;scroll-behavior:auto!important;transition-duration:.001ms!important}.agency-reveal{opacity:1!important;transform:none!important}}
  `;
  d.head.appendChild(s);

  function cleanImage(img){
    try{
      const cs=w.getComputedStyle(img);
      if((cs.filter||'').includes('blur('))img.style.setProperty('filter','none','important');
      const tag=(img.src||'')+' '+(img.alt||'')+' '+(typeof img.className==='string'?img.className:'');
      if(/upscayl|blurred|hero|poster/i.test(tag))img.classList.add('gs-agency-image');
    }catch(e){}
  }
  d.querySelectorAll('img').forEach(cleanImage);
  const mo=new w.MutationObserver(list=>list.forEach(m=>m.addedNodes.forEach(n=>{if(n.nodeType!==1)return;if(n.matches?.('img'))cleanImage(n);n.querySelectorAll?.('img').forEach(cleanImage)})));
  mo.observe(d.body,{childList:true,subtree:true});

  const stage=d.querySelector('#stage,.stage,[class*="watch-stage"],[class*="viewer"]');
  if(stage&&!stage.querySelector('.gs-watch-aura')){const a=d.createElement('div');a.className='gs-watch-aura';stage.prepend(a)}

  const seamTargets=[...d.querySelectorAll('section,.scene,[class*="journey-"]')].filter(x=>x.offsetHeight>260);
  seamTargets.forEach((sec,i)=>{if(i<seamTargets.length-1){sec.setAttribute('data-agency-seam','');if(!sec.querySelector(':scope > .gs-agency-fade')){const f=d.createElement('div');f.className='gs-agency-fade';sec.appendChild(f)}}});

  const reveal=[...d.querySelectorAll('.copy,.tester-copy,.tester-hud,.watch-explain-intro,.explain-grid>*,.gate-copy,.config-panel')];
  reveal.forEach(x=>x.classList.add('agency-reveal'));
  if('IntersectionObserver' in w){const io=new w.IntersectionObserver(entries=>entries.forEach(en=>{if(en.isIntersecting)en.target.classList.add('agency-in')}),{threshold:.11,rootMargin:'0px 0px -6% 0px'});reveal.forEach(x=>io.observe(x))}else reveal.forEach(x=>x.classList.add('agency-in'));

  if(w.matchMedia('(pointer:fine)').matches){
    const cursor=d.createElement('div');cursor.id='gsAgencyCursor';d.body.appendChild(cursor);
    let cx=-300,cy=-300,tx=-300,ty=-300;
    d.addEventListener('pointermove',e=>{tx=e.clientX;ty=e.clientY;cursor.style.opacity='1'},{passive:true});
    d.addEventListener('pointerleave',()=>cursor.style.opacity='0',{passive:true});
    (function tick(){cx+=(tx-cx)*.13;cy+=(ty-cy)*.13;cursor.style.left=cx+'px';cursor.style.top=cy+'px';w.requestAnimationFrame(tick)})();
  }

  const sections=seamTargets.slice(0,18);
  if(sections.length>2){
    const rail=d.createElement('div');rail.id='gsAgencyRail';
    const dots=sections.map(()=>{const q=d.createElement('i');q.className='gsAgencyRailDot';rail.appendChild(q);return q});d.body.appendChild(rail);
    const update=()=>{let best=0,dist=Infinity;sections.forEach((sec,i)=>{const r=sec.getBoundingClientRect(),v=Math.abs(r.top-w.innerHeight*.42);if(v<dist){dist=v;best=i}});dots.forEach((q,i)=>q.classList.toggle('on',i===best))};
    w.addEventListener('scroll',update,{passive:true});update();
  }
};
})();
