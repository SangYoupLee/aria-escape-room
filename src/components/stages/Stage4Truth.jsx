// Stage 4 — TRUTH : 삭제된 기억 중첩 퍼즐
import { useState } from 'react'

const CACHES = [
  {
    id: 'CACHE-12', pct: '11%',
    layerA: [ [[10,10],[90,10]] ],
    layerB: [ [[50,10],[50,90]] ],
  },
  {
    id: 'CACHE-21', pct: '21%',
    layerA: [ [[10,10],[10,90]], [[50,50],[90,90]] ],
    layerB: [ [[10,10],[70,10],[70,50],[10,50]] ],
  },
  {
    id: 'CACHE-29', pct: '29%',
    layerA: [ [[10,10],[10,90],[90,90]] ],
    layerB: [ [[90,10],[90,90]] ],
  },
  {
    id: 'CACHE-31', pct: '31%',
    layerA: [ [[50,10],[50,90]] ],
    layerB: [ [[10,10],[90,10]] ],
  },
  {
    id: 'CACHE-40', pct: '40%',
    layerA: [ [[10,10],[10,90]], [[10,50],[90,50]] ],
    layerB: [ [[90,10],[90,90]] ],
  },
]

const DOTS = []
for (let y = 0; y <= 4; y++)
  for (let x = 0; x <= 4; x++)
    DOTS.push([10 + x * 20, 10 + y * 20])

function CacheGrid({ cache, showA, showB }) {
  const layerLabel = showA ? 'LAYER A' : 'LAYER B'
  return (
    <div className="rounded border p-2"
      style={{ borderColor: 'var(--border)', background: 'rgba(0,0,0,0.2)' }}>

      <div className="flex justify-between items-center mb-1">
        <span className="mono text-sm font-semibold" style={{ color: 'var(--cyan)' }}>{cache.id}</span>
        <span className="mono text-xs" style={{ color: 'var(--text-secondary)' }}>{cache.pct}</span>
      </div>
      <div className="mono text-xs mb-1" style={{ color: 'var(--text-secondary)' }}>
        {layerLabel}
      </div>

      <svg viewBox="0 0 100 100" className="w-full" style={{ maxHeight: '130px' }}>
        {DOTS.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={1.5}
            fill="var(--text-secondary)" opacity={0.25} />
        ))}
        {showA && cache.layerA.map((pts, i) => (
          <polyline key={`a${i}`}
            points={pts.map(p => p.join(',')).join(' ')}
            stroke="#00e5ff" strokeWidth={3} strokeLinecap="round"
            strokeLinejoin="round" fill="none" />
        ))}
        {showB && cache.layerB.map((pts, i) => (
          <polyline key={`b${i}`}
            points={pts.map(p => p.join(',')).join(' ')}
            stroke="#d946ef" strokeWidth={3} strokeLinecap="round"
            strokeLinejoin="round" fill="none" />
        ))}
      </svg>

      <div className="mono text-center mt-1"
        style={{ fontSize: '9px', color: 'var(--text-secondary)', opacity: 0.4 }}>
        cache residue
      </div>
    </div>
  )
}

const LAYER_OPTIONS = [
  { key: 'a', label: 'LAYER A', color: '#00e5ff' },
  { key: 'b', label: 'LAYER B', color: '#d946ef' },
]

export default function Stage4Truth() {
  const [activeLayer, setActiveLayer] = useState('a')
  const showA = activeLayer === 'a'
  const showB = activeLayer === 'b'

  return (
    <div className="w-full rounded border overflow-hidden"
      style={{ borderColor: 'var(--border)', background: 'var(--bg-secondary)' }}>

      <div className="flex justify-between items-center px-3 py-2 border-b"
        style={{ borderColor: 'var(--border)' }}>
        <span className="mono text-xs" style={{ color: 'var(--cyan)' }}>
          A.R.I.A SYSTEM / MEMORY CACHE OVERLAY
        </span>
        <span className="mono text-xs" style={{ color: 'var(--cyan)' }}>
          STATUS: MEMORY RESTORED
        </span>
      </div>

      {/* 모바일 레이어 탭 */}
      <div className="md:hidden flex gap-2 px-3 py-2 border-b" style={{ borderColor: 'var(--border)' }}>
        {LAYER_OPTIONS.map(({ key, label, color }) => (
          <button key={key} onClick={() => setActiveLayer(key)}
            className="flex-1 mono text-sm py-2 rounded transition-colors"
            style={{
              border: `1px solid ${activeLayer === key ? color : 'var(--border)'}`,
              color: activeLayer === key ? color : 'var(--text-secondary)',
              background: activeLayer === key ? `color-mix(in srgb, ${color} 8%, transparent)` : 'transparent',
            }}>
            {label}
          </button>
        ))}
      </div>

      <div className="flex flex-col md:flex-row">

        <div className="md:w-48 flex-shrink-0 p-3 flex-col gap-3
                        hidden md:flex border-r"
          style={{ borderColor: 'var(--border)' }}>

          <div className="rounded border p-3"
            style={{ borderColor: 'var(--border)', background: 'rgba(0,0,0,0.25)' }}>
            <p className="mono text-sm mb-2" style={{ color: 'var(--cyan)' }}>[ 연구원 메모 ]</p>
            <p className="text-sm leading-7" style={{ color: 'var(--text-secondary)' }}>
              겹쳐진 흔적은<br />
              지워진 의도를 드러낸다.
            </p>
          </div>

          <div className="rounded border p-3"
            style={{ borderColor: 'var(--border)', background: 'rgba(0,0,0,0.25)' }}>
            <p className="mono text-sm mb-2" style={{ color: 'var(--cyan)' }}>[ LAYER CONTROL ]</p>
            <div className="flex flex-col gap-2">
              {LAYER_OPTIONS.map(({ key, label, color }) => (
                <button key={key}
                  onClick={() => setActiveLayer(key)}
                  className="mono text-sm px-3 py-2 rounded text-left transition-colors"
                  style={{
                    border: `1px solid ${activeLayer === key ? color : 'var(--border)'}`,
                    color: activeLayer === key ? color : 'var(--text-secondary)',
                    background: activeLayer === key ? `color-mix(in srgb, ${color} 8%, transparent)` : 'transparent',
                  }}>
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded border p-3"
            style={{ borderColor: 'var(--border)', background: 'rgba(0,0,0,0.25)' }}>
            <p className="mono text-sm mb-1" style={{ color: 'var(--cyan)' }}>[ 복구 형식 ]</p>
            <p className="mono text-sm leading-7" style={{ color: 'var(--text-secondary)' }}>
              형식 : 영문 대문자 5자리<br />
              복구 캐시 : 5개
            </p>
          </div>
        </div>

        <div className="flex-1 p-3 min-w-0">
          <div className="mb-3">
            <p className="mono text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
              삭제된 기억 중첩 / MEMORY CACHE OVERLAY
            </p>
            <p className="mono text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>
              복구된 캐시 5개 — 현재 표시: {activeLayer === 'a' ? 'LAYER A' : 'LAYER B'}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {CACHES.slice(0, 4).map((cache) => (
              <CacheGrid key={cache.id} cache={cache} showA={showA} showB={showB} />
            ))}
          </div>
          <div className="mt-2" style={{ maxWidth: '50%', margin: '8px auto 0' }}>
            <CacheGrid cache={CACHES[4]} showA={showA} showB={showB} />
          </div>
        </div>
      </div>
    </div>
  )
}
