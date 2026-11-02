(function(){
const G=window.GSportPatches=window.GSportPatches||{};
G.injectMobile=function(d){
 if(!d||d.getElementById('gs-mobile-style'))return;
 const s=d.createElement('style');s.id='gs-mobile-style';s.textContent=`
 @media(max-width:900px){
  html,body{overflow-x:hidden!important;-webkit-text-size-adjust:100%!important}
  body{touch-action:pan-y!important}
  .scene,[class*="journey-"]{min-height:100svh!important;height:auto!important;padding:74px 18px 88px!important;box-sizing:border-box!important}
  .scene{display:flex!important;flex-direction:column!important;justify-content:flex-start!important;align-items:stretch!important}
  .scene .copy,.scene .copy.right,.scene .copy.center,.tester-copy,.watch-explain-intro,.gate-copy{position:relative!important;left:auto!important;right:auto!important;top:auto!important;bottom:auto!important;width:100%!important;max-width:100%!important;margin:0!important;transform:none!important;text-align:left!important;z-index:12!important}
  .scene .copy h1,.scene .copy h2,.tester-copy h2,.watch-explain-intro h2,.gate-copy h2{font-size:clamp(38px,12vw,64px)!important;line-height:.9!important;max-width:92vw!important;overflow-wrap:normal!important;word-break:normal!important}
  .scene .copy p,.tester-copy p,.watch-explain-intro p,.gate-copy p{font-size:13px!important;line-height:1.62!important;max-width:88vw!important}
  #stage,.stage,[class*="watch-stage"]{position:relative!important;width:100vw!important;height:54svh!important;min-height:360px!important;margin:10px -18px 0!important;overflow:visible!important;z-index:5!important;touch-action:none!important}
  #stage canvas,.stage canvas,[class*="watch-stage"] canvas{max-width:100vw!important;max-height:58svh!important}
  .config-panel{position:relative!important;left:auto!important;right:auto!important;top:auto!important;bottom:auto!important;transform:none!important;width:100%!important;max-width:none!important;margin:16px 0 0!important;padding:14px!important;box-sizing:border-box!important;z-index:20!important}
  .config-panel .swatches{display:flex!important;flex-wrap:wrap!important;gap:10px!important}.config-panel .swatch{width:34px!important;height:34px!important}
  .tester-layout,.watch-explain-wrap{display:flex!important;flex-direction:column!important;width:100%!important;max-width:100%!important;gap:18px!important}
  .tester-copy,.tester-hud,.watch-explain-intro,.explain-grid{grid-column:auto!important;width:100%!important;max-width:100%!important;transform:none!important}
  .tester-hud{position:relative!important;padding:14px!important;box-sizing:border-box!important}.tester-manual{max-height:none!important;overflow:visible!important;display:grid!important;grid-template-columns:1fr!important}
  .explain-grid{display:grid!important;grid-template-columns:1fr!important;gap:10px!important}.explain-grid>*{min-width:0!important}
  .journey-down .gate-copy{position:relative!important;left:auto!important;top:auto!important;transform:none!important;width:100%!important}
  button,.tab,.chip,[role="button"]{min-height:42px!important}
  .catalog-footer,.finale-quote{min-height:auto!important;padding-left:18px!important;padding-right:18px!important;box-sizing:border-box!important}
 }
 @media(max-width:520px){
  .scene,[class*="journey-"]{padding-left:14px!important;padding-right:14px!important}
  #stage,.stage,[class*="watch-stage"]{margin-left:-14px!important;margin-right:-14px!important}
  .scene .copy h1,.scene .copy h2,.tester-copy h2,.watch-explain-intro h2,.gate-copy h2{font-size:clamp(34px,11.5vw,52px)!important}
 }
 `;d.head.appendChild(s);
};
})();