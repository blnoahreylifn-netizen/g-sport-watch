(function(){
const G=window.GSportPatches=window.GSportPatches||{};
G.initMobileShell=function(){
 if(innerWidth>900||document.getElementById('gs-mobile-shell-style'))return;
 const s=document.createElement('style');s.id='gs-mobile-shell-style';s.textContent=`
 @media(max-width:900px){
  html,body{height:100%;overflow:hidden;background:#050506}
  #app{position:fixed;inset:0;width:100%;height:100%;transform:none!important}
  #mobileProgress{position:fixed;left:0;top:0;height:2px;width:100%;z-index:190;pointer-events:none;background:rgba(255,255,255,.04)}
  #mobileProgress>i{display:block;height:100%;width:0;background:linear-gradient(90deg,#8c6842,#e6bd82,#fff0c7);box-shadow:0 0 12px rgba(230,189,130,.35);transition:width .08s linear}
  #detailDock{left:10px;right:10px;bottom:max(10px,env(safe-area-inset-bottom));width:auto;max-height:min(36vh,300px);padding:12px 13px;border-radius:16px;background:linear-gradient(145deg,rgba(7,9,12,.92),rgba(17,12,16,.9));backdrop-filter:blur(18px);-webkit-backdrop-filter:blur(18px);box-shadow:0 18px 55px rgba(0,0,0,.5)}
  #detailDock.collapsed{left:auto;right:10px;width:122px;padding:10px 12px}
  .detailBody h3{font-size:18px;margin:9px 0 5px}.detailBody p{font-size:10px;line-height:1.48}.detailBody .detailMeta{margin-top:7px}.detailTabs{gap:5px;margin-top:9px}.detailTabs button{min-height:34px;padding:7px 8px;font-size:7px}
  #liveBadge{font-size:6px;padding:6px 8px;background:rgba(5,6,8,.58)}
 }
 `;document.head.appendChild(s);
 const p=document.createElement('div');p.id='mobileProgress';p.innerHTML='<i></i>';document.body.appendChild(p);
 const dock=document.getElementById('detailDock');const toggle=document.getElementById('detailToggle');
 const collapse=()=>{if(!dock||dock.classList.contains('collapsed'))return;dock.classList.add('collapsed');if(toggle)toggle.textContent='+'};
 const f=document.getElementById('app');
 f?.addEventListener('load',()=>{try{const w=f.contentWindow,d=f.contentDocument,bar=p.firstElementChild;let last=0;const sync=()=>{const y=w.scrollY||d.documentElement.scrollTop||0;const max=Math.max(1,d.documentElement.scrollHeight-w.innerHeight);bar.style.width=Math.max(0,Math.min(100,y/max*100))+'%';if(Math.abs(y-last)>28)collapse();last=y};w.addEventListener('scroll',sync,{passive:true});sync()}catch(e){console.warn('mobile shell',e)}},{once:true});
};
})();