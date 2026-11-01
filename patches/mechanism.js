(function(){
const G=window.GSportPatches=window.GSportPatches||{};
G.applyMechanism=function(html){
html=html.replace("const dustGeo=new THREE.BufferGeometry(),dust=[];",`/* Fine mechanical calibre: slim bridges, wheel train, jewels, screws and balance */
const calibreDetailRoot=new THREE.Group();mechanismRoot.add(calibreDetailRoot);
const bridgeSteel=mat({color:0x8f9499,metalness:1,roughness:.2,clearcoat:.35,clearcoatRoughness:.08});
const brushedDark=mat({color:0x2b2d31,metalness:1,roughness:.27,clearcoat:.22,clearcoatRoughness:.11});
const screwMat=mat({color:0xb8bcc0,metalness:1,roughness:.13,clearcoat:.55,clearcoatRoughness:.06});
const brass=mat({color:0xb68d4e,metalness:1,roughness:.19,emissive:0x120900,emissiveIntensity:.08});
const fineSteel=mat({color:0xc2c5c7,metalness:1,roughness:.16,clearcoat:.42,clearcoatRoughness:.07});
function roundedRectShape(w,h,r=.12){const s=new THREE.Shape(),x=-w/2,y=-h/2;s.moveTo(x+r,y);s.lineTo(x+w-r,y);s.quadraticCurveTo(x+w,y,x+w,y+r);s.lineTo(x+w,y+h-r);s.quadraticCurveTo(x+w,y+h,x+w-r,y+h);s.lineTo(x+r,y+h);s.quadraticCurveTo(x,y+h,x,y+h-r);s.lineTo(x,y+r);s.quadraticCurveTo(x,y,x+r,y);return s}
function bridgeGeom(w,h,d=.045,r=.12){const g=new THREE.ExtrudeGeometry(roundedRectShape(w,h,r),{depth:d,bevelEnabled:true,bevelThickness:.008,bevelSize:.008,bevelSegments:2});g.center();return g}
function addBridge(x,y,z,w,h,rot=0,material=bridgeSteel){const b=new THREE.Mesh(bridgeGeom(w,h,.045,Math.min(.13,h*.24)),material);b.position.set(x,y,z);b.rotation.z=rot;calibreDetailRoot.add(b);return b}
function addScrew(x,y,z,scale=1){const cap=new THREE.Mesh(new THREE.CylinderGeometry(.058*scale,.058*scale,.024*scale,28),screwMat);cap.rotation.x=Math.PI/2;cap.position.set(x,y,z);calibreDetailRoot.add(cap);const slot=new THREE.Mesh(new THREE.BoxGeometry(.082*scale,.012*scale,.009*scale),brushedDark);slot.position.set(x,y,z-.014*scale);slot.rotation.z=(x+y)*.37;calibreDetailRoot.add(slot);return cap}
function addArbor(x,y,z,len=.5,r=.018){const a=new THREE.Mesh(new THREE.CylinderGeometry(r,r,len,16),fineSteel);a.rotation.x=Math.PI/2;a.position.set(x,y,z);calibreDetailRoot.add(a);return a}
function addJewel(x,y,z,r=.07){const j=new THREE.Mesh(new THREE.CylinderGeometry(r,r,.026,24),ruby);j.rotation.x=Math.PI/2;j.position.set(x,y,z);calibreDetailRoot.add(j);return j}
function ringPlate(outer,inner,depth=.046){const s=new THREE.Shape();s.absarc(0,0,outer,0,Math.PI*2,false);const h=new THREE.Path();h.absarc(0,0,inner,0,Math.PI*2,true);s.holes.push(h);const g=new THREE.ExtrudeGeometry(s,{depth,bevelEnabled:true,bevelThickness:.007,bevelSize:.007,bevelSegments:1});g.center();return g}
[-1.45,-3.05,-4.9,-6.7,-8.6].forEach((z,i)=>{const plate=new THREE.Mesh(ringPlate(3.0-i*.03,2.38-i*.018,.046),i%2?brushedDark:bridgeSteel);plate.position.z=z;plate.rotation.z=i*.1;calibreDetailRoot.add(plate)});
const innerWall=new THREE.Mesh(new THREE.CylinderGeometry(3.18,3.18,9.1,96,1,true),brushedDark);innerWall.rotation.x=Math.PI/2;innerWall.position.z=-5.0;innerWall.material.side=THREE.DoubleSide;calibreDetailRoot.add(innerWall);
[[-1.2,1.2,-2.18,2.05,.24,-.33],[.92,1.34,-3.08,1.86,.22,.26],[-.62,-1.36,-3.98,2.18,.23,.12],[1.16,-.92,-4.96,1.78,.21,-.46],[-1.16,.04,-6.31,2.05,.24,.56],[.72,1.24,-7.30,1.95,.22,-.2],[-.62,-1.12,-8.28,2.18,.23,.33]].forEach((b,i)=>addBridge(...b,i%3===1?brushedDark:bridgeSteel));
const trainSpecs=[[-1.55,.42,-2.42,.62,42,.052,brass,.22],[-.55,.88,-3.18,.48,34,.046,fineSteel,-.31],[.48,.36,-3.96,.56,38,.048,brass,.27],[1.18,-.34,-4.72,.42,30,.043,fineSteel,-.38],[.52,-1.08,-5.54,.50,36,.046,brass,.34],[-.42,-.78,-6.34,.44,32,.043,fineSteel,-.29],[-1.16,-.18,-7.08,.58,40,.048,brass,.24],[-.34,.86,-7.86,.40,28,.041,fineSteel,-.42]];
const fineTrain=[];trainSpecs.forEach((s,i)=>{const g=new THREE.Mesh(gearGeometry(s[3],s[4],s[5]),s[6]);g.position.set(s[0],s[1],s[2]);g.userData.fineSpeed=s[7];calibreDetailRoot.add(g);fineTrain.push(g);addArbor(s[0],s[1],s[2],.42,.015+(i%2)*.003);addJewel(s[0],s[1],s[2]-.08,.052+(i%3)*.006)});
const barrelGroup=new THREE.Group();barrelGroup.position.set(-1.34,.82,-5.98);calibreDetailRoot.add(barrelGroup);
const barrelBody=new THREE.Mesh(new THREE.CylinderGeometry(.66,.66,.15,72),brushedDark);barrelBody.rotation.x=Math.PI/2;barrelGroup.add(barrelBody);
const barrelTop=new THREE.Mesh(new THREE.CylinderGeometry(.60,.60,.022,72),bridgeSteel);barrelTop.rotation.x=Math.PI/2;barrelTop.position.z=-.09;barrelGroup.add(barrelTop);
const barrelWheel=new THREE.Mesh(gearGeometry(.78,48,.046),brass);barrelWheel.position.z=-.13;barrelGroup.add(barrelWheel);
const barrelHub=new THREE.Mesh(new THREE.CylinderGeometry(.08,.08,.18,28),ruby);barrelHub.rotation.x=Math.PI/2;barrelGroup.add(barrelHub);
const balanceAssembly=new THREE.Group();balanceAssembly.position.set(1.22,-.70,-5.48);calibreDetailRoot.add(balanceAssembly);
const balanceRim=new THREE.Mesh(new THREE.TorusGeometry(.68,.028,12,96),brass);balanceAssembly.add(balanceRim);
for(let i=0;i<4;i++){const spoke=new THREE.Mesh(new THREE.BoxGeometry(1.18,.021,.028),brass);spoke.rotation.z=i*Math.PI/2;balanceAssembly.add(spoke)}
const balanceHub=new THREE.Mesh(new THREE.CylinderGeometry(.07,.07,.15,24),ruby);balanceHub.rotation.x=Math.PI/2;balanceAssembly.add(balanceHub);
const springPts=[];for(let i=0;i<320;i++){const a=i*.15,r=.055+i*.00172;springPts.push(new THREE.Vector3(Math.cos(a)*r,Math.sin(a)*r,.035))}
const springGeo=new THREE.BufferGeometry().setFromPoints(springPts);const springMat=new THREE.LineBasicMaterial({color:0xd1d4d6,transparent:true,opacity:0,depthWrite:false});springMat.userData.baseOpacity=.78;mechanismMaterials.push(springMat);const hairspring=new THREE.Line(springGeo,springMat);balanceAssembly.add(hairspring);
const escapeGroup=new THREE.Group();escapeGroup.position.set(1.63,.44,-7.46);calibreDetailRoot.add(escapeGroup);
const escapeWheel=new THREE.Mesh(gearGeometry(.38,20,.038),brass);escapeGroup.add(escapeWheel);
const pallet=new THREE.Mesh(bridgeGeom(.64,.095,.032,.045),fineSteel);pallet.position.set(-.34,-.15,.02);pallet.rotation.z=.55;escapeGroup.add(pallet);
const palletJewelA=new THREE.Mesh(new THREE.BoxGeometry(.085,.042,.038),ruby),palletJewelB=palletJewelA.clone();palletJewelA.position.set(-.58,-.02,.03);palletJewelB.position.set(-.18,-.36,.03);escapeGroup.add(palletJewelA,palletJewelB);
const arborSpecs=[[-1.7,.5,-2.0],[1.15,.82,-2.8],[-.2,-1.35,-3.6],[1.8,-1.0,-4.3],[-1.9,-1.2,-5.4],[.55,.25,-6.2],[2,1.45,-7.2],[-1.4,1.6,-8],[.15,-1.4,-9]];
arborSpecs.forEach((a,i)=>{addArbor(a[0],a[1],a[2],.48,.016+(i%3)*.002);addJewel(a[0],a[1],a[2]-.10,.052)});
for(let i=0;i<26;i++){const a=i/26*Math.PI*2,r=2.66-(i%4)*.045,z=-1.72-(i%6)*1.34;addScrew(Math.cos(a)*r,Math.sin(a)*r,z,.72+(i%2)*.08)}
const dustGeo=new THREE.BufferGeometry(),dust=[];`);
html=html.replace("gears.forEach(g=>g.rotation.z+=dt*g.userData.speed);dustPts.rotation.z+=dt*.025;dustPts.rotation.y+=dt*.012;","gears.forEach(g=>g.rotation.z+=dt*g.userData.speed);fineTrain.forEach(g=>g.rotation.z+=dt*g.userData.fineSpeed);barrelWheel.rotation.z+=dt*.14;escapeWheel.rotation.z-=dt*1.55;balanceAssembly.rotation.z=Math.sin(performance.now()*.0068)*.42;const springPulse=1+Math.sin(performance.now()*.0136)*.04;hairspring.scale.set(springPulse,springPulse,1);dustPts.rotation.z+=dt*.025;dustPts.rotation.y+=dt*.012;");
html=html.replace("Прокрутка проводит камеру сквозь корпус в механический туннель. Шестерни, кольца, рубины и свет двигаются в реальном времени.","Прокрутка проводит камеру внутрь тонкого часового калибра: между мостами, винтами, осями, барабаном, балансом и зубчатой передачей. Детали сделаны компактными и многослойными, как в настоящем механизме.");
html=html.replace("Внутри работает отдельная 3D-сцена: зубчатые колёса вращаются с разной скоростью, а свет и частицы создают глубину.","Внутри работают тонкие мосты, колёсная передача, барабан, спуск и баланс со спиралью. Микровинты, рубиновые опоры и оси создают плотную архитектуру настоящего часового калибра.");
html=html.replace("Scroll carries the camera through the case into a mechanical tunnel. Gears, rings, jewels and light move in real time.","Scroll carries the camera into a fine mechanical calibre: between slim bridges, screws, arbors, barrel, balance and the gear train. The parts are compact and layered like a real movement.");
html=html.replace("A separate 3D scene runs inside: toothed wheels rotate at different speeds while light and particles create depth.","Inside, slim bridges, the wheel train, barrel, escapement and balance with hairspring work together. Micro-screws, jewel bearings and arbors create the dense architecture of a real watch movement.");
return html;
};
})();