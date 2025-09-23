import React, { useEffect, useRef } from 'react'
import anime from 'animejs'

const ParticleBackground = ({ type = 'sakura', count = 30 }) => {
  const containerRef = useRef(null)
  const particlesRef = useRef([])

  const particleConfigs = {
    sakura: {
      emoji: '🌸',
      colors: ['#FFB7C5', '#FFC0CB', '#FFE4E1'],
      size: { min: 15, max: 25 },
      duration: { min: 8000, max: 15000 },
      rotation: true,
      sway: true
    },
    star: {
      emoji: '⭐',
      colors: ['#FFD700', '#FFA500', '#FFFF00'],
      size: { min: 10, max: 20 },
      duration: { min: 5000, max: 10000 },
      rotation: true,
      sway: false
    },
    snow: {
      emoji: '❄️',
      colors: ['#FFFFFF', '#F0F8FF', '#E6E6FA'],
      size: { min: 10, max: 20 },
      duration: { min: 10000, max: 20000 },
      rotation: false,
      sway: true
    },
    firefly: {
      emoji: '✨',
      colors: ['#FFD700', '#FFFF00', '#FFA500'],
      size: { min: 5, max: 15 },
      duration: { min: 3000, max: 8000 },
      rotation: false,
      sway: true,
      glow: true
    },
    bubble: {
      emoji: '🫧',
      colors: ['rgba(255, 255, 255, 0.3)', 'rgba(135, 206, 235, 0.3)'],
      size: { min: 20, max: 40 },
      duration: { min: 6000, max: 12000 },
      rotation: false,
      sway: true
    }
  }

  const config = particleConfigs[type] || particleConfigs.sakura

  useEffect(() => {
    if (!containerRef.current) return

    // Create particles
    const particles = []
    for (let i = 0; i < count; i++) {
      const particle = document.createElement('div')
      particle.className = 'particle absolute'
      particle.style.fontSize = `${anime.random(config.size.min, config.size.max)}px`
      particle.style.left = `${anime.random(0, 100)}%`
      particle.style.top = '-50px'
      particle.style.opacity = '0'
      particle.innerHTML = config.emoji

      if (config.glow) {
        particle.style.filter = 'drop-shadow(0 0 10px currentColor)'
      }

      containerRef.current.appendChild(particle)
      particles.push(particle)

      // Animate particle
      const duration = anime.random(config.duration.min, config.duration.max)

      const timeline = anime.timeline({
        targets: particle,
        easing: 'linear',
        loop: true,
        delay: anime.random(0, duration)
      })

      timeline.add({
        translateY: window.innerHeight + 100,
        translateX: config.sway ? [
          { value: anime.random(-50, 50), duration: duration * 0.25 },
          { value: anime.random(-50, 50), duration: duration * 0.25 },
          { value: anime.random(-50, 50), duration: duration * 0.25 },
          { value: anime.random(-50, 50), duration: duration * 0.25 }
        ] : 0,
        rotate: config.rotation ? anime.random(0, 720) : 0,
        opacity: [
          { value: 1, duration: duration * 0.1 },
          { value: 1, duration: duration * 0.8 },
          { value: 0, duration: duration * 0.1 }
        ],
        duration: duration
      })
    }

    particlesRef.current = particles

    // Cleanup
    return () => {
      anime.remove(particlesRef.current)
      particlesRef.current.forEach(particle => {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle)
        }
      })
    }
  }, [type, count, config])

  return (
    <div
      ref={containerRef}
      className="particle-container fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 1 }}
    />
  )
}

export default ParticleBackground