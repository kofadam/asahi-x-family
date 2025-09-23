import React, { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Text, MeshTransmissionMaterial, useTexture } from '@react-three/drei'
import { motion } from 'framer-motion'
import * as THREE from 'three'

// 3D Holographic Card Component
const HolographicCard = ({ achievement, isFlipped, onClick }) => {
  const meshRef = useRef()
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.1

      // Add holographic shimmer effect
      if (meshRef.current.material) {
        meshRef.current.material.iridescence = 0.5 + Math.sin(state.clock.elapsedTime * 2) * 0.5
      }
    }
  })

  const cardGeometry = new THREE.PlaneGeometry(2, 3)

  return (
    <group onClick={onClick}>
      {/* Main Card Mesh */}
      <mesh
        ref={meshRef}
        geometry={cardGeometry}
        position={[0, 0, 0]}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
        scale={hovered ? 1.1 : 1}
      >
        <MeshTransmissionMaterial
          color={achievement.color || '#FFD700'}
          thickness={0.2}
          roughness={0.2}
          transmission={0.8}
          ior={1.5}
          chromaticAberration={0.5}
          iridescence={1}
          iridescenceIOR={1.3}
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* Floating Achievement Icon */}
      <Text
        position={[0, 0.5, 0.1]}
        fontSize={0.5}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {achievement.emoji || '🏆'}
      </Text>

      {/* Achievement Title */}
      <Text
        position={[0, 0, 0.1]}
        fontSize={0.15}
        color="white"
        anchorX="center"
        anchorY="middle"
        maxWidth={1.8}
        textAlign="center"
        font="/fonts/anime-font.woff"
      >
        {achievement.title}
      </Text>

      {/* Japanese Title */}
      <Text
        position={[0, -0.3, 0.1]}
        fontSize={0.12}
        color="#FFD700"
        anchorX="center"
        anchorY="middle"
        maxWidth={1.8}
        textAlign="center"
      >
        {achievement.titleJapanese}
      </Text>

      {/* Rarity Badge */}
      <Text
        position={[0, -0.6, 0.1]}
        fontSize={0.1}
        color={achievement.rarity === 'legendary' ? '#FF69B4' : achievement.rarity === 'epic' ? '#9370DB' : '#4CAF50'}
        anchorX="center"
        anchorY="middle"
      >
        {achievement.rarity?.toUpperCase() || 'COMMON'}
      </Text>

      {/* Particle Effects around card */}
      {achievement.unlocked && (
        <>
          {[...Array(8)].map((_, i) => (
            <mesh key={i} position={[
              Math.sin(i * Math.PI * 2 / 8) * 1.5,
              Math.cos(i * Math.PI * 2 / 8) * 1.5,
              0.2
            ]}>
              <sphereGeometry args={[0.02]} />
              <meshBasicMaterial color="#FFD700" />
            </mesh>
          ))}
        </>
      )}

      {/* Holographic Edge Glow */}
      <mesh position={[0, 0, -0.01]} scale={1.05}>
        <planeGeometry args={[2.1, 3.1]} />
        <meshBasicMaterial
          color="#00FFFF"
          transparent
          opacity={0.3}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  )
}

// Main Achievement Card Component
const HolographicAchievementCard = ({ achievement }) => {
  const [isFlipped, setIsFlipped] = useState(false)
  const [isUnlocking, setIsUnlocking] = useState(false)

  const handleCardClick = () => {
    setIsFlipped(!isFlipped)
  }

  const handleUnlock = () => {
    setIsUnlocking(true)
    setTimeout(() => {
      setIsUnlocking(false)
    }, 2000)
  }

  return (
    <motion.div
      className="achievement-card-container relative w-64 h-96 mx-auto"
      initial={{ opacity: 0, y: 100, rotateY: -180 }}
      animate={{
        opacity: 1,
        y: 0,
        rotateY: isFlipped ? 180 : 0,
        scale: isUnlocking ? [1, 1.2, 1] : 1
      }}
      transition={{
        duration: 0.8,
        type: "spring",
        scale: { duration: 0.5 }
      }}
      whileHover={{ y: -10 }}
      style={{ perspective: '1000px' }}
    >
      {/* 3D Canvas */}
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        style={{ width: '100%', height: '100%' }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, 10]} intensity={0.5} color="#FF69B4" />

        <HolographicCard
          achievement={achievement}
          isFlipped={isFlipped}
          onClick={handleCardClick}
        />
      </Canvas>

      {/* Overlay Information */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="text-center text-white">
          <h3 className="font-bold text-lg mb-1">{achievement.title}</h3>
          <p className="text-sm text-gray-300 mb-2">{achievement.description}</p>

          {achievement.unlocked ? (
            <div className="flex items-center justify-center gap-2">
              <span className="text-green-400">✅ Unlocked</span>
              <span className="text-yellow-400">+{achievement.xpReward} XP</span>
            </div>
          ) : (
            <div className="text-gray-400">
              🔒 Locked
            </div>
          )}
        </div>
      </motion.div>

      {/* Unlock Animation Overlay */}
      {isUnlocking && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 2 }}
        >
          <div className="text-6xl animate-spin">✨</div>
        </motion.div>
      )}

      {/* Holographic Border Effect */}
      <div className="absolute inset-0 border-2 border-transparent bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-400 rounded-xl p-1 -z-10">
        <div className="bg-transparent w-full h-full rounded-xl"></div>
      </div>

      {/* Click Hint */}
      <motion.div
        className="absolute top-2 right-2 text-white text-xs bg-black/50 px-2 py-1 rounded"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        Click to flip
      </motion.div>

      {/* Rarity Glow */}
      <div className={`absolute inset-0 rounded-xl blur-xl -z-20 ${
        achievement.rarity === 'legendary' ? 'bg-gradient-to-r from-yellow-400 to-pink-500' :
        achievement.rarity === 'epic' ? 'bg-gradient-to-r from-purple-400 to-blue-500' :
        achievement.rarity === 'rare' ? 'bg-gradient-to-r from-blue-400 to-green-500' :
        'bg-gradient-to-r from-gray-400 to-gray-600'
      } opacity-30`}></div>
    </motion.div>
  )
}

export default HolographicAchievementCard