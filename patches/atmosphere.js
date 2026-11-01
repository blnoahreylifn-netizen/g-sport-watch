window.GSportPatches=window.GSportPatches||{};
window.GSportPatches.injectAtmosphere=function(doc){
  if(!doc||doc.getElementById('gs-atmosphere-style'))return;
  const style=doc.createElement('style');
  style.id='gs-atmosphere-style';
  style.textContent=`
  .gs-orbit-world{position:fixed;inset:0;z-index:3;pointer-events:none;overflow:hidden;opacity:.92;transition:opacity .8s ease;--px:0px;--py:0px;mix-blend-mode:screen}
  body.catalog-visible .gs-orbit-world{opacity:.34}
  #stage{z-index:1!important}.story,.nav,.progress,.lab-panel,#hoverCard{position:relative;z-index:5}
  .gs-earth-wrap{position:absolute;right:8vw;top:13vh;width:clamp(115px,13vw,210px);aspect-ratio:1;transform:translate3d(var(--px),var(--py),0);filter:drop-shadow(0 12px 30px rgba(0,0,0,.7));animation:gsFarFloat 18s ease-in-out infinite}
  .gs-earth-glow{position:absolute;inset:-9%;border-radius:50%;background:radial-gradient(circle,rgba(88,153,204,.14),rgba(44,85,128,.055) 50%,transparent 72%);filter:blur(13px);opacity:.7}
  .gs-earth{position:absolute;inset:0;border-radius:50%;background-image:url('https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/The_Blue_Marble_4463x4163.jpg/1200px-The_Blue_Marble_4463x4163.jpg');background-size:cover;background-position:center;box-shadow:inset -16px -10px 28px rgba(0,0,0,.34),0 0 0 1px rgba(180,215,240,.11);filter:saturate(.88) brightness(.78) contrast(1.04)}
  .gs-earth:after{content:"";position:absolute;inset:0;border-radius:50%;background:linear-gradient(105deg,rgba(255,255,255,.08),transparent 32% 62%,rgba(0,0,0,.22));}
  .gs-stars{position:absolute;inset:0}
  .gs-star{position:absolute;width:1.4px;height:1.4px;border-radius:50%;background:rgba(255,245,228,.72);box-shadow:0 0 7px rgba(216,170,103,.45);animation:gsDrift var(--d) ease-in-out infinite;opacity:var(--o)}
  .gs-shooting{position:absolute;left:var(--x);top:var(--y);width:clamp(90px,11vw,170px);height:1px;transform:rotate(-24deg);transform-origin:left center;background:linear-gradient(90deg,rgba(255,255,255,0),rgba(255,247,226,.95),rgba(255,216,165,.12),transparent);filter:drop-shadow(0 0 5px rgba(255,233,195,.55));opacity:0;animation:gsShoot var(--sd) linear infinite;animation-delay:var(--delay)}
  .gs-shooting:before{content:"";position:absolute;right:0;top:-1px;width:3px;height:3px;border-radius:50%;background:#fff8e8;box-shadow:0 0 11px rgba(255,236,198,.95)}
  @keyframes gsFarFloat{50%{transform:translate3d(calc(var(--px) - 5px),calc(var(--py) + 7px),0)}}
  @keyframes gsDrift{0%,100%{translate:0 0}50%{translate:9px -14px}}
  @keyframes gsShoot{0%,72%{opacity:0;translate:-10vw -5vh}74%{opacity:0}77%{opacity:.95}88%{opacity:.65}100%{opacity:0;translate:52vw 31vh}}
  .gs-beyond{position:relative;z-index:26;min-height:112vh;display:grid;place-items:center;overflow:hidden;background:radial-gradient(circle at 70% 45%,#16283b 0,#0b1119 27%,#050607 60%,#020203 100%);color:#f2eee8}
  .gs-beyond:before{content:"";position:absolute;width:min(26vw,370px);aspect-ratio:1;border-radius:50%;right:10vw;top:16vh;background-image:url('https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/The_Blue_Marble_4463x4163.jpg/1200px-The_Blue_Marble_4463x4163.jpg');background-size:cover;background-position:center;filter:saturate(.86) brightness(.72);box-shadow:0 0 55px rgba(69,140,187,.13)}
  .gs-beyond:after{content:"";position:absolute;inset:0;background:linear-gradient(90deg,rgba(0,0,0,.52),transparent 45%,rgba(0,0,0,.08))}
  .gs-beyond-copy{position:relative;z-index:2;width:min(1200px,90vw);margin:auto}
  .gs-beyond small{font-size:8px;letter-spacing:.3em;color:#c59a65}.gs-beyond h2{margin-top:18px;font:750 clamp(48px,7vw,110px)/.78 Manrope,Arial,sans-serif;letter-spacing:-.06em;text-transform:uppercase;max-width:7ch}.gs-beyond p{margin-top:22px;max-width:460px;color:#8d9298;font-size:10px;line-height:1.7}
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
