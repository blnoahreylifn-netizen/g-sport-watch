(function(){
const G=window.GSportPatches=window.GSportPatches||{};
G.injectLayoutFix=function(d){const s=d.createElement('style');s.id='gs-layout-fix-2';s.textContent=`
/* MORE CINEMA, LESS UI — keep every feature, move text/control chrome to the edges */
@media (min-width:901px){
  .scene{width:min(1580px,98vw)!important}
  .scene .copy{max-width:320px!important;width:min(24vw,320px)!important;z-index:8!important}
  .scene h1{font-size:clamp(42px,5.2vw,78px)!important;line-height:.86!important;letter-spacing:-.055em!important}
  .scene h2{font-size:clamp(38px,4.8vw,70px)!important;line-height:.86!important;letter-spacing:-.05em!important}
  .scene p{font-size:11px!important;line-height:1.65!important;margin-top:16px!important;max-width:310px!important}
  .kicker{font-size:7px!important;letter-spacing:.25em!important;margin-bottom:11px!important}
  .hint{font-size:7px!important;margin-top:15px!important;line-height:1.5!important}
  .chapter-no{font-size:7px!important;left:1vw!important;top:10vh!important}

  /* FIRST SCENE: smaller and moved right for a clean watch hero */
  #s1 .copy{
    position:absolute!important;left:auto!important;right:3.2vw!important;top:28vh!important;
    margin:0!important;transform:none!important;text-align:left!important;
    width:min(22vw,300px)!important;max-width:300px!important;
  }
  #s1 .copy h1{font-size:clamp(38px,4.5vw,66px)!important}
  #s1 .copy p{max-width:280px!important}

  /* right-side story copy stays compact */
  .scene .copy.right,#s2 .copy,#s5 .copy,#s7 .copy{
    margin-left:auto!important;margin-right:3vw!important;transform:none!important;
    width:min(22vw,310px)!important;max-width:310px!important;text-align:right!important;
  }
  .scene .copy.right p{margin-left:auto!important}
  .scene .copy.center{max-width:300px!important;width:min(22vw,300px)!important}

  /* COLOR STUDIO: control panel lives low-right, leaving watch clear */
  .config-scene .copy{
    position:absolute!important;left:auto!important;right:3vw!important;top:12vh!important;
    width:min(21vw,280px)!important;max-width:280px!important;text-align:right!important;transform:none!important;
  }
  .config-scene .copy p{margin-left:auto!important}
  .config-panel{
    position:absolute!important;left:auto!important;right:2vw!important;top:auto!important;bottom:4.5vh!important;
    width:min(250px,18vw)!important;padding:10px!important;border-radius:14px!important;transform:none!important;
    max-height:42vh!important;overflow:auto!important;
  }
  .config-panel .config-row+.config-row{margin-top:7px!important}
  .config-panel .config-label{margin-bottom:4px!important;font-size:7px!important;gap:8px!important}
  .config-panel .config-label b{font-size:7px!important;max-width:120px!important}
  .config-panel .swatches{gap:5px!important}
  .config-panel .swatch{width:21px!important;height:21px!important}
  .config-panel .config-note{font-size:7px!important;line-height:1.35!important;margin-top:7px!important}

  /* TESTER: title becomes a small label; HUD goes bottom-right */
  .tester-layout{display:block!important;width:min(1580px,98vw)!important;position:relative!important;min-height:100vh!important}
  .tester-copy{
    position:absolute!important;right:3vw!important;top:12vh!important;left:auto!important;
    width:min(22vw,280px)!important;max-width:280px!important;text-align:right!important;
    transform:none!important;margin:0!important;
  }
  .tester-copy h2,.journey-tester .tester-copy h2{
    font-size:clamp(22px,2.2vw,34px)!important;line-height:.92!important;letter-spacing:-.035em!important;
  }
  .tester-copy>p{font-size:9px!important;line-height:1.5!important;max-width:260px!important;margin-left:auto!important;margin-top:10px!important}
  .tester-badge{font-size:6px!important;padding:5px 8px!important;margin-top:9px!important}
  .tester-manual{max-height:22vh!important;margin-top:10px!important;font-size:7px!important}
  .tester-manual div{padding:7px 9px!important}
  .journey-tester .tester-hud{
    position:absolute!important;right:2vw!important;bottom:3vh!important;top:auto!important;left:auto!important;
    width:min(260px,19vw)!important;max-width:260px!important;padding:11px!important;border-radius:15px!important;
    transform:none!important;margin:0!important;justify-self:auto!important;align-self:auto!important;
  }
  .journey-tester .tester-hud h3{font-size:14px!important;margin-bottom:3px!important}
  .journey-tester .tester-hud p{font-size:7px!important;line-height:1.4!important;margin-bottom:8px!important}
  .journey-tester .tester-actions{gap:5px!important}
  .journey-tester .tester-actions button{min-height:30px!important;font-size:7px!important;padding:5px!important}

  /* explanation page also gives the watch more room */
  .watch-explain-wrap{width:min(1580px,98vw)!important;grid-template-columns:minmax(250px,300px) minmax(420px,1fr) minmax(340px,430px)!important;gap:3vw!important}
  .watch-explain-intro{max-width:300px!important}
  .watch-explain-intro h2{font-size:clamp(36px,4.4vw,62px)!important}
  .explain-grid{max-width:430px!important;margin-right:1.5vw!important}

  .journey-old .gate-copy{margin-left:3vw!important;max-width:420px!important}
  .journey-down .gate-copy{max-width:560px!important;width:min(56vw,560px)!important}
  .journey-down .gate-copy h2{font-size:clamp(40px,4.8vw,72px)!important}
}

@media (min-width:901px) and (max-width:1280px){
  #s1 .copy,.tester-copy,.config-scene .copy{right:2vw!important;width:250px!important;max-width:250px!important}
  .scene .copy.right,#s2 .copy,#s5 .copy,#s7 .copy{margin-right:2vw!important;width:270px!important;max-width:270px!important}
  .config-panel{right:1.4vw!important;width:225px!important}
  .journey-tester .tester-hud{right:1.4vw!important;width:235px!important}
}

@media (max-width:900px){
  .scene .copy,.scene .copy.right,.scene .copy.center{max-width:78vw!important;width:auto!important;margin-left:0!important;margin-right:0!important;text-align:left!important}
  .scene h1{font-size:14vw!important}.scene h2{font-size:11vw!important}
  #s1 .copy{margin-left:auto!important;margin-right:4vw!important;max-width:70vw!important}
  .config-panel{width:min(86vw,330px)!important;margin-left:auto!important;margin-right:0!important}
  .tester-copy h2{font-size:10vw!important}
  .journey-tester .tester-hud{width:min(86vw,330px)!important;margin-left:auto!important}
}
`;d.head.appendChild(s)};
})();