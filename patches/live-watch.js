(function(){
const G=window.GSportPatches=window.GSportPatches||{};
G.applyLiveWatch=function(html){
  if(!html||html.includes('function updateLiveHands()'))return html;
  const helper=`
let gsHandsReady=false,gsSecondHands=[],gsMinuteHands=[],gsHourHands=[];
function gsHandSpan(m){
  try{
    if(!m?.geometry)return 0;
    m.geometry.computeBoundingBox?.();
    const b=m.geometry.boundingBox;
    if(!b)return 0;
    const s=b.getSize(new THREE.Vector3());
    return Math.max(s.x,s.y,s.z);
  }catch(e){return 0}
}
function gsClassifyHands(){
  if(gsHandsReady)return;
  if(typeof partMeshes==='undefined'||!partMeshes?.hands?.length)return;
  const all=partMeshes.hands.filter(Boolean),unknown=[];
  all.forEach(m=>{
    const n=(typeof signature==='function'?signature(m):((m.name||'')+' '+(m.material?.name||''))).toLowerCase();
    if(!m.userData.gsBaseRot)m.userData.gsBaseRot=m.rotation.clone();
    if(/second|seconds|sec[_ -]?hand|secondhand|sekund/.test(n))gsSecondHands.push(m);
    else if(/minute|min[_ -]?hand|minutehand|minut/.test(n))gsMinuteHands.push(m);
    else if(/hour|hr[_ -]?hand|hourhand|chas|hour/.test(n))gsHourHands.push(m);
    else unknown.push(m);
  });
  const used=new Set([...gsSecondHands,...gsMinuteHands,...gsHourHands]);
  const pool=all.filter(m=>!used.has(m)).sort((a,b)=>gsHandSpan(b)-gsHandSpan(a));
  if(!gsSecondHands.length&&pool.length)gsSecondHands.push(pool.shift());
  if(!gsMinuteHands.length&&pool.length)gsMinuteHands.push(pool.shift());
  if(!gsHourHands.length&&pool.length)gsHourHands.push(pool.shift());
  if(!gsSecondHands.length&&all[0])gsSecondHands.push(all[0]);
  gsHandsReady=!!(gsSecondHands.length||gsMinuteHands.length||gsHourHands.length);
}
function gsSetHand(list,angle){
  list.forEach(m=>{
    const b=m.userData.gsBaseRot||(m.userData.gsBaseRot=m.rotation.clone());
    m.rotation.set(b.x,b.y,b.z-angle,b.order);
    m.matrixWorldNeedsUpdate=true;
  });
}
function updateLiveHands(){
  if(typeof loaded!=='undefined'&&!loaded)return;
  gsClassifyHands();
  if(!gsHandsReady)return;
  const d=new Date(),ms=d.getMilliseconds(),sec=d.getSeconds()+ms/1000,min=d.getMinutes()+sec/60,hr=(d.getHours()%12)+min/60;
  gsSetHand(gsSecondHands,sec/60*Math.PI*2);
  gsSetHand(gsMinuteHands,min/60*Math.PI*2);
  gsSetHand(gsHourHands,hr/12*Math.PI*2);
}
function gsLiveHandsLoop(){updateLiveHands();requestAnimationFrame(gsLiveHandsLoop)}
requestAnimationFrame(gsLiveHandsLoop);
`;
  if(!html.includes('function animate(){'))return html;
  html=html.replace('function animate(){',helper+'\nfunction animate(){');
  return html;
};
})();