(function(){
const G=window.GSportPatches=window.GSportPatches||{};
G.applyLiveWatch=function(html){
  if(!html||html.includes('GS_FINAL_HANDS_V3'))return html;
  const helper=`
/* GS_FINAL_HANDS_V3: keep every generated hand in the exact dial plane */
let gsHandsReady=false,gsSecondHand=null,gsMinuteHand=null,gsHourHand=null;
function gsStats(m){
  try{
    if(!m?.geometry)return null;
    m.geometry.computeBoundingBox?.();
    const b=m.geometry.boundingBox;if(!b)return null;
    const sx=Math.abs(m.scale?.x??1),sy=Math.abs(m.scale?.y??1),sz=Math.abs(m.scale?.z??1);
    const x=(b.max.x-b.min.x)*sx,y=(b.max.y-b.min.y)*sy,z=(b.max.z-b.min.z)*sz;
    const dims=[['x',x],['y',y],['z',z]].sort((a,b)=>b[1]-a[1]);
    const axis=dims[0][0];
    const rawMin=axis==='x'?b.min.x:axis==='y'?b.min.y:b.min.z;
    const rawMax=axis==='x'?b.max.x:axis==='y'?b.max.y:b.max.z;
    const axisScale=axis==='x'?sx:axis==='y'?sy:sz;
    const sign=Math.abs(rawMax)>=Math.abs(rawMin)?1:-1;
    const radius=Math.max(Math.abs(rawMin),Math.abs(rawMax))*axisScale;
    return {axis,sign,radius,len:dims[0][1],mid:dims[1][1],thin:dims[2][1],ratio:dims[0][1]/Math.max(dims[1][1],.0001)};
  }catch(e){return null}
}
function gsName(m){
  try{return (typeof signature==='function'?signature(m):((m?.name||'')+' '+(m?.material?.name||''))).toLowerCase()}catch(e){return ''}
}
function gsPickSecond(all){
  const named=all.find(m=>/second|seconds|sec[_ -]?hand|secondhand|sekund/.test(gsName(m)));
  if(named)return named;
  return all.map(m=>({m,s:gsStats(m)})).filter(x=>x.s&&x.s.len>.05&&x.s.ratio>1.3).sort((a,b)=>(b.s.ratio*b.s.len)-(a.s.ratio*a.s.len))[0]?.m||all[0]||null;
}
function gsMaterial(kind){
  return new THREE.MeshPhysicalMaterial({
    color:kind==='hour'?0xd6bd84:0xe9e4d8,
    metalness:.9,roughness:.12,clearcoat:.75,clearcoatRoughness:.05,
    depthTest:true,depthWrite:true,transparent:false,
    polygonOffset:true,polygonOffsetFactor:-3,polygonOffsetUnits:-3
  });
}
function gsMakeFlatHand(anchor,kind){
  const s=gsStats(anchor);if(!anchor?.parent||!s)return null;
  if(s.axis==='z')return null;
  const length=Math.max(.08,s.radius*(kind==='hour'?.54:.78));
  const width=Math.max(s.mid*(kind==='hour'?1.45:1.02),length*(kind==='hour'?.085:.055),.018);
  const depth=Math.max(Math.min(s.thin*.55,width*.22),.006);
  const geom=s.axis==='x'?new THREE.BoxGeometry(length,width,depth):new THREE.BoxGeometry(width,length,depth);
  const mesh=new THREE.Mesh(geom,gsMaterial(kind));
  const group=new THREE.Group();group.name='gs-final-'+kind+'-hand';group.userData.gsGenerated=true;group.userData.gsKind=kind;
  group.position.copy(anchor.position);group.rotation.copy(anchor.rotation);group.scale.set(1,1,1);
  mesh.position.set(0,0,0);
  if(s.axis==='x')mesh.position.x=s.sign*length*.5;else mesh.position.y=s.sign*length*.5;
  /* same dial plane as the working second hand; no rear-mechanism offset */
  mesh.position.z=0;
  mesh.castShadow=true;mesh.receiveShadow=false;mesh.frustumCulled=false;mesh.renderOrder=20;
  group.add(mesh);anchor.parent.add(group);
  group.userData.gsBaseRot=group.rotation.clone();
  return group;
}
function gsPrepareHands(){
  if(gsHandsReady)return;
  if(typeof partMeshes==='undefined'||!partMeshes?.hands?.length)return;
  const all=partMeshes.hands.filter(Boolean),anchor=gsPickSecond(all);if(!anchor?.parent)return;
  /* remove every older generated fallback if an old script ever created one */
  [...anchor.parent.children].forEach(o=>{if(o?.userData?.gsGenerated||/^gs-(generated|final)-/.test(o?.name||''))anchor.parent.remove(o)});
  if(!anchor.userData.gsBaseRot)anchor.userData.gsBaseRot=anchor.rotation.clone();
  gsSecondHand=anchor;
  gsMinuteHand=gsMakeFlatHand(anchor,'minute');
  gsHourHand=gsMakeFlatHand(anchor,'hour');
  gsHandsReady=!!(gsSecondHand&&gsMinuteHand&&gsHourHand);
}
function gsRotate(m,angle){
  if(!m)return;
  const b=m.userData.gsBaseRot||(m.userData.gsBaseRot=m.rotation.clone());
  m.rotation.set(b.x,b.y,b.z-angle,b.order);m.visible=true;m.matrixWorldNeedsUpdate=true;
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