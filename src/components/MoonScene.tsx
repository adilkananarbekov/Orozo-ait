import { Component, type ReactNode, Suspense, useEffect, useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { ContactShadows, Float, Sparkles, useGLTF } from '@react-three/drei'
import * as THREE from 'three'

const MOON_GLB = '/models/moon.glb'

void useGLTF.preload(MOON_GLB)

export type MoonGyro = { x: number; y: number }

type MoonRigProps = {
  gyro: MoonGyro
  reducedMotion: boolean
  onSceneReady?: () => void
}

function SceneReadyReporter({ onSceneReady }: { onSceneReady?: () => void }) {
  const gl = useThree((s) => s.gl)
  const scene = useThree((s) => s.scene)
  const camera = useThree((s) => s.camera)
  const done = useRef(false)

  useEffect(() => {
    if (!onSceneReady || done.current) return
    const id = window.requestAnimationFrame(() => {
      try {
        gl.compile(scene, camera)
      } catch {
        /* WebGL compile is best-effort */
      }
      window.requestAnimationFrame(() => {
        if (done.current) return
        done.current = true
        onSceneReady()
      })
    })
    return () => window.cancelAnimationFrame(id)
  }, [gl, scene, camera, onSceneReady])

  return null
}

function useLunarMotion(gyro: MoonGyro, reducedMotion: boolean) {
  const group = useRef<THREE.Group>(null)
  const gyroRef = useRef(gyro)

  useEffect(() => {
    gyroRef.current = gyro
  }, [gyro])

  useFrame((state) => {
    const g = group.current
    if (!g) return
    const gx = gyroRef.current.x
    const gy = gyroRef.current.y
    const px = state.pointer.x * 0.32
    const py = state.pointer.y * 0.2
    const spin = reducedMotion ? 0.04 : 0.12
    const auto = state.clock.elapsedTime * spin * 0.08

    g.rotation.y = THREE.MathUtils.lerp(g.rotation.y, px + gx * 0.22 + auto, 0.07)
    g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, py + gy * 0.2, 0.07)
    g.rotation.z = THREE.MathUtils.lerp(g.rotation.z, gx * 0.06, 0.05)

    if (!reducedMotion) {
      g.position.y = Math.sin(state.clock.elapsedTime * 0.6) * 0.04
    }
  })

  return group
}

function MoonFromGLB({ gyro, reducedMotion }: MoonRigProps) {
  const group = useLunarMotion(gyro, reducedMotion)
  const { scene } = useGLTF(MOON_GLB)

  const model = useMemo(() => {
    const root = scene.clone(true)
    root.traverse((obj) => {
      const mesh = obj as THREE.Mesh
      if (mesh.isMesh) {
        mesh.castShadow = true
        mesh.receiveShadow = true
      }
    })
    root.updateMatrixWorld(true)
    const box = new THREE.Box3().setFromObject(root)
    const size = new THREE.Vector3()
    box.getSize(size)
    const maxDim = Math.max(size.x, size.y, size.z, 0.001)
    const target = 2.35
    root.scale.setScalar(target / maxDim)
    return root
  }, [scene])

  return (
    <group ref={group}>
      <primitive object={model} position={[0, -0.05, 0]} />
    </group>
  )
}

function ProceduralMoon({ gyro, reducedMotion }: MoonRigProps) {
  const group = useLunarMotion(gyro, reducedMotion)
  return (
    <group ref={group}>
      <mesh castShadow receiveShadow position={[0, -0.05, 0]} scale={1.05}>
        <icosahedronGeometry args={[1, 6]} />
        <meshStandardMaterial
          color="#d4a56a"
          roughness={0.82}
          metalness={0.12}
          emissive="#4a3018"
          emissiveIntensity={0.42}
        />
      </mesh>
      <mesh position={[0.35, 0.2, 0.85]} scale={0.08}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshBasicMaterial color="#5c3d22" transparent opacity={0.55} />
      </mesh>
      <mesh position={[-0.55, -0.15, 0.72]} scale={0.05}>
        <sphereGeometry args={[1, 12, 12]} />
        <meshBasicMaterial color="#3d2814" transparent opacity={0.5} />
      </mesh>
    </group>
  )
}

type EBProps = { fallback: ReactNode; children: ReactNode }
type EBState = { hasError: boolean }

class MoonModelBoundary extends Component<EBProps, EBState> {
  state: EBState = { hasError: false }

  static getDerivedStateFromError(): EBState {
    return { hasError: true }
  }

  render(): ReactNode {
    return this.state.hasError ? this.props.fallback : this.props.children
  }
}

function SceneRig({ gyro, reducedMotion, onSceneReady }: MoonRigProps) {
  const { gl } = useThree()
  useEffect(() => {
    gl.toneMapping = THREE.ACESFilmicToneMapping
    gl.toneMappingExposure = 1.05
    gl.outputColorSpace = THREE.SRGBColorSpace
  }, [gl])

  return (
    <>
      <SceneReadyReporter onSceneReady={onSceneReady} />
      <color attach="background" args={['#12081f']} />
      <ambientLight intensity={0.42} color="#7a5aa0" />
      <directionalLight
        castShadow
        position={[4, 6, 3]}
        intensity={1.55}
        color="#ffe8c8"
        shadow-mapSize={[2048, 2048]}
        shadow-camera={{ near: 0.5, far: 30, left: -6, right: 6, top: 6, bottom: -6 }}
      />
      <pointLight position={[-3, 2, 2]} intensity={0.95} color="#ffb85c" distance={14} decay={2} />
      <pointLight position={[2, -1, 3]} intensity={0.35} color="#c89bbf" distance={10} decay={2} />

      <Float speed={0.8} rotationIntensity={0.2} floatingRange={[-0.06, 0.06]}>
        <MoonModelBoundary
          fallback={<ProceduralMoon gyro={gyro} reducedMotion={reducedMotion} />}
        >
          <Suspense fallback={<ProceduralMoon gyro={gyro} reducedMotion={reducedMotion} />}>
            <MoonFromGLB gyro={gyro} reducedMotion={reducedMotion} />
          </Suspense>
        </MoonModelBoundary>
        <Sparkles
          count={reducedMotion ? 24 : 56}
          scale={2.4}
          size={3}
          speed={reducedMotion ? 0.15 : 0.45}
          opacity={0.62}
          color="#fceaa3"
        />
      </Float>

      <ContactShadows
        position={[0, -1.22, 0]}
        opacity={0.6}
        scale={14}
        blur={2}
        far={8}
        resolution={1024}
        color="#000000"
      />
    </>
  )
}

type MoonSceneProps = {
  className?: string
  gyro: MoonGyro
  reducedMotion: boolean
  onSceneReady?: () => void
}

export function MoonScene({
  className = '',
  gyro,
  reducedMotion,
  onSceneReady,
}: MoonSceneProps) {
  return (
    <div className={className}>
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [0, 0, 5], fov: 36, near: 0.1, far: 100 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <SceneRig gyro={gyro} reducedMotion={reducedMotion} onSceneReady={onSceneReady} />
        </Suspense>
      </Canvas>
    </div>
  )
}
