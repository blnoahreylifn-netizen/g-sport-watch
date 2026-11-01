window.GSportPatches=window.GSportPatches||{};
window.GSportPatches.injectAtmosphere=function(doc){
  if(!doc||doc.getElementById('gs-atmosphere-style'))return;
  const style=doc.createElement('style');
  style.id='gs-atmosphere-style';
  style.textContent=`
  .gs-orbit-world{position:fixed;inset:0;z-index:.5;pointer-events:none;overflow:hidden;opacity:1;transition:opacity .8s ease;--px:0px;--py:0px;--ps:1}
  body.catalog-visible .gs-orbit-world{opacity:.12}
  .gs-earth-wrap{position:absolute;right:-6vw;top:13vh;width:min(44vw,650px);aspect-ratio:1;transform:translate3d(var(--px),var(--py),0) scale(var(--ps));filter:drop-shadow(0 40px 80px rgba(0,0,0,.5));animation:gsFloat 14s ease-in-out infinite}
  .gs-earth-glow{position:absolute;inset:-12%;border-radius:50%;background:radial-gradient(circle,rgba(81,145,189,.22),rgba(68,102,154,.08) 45%,transparent 70%);filter:blur(24px);animation:gsPulse 6s ease-in-out infinite}
  .gs-earth{position:absolute;inset:9%;border-radius:50%;overflow:hidden;background:
    radial-gradient(circle at 32% 28%,rgba(255,255,255,.55) 0 1.2%,transparent 1.6%),
    radial-gradient(circle at 62% 20%,rgba(223,239,247,.38) 0 1.5%,transparent 2%),
    radial-gradient(ellipse at 35% 37%,#758f5d 0 8%,transparent 8.7%),
    radial-gradient(ellipse at 48% 52%,#8d7d55 0 6%,transparent 6.7%),
    radial-gradient(ellipse at 66% 62%,#617d4e 0 7%,transparent 7.8%),
    radial-gradient(ellipse at 72% 34%,#789468 0 5%,transparent 5.8%),
    radial-gradient(ellipse at 27% 69%,#657b49 0 5%,transparent 5.8%),
    radial-gradient(circle at 36% 34%,#4b8bb5 0 42%,#1b4e78 72%,#0d2139 100%);
    box-shadow:inset -70px -35px 100px rgba(0,0,0,.78),inset 28px 18px 45px rgba(129,195,231,.2),0 0 0 1px rgba(180,221,245,.14),0 0 90px rgba(56,117,162,.13);animation:gsEarthTurn 38s linear infinite}
  .gs-earth:before{content:"";position:absolute;inset:-10%;border-radius:50%;background:
    repeating-linear-gradient(14deg,transparent 0 7%,rgba(255,255,255,.032) 7.5% 8.2%,transparent 8.7% 16%),
    radial-gradient(ellipse at 45% 30%,rgba(255,255,255,.18),transparent 36%);mix-blend-mode:screen;animation:gsClouds 19s linear infinite}
  .gs-earth:after{content:"";position:absolute;inset:0;border-radius:50%;background:linear-gradient(105deg,rgba(255,255,255,.18),transparent 28% 58%,rgba(0,0,0,.56) 82%);box-shadow:inset 0 0 26px rgba(130,195,230,.25)}
  .gs-orbit{position:absolute;right:-11vw;top:6vh;width:min(55vw,820px);aspect-ratio:1;border:1px solid rgba(211,183,145,.10);border-radius:50%;transform:rotate(-18deg);animation:gsOrbit 24s linear infinite}
  .gs-orbit:before,.gs-orbit:after{content:"";position:absolute;border-radius:50%;border:1px solid rgba(111,157,188,.065)}
  .gs-orbit:before{inset:11%}.gs-orbit:after{inset:23%}
  .gs-stars{position:absolute;inset:0}
  .gs-star{position:absolute;width:2px;height:2px;border-radius:50%;background:rgba(255,243,222,.7);box-shadow:0 0 10px rgba(216,170,103,.65);animation:gsDrift var(--d) linear infinite;opacity:var(--o)}
  .gs-star:nth-child(3n){width:1px;height:16px;border-radius:999px;background:linear-gradient(transparent,rgba(216,170,103,.55),transparent);transform:rotate(24deg)}
  @keyframes gsEarthTurn{to{transform:rotate(360deg)}}
  @keyframes gsClouds{to{transform:rotate(-360deg)}}
  @keyframes gsOrbit{to{transform:rotate(342deg)}}
  @keyframes gsFloat{50%{transform:translate3d(calc(var(--px) - 10px),calc(var(--py) + 14px),0) scale(calc(var(--ps) * 1.015))}}
  @keyframes gsPulse{50%{opacity:.62;transform:scale(1.045)}}
  @keyframes gsDrift{0%{translate:0 0}50%{translate:18px -26px}100%{translate:0 0}}
  .gs-beyond{position:relative;z-index:26;min-height:112vh;display:grid;place-items:center;overflow:hidden;background:radial-gradient(circle at 70% 45%,#16283b 0,#0b1119 27%,#050607 60%,#020203 100%);color:#f2eee8}
  .gs-beyond:before{content:"";position:absolute;width:min(66vw,900px);aspect-ratio:1;border-radius:50%;right:-20vw;top:5vh;background:radial-gradient(circle at 34% 30%,#5e98ba 0 5%,#285877 24%,#0e2842 54%,#06111c 72%);box-shadow:inset -100px -50px 150px rgba(0,0,0,.78),0 0 120px rgba(63,127,170,.16);animation:gsEarthTurn 54s linear infinite}
  .gs-beyond:after{content:"";position:absolute;inset:0;background:linear-gradient(90deg,rgba(0,0,0,.52),transparent 45%,rgba(0,0,0,.08))}
  .gs-beyond-copy{position:relative;z-index:2;width:min(1200px,90vw);margin:auto}
  .gs-beyond small{font-size:9px;letter-spacing:.3em;color:#c59a65}.gs-beyond h2{margin-top:20px;font:750 clamp(68px,12vw,176px)/.75 Manrope,Arial,sans-serif;letter-spacing:-.07em;text-transform:uppercase;max-width:6ch}.gs-beyond p{margin-top:28px;max-width:510px;color:#8d9298;font-size:12px;line-height:1.8}
  html[lang="en"] .gs-beyond .ru{display:none}html:not([lang="en"]) .gs-beyond .en{display:none}
  @media(max-width:760px){.gs-earth-wrap{width:78vw;right:-32vw;top:18vh}.gs-orbit{width:95vw;right:-42vw;top:12vh}.gs-beyond:before{width:105vw;right:-55vw;top:18vh}.gs-beyond-copy{padding-bottom:30vh}}
  `;
  doc.head.appendChild(style);

  const world=doc.createElement('div');world.className='gs-orbit-world';
  world.innerHTML='<div class="gs-stars"></div><div class="gs-orbit"></div><div class="gs-earth-wrap"><div class="gs-earth-glow"></div><div class="gs-earth"></div></div>';
  doc.body.prepend(world);
  const stars=world.querySelector('.gs-stars');
  for(let i=0;i<34;i++){const s=doc.createElement('i');s.className='gs-star';s.style.left=(3+Math.random()*94)+'%';s.style.top=(6+Math.random()*88)+'%';s.style.setProperty('--d',(9+Math.random()*22)+'s');s.style.setProperty('--o',(.18+Math.random()*.62).toFixed(2));stars.appendChild(s)}

  const catalog=doc.getElementById('catalog');
  if(catalog&&!doc.querySelector('.gs-beyond')){const beyond=doc.createElement('section');beyond.className='gs-beyond';beyond.innerHTML='<div class="gs-beyond-copy"><small>G-SPORT / ORBIT</small><h2><span class="ru">За пределами<br>времени.</span><span class="en">Beyond<br>time.</span></h2><p><span class="ru">История не заканчивается магазином. Прокручивай дальше — пространство продолжает двигаться, а G-SPORT остаётся в центре кадра.</span><span class="en">The story does not end at the store. Keep scrolling — space keeps moving while G-SPORT stays at the center of the frame.</span></p></div>';catalog.insertAdjacentElement('afterend',beyond)}

  const update=()=>{const max=Math.max(1,doc.documentElement.scrollHeight-doc.defaultView.innerHeight),p=doc.defaultView.scrollY/max;world.style.setProperty('--px',(-38*p)+'px');world.style.setProperty('--py',(52*p)+'px');world.style.setProperty('--ps',(1+.08*p).toFixed(3))};
  doc.defaultView.addEventListener('scroll',update,{passive:true});update();
};
