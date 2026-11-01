window.GSportPatches=window.GSportPatches||{};
window.GSportPatches.injectAtmosphere=function(doc){
  if(!doc||doc.getElementById('gs-atmosphere-style'))return;
  const style=doc.createElement('style');
  style.id='gs-atmosphere-style';
  style.textContent=`
  :root{--gs-gold:#e6b36d;--gs-coral:#ff6a55;--gs-pink:#d64b7e;--gs-violet:#7057ff;--gs-blue:#42b7ff;--gs-mint:#5ce0bf;--gs-cream:#f6e7d6}
  html,body{background:#080507!important}
  body{background:radial-gradient(circle at 76% 18%,rgba(112,87,255,.10),transparent 24%),radial-gradient(circle at 22% 72%,rgba(255,106,85,.13),transparent 28%),linear-gradient(155deg,#080507,#160b10 44%,#09070d 100%)!important}
  .backdrop{background:radial-gradient(circle at 62% 34%,rgba(82,115,255,.14),transparent 28%),radial-gradient(circle at 32% 62%,rgba(255,94,93,.17),transparent 34%),linear-gradient(#0e080b,#050407 74%)!important}
  .backdrop:before{background:radial-gradient(circle at var(--mx,50%) var(--my,50%),rgba(255,205,139,.16),rgba(101,94,255,.08) 18%,transparent 31%)!important}
  .grid{opacity:.66;filter:saturate(1.22)}
  .scene h1,.scene h2{color:#f8efe6;text-shadow:0 0 34px rgba(255,182,117,.08),0 0 100px rgba(112,87,255,.06)}
  .eyebrow,.kicker{color:#efba72!important}.scene p,.hint,.config-note,.lab-note,#hoverCard p{color:#b8aaa5!important}
  .brand{color:#f5e4cf;text-shadow:0 0 22px rgba(239,186,114,.13)}
  .live{color:#e2d3c7!important}.dot,.status-dot{background:#71e7b7!important;box-shadow:0 0 18px rgba(92,224,191,.9)!important}
  .progress,.explode-meter i{background:linear-gradient(90deg,#ff6a55,#f0b86a 38%,#7057ff 68%,#42b7ff)!important;box-shadow:0 0 20px rgba(112,87,255,.25)}

  .config-panel,.lab-panel,#hoverCard{backdrop-filter:blur(24px) saturate(135%)!important}
  .config-panel{background:linear-gradient(155deg,rgba(30,14,20,.91),rgba(13,11,22,.88))!important;border:1px solid rgba(239,186,114,.30)!important;box-shadow:0 30px 90px rgba(0,0,0,.46),-18px 0 55px rgba(214,75,126,.07),18px 0 55px rgba(66,183,255,.06)!important}
  .lab-panel{background:linear-gradient(155deg,rgba(20,11,17,.95),rgba(11,10,20,.94))!important;border:1px solid rgba(230,179,109,.27)!important;box-shadow:0 34px 110px rgba(0,0,0,.55),0 0 46px rgba(112,87,255,.08)!important}
  #hoverCard{background:linear-gradient(155deg,rgba(20,11,17,.90),rgba(10,10,18,.86))!important;border-color:rgba(230,179,109,.24)!important;box-shadow:0 22px 70px rgba(0,0,0,.42),0 0 30px rgba(66,183,255,.055)!important}
  #hoverCard small{color:#efba72!important}#hoverCard h3{color:#f7e8d8!important}
  .config-label,.lab-title{color:#bd9d83!important}.config-label b,.lab-title span:last-child,.lab-head b{color:#f3e4d3!important}.lab-head small{color:#c49770!important}
  .swatch{box-shadow:inset 0 0 0 3px rgba(0,0,0,.22),0 8px 20px rgba(0,0,0,.22)!important;transition:.22s ease!important}.swatch:hover{transform:translateY(-4px) scale(1.07)!important;box-shadow:0 12px 28px rgba(0,0,0,.28),0 0 20px rgba(255,194,127,.16)!important}.swatch.active:after{border-color:#f2c888!important;box-shadow:0 0 18px rgba(242,200,136,.26)}
  .lab-btn,.part-btn,.controls-toggle{background:linear-gradient(180deg,rgba(255,255,255,.06),rgba(255,255,255,.025))!important;border-color:rgba(255,255,255,.12)!important;color:#f2e8de!important;transition:.2s ease!important}.lab-btn:hover,.part-btn:hover,.part-btn.active,.controls-toggle:hover,.controls-toggle.active{transform:translateY(-1px);border-color:rgba(239,186,114,.48)!important;background:linear-gradient(135deg,rgba(255,106,85,.16),rgba(112,87,255,.14))!important;box-shadow:0 0 22px rgba(112,87,255,.10)!important}input[type="range"]{accent-color:#e7a95d!important}

  .gs-vivid-world{position:fixed;inset:0;pointer-events:none;z-index:2;overflow:hidden;mix-blend-mode:screen;--mxp:0px;--myp:0px}
  .gs-orb{position:absolute;border-radius:50%;filter:blur(62px);opacity:.26;will-change:transform;animation:gsOrbFloat var(--dur) ease-in-out infinite alternate;transform:translate3d(calc(var(--mxp)*var(--px)),calc(var(--myp)*var(--py)),0)}
  .gs-orb.o1{width:42vw;height:42vw;left:-12vw;top:8vh;background:radial-gradient(circle,#ff6a55 0,rgba(214,75,126,.64) 35%,transparent 72%);--dur:15s;--px:.22;--py:.14}
  .gs-orb.o2{width:38vw;height:38vw;right:-10vw;top:18vh;background:radial-gradient(circle,#42b7ff 0,rgba(112,87,255,.58) 38%,transparent 72%);--dur:19s;--px:-.18;--py:.17}
  .gs-orb.o3{width:34vw;height:34vw;left:28vw;bottom:-12vw;background:radial-gradient(circle,#f1b662 0,rgba(92,224,191,.38) 36%,transparent 70%);--dur:17s;--px:.13;--py:-.19}
  .gs-orb.o4{width:24vw;height:24vw;left:38vw;top:18vh;background:radial-gradient(circle,rgba(255,255,255,.46),rgba(255,190,124,.18) 35%,transparent 72%);filter:blur(82px);opacity:.13;--dur:12s;--px:-.09;--py:.12}
  .gs-color-ribbon{position:absolute;left:-20vw;top:46vh;width:140vw;height:16vh;background:linear-gradient(90deg,transparent,rgba(255,84,92,.09),rgba(239,186,114,.10),rgba(112,87,255,.11),rgba(66,183,255,.08),transparent);filter:blur(34px);transform:rotate(-8deg);animation:gsRibbon 18s ease-in-out infinite alternate}
  .gs-cursor-glow{position:absolute;width:24vw;height:24vw;left:var(--cx,50%);top:var(--cy,50%);border-radius:50%;background:radial-gradient(circle,rgba(255,223,175,.13),rgba(112,87,255,.06) 34%,transparent 68%);filter:blur(28px);transform:translate(-50%,-50%);transition:left .12s linear,top .12s linear}
  @keyframes gsOrbFloat{0%{translate:-2vw -1vh;scale:.94}50%{scale:1.06}100%{translate:3vw 4vh;scale:.98}}
  @keyframes gsRibbon{0%{translate:-6vw -3vh;rotate:-2deg;opacity:.55}100%{translate:8vw 5vh;rotate:3deg;opacity:1}}

  .gs-orbit-world{position:fixed;inset:0;z-index:3;pointer-events:none;overflow:hidden;opacity:.88;transition:opacity .8s ease;--px:0px;--py:0px;mix-blend-mode:screen}
  body.catalog-visible .gs-orbit-world{opacity:.34}#stage{z-index:1!important}.story,.nav,.progress,.lab-panel,#hoverCard{position:relative;z-index:5}
  .gs-earth-wrap{position:absolute;right:8vw;top:13vh;width:clamp(115px,13vw,210px);aspect-ratio:1;transform:translate3d(var(--px),var(--py),0);filter:drop-shadow(0 12px 35px rgba(0,0,0,.72));animation:gsFarFloat 18s ease-in-out infinite}
  .gs-earth-glow{position:absolute;inset:-14%;border-radius:50%;background:conic-gradient(from 30deg,rgba(66,183,255,.16),rgba(112,87,255,.10),rgba(255,106,85,.13),rgba(239,186,114,.12),rgba(66,183,255,.16));filter:blur(18px);opacity:.82;animation:gsGlowSpin 18s linear infinite}
  .gs-earth{position:absolute;inset:0;border-radius:50%;background-image:url('https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/The_Blue_Marble_4463x4163.jpg/1200px-The_Blue_Marble_4463x4163.jpg');background-size:cover;background-position:center;box-shadow:inset -16px -10px 28px rgba(0,0,0,.34),0 0 0 1px rgba(232,184,125,.12);filter:saturate(1.05) brightness(.76) contrast(1.06);animation:gsEarthTint 12s ease-in-out infinite alternate}
  .gs-earth:after{content:"";position:absolute;inset:0;border-radius:50%;background:linear-gradient(105deg,rgba(255,235,205,.10),transparent 32% 62%,rgba(0,0,0,.22))}
  .gs-stars{position:absolute;inset:0}.gs-star{position:absolute;width:1.6px;height:1.6px;border-radius:50%;background:rgba(255,246,232,.78);box-shadow:0 0 8px rgba(216,170,103,.5);animation:gsDrift var(--d) ease-in-out infinite;opacity:var(--o)}
  .gs-shooting{position:absolute;left:var(--x);top:var(--y);width:clamp(90px,11vw,170px);height:1px;transform:rotate(-24deg);transform-origin:left center;background:linear-gradient(90deg,transparent,rgba(255,255,255,.98),rgba(255,176,116,.45),rgba(112,87,255,.12),transparent);filter:drop-shadow(0 0 7px rgba(255,233,195,.65));opacity:0;animation:gsShoot var(--sd) linear infinite;animation-delay:var(--delay)}
  @keyframes gsFarFloat{50%{transform:translate3d(calc(var(--px) - 5px),calc(var(--py) + 7px),0)}}@keyframes gsGlowSpin{to{rotate:360deg}}@keyframes gsEarthTint{from{filter:saturate(.92) brightness(.72)}to{filter:saturate(1.18) brightness(.80)}}@keyframes gsDrift{0%,100%{translate:0 0}50%{translate:11px -16px}}@keyframes gsShoot{0%,72%{opacity:0;translate:-10vw -5vh}76%{opacity:1}88%{opacity:.7}100%{opacity:0;translate:52vw 31vh}}

  .gs-beyond{position:relative;z-index:26;min-height:112vh;display:grid;place-items:center;overflow:hidden;background:radial-gradient(circle at 72% 42%,rgba(66,183,255,.22),transparent 24%),radial-gradient(circle at 32% 62%,rgba(255,106,85,.19),transparent 28%),linear-gradient(145deg,#150a12,#111022 42%,#060508 100%);color:#f2eee8}
  .gs-beyond:before{content:"";position:absolute;width:min(26vw,370px);aspect-ratio:1;border-radius:50%;right:10vw;top:16vh;background-image:url('https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/The_Blue_Marble_4463x4163.jpg/1200px-The_Blue_Marble_4463x4163.jpg');background-size:cover;background-position:center;filter:saturate(1.04) brightness(.73);box-shadow:0 0 75px rgba(66,183,255,.14),0 0 110px rgba(214,75,126,.08)}
  .gs-beyond:after{content:"";position:absolute;inset:0;background:linear-gradient(90deg,rgba(0,0,0,.50),transparent 46%,rgba(112,87,255,.08))}.gs-beyond-copy{position:relative;z-index:2;width:min(1200px,90vw);margin:auto}.gs-beyond small{font-size:8px;letter-spacing:.3em;color:#efba72}.gs-beyond h2{margin-top:18px;font:750 clamp(48px,7vw,110px)/.78 Manrope,Arial,sans-serif;letter-spacing:-.06em;text-transform:uppercase;max-width:7ch}.gs-beyond p{margin-top:22px;max-width:460px;color:#aa9ba5;font-size:10px;line-height:1.7}
  html[lang="en"] .gs-beyond .ru{display:none}html:not([lang="en"]) .gs-beyond .en{display:none}
  @media(max-width:760px){.gs-orb{filter:blur(48px);opacity:.22}.gs-orb.o1,.gs-orb.o2{width:72vw;height:72vw}.gs-orb.o3{width:62vw;height:62vw}.gs-earth-wrap{width:105px;right:7vw;top:15vh}.gs-beyond:before{width:150px;right:7vw;top:18vh}.gs-shooting{width:110px}}
  `;
  doc.head.appendChild(style);

  const vivid=doc.createElement('div');vivid.className='gs-vivid-world';vivid.innerHTML='<i class="gs-orb o1"></i><i class="gs-orb o2"></i><i class="gs-orb o3"></i><i class="gs-orb o4"></i><i class="gs-color-ribbon"></i><i class="gs-cursor-glow"></i>';doc.body.prepend(vivid);
  const world=doc.createElement('div');world.className='gs-orbit-world';world.innerHTML='<div class="gs-stars"></div><div class="gs-earth-wrap"><div class="gs-earth-glow"></div><div class="gs-earth"></div></div><div class="gs-shoot-wrap"></div>';doc.body.prepend(world);
  const stars=world.querySelector('.gs-stars');for(let i=0;i<58;i++){const s=doc.createElement('i');s.className='gs-star';s.style.left=(2+Math.random()*96)+'%';s.style.top=(4+Math.random()*91)+'%';s.style.setProperty('--d',(7+Math.random()*22)+'s');s.style.setProperty('--o',(.16+Math.random()*.62).toFixed(2));stars.appendChild(s)}
  const shoot=world.querySelector('.gs-shoot-wrap');for(let i=0;i<11;i++){const s=doc.createElement('i');s.className='gs-shooting';s.style.setProperty('--x',(Math.random()*62-8)+'%');s.style.setProperty('--y',(Math.random()*55-8)+'%');s.style.setProperty('--sd',(7+Math.random()*7)+'s');s.style.setProperty('--delay',(-Math.random()*14)+'s');shoot.appendChild(s)}

  const catalog=doc.getElementById('catalog');if(catalog&&!doc.querySelector('.gs-beyond')){const beyond=doc.createElement('section');beyond.className='gs-beyond';beyond.innerHTML='<div class="gs-beyond-copy"><small>G-SPORT / ORBIT</small><h2><span class="ru">За пределами<br>времени.</span><span class="en">Beyond<br>time.</span></h2><p><span class="ru">История не заканчивается магазином. Прокручивай дальше — пространство продолжает двигаться, а G-SPORT остаётся в центре кадра.</span><span class="en">The story does not end at the store. Keep scrolling — space keeps moving while G-SPORT stays at the center of the frame.</span></p></div>';catalog.insertAdjacentElement('afterend',beyond)}

  const update=()=>{const max=Math.max(1,doc.documentElement.scrollHeight-doc.defaultView.innerHeight),p=doc.defaultView.scrollY/max;world.style.setProperty('--px',(-18*p)+'px');world.style.setProperty('--py',(26*p)+'px');vivid.style.filter='hue-rotate('+(p*18-5)+'deg) saturate('+(1.02+p*.16)+')'};doc.defaultView.addEventListener('scroll',update,{passive:true});update();
  doc.addEventListener('pointermove',e=>{const x=e.clientX/doc.defaultView.innerWidth,y=e.clientY/doc.defaultView.innerHeight;vivid.style.setProperty('--mxp',((x-.5)*34)+'px');vivid.style.setProperty('--myp',((y-.5)*26)+'px');vivid.style.setProperty('--cx',(x*100)+'%');vivid.style.setProperty('--cy',(y*100)+'%')},{passive:true});
};
