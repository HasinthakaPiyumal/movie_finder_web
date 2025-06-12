"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

interface SmokeParticle {
  position: THREE.Vector3
  velocity: THREE.Vector3
  life: number
  maxLife: number
  size: number
  rotation: number
  rotationSpeed: number
  color: THREE.Color
}

export function CursorParticles() {
  const mountRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<THREE.Scene>()
  const rendererRef = useRef<THREE.WebGLRenderer>()
  const cameraRef = useRef<THREE.PerspectiveCamera>()
  const particlesRef = useRef<SmokeParticle[]>([])
  const mouseRef = useRef({ x: 0, y: 0 })
  const animationRef = useRef<number>()
  const particleSystemRef = useRef<THREE.Points>()
  const geometryRef = useRef<THREE.BufferGeometry>()
  const materialRef = useRef<THREE.ShaderMaterial>()

  useEffect(() => {
    if (!mountRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })

    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor(0x000000, 0)
    mountRef.current.appendChild(renderer.domElement)

    camera.position.z = 5

    sceneRef.current = scene
    rendererRef.current = renderer
    cameraRef.current = camera

    // Particle system setup
    const maxParticles = 200
    const geometry = new THREE.BufferGeometry()

    // Create arrays for particle attributes
    const positions = new Float32Array(maxParticles * 3)
    const colors = new Float32Array(maxParticles * 3)
    const sizes = new Float32Array(maxParticles)
    const alphas = new Float32Array(maxParticles)
    const rotations = new Float32Array(maxParticles)

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3))
    geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1))
    geometry.setAttribute("alpha", new THREE.BufferAttribute(alphas, 1))
    geometry.setAttribute("rotation", new THREE.BufferAttribute(rotations, 1))

    geometryRef.current = geometry

    // Custom shader material for smoky effect
    const material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
      },
      vertexShader: `
        attribute float size;
        attribute float alpha;
        attribute float rotation;
        varying vec3 vColor;
        varying float vAlpha;
        varying float vRotation;
        
        void main() {
          vColor = color;
          vAlpha = alpha;
          vRotation = rotation;
          
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = size * (300.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform float time;
        varying vec3 vColor;
        varying float vAlpha;
        varying float vRotation;
        
        void main() {
          vec2 center = gl_PointCoord - 0.5;
          
          // Rotate the texture coordinates
          float cos_r = cos(vRotation);
          float sin_r = sin(vRotation);
          vec2 rotated = vec2(
            center.x * cos_r - center.y * sin_r,
            center.x * sin_r + center.y * cos_r
          );
          
          float dist = length(rotated);
          
          // Create smoky, organic shape
          float noise = sin(dist * 10.0 + time * 2.0) * 0.1;
          float smokeShape = smoothstep(0.5, 0.1, dist + noise);
          
          // Add some turbulence
          float turbulence = sin(rotated.x * 8.0 + time) * sin(rotated.y * 8.0 + time * 1.5) * 0.1;
          smokeShape *= (1.0 + turbulence);
          
          // Soft edges
          float alpha = smokeShape * vAlpha;
          alpha *= smoothstep(0.5, 0.0, dist);
          
          gl_FragColor = vec4(vColor, alpha);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })

    materialRef.current = material

    const particleSystem = new THREE.Points(geometry, material)
    scene.add(particleSystem)
    particleSystemRef.current = particleSystem

    // Color palette for smoke
    const colorPalette = [
      new THREE.Color(0x8b5cf6), // Purple
      new THREE.Color(0x06b6d4), // Cyan
      new THREE.Color(0xec4899), // Pink
      new THREE.Color(0x10b981), // Emerald
      new THREE.Color(0xf59e0b), // Amber
      new THREE.Color(0xef4444), // Red
      new THREE.Color(0x3b82f6), // Blue
      new THREE.Color(0x8b5a2b), // Brown
    ]

    const createParticle = (x: number, y: number) => {
      // Convert screen coordinates to world coordinates
      const vector = new THREE.Vector3((x / window.innerWidth) * 2 - 1, -(y / window.innerHeight) * 2 + 1, 0)
      vector.unproject(camera)
      vector.sub(camera.position).normalize()
      const distance = -camera.position.z / vector.z
      vector.multiplyScalar(distance).add(camera.position)

      return {
        position: new THREE.Vector3(
          vector.x + (Math.random() - 0.5) * 0.5,
          vector.y + (Math.random() - 0.5) * 0.5,
          vector.z + (Math.random() - 0.5) * 0.5,
        ),
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.02 + 0.01,
          (Math.random() - 0.5) * 0.02,
        ),
        life: 0,
        maxLife: 120 + Math.random() * 80,
        size: 20 + Math.random() * 40,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
        color: colorPalette[Math.floor(Math.random() * colorPalette.length)],
      }
    }

    const updateParticles = () => {
      if (!geometryRef.current || !materialRef.current) return

      const positions = geometryRef.current.attributes.position.array as Float32Array
      const colors = geometryRef.current.attributes.color.array as Float32Array
      const sizes = geometryRef.current.attributes.size.array as Float32Array
      const alphas = geometryRef.current.attributes.alpha.array as Float32Array
      const rotations = geometryRef.current.attributes.rotation.array as Float32Array

      // Update existing particles
      particlesRef.current = particlesRef.current.filter((particle, index) => {
        particle.life++

        // Update physics
        particle.position.add(particle.velocity)
        particle.velocity.multiplyScalar(0.98) // Friction
        particle.rotation += particle.rotationSpeed

        // Add turbulence
        particle.velocity.x += (Math.random() - 0.5) * 0.001
        particle.velocity.y += (Math.random() - 0.5) * 0.001
        particle.velocity.z += (Math.random() - 0.5) * 0.001

        const progress = particle.life / particle.maxLife
        const alpha = Math.sin(progress * Math.PI) * 0.8
        const size = particle.size * (1 + progress * 2)

        if (index < maxParticles && particle.life < particle.maxLife) {
          // Update buffer attributes
          positions[index * 3] = particle.position.x
          positions[index * 3 + 1] = particle.position.y
          positions[index * 3 + 2] = particle.position.z

          colors[index * 3] = particle.color.r
          colors[index * 3 + 1] = particle.color.g
          colors[index * 3 + 2] = particle.color.b

          sizes[index] = size
          alphas[index] = alpha
          rotations[index] = particle.rotation

          return true
        }
        return false
      })

      // Fill remaining slots with empty particles
      for (let i = particlesRef.current.length; i < maxParticles; i++) {
        positions[i * 3] = 0
        positions[i * 3 + 1] = 0
        positions[i * 3 + 2] = 0
        colors[i * 3] = 0
        colors[i * 3 + 1] = 0
        colors[i * 3 + 2] = 0
        sizes[i] = 0
        alphas[i] = 0
        rotations[i] = 0
      }

      // Mark attributes as needing update
      geometryRef.current.attributes.position.needsUpdate = true
      geometryRef.current.attributes.color.needsUpdate = true
      geometryRef.current.attributes.size.needsUpdate = true
      geometryRef.current.attributes.alpha.needsUpdate = true
      geometryRef.current.attributes.rotation.needsUpdate = true
    }

    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current = { x: event.clientX, y: event.clientY }

      // Add new particles
      for (let i = 0; i < 3; i++) {
        if (particlesRef.current.length < maxParticles) {
          particlesRef.current.push(createParticle(event.clientX, event.clientY))
        }
      }
    }

    const handleResize = () => {
      if (!rendererRef.current || !cameraRef.current) return

      cameraRef.current.aspect = window.innerWidth / window.innerHeight
      cameraRef.current.updateProjectionMatrix()
      rendererRef.current.setSize(window.innerWidth, window.innerHeight)
    }

    const animate = () => {
      if (!sceneRef.current || !rendererRef.current || !cameraRef.current || !materialRef.current) return

      updateParticles()

      // Update shader time uniform
      materialRef.current.uniforms.time.value = Date.now() * 0.001

      rendererRef.current.render(sceneRef.current, cameraRef.current)
      animationRef.current = requestAnimationFrame(animate)
    }

    // Event listeners
    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("resize", handleResize)

    // Start animation
    animate()

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("resize", handleResize)

      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }

      if (mountRef.current && rendererRef.current) {
        mountRef.current.removeChild(rendererRef.current.domElement)
      }

      // Cleanup Three.js objects
      if (geometryRef.current) geometryRef.current.dispose()
      if (materialRef.current) materialRef.current.dispose()
      if (rendererRef.current) rendererRef.current.dispose()
    }
  }, [])

  return <div ref={mountRef} className="fixed inset-0 pointer-events-none z-50" style={{ mixBlendMode: "screen" }} />
}
