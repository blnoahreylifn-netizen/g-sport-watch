window.GSportPatches=window.GSportPatches||{};
window.GSportPatches.injectAtmosphere=function(doc){
  if(!doc||doc.getElementById('gs-atmosphere-style'))return;
  const style=doc.createElement('style');
  style.id='gs-atmosphere-style';
  style.textContent=`
  :root{
    --gs-warm-1:#f2c183;
    --gs-warm-2:#d77d4a;
    --gs-warm-3:#8f2533;
    --gs-gold:#e1b06e;
    --gs-cream:#f4dfc8;
  }
  html,body{
    background:
      radial-gradient(circle at 72% 18%,rgba(242,193,131,.10),transparent 24%),
      radial-gradient(circle at 22% 74%,rgba(215,125,74,.12),transparent 28%),
      radial-gradient(circle at 52% 48%,rgba(143,37,51,.10),transparent 38%),
      linear-gradient(160deg,#090506 0%,#16090c 34%,#1d1014 64%,#080405 100%)!important;
  }
  body:before{content:"";position:fixed;inset:0;pointer-events:none;z-index:2;background:radial-gradient(circle at 70% 30%,rgba(255,215,165,.045),transparent 18%),radial-gradient(circle at 26% 78%,rgba(214,110,74,.05),transparent 24%);mix-blend-mode:screen}
  .backdrop{background:radial-gradient(circle at 52% 42%,rgba(151,64,45,.18),transparent 38%),linear-gradient(#12090b,#070405 72%)!important}
  .backdrop:before{background:radial-gradient(circle at var(--mx,50%) var(--my,50%),rgba(255,196,132,.13),transparent 22%)!important}
  .grid{opacity:.7;filter:sepia(.18) saturate(1.1)}
  .scene h1,.scene h2{color:#f6eadc;text-shadow:0 0 28px rgba(255,215,170,.045),0 0 90px rgba(166,63,44,.04)}
  .eyebrow,.kicker{color:#e2b375!important}
  .scene p,.hint,.config-note,.lab-note,#hoverCard p{color:#ad9f98!important}
  .brand{color:#f1dfc9;text-shadow:0 0 20px rgba(225,176,110,.08)}
  .live{color:#d4c3b3!important}.dot,.status-dot{background:#e6b672!important;box-shadow:0 0 18px rgba(230,182,114,.85)!important}
  .progress,.explode-meter i{background:linear-gradient(90deg,#c56c45,#f2c183,#fff0d2)!important}

  .config-panel{
    background:linear-gradient(180deg,rgba(28,13,16,.93),rgba(13,8,10,.91))!important;
    border:1px solid rgba(225,176,110,.28)!important;
    box-shadow:0 28px 85px rgba(0,0,0,.44),0 0 42px rgba(215,125,74,.08)!important;
    backdrop-filter:blur(24px) saturate(120%)!important;
  }
  .config-panel:before{content:"";position:absolute;inset:0;border-radius:inherit;pointer-events:none;background:linear-gradient(180deg,rgba(255,214,164,.05),transparent 30%),radial-gradient(circle at 15% 0%,rgba(255,197,120,.07),transparent 24%)}
  .config-label{color:#b9987a!important}.config-label b{color:#f2e2d0!important}
  .swatch{border-color:rgba(255,255,255,.24)!important;box-shadow:inset 0 0 0 3px rgba(0,0,0,.22),0 7px 18px rgba(0,0,0,.2)!important}
  .swatch:hover{transform:translateY(-3px) scale(1.04)!important;border-color:rgba(255,232,192,.82)!important;box-shadow:inset 0 0 0 3px rgba(0,0,0,.18),0 11px 28px rgba(0,0,0,.25),0 0 18px rgba(242,193,131,.12)!important}
  .swatch.active:after{border-color:#f0c88d!important;box-shadow:0 0 16px rgba(240,200,141,.2)}

  .lab-panel{
    background:linear-gradient(180deg,rgba(22,10,13,.95),rgba(9,6,8,.95))!important;
    border:1px solid rgba(225,176,110,.25)!important;
    box-shadow:0 30px 100px rgba(0,0,0,.52),0 0 40px rgba(214,125,74,.08)!important;
    backdrop-filter:blur(24px) saturate(120%)!important;
  }
  .lab-head b{color:#f5e4d3!important}.lab-head small,.lab-title{color:#b79270!important}.lab-title span:last-child{color:#f0dcc5!important}
  .lab-btn,.part-btn,.controls-toggle{background:linear-gradient(180deg,rgba(255,255,255,.055),rgba(255,255,255,.024))!important;border-color:rgba(255,255,255,.12)!important;color:#f2e7dc!important}
  .lab-btn:hover,.part-btn:hover,.part-btn.active,.controls-toggle:hover,.controls-toggle.active{border-color:rgba(225,176,110,.48)!important;background:linear-gradient(180deg,rgba(128,65,39,.31),rgba(98,39,31,.21))!important;box-shadow:0 0 18px rgba(214,125,74,.09)!important}
  input[type="range"]{accent-color:#d79a62!important}

  #hoverCard{background:linear-gradient(180deg,rgba(20,10,12,.88),rgba(10,7,9,.82))!important;border-color:rgba(225,176,110,.22)!important;box-shadow:0 20px 60px rgba(0,0,0,.36),0 0 26px rgba(214,125,74,.06)!important}
  #hoverCard small{color:#e3b77e!important}#hoverCard h3{color:#f5e5d2!important}

  .gs-orbit-world{position:fixed;inset:0;z-index:3;pointer-events:none;overflow:hidden;opacity:.92;transition:opacity .8s ease;--px:0px;--py:0px;mix-blend-mode:screen}
  body.catalog-visible .gs-orbit-world{opacity:.34}
  #stage{z-index:1!important}.story,.nav,.progress,.lab-panel,#hoverCard{position:relative;z-index:5}
  .gs-earth-wrap{position:absolute;right:8vw;top:13vh;width:clamp(115px,13vw,210px);aspect-ratio:1;transform:translate3d(var(--px),var(--py),0);filter:drop-shadow(0 12px 30px rgba(0,0,0,.7));animation:gsFarFloat 18s ease-in-out infinite}
  .gs-earth-glow{position:absolute;inset:-9%;border-radius:50%;background:radial-gradient(circle,rgba(185,112,73,.16),rgba(97,48,52,.06) 50%,transparent 72%);filter:blur(13px);opacity:.75}
  .gs-earth{position:absolute;inset:0;border-radius:50%;background-image:url('https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/The_Blue_Marble_4463x4163.jpg/1200px-The_Blue_Marble_4463x4163.jpg');background-size:cover;background-position:center;box-shadow:inset -16px -10px 28px rgba(0,0,0,.34),0 0 0 1px rgba(232,184,125,.12);filter:sepia(.10) saturate(.82) brightness(.72) contrast(1.05)}
  .gs-earth:after{content:"";position:absolute;inset:0;border-radius:50%;background:linear-gradient(105deg,rgba(255,225,190,.09),transparent 32% 62%,rgba(0,0,0,.22))}
  .gs-stars{position:absolute;inset:0}
  .gs-star{position:absolute;width:1.4px;height:1.4px;border-radius:50%;background:rgba(255,245,228,.72);box-shadow:0 0 7px rgba(216,170,103,.45);animation:gsDrift var(--d) ease-in-out infinite;opacity:var(--o)}
  .gs-shooting{position:absolute;left:var(--x);top:var(--y);width:clamp(90px,11vw,170px);height:1px;transform:rotate(-24deg);transform-origin:left center;background:linear-gradient(90deg,rgba(255,255,255,0),rgba(255,247,226,.95),rgba(255,216,165,.12),transparent);filter:drop-shadow(0 0 5px rgba(255,233,195,.55));opacity:0;animation:gsShoot var(--sd) linear infinite;animation-delay:var(--delay)}
  .gs-shooting:before{content:"";position:absolute;right:0;top:-1px;width:3px;height:3px;border-radius:50%;background:#fff8e8;box-shadow:0 0 11px rgba(255,236,198,.95)}
  @keyframes gsFarFloat{50%{transform:translate3d(calc(var(--px) - 5px),calc(var(--py) + 7px),0)}}
  @keyframes gsDrift{0%,100%{translate:0 0}50%{translate:9px -14px}}
  @keyframes gsShoot{0%,72%{opacity:0;translate:-10vw -5vh}74%{opacity:0}77%{opacity:.95}88%{opacity:.65}100%{opacity:0;translate:52vw 31vh}}
  .gs-beyond{position:relative;z-index:26;min-height:112vh;display:grid;place-items:center;overflow:hidden;background:radial-gradient(circle at 70% 45%,#3b211d 0,#1c1113 28%,#090607 62%,#030203 100%);color:#f2eee8}
  .gs-beyond:before{content:"";position:absolute;width:min(26vw,370px);aspect-ratio:1;border-radius:50%;right:10vw;top:16vh;background-image:url('https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/The_Blue_Marble_4463x4163.jpg/1200px-The_Blue_Marble_4463x4163.jpg');background-size:cover;background-position:center;filter:sepia(.08) saturate(.84) brightness(.68);box-shadow:0 0 58px rgba(190,112,72,.14)}
  .gs-beyond:after{content:"";position:absolute;inset:0;background:linear-gradient(90deg,rgba(0,0,0,.52),transparent 45%,rgba(95,38,33,.08))}
  .gs-beyond-copy{position:relative;z-index:2;width:min(1200px,90vw);margin:auto}
  .gs-beyond small{font-size:8px;letter-spacing:.3em;color:#d0a269}.gs-beyond h2{margin-top:18px;font:750 clamp(48px,7vw,110px)/.78 Manrope,Arial,sans-serif;letter-spacing:-.06em;text-transform:uppercase;max-width:7ch}.gs-beyond p{margin-top:22px;max-width:460px;color:#a28f86;font-size:10px;line-height:1.7}
  html[lang="en"] .gs-beyond .ru{display:none}html:not([lang="en"]) .gs-beyond .en{display:none}
  @media(max-width:760px){.gs-earth-wrap{width:105px;right:7vw;top:15vh}.gs-beyond:before{width:150px;right:7vw;top:18vh}.gs-shooting{width:110px}}
  `;
  doc.head.appendChild(style);
  const world=doc.createElement('div');world.className='gs-orbit-world';
  world.innerHTML='<div class="gs-stars"></div><div class="gs-earth-wrap"><div class="gs-earth-glow"></div><div class="gs-earth"></div></div><div class="gs-shoot-wrap"></div>';
  doc.body.prepend(world);
  const stars=world.querySelector('.gs-stars');
  for(let i=0;i<42;i++){const s=doc.createElement('i');s.className='gs-star';s.style.left=(2+Math.random()*96)+'%';s.style.top=(4+Math.random()*91)+'%';s.style.setProperty('--d',(8+Math.random()*24)+'s');s.style.setProperty('--o',(.14+Math.random()*.55).toFixed(2));stars.appendChild(s)}
  const shoot=world.querySelector('.gs-shoot-wrap');
  for(let i=0;i<9;i++){const s=doc.createElement('i');s.className='gs-shooting';s.style.setProperty('--x',(Math.random()*62-8)+'%');s.style.setProperty('--y',(Math.random()*55-8)+'%');s.style.setProperty('--sd',(8+Math.random()*7)+'s');s.style.setProperty('--delay',(-Math.random()*13)+'s');shoot.appendChild(s)}
  const catalog=doc.getElementById('catalog');
  if(catalog&&!doc.querySelector('.gs-beyond')){const beyond=doc.createElement('section');beyond.className='gs-beyond';beyond.innerHTML='<div class="gs-beyond-copy"><small>G-SPORT / ORBIT</small><h2><span class="ru">За пределами<br>времени.</span><span class="en">Beyond<br>time.</span></h2><p><span class="ru">История не заканчивается магазином. Прокручивай дальше — пространство продолжает двигаться, а G-SPORT остаётся в центре кадра.</span><span class="en">The story does not end at the store. Keep scrolling — space keeps moving while G-SPORT stays at the center of the frame.</span></p></div>';catalog.insertAdjacentElement('afterend',beyond)}
  const update=()=>{const max=Math.max(1,doc.documentElement.scrollHeight-doc.defaultView.innerHeight),p=doc.defaultView.scrollY/max;world.style.setProperty('--px',(-16*p)+'px');world.style.setProperty('--py',(24*p)+'px')};
  doc.defaultView.addEventListener('scroll',update,{passive:true});update();
};
