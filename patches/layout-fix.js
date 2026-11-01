(function(){
const G=window.GSportPatches=window.GSportPatches||{};
G.injectLayoutFix=function(d){const s=d.createElement('style');s.textContent=`
@media (min-width:901px){
  .scene .copy.right{
    margin-left:auto!important;
    margin-right:3.2vw!important;
    transform:none!important;
    width:min(25vw,360px)!important;
    max-width:360px!important;
    box-sizing:border-box!important;
    overflow:visible!important;
  }
  #s2 .copy,#s5 .copy,#s7 .copy{
    margin-left:auto!important;
    margin-right:3.2vw!important;
    transform:none!important;
    width:min(25vw,360px)!important;
    max-width:360px!important;
  }
  .scene .copy.right h1,.scene .copy.right h2,.scene .copy.right p{
    max-width:100%!important;
    overflow:visible!important;
  }
  .journey-tester .tester-hud{
    margin-right:2vw!important;
  }
  .explain-grid{
    margin-right:1.8vw!important;
  }
}
@media (min-width:901px) and (max-width:1280px){
  .scene .copy.right,#s2 .copy,#s5 .copy,#s7 .copy{
    margin-right:2vw!important;
    width:min(29vw,340px)!important;
    max-width:340px!important;
  }
}
`;d.head.appendChild(s)};
})();