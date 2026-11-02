(function(){
const G=window.GSportPatches=window.GSportPatches||{};
G.applyLiveWatch=function(html){
  if(!html||html.includes('GS_NATIVE_HANDS_FOREVER_V5'))return html;
  const helper=`
/* GS_NATIVE_HANDS_FOREVER_V5: native meshes only, no generated geometry, endless smooth motion */
let gsHandsReady=false,gsSecondHand=null,gsMinuteHand=null,gsHourHand=null;
function gsHandInfo(m){
  try{
    if(!m?.geometry)return null;
    m.geometry.computeBoundingBox?.();
    const b=m.geometry.boundingBox;if(!b)return null;
    const s=b.getSize(new THREE.Vector3());
    const sx=Math.abs((m.scale&&m.scale.x)||1),sy=Math.abs((m.scale&&m.scale.y)||1),sz=Math.abs((m.scale&&m.scale.z)||1);
    const dims={x:Math.abs(s.x*sx),y:Math.abs(s.y*sy),z:Math.abs(s.z*sz)};
    const ordered=Object.entries(dims).sort((a,b)=>b[1]-a[1]);
    const len=ordered[0][1],mid=ordered[1][1],thin=ordered[2][1],normalAxis=ordered[2][0];
    return {m,len,mid,thin,normalAxis,ratio:len/Math.max(mid,.0001),p:m.position.clone(),parent:m.parent};
  }catch(e){return null}
}
function gsLabel(m){
  try{return (typeof signature==='function'?signature(m):((m?.name||'')+' '+(m?.material?.name||''))).toLowerCase()}catch(e){return ''}
}
function gsDist(a,b){return a.p.distanceTo(b.p)}
function gsNativeCandidates(all){
  let list=all.map(gsHandInfo).filter(x=>x&&x.len>.04&&x.ratio>1.18);
  if(list.length<3)list=all.map(gsHandInfo).filter(x=>x&&x.len>.02&&x.ratio>1.02);
  return list;
}
function gsPickNativeHands(all){
  const info=gsNativeCandidates(all);if(info.length<3)return null;
  const named={second:null,minute:null,hour:null};
  for(const x of info){
    const n=gsLabel(x.m);
    if(!named.second&&/second|seconds|sec[_ -]?hand|secondhand|sekund/.test(n))named.second=x;
    else if(!named.minute&&/minute|min[_ -]?hand|minutehand|minut/.test(n))named.minute=x;
    else if(!named.hour&&/hour|hr[_ -]?hand|hourhand|chas/.test(n))named.hour=x;
  }
  let pool=info.slice();
  const known=[named.second,named.minute,named.hour].filter(Boolean);
  if(known.length){
    const seed=known[0];
    const near=info.filter(x=>x.parent===seed.parent&&gsDist(x,seed)<.6);
    if(near.length>=3)pool=near;
  }else{
    let best=[];
    for(const seed of info){
      const cluster=info.filter(x=>x.parent===seed.parent&&gsDist(x,seed)<.6);
      if(cluster.length>best.length)best=cluster;
    }
    if(best.length>=3)pool=best;
  }
  const used=new Set();
  let second=named.second&&pool.includes(named.second)?named.second:null;
  let minute=named.minute&&pool.includes(named.minute)?named.minute:null;
  let hour=named.hour&&pool.includes(named.hour)?named.hour:null;
  if(second)used.add(second.m);if(minute)used.add(minute.m);if(hour)used.add(hour.m);
  let remain=pool.filter(x=>!used.has(x.m));
  if(!second&&remain.length){second=remain.slice().sort((a,b)=>(b.ratio*b.len)-(a.ratio*a.len))[0];used.add(second.m)}
  remain=pool.filter(x=>!used.has(x.m));
  if(!minute&&remain.length){minute=remain.slice().sort((a,b)=>b.len-a.len)[0];used.add(minute.m)}
  remain=pool.filter(x=>!used.has(x.m));
  if(!hour&&remain.length){hour=remain.slice().sort((a,b)=>a.len-b.len)[0];used.add(hour.m)}
  if(!(second&&minute&&hour))return null;
  return {second,minute,hour};
}
function gsAxisVector(axis){return axis==='x'?new THREE.Vector3(1,0,0):axis==='y'?new THREE.Vector3(0,1,0):new THREE.Vector3(0,0,1)}
function gsRemember(m,info){
  if(!m.userData.gsBaseQuat)m.userData.gsBaseQuat=m.quaternion.clone();
  if(!m.userData.gsBasePos)m.userData.gsBasePos=m.position.clone();
  m.userData.gsDialAxis=info?.normalAxis||'z';
}
function gsPrepareHands(){
  if(gsHandsReady)return;
  if(typeof partMeshes==='undefined'||!partMeshes?.hands?.length)return;
  const all=partMeshes.hands.filter(Boolean);
  const parents=new Set(all.map(m=>m?.parent).filter(Boolean));
  parents.forEach(p=>[...p.children].forEach(o=>{
    const n=o?.name||'';
    if(o?.userData?.gsGenerated||/^gs-(generated|final)-/.test(n))p.remove(o);
  }));
  const pick=gsPickNativeHands(all);if(!pick)return;
  gsSecondHand=pick.second.m;gsMinuteHand=pick.minute.m;gsHourHand=pick.hour.m;
  gsRemember(gsSecondHand,pick.second);gsRemember(gsMinuteHand,pick.minute);gsRemember(gsHourHand,pick.hour);
  gsHandsReady=true;
}
function gsRotateNative(m,angle){
  if(!m)return;
  const base=m.userData.gsBaseQuat||(m.userData.gsBaseQuat=m.quaternion.clone());
  const basePos=m.userData.gsBasePos||(m.userData.gsBasePos=m.position.clone());
  const axis=gsAxisVector(m.userData.gsDialAxis||'z');
  const delta=new THREE.Quaternion().setFromAxisAngle(axis,-angle);
  m.position.copy(basePos);
  m.quaternion.copy(base).multiply(delta);
  m.updateMatrix();m.matrixWorldNeedsUpdate=true;
}
function updateLiveHands(){
  gsPrepareHands();if(!gsHandsReady)return;
  const d=new Date(),ms=d.getMilliseconds();
  const sec=d.getSeconds()+ms/1000;
  const min=d.getMinutes()+sec/60;
  const hr=(d.getHours()%12)+min/60;
  gsRotateNative(gsSecondHand,sec/60*Math.PI*2);
  gsRotateNative(gsMinuteHand,min/60*Math.PI*2);
  gsRotateNative(gsHourHand,hr/12*Math.PI*2);
}
function gsLiveHandsLoop(){updateLiveHands();requestAnimationFrame(gsLiveHandsLoop)}
requestAnimationFrame(gsLiveHandsLoop);
`;
  if(!html.includes('function animate(){'))return html;
  html=html.replace('function animate(){',helper+'\nfunction animate(){');
  return html;
};
})();