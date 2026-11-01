import a from './runtime-a.js';
import b from './runtime-b.js';

const THREE = await import('three');
const { GLTFLoader } = await import('three/addons/loaders/GLTFLoader.js');
const { RoomEnvironment } = await import('three/addons/environments/RoomEnvironment.js');
const { EffectComposer } = await import('three/addons/postprocessing/EffectComposer.js');
const { RenderPass } = await import('three/addons/postprocessing/RenderPass.js');
const { UnrealBloomPass } = await import('three/addons/postprocessing/UnrealBloomPass.js');

const packed = a + b;
const bytes = Uint8Array.from(atob(packed), c => c.charCodeAt(0));
const stream = new Blob([bytes]).stream().pipeThrough(new DecompressionStream('gzip'));
let code = await new Response(stream).text();

// The packed source was originally an ES module. Remove only its top-level
// import declarations because the same dependencies are injected below.
code = code.replace(/^import\s+[^;]+;\s*/gm, '');

new Function(
  'THREE',
  'GLTFLoader',
  'RoomEnvironment',
  'EffectComposer',
  'RenderPass',
  'UnrealBloomPass',
  code
)(THREE, GLTFLoader, RoomEnvironment, EffectComposer, RenderPass, UnrealBloomPass);
