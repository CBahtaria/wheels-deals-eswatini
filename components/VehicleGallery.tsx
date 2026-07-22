'use client'
import { useState } from 'react'
import Image from 'next/image'

export function VehicleGallery({ images, alt }: { images: string[]; alt: string }) {
  const [active, setActive] = useState(0)
  const src = images[active] ?? images[0] ?? 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800&q=80'

  return (
    <div>
      {/* Main image */}
      <div className="relative rounded-2xl overflow-hidden mb-3" style={{ paddingBottom: '62%' }}>
        <Image src={src} alt={alt} fill className="object-cover" sizes="(max-width:1024px) 100vw, 50vw" priority />
      </div>
      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className="relative shrink-0 rounded-lg overflow-hidden transition-all"
              style={{
                width: 72, height: 52,
                outline: i === active ? '2px solid var(--gold)' : '2px solid transparent',
                outlineOffset: '2px',
                opacity: i === active ? 1 : 0.6,
              }}
            >
              <Image src={img} alt={`${alt} view ${i + 1}`} fill className="object-cover" sizes="72px" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
