import{n as e}from"./rolldown-runtime-DF2fYuay.js";import{a as t,i as n}from"./ui-vendor-xy88d_XT.js";var r=e(t(),1),i=n(),a=`#version 300 es
in vec2 aPosition;
uniform vec2 uTexel;
out vec2 vUv;
out vec2 vL;
out vec2 vR;
out vec2 vT;
out vec2 vB;
void main() {
  vUv = aPosition * 0.5 + 0.5;
  vL = vUv - vec2(uTexel.x, 0.0);
  vR = vUv + vec2(uTexel.x, 0.0);
  vT = vUv + vec2(0.0, uTexel.y);
  vB = vUv - vec2(0.0, uTexel.y);
  gl_Position = vec4(aPosition, 0.0, 1.0);
}`,o=`#version 300 es
precision highp float;
precision highp sampler2D;
in vec2 vUv;
in vec2 vL;
in vec2 vR;
in vec2 vT;
in vec2 vB;
out vec4 outColor;
`,s=`${o}
uniform sampler2D uTarget;
uniform float uAspect;
uniform vec2 uA;
uniform vec2 uB;
uniform float uRadius;
uniform float uWide;
uniform vec3 uValue;
uniform float uMode;
uniform float uStrength;
float erf(float x) {
  float x2 = x * x;
  float a = 0.147;
  return sign(x) * sqrt(1.0 - exp(-x2 * (1.2732395 + a * x2) / (1.0 + a * x2)));
}
float sweep(float along, float length, float across, float radius) {
  return exp(-across * across / (radius * radius)) * 0.5 * (erf(along / radius) - erf((along - length) / radius));
}
void main() {
  vec2 p = vec2(vUv.x * uAspect, vUv.y);
  vec2 a = vec2(uA.x * uAspect, uA.y);
  vec2 ab = vec2(uB.x * uAspect, uB.y) - a;
  float len = length(ab);
  vec2 dir = len > 1e-6 ? ab / len : vec2(1.0, 0.0);
  vec2 ap = p - a;
  vec3 base = texture(uTarget, vUv).xyz;
  if (uMode > 1.5) {
    float along = dot(ap, dir);
    float across = dot(ap, vec2(-dir.y, dir.x));
    if (uMode > 2.5) {
      outColor = vec4(mix(base, uValue, sweep(along, len, across, uRadius) * uStrength), 1.0);
      return;
    }
    vec3 add = vec3(uValue.xy * sweep(along, len, across, uRadius), uValue.z * sweep(along, len, across, uWide));
    outColor = vec4(base + add, 1.0);
    return;
  }
  float h = clamp(dot(ap, ab) / max(dot(ab, ab), 1e-9), 0.0, 1.0);
  vec2 d = ap - ab * h;
  float r2 = dot(d, d);
  float falloff = exp(-r2 / (uRadius * uRadius));
  float wide = exp(-r2 / (uWide * uWide));
  vec3 result = uMode > 0.5 ? mix(base, uValue, falloff * uStrength) : base + vec3(uValue.xy * falloff, uValue.z * wide);
  outColor = vec4(result, 1.0);
}`,c=`${o}
uniform sampler2D uVelocity;
uniform sampler2D uSource;
uniform vec2 uVelocityTexel;
uniform float uDt;
uniform vec4 uDecay;
void main() {
  vec2 coord = vUv - uDt * texture(uVelocity, vUv).xy * uVelocityTexel;
  outColor = texture(uSource, coord) * uDecay;
}`,l=`${o}
uniform sampler2D uVelocity;
uniform sampler2D uSource;
uniform sampler2D uForward;
uniform sampler2D uBack;
uniform vec2 uVelocityTexel;
uniform vec2 uSourceTexel;
uniform float uDt;
uniform vec4 uDecay;
void main() {
  vec2 coord = vUv - uDt * texture(uVelocity, vUv).xy * uVelocityTexel;
  vec4 forward = texture(uForward, vUv);
  vec4 corrected = forward + 0.5 * (texture(uSource, vUv) - texture(uBack, vUv));
  vec2 base = (floor(coord / uSourceTexel - 0.5) + 0.5) * uSourceTexel;
  vec4 a = texture(uSource, base);
  vec4 b = texture(uSource, base + vec2(uSourceTexel.x, 0.0));
  vec4 c = texture(uSource, base + vec2(0.0, uSourceTexel.y));
  vec4 d = texture(uSource, base + uSourceTexel);
  vec4 low = min(min(a, b), min(c, d));
  vec4 high = max(max(a, b), max(c, d));
  outColor = clamp(corrected, low, high) * uDecay;
}`,u=`${o}
uniform sampler2D uVelocity;
void main() {
  float left = texture(uVelocity, vL).x;
  float right = texture(uVelocity, vR).x;
  float top = texture(uVelocity, vT).y;
  float bottom = texture(uVelocity, vB).y;
  vec2 center = texture(uVelocity, vUv).xy;
  if (vL.x < 0.0) left = -center.x;
  if (vR.x > 1.0) right = -center.x;
  if (vT.y > 1.0) top = -center.y;
  if (vB.y < 0.0) bottom = -center.y;
  outColor = vec4(0.5 * (right - left + top - bottom), 0.0, 0.0, 1.0);
}`,d=`${o}
uniform sampler2D uSource;
uniform float uValue;
void main() {
  outColor = texture(uSource, vUv) * uValue;
}`,f=`${o}
uniform sampler2D uPressure;
uniform sampler2D uDivergence;
void main() {
  float left = texture(uPressure, vL).x;
  float right = texture(uPressure, vR).x;
  float top = texture(uPressure, vT).x;
  float bottom = texture(uPressure, vB).x;
  float divergence = texture(uDivergence, vUv).x;
  outColor = vec4((left + right + bottom + top - divergence) * 0.25, 0.0, 0.0, 1.0);
}`,p=`${o}
uniform sampler2D uPressure;
uniform sampler2D uVelocity;
void main() {
  float left = texture(uPressure, vL).x;
  float right = texture(uPressure, vR).x;
  float top = texture(uPressure, vT).x;
  float bottom = texture(uPressure, vB).x;
  vec2 velocity = texture(uVelocity, vUv).xy - vec2(right - left, top - bottom);
  outColor = vec4(velocity, 0.0, 1.0);
}`,m=`
uniform vec3 uColor;
uniform vec3 uSecondary;
uniform float uIntensity;
uniform float uHotspot;
vec3 shade(vec3 dye) {
  float energy = max(dye.x, 0.0);
  float heat = clamp(dye.y, 0.0, energy);
  float gas = max(dye.z, 0.0);
  float fresh = heat / max(energy, 0.0001);
  vec3 tint = mix(uSecondary, uColor, fresh);
  return (tint * energy + uSecondary * gas + vec3(heat * heat * 0.3 * uHotspot)) * uIntensity;
}
`,ee=`${o}${m}
uniform sampler2D uDye;
uniform vec2 uDyeTexel;
void main() {
  vec2 o = uDyeTexel * 0.5;
  vec3 light = shade(texture(uDye, vUv + vec2(-o.x, -o.y)).xyz);
  light += shade(texture(uDye, vUv + vec2(o.x, -o.y)).xyz);
  light += shade(texture(uDye, vUv + vec2(-o.x, o.y)).xyz);
  light += shade(texture(uDye, vUv + vec2(o.x, o.y)).xyz);
  outColor = vec4(light * 0.25, 1.0);
}`,te=`${o}
uniform sampler2D uSource;
uniform vec2 uSourceTexel;
void main() {
  vec2 o = uSourceTexel;
  vec3 color = texture(uSource, vUv).rgb * 4.0;
  color += texture(uSource, vUv + vec2(-o.x, -o.y)).rgb;
  color += texture(uSource, vUv + vec2(o.x, -o.y)).rgb;
  color += texture(uSource, vUv + vec2(-o.x, o.y)).rgb;
  color += texture(uSource, vUv + vec2(o.x, o.y)).rgb;
  outColor = vec4(color / 8.0, 1.0);
}`,ne=`${o}
uniform sampler2D uSource;
uniform vec2 uSourceTexel;
void main() {
  vec2 o = uSourceTexel;
  vec3 color = texture(uSource, vUv + vec2(-o.x * 2.0, 0.0)).rgb;
  color += texture(uSource, vUv + vec2(o.x * 2.0, 0.0)).rgb;
  color += texture(uSource, vUv + vec2(0.0, -o.y * 2.0)).rgb;
  color += texture(uSource, vUv + vec2(0.0, o.y * 2.0)).rgb;
  color += texture(uSource, vUv + vec2(-o.x, -o.y)).rgb * 2.0;
  color += texture(uSource, vUv + vec2(o.x, -o.y)).rgb * 2.0;
  color += texture(uSource, vUv + vec2(-o.x, o.y)).rgb * 2.0;
  color += texture(uSource, vUv + vec2(o.x, o.y)).rgb * 2.0;
  outColor = vec4(color / 12.0, 1.0);
}`,re=`${o}${m}
uniform sampler2D uDye;
uniform sampler2D uBloom;
uniform float uGlow;
uniform float uGrain;
uniform float uTime;
uniform float uLight;
float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}
void main() {
  vec3 dye = texture(uDye, vUv).xyz;
  vec3 light = shade(dye);
  vec3 bloom = texture(uBloom, vUv).rgb * uGlow;
  float edge = smoothstep(0.0, 0.02, min(min(vUv.x, 1.0 - vUv.x), min(vUv.y, 1.0 - vUv.y)));
  float grain = 1.0 + (hash(gl_FragCoord.xy + fract(uTime * 13.7) * 97.0) - 0.5) * uGrain * 2.0;
  if (uLight > 0.5) {
    float energy = max(dye.x, 0.0);
    float heat = clamp(dye.y, 0.0, energy);
    float gas = max(dye.z, 0.0);
    float fresh = heat / max(energy, 0.0001);
    vec3 tint = mix(uSecondary, uColor, fresh);
    float halo = dot(bloom, vec3(0.2126, 0.7152, 0.0722));
    float density = 1.0 - exp(-((energy * 1.1 + gas * 0.8) * uIntensity + halo * 0.25));
    float tone = dot(tint, vec3(0.2126, 0.7152, 0.0722));
    vec3 ink = tint * min(1.0, 0.5 / max(tone, 0.001)) * mix(0.95, 0.72, smoothstep(0.5, 3.0, energy));
    ink = mix(ink, vec3(1.0), clamp(heat * heat * 0.05 * uHotspot, 0.0, 0.45));
    density = clamp(density * grain, 0.0, 1.0) * edge;
    outColor = vec4(ink * density, density);
  } else {
    vec3 color = 1.0 - exp(-(light + bloom) * grain);
    color *= edge;
    outColor = vec4(color, max(color.r, max(color.g, color.b)));
  }
}`,h={low:{sim:96,dye:384},medium:{sim:128,dye:576},high:{sim:160,dye:768}},ie=20,ae=.75,g=5,_=(e,t,n)=>Math.min(n,Math.max(t,e)),v=(e,t,n)=>{let r=e.createShader(t);return r?(e.shaderSource(r,n),e.compileShader(r),e.getShaderParameter(r,e.COMPILE_STATUS)?r:(e.deleteShader(r),null)):null},oe=([e,t,n])=>{let r=Math.max(e,t,n),i=r-Math.min(e,t,n),a=0;return i>0&&(a=r===e?(t-n)/i%6:r===t?(n-e)/i+2:(e-t)/i+4),[(a*60+360)%360,r>0?i/r:0,r]},se=(e,t,n)=>{let r=(e%360+360)%360/60,i=n*t,a=i*(1-Math.abs(r%2-1)),o=n-i,[s,c,l]=r<1?[i,a,0]:r<2?[a,i,0]:r<3?[0,i,a]:r<4?[0,a,i]:r<5?[a,0,i]:[i,0,a];return[s+o,c+o,l+o]},y=({color:e=`#5f8bff`,secondaryColor:t,intensity:n=1.3,trailWidth:o=3,linger:m=1.4,glow:y=1.2,hotspot:b=.8,followSpeed:x=.6,grain:S=0,clickBurst:C=!0,quality:w=`high`,theme:T=`dark`,blendMode:E,maxDevicePixelRatio:D=2,enabled:O=!0,children:k,className:A=``,style:j,...M})=>{let N=(0,r.useRef)(null),P=(0,r.useRef)(null),F=(0,r.useRef)(null);F.current={color:String(e),secondaryColor:t?String(t):``,intensity:Math.max(0,n),trailWidth:_(o,.5,40),linger:_(m,.1,10),glow:Math.max(0,y),hotspot:Math.max(0,b),followSpeed:_(x,0,1),grain:Math.max(0,S),clickBurst:C,quality:h[w]?w:`high`,theme:T,maxDevicePixelRatio:D,enabled:O},(0,r.useEffect)(()=>{let e=N.current,t=P.current,n=t?.getContext(`webgl2`,{alpha:!0,premultipliedAlpha:!0,antialias:!1,depth:!1,stencil:!1});if(!e||!t||!n||!n.getExtension(`EXT_color_buffer_float`))return;let r=v(n,n.VERTEX_SHADER,a);if(!r)return;let i=e=>{let t=v(n,n.FRAGMENT_SHADER,e),i=n.createProgram();if(!t||!i)return null;if(n.attachShader(i,r),n.attachShader(i,t),n.bindAttribLocation(i,0,`aPosition`),n.linkProgram(i),n.deleteShader(t),!n.getProgramParameter(i,n.LINK_STATUS))return n.deleteProgram(i),null;let a={},o=n.getProgramParameter(i,n.ACTIVE_UNIFORMS);for(let e=0;e<o;e++){let t=n.getActiveUniform(i,e);t&&(a[t.name]=n.getUniformLocation(i,t.name))}return{program:i,uniforms:a}},o={splat:i(s),advect:i(c),maccormack:i(l),divergence:i(u),scale:i(d),pressure:i(f),gradient:i(p),prefilter:i(ee),down:i(te),up:i(ne),display:i(re)};if(Object.values(o).some(e=>!e))return;let m=n.createVertexArray(),_=n.createBuffer();n.bindVertexArray(m),n.bindBuffer(n.ARRAY_BUFFER,_),n.bufferData(n.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),n.STATIC_DRAW),n.enableVertexAttribArray(0),n.vertexAttribPointer(0,2,n.FLOAT,!1,0,0);let y=document.createElement(`canvas`);y.width=1,y.height=1;let b=y.getContext(`2d`,{willReadFrequently:!0}),x=window.matchMedia?.(`(prefers-reduced-motion: reduce)`).matches??!1,S={width:1,height:1,ratio:1,colorKey:``,color:[.37,.55,1],secondary:[.25,.3,1],pointer:{x:0,y:0,inside:!1},emitter:{x:0,y:0,vx:0,vy:0,px:0,py:0,travelled:0},ready:!1,bursts:[],active:-1/0,time:0,allocated:``,targets:null},C=0,w=0,T=!0,E=!0,D=(e,t)=>{if(!b||!e)return t;let n=/^[0-9a-f]{3,8}$/i.test(e)?`#${e}`:e;b.clearRect(0,0,1,1),b.fillStyle=`#000000`,b.fillStyle=n,b.fillRect(0,0,1,1);let[r,i,a]=b.getImageData(0,0,1,1).data;return[r/255,i/255,a/255]},O=e=>{let t=`${e.color}|${e.secondaryColor}`;if(t!==S.colorKey)if(S.colorKey=t,S.color=D(e.color,[.37,.55,1]),e.secondaryColor)S.secondary=D(e.secondaryColor,S.color);else{let[e,t,n]=oe(S.color);S.secondary=se(e+8,Math.min(1,t*1.1+.05),n)}},k=(e,t,r,i,a)=>{let o=n.createTexture();n.bindTexture(n.TEXTURE_2D,o),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,a),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MAG_FILTER,a),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE),n.texImage2D(n.TEXTURE_2D,0,r,e,t,0,i,n.HALF_FLOAT,null);let s=n.createFramebuffer();return n.bindFramebuffer(n.FRAMEBUFFER,s),n.framebufferTexture2D(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,o,0),n.viewport(0,0,e,t),n.clearColor(0,0,0,0),n.clear(n.COLOR_BUFFER_BIT),{texture:o,fbo:s,width:e,height:t,texel:[1/e,1/t]}},A=(e,t,n,r,i)=>{let a=k(e,t,n,r,i),o=k(e,t,n,r,i);return{get read(){return a},get write(){return o},swap(){let e=a;a=o,o=e},targets(){return[a,o]}}},j=e=>{n.deleteTexture(e.texture),n.deleteFramebuffer(e.fbo)},M=()=>{let e=S.targets;e&&([...e.velocity.targets(),...e.dye.targets(),...e.pressure.targets(),e.divergence,e.forward,e.back,...e.bloom].forEach(j),S.targets=null)},I=()=>{let e=S.targets;e&&(n.clearColor(0,0,0,0),[...e.velocity.targets(),...e.dye.targets(),...e.pressure.targets()].forEach(e=>{n.bindFramebuffer(n.FRAMEBUFFER,e.fbo),n.clear(n.COLOR_BUFFER_BIT)}))},L=()=>{let e=F.current,r=`${e.quality}|${S.width}|${S.height}|${t.width}|${t.height}`;if(r===S.allocated&&S.targets)return;M(),S.allocated=r;let i=h[e.quality],a=S.width/S.height,o=e=>a>=1?[Math.round(e*a),e]:[e,Math.round(e/a)],[s,c]=o(i.sim),[l,u]=o(i.dye),d=Math.min(1,t.width/l,t.height/u);l=Math.max(2,Math.round(l*d)),u=Math.max(2,Math.round(u*d));let f=[],p=l>>1,m=u>>1;for(let e=0;e<g;e++)f.push(k(Math.max(1,p),Math.max(1,m),n.RGBA16F,n.RGBA,n.LINEAR)),p>>=1,m>>=1;S.targets={velocity:A(s,c,n.RG16F,n.RG,n.LINEAR),dye:A(l,u,n.RGBA16F,n.RGBA,n.LINEAR),forward:k(l,u,n.RGBA16F,n.RGBA,n.LINEAR),back:k(l,u,n.RGBA16F,n.RGBA,n.LINEAR),pressure:A(s,c,n.R16F,n.RED,n.NEAREST),divergence:k(s,c,n.R16F,n.RED,n.NEAREST),bloom:f}},R=()=>{let n=F.current,r=Math.max(1,e.clientWidth),i=Math.max(1,e.clientHeight),a=Math.min(window.devicePixelRatio||1,Math.max(.5,n.maxDevicePixelRatio||2)),o=Math.max(1,Math.round(r*a)),s=Math.max(1,Math.round(i*a));(t.width!==o||t.height!==s)&&(t.width=o,t.height=s),S.width=r,S.height=i,S.ratio=a,L()},z=e=>{e?(n.bindFramebuffer(n.FRAMEBUFFER,e.fbo),n.viewport(0,0,e.width,e.height)):(n.bindFramebuffer(n.FRAMEBUFFER,null),n.viewport(0,0,t.width,t.height)),n.drawArrays(n.TRIANGLES,0,3)},B=(e,t)=>(n.useProgram(e.program),e.uniforms.uTexel&&n.uniform2f(e.uniforms.uTexel,t[0],t[1]),e.uniforms),V=(e,t)=>(n.activeTexture(n.TEXTURE0+e),n.bindTexture(n.TEXTURE_2D,t.texture),e),H=(e,t,r,i,a,s,c,l,u,d=s)=>{let f=B(o.splat,e.read.texel);n.uniform1i(f.uTarget,V(0,e.read)),n.uniform1f(f.uAspect,S.width/S.height),n.uniform2f(f.uA,t/S.width,1-r/S.height),n.uniform2f(f.uB,i/S.width,1-a/S.height),n.uniform1f(f.uRadius,s/S.height),n.uniform1f(f.uWide,d/S.height),n.uniform3f(f.uValue,c[0],c[1],c[2]),n.uniform1f(f.uMode,l),n.uniform1f(f.uStrength,u),z(e.write),e.swap()},U=(e,t)=>{let{velocity:n}=S.targets;return[e*n.read.width/S.width,-t*n.read.height/S.height]},W=e=>Math.max(e.trailWidth*.5,S.height/S.targets.dye.read.height*.9),ce=(e,t,n)=>{let{emitter:r,pointer:i}=S,{velocity:a,dye:o}=S.targets;if(r.px=r.x,r.py=r.y,x||e.followSpeed>=1)r.x=i.x,r.y=i.y;else{let n=10+e.followSpeed*50,a=Math.max(1,Math.ceil(t/.004)),o=t/a;for(let e=0;e<a;e++)r.vx+=(n*n*(i.x-r.x)-2*n*r.vx)*o,r.vy+=(n*n*(i.y-r.y)-2*n*r.vy)*o,r.x+=r.vx*o,r.y+=r.vy*o}let s=r.x-r.px,c=r.y-r.py;if(Math.hypot(s,c)<.05||!e.enabled)return;let l=W(e);if(!x){let e=U(s/Math.max(t,.001),c/Math.max(t,.001));H(a,r.px,r.py,r.x,r.y,l*4+18,[e[0],e[1],0],3,ae*.6)}H(o,r.px,r.py,r.x,r.y,l,[5.6,5.6,.7],2,1,l*5+6),S.active=n},le=(e,t,n,r)=>{let{velocity:i,dye:a}=S.targets,o=W(e),s=Math.random()*Math.PI*2;for(let e=0;e<6;e++){let r=s+e/6*Math.PI*2+(Math.random()-.5)*.5,c=Math.cos(r),l=Math.sin(r),u=20+Math.random()*14,d=t+c*3,f=n+l*3,p=t+c*u,m=n+l*u;if(!x){let e=U(Math.cos(r+.6)*760,Math.sin(r+.6)*760);H(i,d,f,p,m,18,[e[0],e[1],0],1,.9)}H(a,d,f,p,m,o*1.1,[2.4,2.4,.3],0,1,o*5+6)}H(a,t,n,t+.01,n,o*2.2,[1.8,1.8,.4],0,1,o*7+10),S.active=r},ue=(e,t)=>{let{velocity:r,dye:i,pressure:a,divergence:s}=S.targets;if(!x){let e=B(o.divergence,r.read.texel);n.uniform1i(e.uVelocity,V(0,r.read)),z(s),e=B(o.scale,a.read.texel),n.uniform1i(e.uSource,V(0,a.read)),n.uniform1f(e.uValue,.8),z(a.write),a.swap(),e=B(o.pressure,a.read.texel),n.uniform1i(e.uDivergence,V(1,s));for(let t=0;t<ie;t++)n.uniform1i(e.uPressure,V(0,a.read)),z(a.write),a.swap();e=B(o.gradient,r.read.texel),n.uniform1i(e.uPressure,V(0,a.read)),n.uniform1i(e.uVelocity,V(1,r.read)),z(r.write),r.swap(),e=B(o.advect,r.read.texel),n.uniform2f(e.uVelocityTexel,r.read.texel[0],r.read.texel[1]),n.uniform1i(e.uVelocity,V(0,r.read)),n.uniform1i(e.uSource,V(0,r.read)),n.uniform1f(e.uDt,t);let i=Math.exp(-t*1.2);n.uniform4f(e.uDecay,i,i,1,1),z(r.write),r.swap()}let c=[Math.exp(-t*4.6/(e.linger*.8)),Math.exp(-t*4.6/(e.linger*.2)),Math.exp(-t*4.6/(e.linger*1.2)),1],{forward:l,back:u}=S.targets;if(x){let e=B(o.advect,i.read.texel);n.uniform2f(e.uVelocityTexel,r.read.texel[0],r.read.texel[1]),n.uniform1i(e.uVelocity,V(0,r.read)),n.uniform1i(e.uSource,V(1,i.read)),n.uniform1f(e.uDt,0),n.uniform4f(e.uDecay,c[0],c[1],c[2],c[3]),z(i.write),i.swap();return}let d=B(o.advect,i.read.texel);n.uniform2f(d.uVelocityTexel,r.read.texel[0],r.read.texel[1]),n.uniform1i(d.uVelocity,V(0,r.read)),n.uniform1i(d.uSource,V(1,i.read)),n.uniform1f(d.uDt,t),n.uniform4f(d.uDecay,1,1,1,1),z(l),n.uniform1i(d.uSource,V(1,l)),n.uniform1f(d.uDt,-t),z(u),d=B(o.maccormack,i.read.texel),n.uniform2f(d.uVelocityTexel,r.read.texel[0],r.read.texel[1]),n.uniform2f(d.uSourceTexel,i.read.texel[0],i.read.texel[1]),n.uniform1i(d.uVelocity,V(0,r.read)),n.uniform1i(d.uSource,V(1,i.read)),n.uniform1i(d.uForward,V(2,l)),n.uniform1i(d.uBack,V(3,u)),n.uniform1f(d.uDt,t),n.uniform4f(d.uDecay,c[0],c[1],c[2],c[3]),z(i.write),i.swap()},G=(e,t)=>{n.uniform3f(e.uColor,S.color[0],S.color[1],S.color[2]),n.uniform3f(e.uSecondary,S.secondary[0],S.secondary[1],S.secondary[2]),n.uniform1f(e.uIntensity,t.intensity),n.uniform1f(e.uHotspot,t.hotspot)},de=e=>{let{dye:r,bloom:i}=S.targets;if(e.glow>0){let t=B(o.prefilter,i[0].texel);n.uniform1i(t.uDye,V(0,r.read)),n.uniform2f(t.uDyeTexel,r.read.texel[0],r.read.texel[1]),G(t,e),z(i[0]),t=B(o.down,i[0].texel);for(let e=1;e<i.length;e++)n.uniform1i(t.uSource,V(0,i[e-1])),n.uniform2f(t.uSourceTexel,i[e-1].texel[0],i[e-1].texel[1]),z(i[e]);n.enable(n.BLEND),n.blendFunc(n.ONE,n.ONE),t=B(o.up,i[0].texel);for(let e=i.length-1;e>0;e--)n.uniform1i(t.uSource,V(0,i[e])),n.uniform2f(t.uSourceTexel,i[e].texel[0],i[e].texel[1]),z(i[e-1]);n.disable(n.BLEND)}let a=B(o.display,[1/t.width,1/t.height]);n.uniform1i(a.uDye,V(0,r.read)),n.uniform1i(a.uBloom,V(1,i[0])),G(a,e),n.uniform1f(a.uGlow,e.glow>0?e.glow*1.4/g:0),n.uniform1f(a.uGrain,e.grain),n.uniform1f(a.uTime,S.time),n.uniform1f(a.uLight,+(e.theme===`light`)),z(null)},K=()=>{n.bindFramebuffer(n.FRAMEBUFFER,null),n.viewport(0,0,t.width,t.height),n.clearColor(0,0,0,0),n.clear(n.COLOR_BUFFER_BIT)},q=e=>{if(C=0,!T||!E||document.hidden)return;let t=F.current,r=w?Math.min(1/30,(e-w)/1e3):1/60;w=e,S.time+=r;let i=Math.min(window.devicePixelRatio||1,Math.max(.5,t.maxDevicePixelRatio||2));for(Math.abs(i-S.ratio)>.01&&R(),L(),O(t),n.bindVertexArray(m),n.disable(n.BLEND),S.ready&&ce(t,r,e);S.bursts.length;){let[n,r]=S.bursts.shift();le(t,n,r,e)}ue(t,r),de(t);let a=e-S.active>t.linger*1200+900,o=Math.hypot(S.emitter.vx,S.emitter.vy)<1;if(a&&o){I(),K(),w=0;return}C=requestAnimationFrame(q)},J=()=>{!C&&T&&E&&!document.hidden&&(C=requestAnimationFrame(q))},Y=t=>{let n=e.getBoundingClientRect(),r=t.clientX-n.left,i=t.clientY-n.top;if(!(r>=0&&i>=0&&r<=n.width&&i<=n.height)){S.pointer.inside&&(S.pointer.inside=!1,S.ready=!1,J());return}S.ready||=(S.emitter.x=r,S.emitter.y=i,S.emitter.px=r,S.emitter.py=i,S.emitter.vx=0,S.emitter.vy=0,!0),S.pointer.x=r,S.pointer.y=i,S.pointer.inside=!0,J()},X=t=>{let n=F.current;if(!n.clickBurst||!n.enabled)return;let r=e.getBoundingClientRect(),i=t.clientX-r.left,a=t.clientY-r.top;i<0||a<0||i>r.width||a>r.height||(S.bursts.push([i,a]),J())},Z=()=>{S.pointer.inside=!1,S.ready=!1,J()},Q=()=>{w=0,J()},$=new ResizeObserver(()=>{R(),J()});$.observe(e);let fe=new IntersectionObserver(e=>{E=e.some(e=>e.isIntersecting),E&&(w=0,J())});return fe.observe(e),window.addEventListener(`pointermove`,Y,{passive:!0}),window.addEventListener(`pointerdown`,X,{passive:!0}),document.documentElement.addEventListener(`pointerleave`,Z),document.addEventListener(`visibilitychange`,Q),R(),K(),()=>{T=!1,cancelAnimationFrame(C),$.disconnect(),fe.disconnect(),window.removeEventListener(`pointermove`,Y),window.removeEventListener(`pointerdown`,X),document.documentElement.removeEventListener(`pointerleave`,Z),document.removeEventListener(`visibilitychange`,Q),M(),Object.values(o).forEach(e=>n.deleteProgram(e.program)),n.deleteShader(r),n.deleteBuffer(_),n.deleteVertexArray(m)}},[]);let I=E??(T===`light`?`normal`:`screen`);return(0,i.jsxs)(`div`,{ref:N,className:`glow-cursor${A?` ${A}`:``}`,style:j,...M,children:[(0,i.jsx)(`canvas`,{ref:P,className:`glow-cursor__canvas`,style:{mixBlendMode:I},"aria-hidden":`true`}),k&&(0,i.jsx)(`div`,{className:`glow-cursor__content`,children:k})]})};export{y as default};