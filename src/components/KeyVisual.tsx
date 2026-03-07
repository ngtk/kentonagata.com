import React, { useRef, useEffect } from "react"

const vertexShader = `
void main() {
  gl_Position = vec4(position, 1.0);
}
`

const fragmentShader = `
uniform float u_time;
uniform vec2 u_resolution;
uniform vec3 u_bg;

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution;
  float aspect = u_resolution.x / u_resolution.y;

  vec3 color = vec3(0.0);

  // Blob 0 — Lavender
  {
    float t = u_time * 0.13;
    vec2 center = vec2(
      0.5 + 0.35 * sin(1.3 * t + 0.0),
      0.5 + 0.35 * sin(1.7 * t + 1.2)
    );
    vec2 d = uv - center;
    d.x *= aspect;
    float blob = exp(-dot(d, d) * 6.0);
    color += vec3(0.780, 0.722, 0.918) * blob;
  }

  // Blob 1 — Coral
  {
    float t = u_time * 0.11;
    vec2 center = vec2(
      0.5 + 0.35 * sin(2.1 * t + 2.5),
      0.5 + 0.35 * sin(1.4 * t + 0.8)
    );
    vec2 d = uv - center;
    d.x *= aspect;
    float blob = exp(-dot(d, d) * 6.0);
    color += vec3(0.969, 0.643, 0.643) * blob;
  }

  // Blob 2 — Mint
  {
    float t = u_time * 0.15;
    vec2 center = vec2(
      0.5 + 0.35 * sin(1.6 * t + 4.1),
      0.5 + 0.35 * sin(2.3 * t + 3.0)
    );
    vec2 d = uv - center;
    d.x *= aspect;
    float blob = exp(-dot(d, d) * 6.0);
    color += vec3(0.659, 0.847, 0.725) * blob;
  }

  // Blob 3 — Sky
  {
    float t = u_time * 0.18;
    vec2 center = vec2(
      0.5 + 0.35 * sin(1.1 * t + 1.7),
      0.5 + 0.35 * sin(1.9 * t + 5.2)
    );
    vec2 d = uv - center;
    d.x *= aspect;
    float blob = exp(-dot(d, d) * 6.0);
    color += vec3(0.643, 0.784, 0.941) * blob;
  }

  // Blob 4 — Peach
  {
    float t = u_time * 0.14;
    vec2 center = vec2(
      0.5 + 0.35 * sin(2.4 * t + 3.8),
      0.5 + 0.35 * sin(1.2 * t + 2.1)
    );
    vec2 d = uv - center;
    d.x *= aspect;
    float blob = exp(-dot(d, d) * 6.0);
    color += vec3(0.976, 0.831, 0.643) * blob;
  }

  // Reinhard tone mapping
  color = color / (color + 1.0);

  // Blend with background
  float blobStrength = clamp(length(color) * 1.2, 0.0, 1.0);
  color = mix(u_bg, color, blobStrength);

  gl_FragColor = vec4(color, 1.0);
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
      // Make canvas fill its parent via CSS; pixel buffer sized separately
      renderer.domElement.style.cssText = "display:block;width:100%;height:100%;"
      mount.appendChild(renderer.domElement)

      const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)
      const scene = new THREE.Scene()

      const darkMq = window.matchMedia("(prefers-color-scheme: dark)")
      const getBg = (dark: boolean) =>
        dark
          ? new THREE.Vector3(17 / 255, 24 / 255, 39 / 255)
          : new THREE.Vector3(249 / 255, 250 / 255, 251 / 255)

      const uniforms = {
        u_time: { value: 0 },
        u_resolution: { value: new THREE.Vector2(1, 1) },
        u_bg: { value: getBg(darkMq.matches) },
      }

      const material = new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms,
      })

      const geometry = new THREE.PlaneGeometry(2, 2)
      scene.add(new THREE.Mesh(geometry, material))

      const setSize = () => {
        const w = mount.clientWidth
        const h = mount.clientHeight
        if (w === 0 || h === 0) return
        renderer.setPixelRatio(window.devicePixelRatio)
        renderer.setSize(w, h, false)
        uniforms.u_resolution.value.set(
          w * window.devicePixelRatio,
          h * window.devicePixelRatio
        )
      }
      setSize()

      const resizeObserver = new ResizeObserver(setSize)
      resizeObserver.observe(mount)

      const onColorSchemeChange = (e: MediaQueryListEvent) => {
        uniforms.u_bg.value = getBg(e.matches)
      }
      darkMq.addEventListener("change", onColorSchemeChange)

      const clock = new THREE.Clock()
      const animate = () => {
        rafId = requestAnimationFrame(animate)
        uniforms.u_time.value = clock.getElapsedTime()
        renderer.render(scene, camera)
      }
      animate()

      cleanup = () => {
        cancelAnimationFrame(rafId)
        resizeObserver.disconnect()
        darkMq.removeEventListener("change", onColorSchemeChange)
        geometry.dispose()
        material.dispose()
        renderer.dispose()
        if (mount.contains(renderer.domElement)) {
          mount.removeChild(renderer.domElement)
        }
      }
    })

    return () => cleanup?.()
  }, [])

  return (
    <div
      ref={mountRef}
      className="w-full h-full min-h-[320px]"
      aria-hidden="true"
    />
  )
}
