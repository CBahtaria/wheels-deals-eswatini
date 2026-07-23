'use client'
import { useEffect, useRef } from 'react'

const CHARS = ' ·.,;:+=x%#@█'

function lerp(a: number, b: number, t: number) { return a + (b - a) * t }
function clamp(v: number, lo: number, hi: number) { return Math.max(lo, Math.min(hi, v)) }

interface RainDrop { x: number; y: number; speed: number }
interface OncomingCar { lx: number; rx: number; fy: number; speed: number }

interface Props {
  videoSrc?: string
}

export function AsciiVideoBackground({ videoSrc }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const pref = window.matchMedia('(prefers-reduced-motion: reduce)')

    // Mobile adaptive settings — re-evaluated on orientation change
    let isMobile = window.innerWidth < 768
    let fontSize = isMobile ? 14 : 10
    let FRAME_MS = isMobile ? 50 : 33  // 20 FPS mobile, 30 FPS desktop
    let font = `bold ${fontSize}px 'Courier New', monospace`
    ctx.font = font
    let CW = ctx.measureText('M').width
    let CH = fontSize

    // OffscreenCanvas for video sampling — falls back gracefully on older iOS
    let sampleCanvas: OffscreenCanvas | null = null
    let sampleCtx: OffscreenCanvasRenderingContext2D | null = null
    if (typeof OffscreenCanvas !== 'undefined') {
      try {
        sampleCanvas = new OffscreenCanvas(1, 1)
        sampleCtx = sampleCanvas.getContext('2d') as OffscreenCanvasRenderingContext2D
      } catch {
        sampleCanvas = null
        sampleCtx = null
      }
    }

    let animId = 0
    let lastTs = 0
    let scrollT = 0

    // Scene state
    let rainActive = false
    let rainToggleAt = 20000 + Math.random() * 30000
    const rainDrops: RainDrop[] = []
    const oncomingCars: OncomingCar[] = Array.from({ length: 3 }, (_, i) => ({
      lx: 0.44 + Math.random() * 0.02,
      rx: 0.56 - Math.random() * 0.02,
      fy: 0.42 + i * 0.18,
      speed: 0.00006 + Math.random() * 0.00005,
    }))

    function recomputeMetrics() {
      isMobile = window.innerWidth < 768
      fontSize = isMobile ? 14 : 10
      FRAME_MS = isMobile ? 50 : 33
      font = `bold ${fontSize}px 'Courier New', monospace`
      ctx!.font = font
      CW = ctx!.measureText('M').width
      CH = fontSize
    }

    function resize() {
      if (!canvas) return
      // On mobile cap to device pixel dimensions; 1920/1080 elsewhere
      canvas.width = Math.min(canvas.offsetWidth, isMobile ? 960 : 1920)
      canvas.height = Math.min(canvas.offsetHeight, isMobile ? 960 : 1080)
      recomputeMetrics()
    }
    resize()

    // Handle both window resize and orientation change
    window.addEventListener('resize', resize)
    window.addEventListener('orientationchange', resize)

    // ── Video sampling path ───────────────────────────────────────────────
    function drawFromVideo() {
      const video = videoRef.current
      if (!video || video.readyState < 2 || !sampleCanvas || !sampleCtx) return false
      if (!canvas || !ctx) return false

      const W = canvas.width, H = canvas.height
      const cols = Math.ceil(W / CW), rows = Math.ceil(H / CH)
      sampleCanvas.width = cols
      sampleCanvas.height = rows

      sampleCtx.drawImage(video, 0, 0, cols, rows)
      const pixels = sampleCtx.getImageData(0, 0, cols, rows).data

      ctx.clearRect(0, 0, W, H)
      ctx.fillStyle = '#06090f'
      ctx.fillRect(0, 0, W, H)
      ctx.font = font

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const i = (row * cols + col) * 4
          const r = pixels[i], g = pixels[i + 1], b = pixels[i + 2]
          const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255
          if (lum < 0.04) continue
          ctx.fillStyle = `rgb(${r},${g},${b})`
          ctx.fillText(CHARS[Math.floor(lum * (CHARS.length - 1))], col * CW, (row + 1) * CH)
        }
      }
      return true
    }

    // ── Enhanced procedural path ──────────────────────────────────────────
    function drawProcedural(t: number) {
      if (!canvas || !ctx) return
      const W = canvas.width, H = canvas.height
      const cols = Math.ceil(W / CW), rows = Math.ceil(H / CH)
      const dt = t - lastTs

      ctx.clearRect(0, 0, W, H)
      ctx.fillStyle = '#06090f'
      ctx.fillRect(0, 0, W, H)
      ctx.font = font

      scrollT = t * 0.00045

      // Portrait mode — raise horizon so road fills more screen
      const isPortrait = H > W
      const horizonY = isPortrait ? 0.30 : 0.37
      const roadStartY = isPortrait ? 0.34 : 0.41

      // Toggle rain randomly; fewer drops on mobile
      const maxDrops = isMobile ? 30 : 80
      if (t > rainToggleAt) {
        rainActive = !rainActive
        rainToggleAt = t + 12000 + Math.random() * 28000
        if (rainActive) {
          rainDrops.length = 0
          for (let i = 0; i < maxDrops; i++) {
            rainDrops.push({ x: Math.random(), y: Math.random(), speed: 0.0003 + Math.random() * 0.0002 })
          }
        }
      }

      // Advance oncoming cars
      for (const car of oncomingCars) {
        car.fy += car.speed * dt
        if (car.fy > 0.90) {
          car.fy = roadStartY + 0.01
          car.lx = 0.44 + Math.random() * 0.03
          car.rx = 0.56 - Math.random() * 0.03
          car.speed = 0.00006 + Math.random() * 0.00006
        }
      }

      for (let row = 0; row < rows; row++) {
        const fy = row / rows

        for (let col = 0; col < cols; col++) {
          const fx = col / cols

          // ── Sky ──────────────────────────────────────────────────────────
          if (fy < horizonY) {
            // City glow — Manzini/Matsapha on right horizon
            const glowStartY = horizonY - 0.11
            if (fy > glowStartY && fx > 0.50) {
              const gx = clamp((fx - 0.50) / 0.50, 0, 1)
              const gy = clamp((fy - glowStartY) / 0.11, 0, 1)
              const cityGlow = Math.max(0, (1 - gx * 0.9) * (1 - gy * 1.5)) * 0.6
              if (cityGlow > 0.08) {
                const r = Math.round(lerp(0, 200, cityGlow))
                const g2 = Math.round(lerp(0, 80, cityGlow * 0.55))
                ctx.fillStyle = `rgba(${r},${g2},10,${(cityGlow * 0.45).toFixed(2)})`
                ctx.fillText('░', col * CW, (row + 1) * CH)
                continue
              }
            }

            // Stars with parallax depth — skip alternate cells on mobile for perf
            if (isMobile && (col + row) % 2 !== 0) continue
            const seed = col * 1337 + row * 7919
            const n = Math.abs(Math.sin(seed))
            if (n > 0.88) {
              const twinkle = 0.35 + 0.65 * (0.5 + 0.5 * Math.sin(seed * 0.1 + t * 0.0009))
              ctx.fillStyle = `rgba(255,255,255,${twinkle.toFixed(2)})`
              ctx.fillText(n > 0.95 ? '+' : '·', col * CW, (row + 1) * CH)
            }
            continue
          }

          // ── Mountain ridges (two layers for depth) ────────────────────────
          const mZoneEnd = roadStartY + 0.045
          if (fy >= horizonY - 0.02 && fy < mZoneEnd) {
            const mFar = (roadStartY - 0.025)
              + 0.016 * Math.sin(fx * 7 + 0.3)
              + 0.010 * Math.sin(fx * 18 + 1.5)
              + 0.005 * Math.sin(fx * 39 + 2.0)
            const mNear = (roadStartY - 0.002)
              + 0.020 * Math.sin(fx * 13 + 0.8)
              + 0.013 * Math.sin(fx * 28 + 2.9)
              + 0.007 * Math.sin(fx * 55 + 1.1)

            if (fy < mFar) {
              ctx.fillStyle = '#1e3055'
              ctx.fillText('▓', col * CW, (row + 1) * CH)
              continue
            }
            if (fy < mNear) {
              ctx.fillStyle = '#0d1a2e'
              ctx.fillText('█', col * CW, (row + 1) * CH)
              continue
            }
          }

          // ── Road ──────────────────────────────────────────────────────────
          const roadSpan = 1 - roadStartY
          const roadFy = clamp((fy - roadStartY) / roadSpan, 0, 1)
          const roadHalfW = lerp(0.075, 0.48, roadFy)
          const roadLeft = 0.5 - roadHalfW
          const roadRight = 0.5 + roadHalfW
          const onRoad = fy > roadStartY && fx > roadLeft && fx < roadRight

          if (onRoad) {
            // Road edge lines
            const lEdge = fx - roadLeft < 0.009
            const rEdge = roadRight - fx < 0.009
            if (lEdge || rEdge) {
              ctx.fillStyle = 'rgba(220,220,200,0.12)'
              ctx.fillText('|', col * CW, (row + 1) * CH)
              continue
            }

            // Center dashes
            const isCenter = Math.abs(fx - 0.5) < lerp(0.004, 0.011, roadFy)
            const dashPeriod = 0.11
            const dashOn = ((roadFy + scrollT * 0.9) % dashPeriod) / dashPeriod < 0.48
            if (isCenter && dashOn) {
              const alpha = clamp(roadFy * 1.8, 0.25, 1.0)
              ctx.fillStyle = `rgba(244,185,66,${alpha.toFixed(2)})`
              ctx.fillText('|', col * CW, (row + 1) * CH)
              continue
            }

            // Oncoming headlights
            let oncomingHit = false
            for (const car of oncomingCars) {
              if (Math.abs(fy - car.fy) > 0.018) continue
              const projLx = lerp(0.5, car.lx, clamp(1 - (car.fy - roadStartY) / 0.54, 0, 1))
              const projRx = lerp(0.5, car.rx, clamp(1 - (car.fy - roadStartY) / 0.54, 0, 1))
              const nearL = Math.abs(fx - projLx)
              const nearR = Math.abs(fx - projRx)
              const near = Math.min(nearL, nearR)
              if (near < 0.018) {
                const b2 = clamp(1 - near / 0.018, 0, 1)
                ctx.fillStyle = `rgba(210,225,255,${(b2 * 0.95).toFixed(2)})`
                ctx.fillText(CHARS[Math.floor(b2 * (CHARS.length - 1))], col * CW, (row + 1) * CH)
                oncomingHit = true
                break
              }
            }
            if (oncomingHit) continue

            // Tail lights (car ahead)
            const tailFy = roadStartY + 0.25
            if (Math.abs(fy - tailFy) < 0.022) {
              const tl = lerp(0.5, 0.455, (tailFy - roadStartY) / 0.54)
              const tr = lerp(0.5, 0.545, (tailFy - roadStartY) / 0.54)
              const nearTail = Math.min(Math.abs(fx - tl), Math.abs(fx - tr))
              if (nearTail < 0.016) {
                const tb = clamp(1 - nearTail / 0.016, 0, 1)
                ctx.fillStyle = `rgba(255,35,15,${(tb * 0.9).toFixed(2)})`
                ctx.fillText(tb > 0.65 ? '●' : '°', col * CW, (row + 1) * CH)
                continue
              }
            }

            // Own headlight glow (wet road ripple)
            const dx = (fx - 0.5) / (roadHalfW + 0.001)
            const dy = 1 - roadFy
            const dist = Math.sqrt(dx * dx + dy * dy * 3.2)
            const glow = clamp(1 - dist * 1.45, 0, 1)
            const shimmer = isMobile ? 0 : glow * 0.25 * (0.5 + 0.5 * Math.sin(col * 0.9 + row * 0.3 + t * 0.004))
            const totalGlow = glow + shimmer
            const ci = Math.floor(totalGlow * (CHARS.length - 1))

            if (totalGlow > 0.04) {
              const r = Math.round(lerp(18, 255, totalGlow))
              const g2 = Math.round(lerp(18, 215, totalGlow * 0.86))
              const b2 = Math.round(lerp(38, 95, totalGlow * 0.28))
              ctx.fillStyle = `rgb(${r},${g2},${b2})`
            } else {
              ctx.fillStyle = '#13203a'
            }
            ctx.fillText(CHARS[Math.max(0, ci)], col * CW, (row + 1) * CH)
            continue
          }

          // ── Verge and bush ────────────────────────────────────────────────
          if (fy > roadStartY) {
            // Billboard only on screens wide enough to show it legibly
            if (W > 400) {
              const billLeft = roadRight + 0.025
              const billRight = billLeft + 0.10
              const billTop = roadStartY + 0.11
              const billBot = roadStartY + 0.31
              if (fx >= billLeft && fx <= billRight && fy >= billTop && fy <= billBot) {
                const bx = (fx - billLeft) / (billRight - billLeft)
                const by = (fy - billTop) / (billBot - billTop)
                const bc = Math.floor(bx * 8)
                const br = Math.floor(by * 4)
                const lines = ['WHEELS &', 'DEALS   ', 'MATSAPHA', '+268 791']
                const ch2 = lines[br]?.[bc]
                if (ch2 && ch2 !== ' ') {
                  const bg = clamp(0.2 + roadFy * 0.6, 0.2, 0.75)
                  ctx.fillStyle = `rgba(244,185,66,${bg.toFixed(2)})`
                  ctx.fillText(ch2, col * CW, (row + 1) * CH)
                  continue
                }
              }
            }

            const bn = Math.abs(Math.sin(col * 3.8 + row * 2.4 + 0.6))
            const bd = 0.04 + 0.14 * roadFy
            const bushChars = ['▒', '░', '.', ',', ';', ' ']
            const bi = Math.floor(bn * (bushChars.length - 1))
            ctx.fillStyle = `rgba(12,55,25,${bd.toFixed(2)})`
            ctx.fillText(bushChars[bi], col * CW, (row + 1) * CH)
          }
        }
      }

      // ── Rain overlay ──────────────────────────────────────────────────────
      if (rainActive && rainDrops.length > 0) {
        ctx.font = `${fontSize - 1}px 'Courier New', monospace`
        ctx.fillStyle = 'rgba(130,170,210,0.22)'
        for (const drop of rainDrops) {
          drop.y += drop.speed * dt / 10
          if (drop.y > 1) drop.y = -0.05
          const rx = Math.round(drop.x * (W / CW))
          const ry = Math.round(drop.y * (H / CH))
          ctx.fillText('/', rx * CW, (ry + 1) * CH)
          ctx.fillText('/', (rx - 1) * CW, (ry + 2) * CH)
        }
        ctx.font = font
      }
    }

    if (pref.matches) {
      drawProcedural(0)
      return () => {
        window.removeEventListener('resize', resize)
        window.removeEventListener('orientationchange', resize)
      }
    }

    function loop(ts: number) {
      // FPS throttle — skip frame if under target interval
      if (ts - lastTs < FRAME_MS) {
        animId = requestAnimationFrame(loop)
        return
      }
      const drew = videoSrc ? drawFromVideo() : false
      if (!drew) drawProcedural(ts)
      lastTs = ts
      animId = requestAnimationFrame(loop)
    }
    animId = requestAnimationFrame(loop)

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('orientationchange', resize)
      cancelAnimationFrame(animId)
    }
  }, [videoSrc])

  return (
    <>
      {/* HTML5 video element — active ASCII source when videoSrc provided */}
      <video
        ref={videoRef}
        src={videoSrc}
        muted
        autoPlay
        loop
        playsInline
        crossOrigin="anonymous"
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          zIndex: 0,
          opacity: videoSrc ? 0.07 : 0,
          display: 'block',
          pointerEvents: 'none',
        }}
        aria-hidden
      />
      {/* ASCII canvas — samples video or renders procedural scene */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ zIndex: 1, pointerEvents: 'none' }}
        aria-hidden
      />
    </>
  )
}
