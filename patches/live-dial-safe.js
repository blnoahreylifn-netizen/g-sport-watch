(function(){
const G=window.GSportPatches=window.GSportPatches||{};
G.applyLiveDialSafe=function(html){
  if(!html||html.includes('gsLiveDialRoot'))return html;
  const setup=`
/* SAFE LIVE DIAL: independent hands layered on the watch face */
const gsLiveDialRoot=new THREE.Group();
gsLiveDialRoot.position.set(0,0,.18);mechanismRoot.add(gsLiveDialRoot);
function gsHandMat(color,metalness=.85,roughness=.14,opacity=.96){return new THREE.MeshPhysicalMaterial({color,metalness,roughness,clearcoat:.7,clearcoatRoughness:.06,transparent:true,opacity,depthWrite:false})}
function gsMakeHand(w,l,d,material,z){const g=new THREE.BoxGeometry(w,l,d);g.translate(0,l*.5,0);const m=new THREE.Mesh(g,material);m.position.z=z;m.castShadow=true;m.renderOrder=6;gsLiveDialRoot.add(m);return m}
const gsHourHand=gsMakeHand(.115,1.18,.035,gsHandMat(0xd9c28b),.018);
const gsMinuteHand=gsMakeHand(.082,1.68,.03,gsHandMat(0xe9e3d6),.032);
const gsSecondHand=gsMakeHand(.026,1.82,.018,gsHandMat(0xd65c44,.62,.18,.95),.048);
const gsDialCap=new THREE.Mesh(new THREE.CylinderGeometry(.11,.11,.055,32),gsHandMat(0xd8c08a));gsDialCap.rotation.x=Math.PI/2;gsDialCap.position.z=.062;gsDialCap.renderOrder=7;gsLiveDialRoot.add(gsDialCap);
function gsUpdateLiveDial(){const d=new Date(),ms=d.getMilliseconds(),s=d.getSeconds()+ms/1000,m=d.getMinutes()+s/60,h=(d.getHours()%12)+m/60;gsSecondHand.rotation.z=-(s/60)*Math.PI*2;gsMinuteHand.rotation.z=-(m/60)*Math.PI*2;gsHourHand.rotation.z=-(h/12)*Math.PI*2;const a=Math.max(0,Math.min(1,(watchFade||0)));[gsHourHand,gsMinuteHand,gsSecondHand,gsDialCap].forEach(o=>{o.visible=a>.08;mats(o).forEach(mm=>{if(mm&&'opacity'in mm)mm.opacity=(o===gsSecondHand?.95:.96)*a})});gsLiveDialRoot.visible=typeof st==='undefined'||st.mech<.72}
`;
  html=html.replace('const dustGeo=new THREE.BufferGeometry(),dust=[];',setup+'\nconst dustGeo=new THREE.BufferGeometry(),dust=[];');
  html=html.replace('gears.forEach(g=>g.rotation.z+=dt*g.userData.speed);','gsUpdateLiveDial();gears.forEach(g=>g.rotation.z+=dt*g.userData.speed);');
  return html;
};
})();