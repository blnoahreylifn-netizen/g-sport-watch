(function(){
const G=window.GSportPatches=window.GSportPatches||{};
G.applyLiveWatch=function(html){
  if(!html||html.includes('function updateLiveHands()'))return html;
  const helper=`
let gsHandsReady=false,gsSecondHands=[],gsMinuteHands=[],gsHourHands=[];
function gsHandStats(m){
  try{
    if(!m?.geometry)return {m,len:0,mid:0,thin:0,ratio:0,axis:'y'};
    m.geometry.computeBoundingBox?.();
    const b=m.geometry.boundingBox;if(!b)return {m,len:0,mid:0,thin:0,ratio:0,axis:'y'};
    const s=b.getSize(new THREE.Vector3());
    const dims=[['x',Math.abs(s.x)],['y',Math.abs(s.y)],['z',Math.abs(s.z)]].sort((a,b)=>b[1]-a[1]);
    return {m,len:dims[0][1],mid:dims[1][1],thin:dims[2][1],ratio:dims[0][1]/Math.max(dims[1][1],.0001),axis:dims[0][0]};
  }catch(e){return {m,len:0,mid:0,thin:0,ratio:0,axis:'y'}}
}
function gsRememberBase(m){if(m&&!m.userData.gsBaseRot)m.userData.gsBaseRot=m.rotation.clone()}
function gsCloneHourFrom(src){
  try{
    if(!src?.parent)return null;
    const h=src.clone();
    h.name='gs-generated-hour-hand';
    h.userData=Object.assign({},src.userData,{gsGeneratedHour:true});
    if(Array.isArray(src.material))h.material=src.material.map(x=>x?.clone?x.clone():x);else if(src.material?.clone)h.material=src.material.clone();
    const st=gsHandStats(src);
    h.scale.copy(src.scale);
    if(st.axis==='x')h.scale.x*=.66;else if(st.axis==='z')h.scale.z*=.66;else h.scale.y*=.66;
    if(st.axis!=='x')h.scale.x*=1.18;if(st.axis!=='y')h.scale.y*=1.18;
    const ms=Array.isArray(h.material)?h.material:[h.material];
    ms.forEach(mm=>{if(mm?.color)mm.color.offsetHSL(0,-.04,.08);if(mm&&'roughness'in mm)mm.roughness=Math.min(.2,Math.max(.08,mm.roughness??.12))});
    h.renderOrder=Math.max(src.renderOrder||0,3);src.parent.add(h);gsRememberBase(h);return h;
  }catch(e){console.warn('hour hand fallback',e);return null}
}
function gsClassifyHands(){
  if(gsHandsReady)return;
  if(typeof partMeshes==='undefined'||!partMeshes?.hands?.length)return;
  const all=partMeshes.hands.filter(Boolean),used=new Set();
  all.forEach(m=>{
    const n=(typeof signature==='function'?signature(m):((m.name||'')+' '+(m.material?.name||''))).toLowerCase();
    gsRememberBase(m);
    if(/second|seconds|sec[_ -]?hand|secondhand|sekund/.test(n)){gsSecondHands.push(m);used.add(m)}
    else if(/minute|min[_ -]?hand|minutehand|minut/.test(n)){gsMinuteHands.push(m);used.add(m)}
    else if(/hour|hr[_ -]?hand|hourhand|chas|hour/.test(n)){gsHourHands.push(m);used.add(m)}
  });
  let candidates=all.filter(m=>!used.has(m)).map(gsHandStats).filter(s=>s.len>.08&&s.ratio>1.7);
  if(candidates.length<3)candidates=all.filter(m=>!used.has(m)).map(gsHandStats).filter(s=>s.len>.08&&s.ratio>1.25);
  if(!gsSecondHands.length&&candidates.length){
    candidates.sort((a,b)=>(b.ratio*b.len)-(a.ratio*a.len));
    const s=candidates.shift();gsSecondHands.push(s.m);used.add(s.m);
  }
  let remain=all.filter(m=>!used.has(m)).map(gsHandStats).filter(s=>s.len>.08&&s.ratio>1.25).sort((a,b)=>b.len-a.len);
  if(!gsMinuteHands.length&&remain.length){const s=remain.shift();gsMinuteHands.push(s.m);used.add(s.m)}
  remain=all.filter(m=>!used.has(m)).map(gsHandStats).filter(s=>s.len>.08&&s.ratio>1.15).sort((a,b)=>a.len-b.len);
  if(!gsHourHands.length&&remain.length){const s=remain[0];gsHourHands.push(s.m);used.add(s.m)}
  if(!gsMinuteHands.length&&gsSecondHands[0]){const m=gsSecondHands[0].clone();m.name='gs-generated-minute-hand';if(m.material?.clone)m.material=m.material.clone();m.scale.copy(gsSecondHands[0].scale);const st=gsHandStats(m);if(st.axis==='x')m.scale.x*=.86;else if(st.axis==='z')m.scale.z*=.86;else m.scale.y*=.86;gsSecondHands[0].parent?.add(m);gsRememberBase(m);gsMinuteHands.push(m)}
  if(!gsHourHands.length){const h=gsCloneHourFrom(gsMinuteHands[0]||gsSecondHands[0]);if(h)gsHourHands.push(h)}
  gsHandsReady=!!(gsSecondHands.length&&gsMinuteHands.length&&gsHourHands.length);
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