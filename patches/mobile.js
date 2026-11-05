(function(){
const G=window.GSportPatches=window.GSportPatches||{};
G.injectMobile=function(d){
 if(!d||d.getElementById('gs-mobile-style'))return;
 const s=d.createElement('style');s.id='gs-mobile-style';s.textContent=`
 @media(max-width:900px){
  html,body{overflow-x:hidden!important;overflow-y:auto!important;height:auto!important;min-height:100%!important;-webkit-overflow-scrolling:touch!important;-webkit-text-size-adjust:100%!important;overscroll-behavior-y:auto!important;scroll-behavior:smooth!important}
  body{touch-action:pan-y pinch-zoom!important}
  .scene,[class*="journey-"]{min-height:100svh!important;height:auto!important;padding:76px 18px 94px!important;box-sizing:border-box!important;touch-action:pan-y pinch-zoom!important;overflow:visible!important}
  .scene{display:flex!important;flex-direction:column!important;justify-content:flex-start!important;align-items:stretch!important}
  .scene .copy,.scene .copy.right,.scene .copy.center,.tester-copy,.watch-explain-intro,.gate-copy{position:relative!important;inset:auto!important;width:100%!important;max-width:100%!important;margin:0!important;transform:none!important;text-align:left!important;z-index:12!important;pointer-events:auto!important}
  .scene .copy h1,.scene .copy h2,.tester-copy h2,.watch-explain-intro h2,.gate-copy h2{font-size:clamp(36px,11vw,58px)!important;line-height:.92!important;max-width:94vw!important;letter-spacing:-.045em!important;text-wrap:balance!important}
  .scene .copy p,.tester-copy p,.watch-explain-intro p,.gate-copy p{font-size:13px!important;line-height:1.62!important;max-width:90vw!important}
  #stage,.stage,[class*="watch-stage"]{position:relative!important;width:100vw!important;height:52svh!important;min-height:330px!important;max-height:560px!important;margin:12px -18px 0!important;overflow:visible!important;z-index:5!important;touch-action:pan-y pinch-zoom!important}
  #stage canvas,.stage canvas,[class*="watch-stage"] canvas{width:100%!important;max-width:100vw!important;max-height:56svh!important;touch-action:pan-y pinch-zoom!important}
  .config-panel{position:relative!important;inset:auto!important;transform:none!important;width:100%!important;max-width:none!important;margin:14px 0 0!important;padding:14px!important;box-sizing:border-box!important;z-index:20!important;border-radius:18px!important;max-height:none!important;overflow:visible!important}
  .config-panel .swatches{display:flex!important;flex-wrap:wrap!important;gap:10px!important}.config-panel .swatch{width:38px!important;height:38px!important}
  .tester-layout,.watch-explain-wrap{display:flex!important;flex-direction:column!important;width:100%!important;max-width:100%!important;gap:18px!important}
  .tester-copy,.tester-hud,.watch-explain-intro,.explain-grid{grid-column:auto!important;width:100%!important;max-width:100%!important;transform:none!important}
  .tester-hud{position:relative!important;padding:14px!important;box-sizing:border-box!important}.tester-manual{max-height:none!important;overflow:visible!important;display:grid!important;grid-template-columns:1fr!important}
  .explain-grid{display:grid!important;grid-template-columns:1fr!important;gap:10px!important}.explain-grid>*{min-width:0!important}
  .journey-down .gate-copy{position:relative!important;inset:auto!important;transform:none!important;width:100%!important}
  button,.tab,.chip,[role="button"]{min-height:44px!important;touch-action:manipulation!important;-webkit-tap-highlight-color:transparent!important}
  .catalog-footer,.finale-quote{min-height:auto!important;padding-left:18px!important;padding-right:18px!important;box-sizing:border-box!important}
  #gs-panel-open{bottom:max(14px,env(safe-area-inset-bottom))!important;min-height:44px!important;padding:0 16px!important}
 }
 @media(max-width:520px){
  .scene,[class*="journey-"]{padding-left:14px!important;padding-right:14px!important}
  #stage,.stage,[class*="watch-stage"]{margin-left:-14px!important;margin-right:-14px!important;height:49svh!important;min-height:300px!important}
  .scene .copy h1,.scene .copy h2,.tester-copy h2,.watch-explain-intro h2,.gate-copy h2{font-size:clamp(34px,11vw,50px)!important}
 }
 @media(max-width:900px) and (orientation:landscape){
  .scene,[class*="journey-"]{padding-top:56px!important;min-height:120svh!important}
  #stage,.stage,[class*="watch-stage"]{height:72svh!important;max-height:none!important}
 }
 `;d.head.appendChild(s);
 const win=d.defaultView;if(!win||!win.matchMedia('(max-width:900px)').matches)return;
 const unlock=()=>{d.documentElement.style.setProperty('overflow-y','auto','important');d.body.style.setProperty('overflow-y','auto','important');d.body.style.setProperty('touch-action','pan-y pinch-zoom','important');d.querySelectorAll('canvas,#stage,.stage,[class*="watch-stage"],.scene,[class*="journey-"]').forEach(el=>el.style.setProperty('touch-action','pan-y pinch-zoom','important'))};
 unlock();setTimeout(unlock,350);setTimeout(unlock,1200);setTimeout(unlock,2600);
 const lab=d.getElementById('labPanel');if(lab&&!lab.classList.contains('gs-hidden')){lab.classList.add('gs-hidden');lab.classList.remove('open');const op=d.getElementById('gs-panel-open');if(op)op.classList.add('show')}
 let sy=0,sx=0,moved=false;
 d.addEventListener('touchstart',e=>{if(e.touches.length!==1)return;sy=e.touches[0].clientY;sx=e.touches[0].clientX;moved=false},{passive:true});
 d.addEventListener('touchmove',e=>{if(e.touches.length!==1)return;const dy=e.touches[0].clientY-sy,dx=e.touches[0].clientX-sx;if(Math.abs(dy)>8&&Math.abs(dy)>Math.abs(dx)*.8)moved=true},{passive:true});
 d.querySelectorAll('button,[role="button"],.swatch,.tab,.chip').forEach(el=>el.addEventListener('click',e=>{if(moved){e.preventDefault();e.stopPropagation();moved=false}},true));
};
})();