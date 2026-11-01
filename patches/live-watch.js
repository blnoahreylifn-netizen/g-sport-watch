(function(){
const G=window.GSportPatches=window.GSportPatches||{};
G.applyLiveWatch=function(html){
  if(!html||html.includes('function updateLiveHands()'))return html;
  const helper=`
let gsHandsReady=false,gsSecondHands=[],gsMinuteHands=[],gsHourHands=[];
function gsClassifyHands(){
  if(gsHandsReady||!partMeshes||!partMeshes.hands)return;
  const all=partMeshes.hands;
  all.forEach(m=>{
    const n=signature(m);
    if(!m.userData.gsBaseRot)m.userData.gsBaseRot=m.rotation.clone();
    if(/second|seconds|sec[_ -]?hand|secondhand/.test(n))gsSecondHands.push(m);
    else if(/minute|min[_ -]?hand|minutehand/.test(n))gsMinuteHands.push(m);
    else if(/hour|hr[_ -]?hand|hourhand/.test(n))gsHourHands.push(m);
  });
  gsHandsReady=true;
}
function gsSetHand(list,angle){
  list.forEach(m=>{
    const b=m.userData.gsBaseRot;
    if(!b)return;
    m.rotation.set(b.x,b.y,b.z-angle,b.order);
  });
}
function updateLiveHands(){
  if(!loaded)return;
  gsClassifyHands();
  const d=new Date(),ms=d.getMilliseconds(),sec=d.getSeconds()+ms/1000,min=d.getMinutes()+sec/60,hr=(d.getHours()%12)+min/60;
  gsSetHand(gsSecondHands,sec/60*Math.PI*2);
  gsSetHand(gsMinuteHands,min/60*Math.PI*2);
  gsSetHand(gsHourHands,hr/12*Math.PI*2);
}
`;
  if(!html.includes('function animate(){'))return html;
  html=html.replace('function animate(){',helper+'\nfunction animate(){updateLiveHands();');
  return html;
};
})();