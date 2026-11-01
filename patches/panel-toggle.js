(function(){
const G=window.GSportPatches=window.GSportPatches||{};
G.injectPanelToggle=function(d){
  if(!d||d.getElementById('gs-panel-toggle-style'))return;
  const s=d.createElement('style');
  s.id='gs-panel-toggle-style';
  s.textContent=`
  .lab-panel{transition:opacity .22s ease,transform .22s ease!important}
  .lab-panel.gs-hidden{opacity:0!important;pointer-events:none!important;transform:translateY(18px) scale(.97)!important}
  #gs-panel-open{position:fixed;left:16px;bottom:18px;z-index:95;height:34px;padding:0 12px;border:1px solid rgba(255,255,255,.13);border-radius:999px;background:rgba(7,7,8,.78);backdrop-filter:blur(16px);color:#e7ddd3;font:700 8px/1 Inter,Arial,sans-serif;letter-spacing:.15em;cursor:pointer;display:none;box-shadow:0 14px 40px rgba(0,0,0,.35)}
  #gs-panel-open.show{display:block}
  @media(max-width:900px){#gs-panel-open{left:10px;bottom:10px}}
  `;
  d.head.appendChild(s);
  const lab=d.getElementById('labPanel');if(!lab)return;
  const opener=d.createElement('button');opener.id='gs-panel-open';opener.textContent='ПАНЕЛЬ';d.body.appendChild(opener);
  const close=lab.querySelector('.close')||d.getElementById('labClose');
  const hide=()=>{lab.classList.add('gs-hidden');lab.classList.remove('open');opener.classList.add('show')};
  const show=()=>{lab.classList.remove('gs-hidden');lab.classList.add('open');opener.classList.remove('show')};
  if(close)close.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();hide()},true);
  opener.addEventListener('click',show);
  const nav=d.getElementById('labToggle');if(nav)nav.addEventListener('click',()=>setTimeout(()=>lab.classList.contains('open')?show():hide(),0));
};
})();