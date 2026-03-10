import React, { useRef, useEffect } from "react"

const fragmentShader = `
precision mediump float;

uniform float u_time;
uniform vec2  u_resolution;
uniform vec3  u_bg;

float amoeba(vec2 uv, vec2 center, float R, float t, float phase, float aspect) {
  vec2 d = uv - center;
  d.x *= aspect;
  float angle = atan(d.y, d.x);
  float dist  = length(d);

  float r = R
    + 0.10*R * sin(2.0*angle + t*0.55 + phase)
    + 0.07*R * sin(3.0*angle - t*0.42 + phase*1.3)
    + 0.05*R * cos(4.0*angle + t*0.33 + phase*0.7)
    + 0.03*R * cos(5.0*angle - t*0.26 + phase*1.6);

  return dist - r;
}

vec3 sceneColor(float ti, vec2 uv, float aspect) {
  vec2 c0 = vec2(
    0.5 + 0.28 * sin(1.30 * ti * 0.13 + 0.00),
    0.5 + 0.28 * sin(1.70 * ti * 0.13 + 1.20)
  );
  vec2 c1 = vec2(
    0.5 + 0.28 * sin(2.10 * ti * 0.13 + 2.50),
    0.5 + 0.28 * sin(1.40 * ti * 0.13 + 0.80)
  );
  vec2 c2 = vec2(
    0.5 + 0.28 * sin(1.60 * ti * 0.13 + 4.10),
    0.5 + 0.28 * sin(2.30 * ti * 0.13 + 3.00)
  );

  float d0 = amoeba(uv, c0, 0.22, ti, 0.00, aspect);
  float d1 = amoeba(uv, c1, 0.28, ti, 2.10, aspect);
  float d2 = amoeba(uv, c2, 0.20, ti, 4.20, aspect);

  float e = 0.0005;
  vec3 col = u_bg;
  col = mix(col, vec3(1.00, 0.35, 0.40), 1.0 - smoothstep(-e, e, d0));
  col = mix(col, vec3(0.25, 0.55, 1.00), 1.0 - smoothstep(-e, e, d1));
  col = mix(col, vec3(0.25, 0.88, 0.55), 1.0 - smoothstep(-e, e, d2));
  return col;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution;
  float aspect = u_resolution.x / u_resolution.y;
  float t = u_time;

  vec3 col = sceneColor(t, uv, aspect);

  gl_FragColor = vec4(col, 1.0);
}
`

const vertexShader = `
void main() {
  gl_Position = vec4(position, 1.0);
}
`

export default function KeyVisual() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    let rafId: number
    let cleanup: (() => void) | undefined

    import("three").then((THREE) => {
      const renderer = new THREE.WebGLRenderer({ antialias: false })
      renderer.domElement.style.cssText = "display:block;width:100%;height:100%;"
      mount.appendChild(renderer.domElement)

      const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)
      const scene = new THREE.Scene()

      const geo = new THREE.PlaneGeometry(2, 2)

      const isDark = () => window.matchMedia("(prefers-color-scheme: dark)").matches
      const getBg = () => isDark()
        ? new THREE.Vector3(17/255, 24/255, 39/255)
        : new THREE.Vector3(249/255, 250/255, 251/255)

      const mat = new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: {
          u_time:       { value: 0 },
          u_resolution: { value: new THREE.Vector2(1, 1) },
          u_bg:         { value: getBg() },
        },
      })

      const mesh = new THREE.Mesh(geo, mat)
      scene.add(mesh)

      const setSize = () => {
        const w = mount.clientWidth
        const h = mount.clientHeight
        if (!w || !h) return
        renderer.setSize(w, h, false)
        mat.uniforms.u_resolution.value.set(w, h)
      }
      setSize()

      const ro = new ResizeObserver(setSize)
      ro.observe(mount)

      const mq = window.matchMedia("(prefers-color-scheme: dark)")
      const onSchemeChange = () => { mat.uniforms.u_bg.value = getBg() }
      mq.addEventListener("change", onSchemeChange)

      const clock = new THREE.Clock()
      const animate = () => {
        rafId = requestAnimationFrame(animate)
        mat.uniforms.u_time.value = clock.getElapsedTime()
        renderer.render(scene, camera)
      }
      animate()

      cleanup = () => {
        cancelAnimationFrame(rafId)
        ro.disconnect()
        mq.removeEventListener("change", onSchemeChange)
        geo.dispose()
        mat.dispose()
        renderer.dispose()
        if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement)
      }
    })

    return () => cleanup?.()
  }, [])

  return (
    <div ref={mountRef} className="w-full h-full min-h-[320px]" aria-hidden="true" />
  )
}
