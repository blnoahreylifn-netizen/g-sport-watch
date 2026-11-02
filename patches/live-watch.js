(function(){
const G=window.GSportPatches=window.GSportPatches||{};
G.applyLiveWatch=function(html){
  if(!html||html.includes('GS_NATIVE_HANDS_ONLY_V4'))return html;
  const helper=`
/* GS_NATIVE_HANDS_ONLY_V4: never create geometry; animate native dial hand meshes only */
let gsHandsReady=false,gsSecondHand=null,gsMinuteHand=null,gsHourHand=null;
function gsHandInfo(m){
  try{
    if(!m?.geometry)return null;
    m.geometry.computeBoundingBox?.();
    const b=m.geometry.boundingBox;if(!b)return null;
    const s=b.getSize(new THREE.Vector3());
    const sx=Math.abs((m.scale&&m.scale.x)||1),sy=Math.abs((m.scale&&m.scale.y)||1),sz=Math.abs((m.scale&&m.scale.z)||1);
    const dims=[Math.abs(s.x*sx),Math.abs(s.y*sy),Math.abs(s.z*sz)].sort((a,b)=>b-a);
    const len=dims[0],mid=dims[1],thin=dims[2];
    return {m,len,mid,thin,ratio:len/Math.max(mid,.0001),p:m.position.clone(),parent:m.parent};
  }catch(e){return null}
}
function gsLabel(m){
  try{return (typeof signature==='function'?signature(m):((m?.name||'')+' '+(m?.material?.name||''))).toLowerCase()}catch(e){return ''}
}
function gsDist(a,b){return a.p.distanceTo(b.p)}
function gsNativeCandidates(all){
  let list=all.map(gsHandInfo).filter(x=>x&&x.len>.04&&x.ratio>1.18);
  if(list.length<3)list=all.map(gsHandInfo).filter(x=>x&&x.len>.025&&x.ratio>1.05);
  return list;
}
function gsPickNativeHands(all){
  const info=gsNativeCandidates(all);if(!info.length)return null;
  const named={second:null,minute:null,hour:null};
  for(const x of info){
    const n=gsLabel(x.m);
    if(!named.second&&/second|seconds|sec[_ -]?hand|secondhand|sekund/.test(n))named.second=x;
    else if(!named.minute&&/minute|min[_ -]?hand|minutehand|minut/.test(n))named.minute=x;
    else if(!named.hour&&/hour|hr[_ -]?hand|hourhand|chas/.test(n))named.hour=x;
  }
  const anchors=[named.second,named.minute,named.hour].filter(Boolean);
  let pool=info.slice();
  if(anchors.length){
    const p=anchors[0];
    const near=pool.filter(x=>x.parent===p.parent&&gsDist(x,p)<.45);
    if(near.length>=3)pool=near;
  }else{
    let best=[];
    for(const seed of pool){
      const cluster=pool.filter(x=>x.parent===seed.parent&&gsDist(x,seed)<.45);
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
  if(!second&&remain.length){second=remain.slice().sort((a,b)=>(b.ratio*b.len)-(a.ratio*a.len))[0];used.add(second.m);remain=pool.filter(x=>!used.has(x.m))}
  if(!minute&&remain.length){minute=remain.slice().sort((a,b)=>b.len-a.len)[0];used.add(minute.m);remain=pool.filter(x=>!used.has(x.m))}
  if(!hour&&remain.length){hour=remain.slice().sort((a,b)=>a.len-b.len)[0];used.add(hour.m)}
  if(!(second&&minute&&hour))return null;
  return {second:second.m,minute:minute.m,hour:hour.m};
}
function gsPrepareHands(){
  if(gsHandsReady)return;
  if(typeof partMeshes==='undefined'||!partMeshes?.hands?.length)return;
  const all=partMeshes.hands.filter(Boolean);
  /* purge every object created by older broken hand patches */
  const parents=new Set(all.map(m=>m?.parent).filter(Boolean));
  parents.forEach(p=>[...p.children].forEach(o=>{
    const n=o?.name||'';
    if(o?.userData?.gsGenerated||/^gs-(generated|final)-/.test(n))p.remove(o);
  }));
  const pick=gsPickNativeHands(all);if(!pick)return;
  gsSecondHand=pick.second;gsMinuteHand=pick.minute;gsHourHand=pick.hour;
  [gsSecondHand,gsMinuteHand,gsHourHand].forEach(m=>{if(!m.userData.gsBaseRot)m.userData.gsBaseRot=m.rotation.clone()});
  console.info('G-SPORT native hands',gsLabel(gsSecondHand),gsLabel(gsMinuteHand),gsLabel(gsHourHand));
  gsHandsReady=true;
}
function gsRotate(m,angle){
  if(!m)return;
  const b=m.userData.gsBaseRot||(m.userData.gsBaseRot=m.rotation.clone());
  m.rotation.set(b.x,b.y,b.z-angle,b.order);m.matrixWorldNeedsUpdate=true;
}
function updateLiveHands(){
  if(typeof loaded!=='undefined'&&!loaded)return;
  gsPrepareHands();if(!gsHandsReady)return;
  const d=new Date(),ms=d.getMilliseconds(),sec=d.getSeconds()+ms/1000,min=d.getMinutes()+sec/60,hr=(d.getHours()%12)+min/60;
  gsRotate(gsSecondHand,sec/60*Math.PI*2);
  gsRotate(gsMinuteHand,min/60*Math.PI*2);
  gsRotate(gsHourHand,hr/12*Math.PI*2);
}
function gsLiveHandsLoop(){updateLiveHands();requestAnimationFrame(gsLiveHandsLoop)}
requestAnimationFrame(gsLiveHandsLoop);
`;
  if(!html.includes('function animate(){'))return html;
  html=html.replace('function animate(){',helper+'\nfunction animate(){');
  return html;
};
})();