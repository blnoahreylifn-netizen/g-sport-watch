(function(){
const G=window.GSportPatches=window.GSportPatches||{};
G.applyContent=function(html){
html=html.replace("</footer>\n</section>\n\n<div id=\"hoverCard\">",`</footer><section class="finale-quote"><div class="finale-orbit finale-orbit-a"></div><div class="finale-orbit finale-orbit-b"></div><div class="finale-inner"><small>G‑SPORT / FINAL</small><blockquote data-ru="Время нельзя удержать. Но можно придать ему форму." data-en="You cannot hold time. But you can give it form.">Время нельзя удержать. Но можно придать ему форму.</blockquote><div class="finale-mark">G‑SPORT WATCH LAB · 2026</div></div></section></section><div id="hoverCard">`);
return html;
};
})();