'use client'
import { useEffect, useRef } from 'react'

const CHARS = ' ·.,;:+=x%#@█'

function lerp(a: number, b: number, t: number) { return a + (b - a) * t }

export function AsciiVideoBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const pref = window.matchMedia('(prefers-reduced-motion: reduce)')
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const FONT_SIZE = 10
    const FONT = `bold ${FONT_SIZE}px 'Courier New', monospace`
    ctx.font = FONT
    const CW = ctx.measureText('M').width  // char width ~6px
    const CH = FONT_SIZE                    // char height

    let animId = 0
    let lastTs = 0
    let scrollT = 0

    function resize() {
      canvas!.width = canvas!.offsetWidth
      canvas!.height = canvas!.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    function drawFrame(t: number) {
      const W = canvas!.width
      const H = canvas!.height
      const cols = Math.ceil(W / CW)
      const rows = Math.ceil(H / CH)

      ctx!.clearRect(0, 0, W, H)
      ctx!.fillStyle = '#06090f'
      ctx!.fillRect(0, 0, W, H)

      scrollT = t * 0.00045

      for (let row = 0; row < rows; row++) {
        const fy = row / rows  // 0 (top) to 1 (bottom)

        for (let col = 0; col < cols; col++) {
          const fx = col / cols  // 0..1

          // Perspective road: trapezoid. Road half-width at top = 10%, at bottom = 50%
          const roadHalfW = lerp(0.10, 0.50, Math.max(0, (fy - 0.40) / 0.60))
          const roadLeft = 0.5 - roadHalfW
          const roadRight = 0.5 + roadHalfW

          const onRoad = fy > 0.40 && fx > roadLeft && fx < roadRight

          // Sky region (fy < 0.35)
          if (fy < 0.35) {
            // Stars
            const starSeed = col * 1337 + row * 7919
            const starNoise = Math.sin(starSeed) * 0.5 + 0.5
            if (starNoise > 0.90) {
              const twinkle = 0.4 + 0.6 * (0.5 + 0.5 * Math.sin(starSeed + t * 0.001))
              ctx!.fillStyle = `rgba(255,255,255,${twinkle.toFixed(2)})`
              ctx!.font = FONT
              ctx!.fillText('·', col * CW, row * CH)
            }
            continue
          }

          // Mountain silhouette (fy 0.35 to 0.40)
          if (fy >= 0.35 && fy < 0.42) {
            // Composite sine waves for Swazi ridgeline
            const mHeight = 0.38
              + 0.025 * Math.sin(fx * 14 + 0.5)
              + 0.015 * Math.sin(fx * 31 + 1.2)
              + 0.008 * Math.sin(fx * 63 + 0.7)
            if (fy < mHeight) {
              ctx!.fillStyle = '#0f172a'
              ctx!.font = FONT
              ctx!.fillText('█', col * CW, row * CH)
              continue
            }
          }

          if (onRoad) {
            // Road surface
            const isCenter = Math.abs(fx - 0.5) < 0.012
            const dashPeriod = 0.15
            const dashOn = ((fy * 0.8 + scrollT) % dashPeriod) < dashPeriod * 0.45

            if (isCenter && dashOn && fy > 0.55) {
              // Center dash — gold
              const perspective = Math.min(1, (fy - 0.40) / 0.60)
              const alpha = 0.5 + 0.5 * perspective
              ctx!.fillStyle = `rgba(244,185,66,${alpha.toFixed(2)})`
              ctx!.font = FONT
              ctx!.fillText('|', col * CW, row * CH)
            } else {
              // Headlight glow — warm centre, dark edges
              const dx = (fx - 0.5) * 2  // -1..1 across road
              const dy = 1 - fy           // 0 at bottom, 1 at top
              const dist = Math.sqrt(dx * dx + dy * dy * 4)
              const glow = Math.max(0, 1 - dist * 1.6)
              const lum = Math.floor(glow * (CHARS.length - 1))
              const ch = CHARS[lum]
              if (glow > 0.05) {
                const r = Math.round(lerp(26, 255, glow))
                const g = Math.round(lerp(26, 220, glow * 0.85))
                const b = Math.round(lerp(46, 80, glow * 0.2))
                ctx!.fillStyle = `rgb(${r},${g},${b})`
              } else {
                ctx!.fillStyle = '#1a1a2e'
              }
              ctx!.font = FONT
              ctx!.fillText(ch, col * CW, row * CH)
            }
          } else {
            // Grass / verge
            const grassNoise = Math.sin(col * 3.7 + row * 2.3) * 0.5 + 0.5
            const grassChars = '.,;: '
            const gi = Math.floor(grassNoise * grassChars.length)
            const darkness = 0.08 + 0.08 * grassNoise
            ctx!.fillStyle = `rgba(20,83,45,${darkness.toFixed(2)})`
            ctx!.font = FONT
            ctx!.fillText(grassChars[gi], col * CW, row * CH)
          }
        }
      }
    }

    if (pref.matches) {
      drawFrame(0)
      return () => window.removeEventListener('resize', resize)
    }

    function loop(ts: number) {
      if (ts - lastTs >= 33) {
        lastTs = ts
        drawFrame(ts)
      }
      animId = requestAnimationFrame(loop)
    }
    animId = requestAnimationFrame(loop)

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ pointerEvents: 'none', zIndex: 0 }}
      aria-hidden
    />
  )
}
