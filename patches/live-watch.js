(function(){
const G=window.GSportPatches=window.GSportPatches||{};
G.applyLiveWatch=function(html){
  if(!html||html.includes('function updateLiveHands()'))return html;
  const helper=`
let gsHandsReady=false,gsSecondHands=[],gsMinuteHands=[],gsHourHands=[];
function gsHandStats(m){
  try{
    if(!m?.geometry)return {m,len:0,ratio:0,axis:'y'};
    m.geometry.computeBoundingBox?.();
    const b=m.geometry.boundingBox;if(!b)return {m,len:0,ratio:0,axis:'y'};
    const s=b.getSize(new THREE.Vector3());
    const dims=[['x',Math.abs(s.x)],['y',Math.abs(s.y)],['z',Math.abs(s.z)]].sort((a,b)=>b[1]-a[1]);
    return {m,len:dims[0][1],ratio:dims[0][1]/Math.max(dims[1][1],.0001),axis:dims[0][0]};
  }catch(e){return {m,len:0,ratio:0,axis:'y'}}
}
function gsRememberBase(m){if(m&&!m.userData.gsBaseRot)m.userData.gsBaseRot=m.rotation.clone()}
function gsCloneMat(mat,kind){
  const one=mm=>{
    const x=mm?.clone?mm.clone():mm;if(!x)return x;
    if(x.color)x.color.set(kind==='hour'?0xd8c28d:0xe8e4db);
    if('metalness' in x)x.metalness=Math.max(.82,x.metalness??0);
    if('roughness' in x)x.roughness=.12;
    if('envMapIntensity' in x)x.envMapIntensity=Math.max(2.1,x.envMapIntensity??1);
    if('transparent' in x)x.transparent=false;
    if('opacity' in x)x.opacity=1;
    x.depthTest=true;x.depthWrite=true;x.polygonOffset=true;x.polygonOffsetFactor=-2;x.polygonOffsetUnits=-2;
    return x;
  };
  return Array.isArray(mat)?mat.map(one):one(mat);
}
function gsMakeAnchoredHand(src,kind){
  if(!src?.parent)return null;
  const h=src.clone(false);h.name='gs-generated-'+kind+'-hand';h.geometry=src.geometry;h.material=gsCloneMat(src.material,kind);
  h.position.copy(src.position);h.quaternion.copy(src.quaternion);h.scale.copy(src.scale);h.visible=true;h.frustumCulled=false;h.renderOrder=(src.renderOrder||3)+(kind==='hour'?2:1);
  const st=gsHandStats(src),lengthFactor=kind==='hour'?.58:.82,widthFactor=kind==='hour'?1.95:1.45;
  if(st.axis==='x'){h.scale.x*=lengthFactor;h.scale.y*=widthFactor;h.scale.z*=1.18}
  else if(st.axis==='z'){h.scale.z*=lengthFactor;h.scale.x*=widthFactor;h.scale.y*=widthFactor}
  else {h.scale.y*=lengthFactor;h.scale.x*=widthFactor;h.scale.z*=1.18}
  h.userData=Object.assign({},src.userData,{gsGenerated:true,gsKind:kind});src.parent.add(h);gsRememberBase(h);return h;
}
function gsFindSecondAnchor(all){
  let named=null;
  for(const m of all){
    const n=(typeof signature==='function'?signature(m):((m.name||'')+' '+(m.material?.name||''))).toLowerCase();
    if(/second|seconds|sec[_ -]?hand|secondhand|sekund/.test(n)){named=m;break}
  }
  if(named)return named;
  const elongated=all.map(gsHandStats).filter(s=>s.len>.08&&s.ratio>1.35).sort((a,b)=>(b.ratio*b.len)-(a.ratio*a.len));
  return elongated[0]?.m||all[0]||null;
}
function gsClassifyHands(){
  if(gsHandsReady)return;
  if(typeof partMeshes==='undefined'||!partMeshes?.hands?.length)return;
  const all=partMeshes.hands.filter(Boolean);all.forEach(gsRememberBase);
  const anchor=gsFindSecondAnchor(all);if(!anchor)return;
  gsSecondHands=[anchor];
  const minute=gsMakeAnchoredHand(anchor,'minute');
  const hour=gsMakeAnchoredHand(anchor,'hour');
  if(minute)gsMinuteHands=[minute];if(hour)gsHourHands=[hour];
  gsHandsReady=!!(gsSecondHands.length&&gsMinuteHands.length&&gsHourHands.length);
}
function gsSetHand(list,angle){
  list.forEach(m=>{
    const b=m.userData.gsBaseRot||(m.userData.gsBaseRot=m.rotation.clone());
    m.rotation.set(b.x,b.y,b.z-angle,b.order);m.visible=true;m.matrixWorldNeedsUpdate=true;
  });
}
function updateLiveHands(){
  if(typeof loaded!=='undefined'&&!loaded)return;
  gsClassifyHands();if(!gsHandsReady)return;
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