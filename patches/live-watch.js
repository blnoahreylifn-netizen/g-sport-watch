(function(){
const G=window.GSportPatches=window.GSportPatches||{};
G.applyLiveWatch=function(html){
  if(!html||html.includes('GS_STABLE_NATIVE_HANDS_V1'))return html;
  const helper=`
/* GS_STABLE_NATIVE_HANDS_V1: animate only existing watch hand meshes */
let gsHandsReady=false,gsSecondHands=[],gsMinuteHands=[],gsHourHands=[];
function gsClassifyHands(){
  if(gsHandsReady)return;
  if(typeof partMeshes==='undefined'||!partMeshes||!partMeshes.hands||!partMeshes.hands.length)return;
  const all=partMeshes.hands.filter(Boolean);
  all.forEach(m=>{
    const n=(typeof signature==='function'?signature(m):((m.name||'')+' '+(m.material?.name||''))).toLowerCase();
    if(!m.userData.gsBaseRot)m.userData.gsBaseRot=m.rotation.clone();
    if(/second|seconds|sec[_ -]?hand|secondhand|sekund/.test(n))gsSecondHands.push(m);
    else if(/minute|min[_ -]?hand|minutehand|minut/.test(n))gsMinuteHands.push(m);
    else if(/hour|hr[_ -]?hand|hourhand|chas/.test(n))gsHourHands.push(m);
  });
  /* Safe fallback only when the model exposes exactly three hand meshes. */
  if(all.length===3&&(!gsSecondHands.length||!gsMinuteHands.length||!gsHourHands.length)){
    const span=m=>{try{m.geometry.computeBoundingBox?.();const b=m.geometry.boundingBox;if(!b)return 0;const s=b.getSize(new THREE.Vector3());return Math.max(Math.abs(s.x),Math.abs(s.y),Math.abs(s.z))}catch(e){return 0}};
    const sorted=all.slice().sort((a,b)=>span(b)-span(a));
    if(!gsSecondHands.length)gsSecondHands=[sorted[0]];
    if(!gsMinuteHands.length)gsMinuteHands=[sorted[1]];
    if(!gsHourHands.length)gsHourHands=[sorted[2]];
    [...gsSecondHands,...gsMinuteHands,...gsHourHands].forEach(m=>{if(!m.userData.gsBaseRot)m.userData.gsBaseRot=m.rotation.clone()});
  }
  gsHandsReady=!!(gsSecondHands.length||gsMinuteHands.length||gsHourHands.length);
}
function gsSetHand(list,angle){
  list.forEach(m=>{
    const b=m.userData.gsBaseRot;
    if(!b)return;
    m.rotation.set(b.x,b.y,b.z-angle,b.order);
    m.matrixWorldNeedsUpdate=true;
  });
}
function updateLiveHands(){
  if(typeof loaded!=='undefined'&&!loaded)return;
  gsClassifyHands();
  if(!gsHandsReady)return;
  const d=new Date(),ms=d.getMilliseconds();
  const sec=d.getSeconds()+ms/1000;
  const min=d.getMinutes()+sec/60;
  const hr=(d.getHours()%12)+min/60;
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