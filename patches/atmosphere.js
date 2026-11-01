window.GSportPatches=window.GSportPatches||{};
window.GSportPatches.injectAtmosphere=function(doc){
  if(!doc||doc.getElementById('gs-atmosphere-style'))return;
  const style=doc.createElement('style');
  style.id='gs-atmosphere-style';
  style.textContent=`
  .gs-orbit-world{position:fixed;inset:0;z-index:3;pointer-events:none;overflow:hidden;opacity:.94;transition:opacity .8s ease;--px:0px;--py:0px;--ps:1;mix-blend-mode:screen}
  body.catalog-visible .gs-orbit-world{opacity:.44}
  .gs-earth-wrap{position:absolute;right:-1vw;top:10vh;width:min(46vw,690px);aspect-ratio:1;transform:translate3d(var(--px),var(--py),0) scale(var(--ps));filter:drop-shadow(0 42px 90px rgba(0,0,0,.58));animation:gsFloat 14s ease-in-out infinite}
  .gs-earth-glow{position:absolute;inset:-15%;border-radius:50%;background:radial-gradient(circle,rgba(91,175,225,.38),rgba(68,112,174,.14) 44%,transparent 72%);filter:blur(28px);animation:gsPulse 6s ease-in-out infinite}
  .gs-earth{position:absolute;inset:8%;border-radius:50%;overflow:hidden;background:
    radial-gradient(circle at 31% 25%,rgba(255,255,255,.82) 0 1.1%,transparent 1.55%),
    radial-gradient(circle at 62% 20%,rgba(230,245,255,.5) 0 1.5%,transparent 2.1%),
    radial-gradient(ellipse at 33% 35%,#7f9a63 0 8%,transparent 8.8%),
    radial-gradient(ellipse at 48% 51%,#9a875c 0 6%,transparent 6.8%),
    radial-gradient(ellipse at 66% 62%,#678852 0 7%,transparent 7.9%),
    radial-gradient(ellipse at 72% 34%,#84a46e 0 5%,transparent 5.8%),
    radial-gradient(ellipse at 27% 69%,#69824c 0 5%,transparent 5.9%),
    radial-gradient(circle at 36% 34%,#62a7d4 0 39%,#2a6b9c 63%,#102d4b 82%,#071522 100%);
    box-shadow:inset -78px -42px 118px rgba(0,0,0,.82),inset 34px 22px 54px rgba(157,216,247,.28),0 0 0 1px rgba(190,229,250,.22),0 0 110px rgba(74,148,196,.25);animation:gsEarthTurn 42s linear infinite}
  .gs-earth:before{content:"";position:absolute;inset:-10%;border-radius:50%;background:
    repeating-linear-gradient(14deg,transparent 0 7%,rgba(255,255,255,.048) 7.5% 8.2%,transparent 8.7% 16%),
    radial-gradient(ellipse at 45% 30%,rgba(255,255,255,.24),transparent 36%);mix-blend-mode:screen;animation:gsClouds 21s linear infinite}
  .gs-earth:after{content:"";position:absolute;inset:0;border-radius:50%;background:linear-gradient(105deg,rgba(255,255,255,.24),transparent 26% 57%,rgba(0,0,0,.62) 83%);box-shadow:inset 0 0 34px rgba(144,207,240,.34)}
  .gs-orbit{position:absolute;right:-8vw;top:3vh;width:min(57vw,850px);aspect-ratio:1;border:1px solid rgba(218,190,150,.18);border-radius:50%;transform:rotate(-18deg);animation:gsOrbit 26s linear infinite}
  .gs-orbit:before,.gs-orbit:after{content:"";position:absolute;border-radius:50%;border:1px solid rgba(126,180,215,.12)}
  .gs-orbit:before{inset:11%}.gs-orbit:after{inset:23%}
  .gs-stars{position:absolute;inset:0}
  .gs-star{position:absolute;width:2px;height:2px;border-radius:50%;background:rgba(255,245,226,.9);box-shadow:0 0 12px rgba(216,170,103,.78);animation:gsDrift var(--d) linear infinite;opacity:var(--o)}
  .gs-star:nth-child(3n){width:1px;height:18px;border-radius:999px;background:linear-gradient(transparent,rgba(216,170,103,.66),transparent);transform:rotate(24deg)}
  .gs-star:nth-child(5n){width:3px;height:3px;box-shadow:0 0 18px rgba(115,191,235,.9)}
  @keyframes gsEarthTurn{to{transform:rotate(360deg)}}
  @keyframes gsClouds{to{transform:rotate(-360deg)}}
  @keyframes gsOrbit{to{transform:rotate(342deg)}}
  @keyframes gsFloat{50%{transform:translate3d(calc(var(--px) - 12px),calc(var(--py) + 18px),0) scale(calc(var(--ps) * 1.018))}}
  @keyframes gsPulse{50%{opacity:.68;transform:scale(1.05)}}
  @keyframes gsDrift{0%{translate:0 0}50%{translate:22px -30px}100%{translate:0 0}}
  .story,.nav,.progress,.lab-panel,#hoverCard{position:relative;z-index:5}
  #stage{z-index:1!important}
  .gs-beyond{position:relative;z-index:26;min-height:112vh;display:grid;place-items:center;overflow:hidden;background:radial-gradient(circle at 70% 45%,#16283b 0,#0b1119 27%,#050607 60%,#020203 100%);color:#f2eee8}
  .gs-beyond:before{content:"";position:absolute;width:min(66vw,900px);aspect-ratio:1;border-radius:50%;right:-20vw;top:5vh;background:radial-gradient(circle at 34% 30%,#6ba6c8 0 5%,#2c678d 24%,#12304f 54%,#071522 72%);box-shadow:inset -100px -50px 150px rgba(0,0,0,.78),0 0 130px rgba(69,140,187,.22);animation:gsEarthTurn 54s linear infinite}
  .gs-beyond:after{content:"";position:absolute;inset:0;background:linear-gradient(90deg,rgba(0,0,0,.52),transparent 45%,rgba(0,0,0,.08))}
  .gs-beyond-copy{position:relative;z-index:2;width:min(1200px,90vw);margin:auto}
  .gs-beyond small{font-size:8px;letter-spacing:.3em;color:#c59a65}.gs-beyond h2{margin-top:18px;font:750 clamp(48px,7vw,110px)/.78 Manrope,Arial,sans-serif;letter-spacing:-.06em;text-transform:uppercase;max-width:7ch}.gs-beyond p{margin-top:22px;max-width:460px;color:#8d9298;font-size:10px;line-height:1.7}
  html[lang="en"] .gs-beyond .ru{display:none}html:not([lang="en"]) .gs-beyond .en{display:none}
  @media(max-width:760px){.gs-orbit-world{opacity:.72}.gs-earth-wrap{width:82vw;right:-34vw;top:16vh}.gs-orbit{width:100vw;right:-44vw;top:10vh}.gs-beyond:before{width:105vw;right:-55vw;top:18vh}.gs-beyond-copy{padding-bottom:30vh}}
  `;
  doc.head.appendChild(style);

  const world=doc.createElement('div');world.className='gs-orbit-world';
  world.innerHTML='<div class="gs-stars"></div><div class="gs-orbit"></div><div class="gs-earth-wrap"><div class="gs-earth-glow"></div><div class="gs-earth"></div></div>';
  doc.body.prepend(world);
  const stars=world.querySelector('.gs-stars');
  for(let i=0;i<48;i++){const s=doc.createElement('i');s.className='gs-star';s.style.left=(2+Math.random()*96)+'%';s.style.top=(4+Math.random()*91)+'%';s.style.setProperty('--d',(8+Math.random()*24)+'s');s.style.setProperty('--o',(.22+Math.random()*.72).toFixed(2));stars.appendChild(s)}

  const catalog=doc.getElementById('catalog');
  if(catalog&&!doc.querySelector('.gs-beyond')){const beyond=doc.createElement('section');beyond.className='gs-beyond';beyond.innerHTML='<div class="gs-beyond-copy"><small>G-SPORT / ORBIT</small><h2><span class="ru">За пределами<br>времени.</span><span class="en">Beyond<br>time.</span></h2><p><span class="ru">История не заканчивается магазином. Прокручивай дальше — пространство продолжает двигаться, а G-SPORT остаётся в центре кадра.</span><span class="en">The story does not end at the store. Keep scrolling — space keeps moving while G-SPORT stays at the center of the frame.</span></p></div>';catalog.insertAdjacentElement('afterend',beyond)}

  const update=()=>{const max=Math.max(1,doc.documentElement.scrollHeight-doc.defaultView.innerHeight),p=doc.defaultView.scrollY/max;world.style.setProperty('--px',(-42*p)+'px');world.style.setProperty('--py',(58*p)+'px');world.style.setProperty('--ps',(1+.09*p).toFixed(3))};
  doc.defaultView.addEventListener('scroll',update,{passive:true});update();
};
