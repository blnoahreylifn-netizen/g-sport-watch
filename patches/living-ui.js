(function(){
const G=window.GSportPatches=window.GSportPatches||{};
G.injectLivingUI=function(d){
  if(!d||d.getElementById('gs-living-ui-style'))return;
  const s=d.createElement('style');s.id='gs-living-ui-style';s.textContent=`
  .gs-life-sheen{position:fixed;inset:0;pointer-events:none;z-index:4;background:linear-gradient(115deg,transparent 34%,rgba(255,255,255,.035) 44%,rgba(215,170,108,.055) 48%,transparent 57%);transform:translateX(-75%);animation:gsSheen 9s ease-in-out infinite;mix-blend-mode:screen}
  @keyframes gsSheen{0%,22%{transform:translateX(-75%);opacity:0}35%{opacity:.8}58%{transform:translateX(75%);opacity:.22}100%{transform:translateX(75%);opacity:0}}
  .gs-detail-panel{position:fixed;right:18px;bottom:18px;width:min(280px,22vw);z-index:88;padding:12px;border:1px solid rgba(255,255,255,.12);border-radius:16px;background:linear-gradient(145deg,rgba(10,13,17,.84),rgba(18,12,18,.74));backdrop-filter:blur(18px);box-shadow:0 22px 70px rgba(0,0,0,.38);color:#eee;transition:.3s ease}
  .gs-detail-panel small{display:block;font:700 6px Manrope,Arial;letter-spacing:.24em;color:#c99b64;margin-bottom:8px}.gs-detail-panel h3{margin:0 0 6px;font:700 16px Manrope,Arial;letter-spacing:-.03em}.gs-detail-panel p{margin:0;color:#9ca1a6;font:9px/1.55 Manrope,Arial;min-height:42px}
  .gs-detail-tabs{display:flex;flex-wrap:wrap;gap:5px;margin-top:10px}.gs-detail-tab{border:1px solid rgba(255,255,255,.11);background:rgba(255,255,255,.035);color:#bbb;border-radius:999px;padding:5px 7px;font:700 6px Manrope,Arial;letter-spacing:.08em;cursor:pointer;transition:.2s}.gs-detail-tab:hover,.gs-detail-tab.active{color:#fff;border-color:rgba(216,170,103,.5);background:rgba(216,170,103,.11)}
  .gs-detail-panel.compact{width:132px}.gs-detail-panel.compact p,.gs-detail-panel.compact .gs-detail-tabs{display:none}.gs-detail-toggle{position:absolute;right:8px;top:8px;border:0;background:transparent;color:#8f969d;font-size:13px;cursor:pointer}
  #stage canvas{transition:filter .35s ease;filter:contrast(1.03) saturate(1.03)}
  body.gs-watch-awake #stage canvas{filter:contrast(1.055) saturate(1.06) brightness(1.015)}
  @media(max-width:900px){.gs-detail-panel{right:10px;bottom:68px;width:min(280px,78vw)}.gs-detail-tabs{max-height:82px;overflow:auto}}
  `;d.head.appendChild(s);
  const sheen=d.createElement('div');sheen.className='gs-life-sheen';d.body.appendChild(sheen);
  const panel=d.createElement('aside');panel.className='gs-detail-panel';panel.innerHTML='<button class="gs-detail-toggle" title="Свернуть">−</button><small>G-SPORT / ДЕТАЛИ</small><h3 id="gsDetailTitle">КОРПУС</h3><p id="gsDetailText">Несущая оболочка часов. Защищает механизм и задаёт форму всей конструкции.</p><div class="gs-detail-tabs"></div>';d.body.appendChild(panel);
  const data={
    'КОРПУС':'Несущая оболочка часов. Защищает механизм и задаёт форму всей конструкции.',
    'СТЕКЛО':'Прозрачный защитный слой над циферблатом. Ловит отражения и сохраняет читаемость.',
    'ЦИФЕРБЛАТ':'Главная плоскость индикации времени. На ней собраны метки, логотип и визуальная иерархия.',
    'СТРЕЛКИ':'Часовая, минутная и секундная индикация. Они дают мгновенное считывание времени.',
    'БЕЗЕЛЬ':'Кольцо вокруг стекла. Фиксирует фронтальную часть и визуально собирает корпус.',
    'ГОЛОВКА':'Орган ручной настройки часов. Через неё обычно заводят механизм и переводят время.',
    'МЕХАНИЗМ':'Система шестерён, барабана, спуска и баланса. Именно она превращает энергию в точный ход.',
    'ЗАДНЯЯ КРЫШКА':'Закрывает механизм с обратной стороны и завершает герметичную конструкцию.'
  };
  const tabs=panel.querySelector('.gs-detail-tabs'),title=panel.querySelector('#gsDetailTitle'),text=panel.querySelector('#gsDetailText');
  Object.entries(data).forEach(([k,v],i)=>{const b=d.createElement('button');b.className='gs-detail-tab'+(i===0?' active':'');b.textContent=k;b.onclick=()=>{tabs.querySelectorAll('button').forEach(x=>x.classList.remove('active'));b.classList.add('active');title.textContent=k;text.textContent=v;d.body.classList.add('gs-watch-awake');clearTimeout(d._gsAwakeTimer);d._gsAwakeTimer=setTimeout(()=>d.body.classList.remove('gs-watch-awake'),1200)};tabs.appendChild(b)});
  panel.querySelector('.gs-detail-toggle').onclick=()=>{panel.classList.toggle('compact');panel.querySelector('.gs-detail-toggle').textContent=panel.classList.contains('compact')?'+':'−'};
  let px=.5,py=.5;d.addEventListener('pointermove',e=>{px=e.clientX/innerWidth;py=e.clientY/innerHeight;sheen.style.transform=`translateX(${(px-.5)*18}%) translateY(${(py-.5)*8}%)`},{passive:true});
};
})();