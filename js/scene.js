import * as THREE from 'three';
const canvas = document.querySelector('#bg-canvas');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
function bail() { if (canvas) canvas.style.display = 'none'; finishLoader(); }
function finishLoader() { const loader = document.querySelector('#loader'); if (loader) { setTimeout(() => loader.classList.add('is-done'), 350); } }
if (!canvas || reduceMotion) { bail(); } else { init(); }
function init() {
  let renderer;
  try { renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true }); } catch (e) { bail(); return; }
  renderer.setClearColor(0x000000, 0);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
  renderer.setSize(window.innerWidth, window.innerHeight);
  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  const uniforms = {
    u_time: { value: 0 },
    u_res: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
    u_mouse: { value: new THREE.Vector2(0.5, 0.5) },
    u_cA: { value: new THREE.Color(0x14100c) },
    u_cB: { value: new THREE.Color(0x7a5a33) },
    u_cC: { value: new THREE.Color(0xc9a36a) },
    u_cD: { value: new THREE.Color(0xb98a7e) },
  };
  const vertexShader = `varying vec2 v_uv; void main() { v_uv = uv; gl_Position = vec4(position, 1.0); }`;
  const fragmentShader = `
    precision highp float;
    varying vec2 v_uv;
    uniform float u_time; uniform vec2 u_res, u_mouse; uniform vec3 u_cA, u_cB, u_cC, u_cD;
    vec2 hash(vec2 p) { p = vec2(dot(p,vec2(127.1,311.7)),dot(p,vec2(269.5,183.3))); return -1.0+2.0*fract(sin(p)*43758.5453123); }
    float noise(vec2 p) { vec2 i=floor(p),f=fract(p),u=f*f*(3.0-2.0*f); return mix(mix(dot(hash(i+vec2(0,0)),f-vec2(0,0)),dot(hash(i+vec2(1,0)),f-vec2(1,0)),u.x),mix(dot(hash(i+vec2(0,1)),f-vec2(0,1)),dot(hash(i+vec2(1,1)),f-vec2(1,1)),u.x),u.y); }
    float fbm(vec2 p) { float v=0.0,a=0.5; for(int i=0;i<5;i++){v+=a*noise(p);p*=2.0;a*=0.5;} return v; }
    void main() {
      vec2 uv=v_uv; float aspect=u_res.x/u_res.y; vec2 p=uv; p.x*=aspect;
      float t=u_time*0.045;
      vec2 q=vec2(fbm(p+vec2(0,t)),fbm(p+vec2(5.2,-t)));
      vec2 r=vec2(fbm(p+1.6*q+vec2(1.7,9.2)+0.15*t),fbm(p+1.6*q+vec2(8.3,2.8)-0.12*t));
      float f=fbm(p+2.0*r);
      vec2 m=(u_mouse-0.5); f+=0.06*sin((uv.x+m.x)*6.2831+t*2.0);
      vec3 col=mix(u_cA,u_cB,smoothstep(-0.2,0.6,f));
      col=mix(col,u_cC,smoothstep(0.25,0.95,length(r))*0.65);
      col=mix(col,u_cD,smoothstep(0.6,1.1,q.x+r.y)*0.4);
      float vig=smoothstep(1.25,0.25,length((uv-0.5)*vec2(aspect,1.0)));
      col=mix(u_cA,col,0.35+0.65*vig);
      float grain=(fract(sin(dot(uv*u_res,vec2(12.9898,78.233)))*43758.5453)-0.5)*0.025;
      col+=grain;
      gl_FragColor=vec4(col,1.0);
    }`;
  const quad = new THREE.Mesh(new THREE.PlaneGeometry(2,2), new THREE.ShaderMaterial({uniforms,vertexShader,fragmentShader,depthTest:false}));
  scene.add(quad);
  const COUNT = window.innerWidth < 700 ? 90 : 220;
  const positions = new Float32Array(COUNT*3), speeds = new Float32Array(COUNT), phases = new Float32Array(COUNT);
  for(let i=0;i<COUNT;i++){positions[i*3]=(Math.random()-0.5)*2;positions[i*3+1]=(Math.random()-0.5)*2;positions[i*3+2]=0;speeds[i]=0.01+Math.random()*0.03;phases[i]=Math.random()*6.2831;}
  const pGeo = new THREE.BufferGeometry();
  pGeo.setAttribute('position', new THREE.BufferAttribute(positions,3));
  const sprite=(()=>{const c=document.createElement('canvas');c.width=c.height=64;const g=c.getContext('2d'),grad=g.createRadialGradient(32,32,0,32,32,32);grad.addColorStop(0,'rgba(255,240,215,1)');grad.addColorStop(0.3,'rgba(226,199,154,0.7)');grad.addColorStop(1,'rgba(226,199,154,0)');g.fillStyle=grad;g.fillRect(0,0,64,64);return new THREE.CanvasTexture(c);})();
  const points=new THREE.Points(pGeo,new THREE.PointsMaterial({size:0.022,map:sprite,transparent:true,depthTest:false,blending:THREE.AdditiveBlending,opacity:0.7}));
  scene.add(points);
  const mouse={x:0.5,y:0.5,tx:0.5,ty:0.5};
  window.addEventListener('pointermove',(e)=>{mouse.tx=e.clientX/window.innerWidth;mouse.ty=1.0-e.clientY/window.innerHeight;},{passive:true});
  window.addEventListener('resize',()=>{renderer.setSize(window.innerWidth,window.innerHeight);uniforms.u_res.value.set(window.innerWidth,window.innerHeight);});
  let running=true;
  document.addEventListener('visibilitychange',()=>{running=!document.hidden;if(running)clock.start();});
  const clock=new THREE.Clock();let started=false;
  function animate(){requestAnimationFrame(animate);if(!running)return;const dt=clock.getDelta();uniforms.u_time.value+=dt;mouse.x+=(mouse.tx-mouse.x)*0.04;mouse.y+=(mouse.ty-mouse.y)*0.04;uniforms.u_mouse.value.set(mouse.x,mouse.y);const t=uniforms.u_time.value,arr=pGeo.attributes.position.array;for(let i=0;i<COUNT;i++){arr[i*3+1]+=speeds[i]*dt;arr[i*3]+=Math.sin(t*0.4+phases[i])*0.0006;if(arr[i*3+1]>1.05){arr[i*3+1]=-1.05;arr[i*3]=(Math.random()-0.5)*2;}}pGeo.attributes.position.needsUpdate=true;points.position.x=(mouse.x-0.5)*0.08;points.position.y=(mouse.y-0.5)*0.08;renderer.render(scene,camera);if(!started){started=true;finishLoader();}}
  animate();
}