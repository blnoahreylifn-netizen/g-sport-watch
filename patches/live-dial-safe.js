(function(){
const G=window.GSportPatches=window.GSportPatches||{};
G.applyLiveDialSafe=function(html){
  if(!html||html.includes('function gsUpdateRealHands()'))return html;
  const helper=`
/* LIVE DIAL V2: animate the real hand meshes from the loaded watch model */
let gsRealHandsReady=false,gsRealSecond=[],gsRealMinute=[],gsRealHour=[];
function gsHandSize(m){
  try{
    if(!m?.geometry)return 0;
    m.geometry.computeBoundingBox?.();
    const b=m.geometry.boundingBox;if(!b)return 0;
    const s=b.getSize(new THREE.Vector3());
    return Math.max(s.x,s.y,s.z);
  }catch(e){return 0}
}
function gsPrepareRealHands(){
  if(gsRealHandsReady)return true;
  if(typeof partMeshes==='undefined'||!partMeshes?.hands?.length)return false;
  const all=partMeshes.hands.filter(Boolean);
  all.forEach(m=>{
    if(!m.userData.gsLiveBaseRot)m.userData.gsLiveBaseRot=m.rotation.clone();
    const n=(typeof signature==='function'?signature(m):((m.name||'')+' '+(m.material?.name||''))).toLowerCase();
    if(/second|seconds|sec[_ -]?hand|secondhand|sekund/.test(n))gsRealSecond.push(m);
    else if(/minute|min[_ -]?hand|minutehand|minut/.test(n))gsRealMinute.push(m);
    else if(/hour|hr[_ -]?hand|hourhand|chas/.test(n))gsRealHour.push(m);
  });
  const used=new Set([...gsRealSecond,...gsRealMinute,...gsRealHour]);
  const pool=all.filter(m=>!used.has(m)).sort((a,b)=>gsHandSize(b)-gsHandSize(a));
  if(!gsRealSecond.length&&pool.length)gsRealSecond.push(pool.shift());
  if(!gsRealMinute.length&&pool.length)gsRealMinute.push(pool.shift());
  if(!gsRealHour.length&&pool.length)gsRealHour.push(pool.shift());
  if(!gsRealSecond.length&&all.length)gsRealSecond.push(all[0]);
  gsRealHandsReady=!!(gsRealSecond.length||gsRealMinute.length||gsRealHour.length);
  return gsRealHandsReady;
}
function gsRotateReal(list,angle){
  list.forEach(m=>{
    const b=m.userData.gsLiveBaseRot||(m.userData.gsLiveBaseRot=m.rotation.clone());
    m.rotation.set(b.x,b.y,b.z-angle,b.order);
    m.updateMatrix?.();
    m.updateMatrixWorld?.(true);
  });
}
function gsUpdateRealHands(){
  if(typeof loaded!=='undefined'&&!loaded)return;
  if(!gsPrepareRealHands())return;
  const d=new Date(),ms=d.getMilliseconds();
  const s=d.getSeconds()+ms/1000;
  const mi=d.getMinutes()+s/60;
  const h=(d.getHours()%12)+mi/60;
  gsRotateReal(gsRealSecond,(s/60)*Math.PI*2);
  gsRotateReal(gsRealMinute,(mi/60)*Math.PI*2);
  gsRotateReal(gsRealHour,(h/12)*Math.PI*2);
}
function gsRealHandsLoop(){gsUpdateRealHands();requestAnimationFrame(gsRealHandsLoop)}
requestAnimationFrame(gsRealHandsLoop);
`;
  if(!html.includes('function animate(){'))return html;
  return html.replace('function animate(){',helper+'\nfunction animate(){');
};
})();