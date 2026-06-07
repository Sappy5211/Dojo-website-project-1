"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export function AuroraShaderBackground({
  className = "",
  opacity = 1,
}: {
  className?: string;
  opacity?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(max-width: 767px)").matches) return;
    const el = ref.current;
    if (!el) return;

    let cleanupRenderer: (() => void) | undefined;
    let started = false;
    const start = () => {
      if (started) return;
      started = true;

      const scene = new THREE.Scene();
      const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
      const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true, powerPreference: "low-power" });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5) * 0.45);
      renderer.setSize(el.offsetWidth, el.offsetHeight);
      renderer.setClearColor(0x000000, 0);
      el.appendChild(renderer.domElement);

      const material = new THREE.ShaderMaterial({
        transparent: true,
        uniforms: {
          iTime: { value: 0 },
          iResolution: { value: new THREE.Vector2(el.offsetWidth, el.offsetHeight) },
        },
        vertexShader: "void main(){ gl_Position = vec4(position,1.0); }",
        fragmentShader: `
        uniform float iTime; uniform vec2 iResolution;
        #define NUM_OCTAVES 3
        #define ITER 10.0
        float rand(vec2 n){ return fract(sin(dot(n, vec2(12.9898,4.1414)))*43758.5453); }
        float noise(vec2 p){ vec2 ip=floor(p),u=fract(p); u=u*u*(3.0-2.0*u);
          return mix(mix(rand(ip),rand(ip+vec2(1,0)),u.x),
                     mix(rand(ip+vec2(0,1)),rand(ip+vec2(1,1)),u.x),u.y); }
        float fbm(vec2 x){ float v=0.0,a=0.3; vec2 sh=vec2(100);
          mat2 rot=mat2(cos(0.5),sin(0.5),-sin(0.5),cos(0.5));
          for(int i=0;i<NUM_OCTAVES;i++){ v+=a*noise(x); x=rot*x*2.0+sh; a*=0.4; } return v; }
        void main(){
          vec2 sk=vec2(sin(iTime*1.2)*0.005, cos(iTime*2.1)*0.005);
          vec2 p=((gl_FragCoord.xy+sk*iResolution.xy)-iResolution.xy*0.5)/iResolution.y*mat2(6.0,-4.0,4.0,6.0);
          vec2 v; vec4 o=vec4(0.0);
          float f=2.0+fbm(p+vec2(iTime*5.0,0.0))*0.5;
          for(float i=0.0;i<ITER;i++){
            v=p+cos(i*i+(iTime+p.x*0.08)*0.025+i*vec2(13.0,11.0))*3.5
               +vec2(sin(iTime*3.0+i)*0.003,cos(iTime*3.5-i)*0.003);
            float tn=fbm(v+vec2(iTime*0.5,i))*0.3*(1.0-(i/ITER));
            vec4 col=vec4(
              0.05+0.15*sin(i*0.2+iTime*0.4),
              0.35+0.45*cos(i*0.3+iTime*0.5),
              0.40+0.45*sin(i*0.4+iTime*0.3),
              1.0);
            vec4 c=col*exp(sin(i*i+iTime*0.8))/length(max(v,vec2(v.x*f*0.015,v.y*1.5)));
            float thin=smoothstep(0.0,1.0,i/ITER)*0.6;
            o+=c*(1.0+tn*0.8)*thin;
          }
          o=tanh(pow(o/100.0, vec4(1.6)));
          gl_FragColor=vec4(o.rgb*1.4, o.a*0.9);
        }`,
      });
      const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
      scene.add(mesh);

      let raf = 0;
      let onScreen = true;
      let visible = true;
      let last = performance.now();
      const fps = 1000 / 24;

      const loop = (now: number) => {
        raf = requestAnimationFrame(loop);
        if (!onScreen || !visible) return;
        const dt = now - last;
        if (dt < fps) return;
        last = now - (dt % fps);
        material.uniforms.iTime.value += 0.026;
        renderer.render(scene, camera);
      };
      raf = requestAnimationFrame(loop);

      const renderObserver = new IntersectionObserver(([entry]) => {
        onScreen = entry.isIntersecting;
      }, { rootMargin: "120px" });
      renderObserver.observe(el);

      const onVisibility = () => {
        visible = !document.hidden;
      };
      document.addEventListener("visibilitychange", onVisibility);

      const onResize = () => {
        renderer.setSize(el.offsetWidth, el.offsetHeight);
        material.uniforms.iResolution.value.set(el.offsetWidth, el.offsetHeight);
      };
      window.addEventListener("resize", onResize);

      cleanupRenderer = () => {
        cancelAnimationFrame(raf);
        renderObserver.disconnect();
        document.removeEventListener("visibilitychange", onVisibility);
        window.removeEventListener("resize", onResize);
        if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
        mesh.geometry.dispose();
        material.dispose();
        renderer.dispose();
      };
    };

    const startObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        start();
        startObserver.disconnect();
      }
    }, { rootMargin: "160px" });
    startObserver.observe(el);

    return () => {
      startObserver.disconnect();
      cleanupRenderer?.();
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`absolute inset-0 ${className}`}
      style={{
        opacity,
        background:
          "radial-gradient(circle at 20% 18%, rgba(22,163,74,0.22), transparent 32%), radial-gradient(circle at 76% 30%, rgba(56,189,248,0.16), transparent 34%)",
      }}
      aria-hidden
    />
  );
}
