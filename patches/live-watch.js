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
    if(/second|seconds|sec[_ -]?hand/.test(n))gsSecondHands.push(m);
    else if(/minute|min[_ -]?hand/.test(n))gsMinuteHands.push(m);
    else if(/hour|hr[_ -]?hand/.test(n))gsHourHands.push(m);
  });
  if(!gsSecondHands.length&&!gsMinuteHands.length&&!gsHourHands.length&&all.length>=3){
    gsSecondHands=[all[0]];gsMinuteHands=[all[1]];gsHourHands=[all[2]];
  }
  gsHandsReady=true;
}
function gsSetHand(list,angle){list.forEach(m=>{const b=m.userData.gsBaseRot;if(!b)return;m.rotation.z=b.z-angle})}
function updateLiveHands(){
  if(!loaded)return;gsClassifyHands();
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