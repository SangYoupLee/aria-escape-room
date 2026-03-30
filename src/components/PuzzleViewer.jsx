import { useState } from 'react'

// 스테이지별 이미지 매핑
const IMAGE_MAP = {
  1: [new URL('../assets/images/1번째문재.png', import.meta.url).href],
  2: [
    new URL('../assets/images/2번째문제1.png', import.meta.url).href,
    new URL('../assets/images/2번째문제2(지도).png', import.meta.url).href,
  ],
  3: [new URL('../assets/images/3번째문제.png', import.meta.url).href],
  4: [
    new URL('../assets/images/4번째문제 1.png', import.meta.url).href,
    new URL('../assets/images/4번째문제 2.png', import.meta.url).href,
  ],
  5: [new URL('../assets/images/5번째문제.png', import.meta.url).href],
  6: [new URL('../assets/images/6번째 마지막문제.png', import.meta.url).href],
}

export default function PuzzleViewer({ stage }) {
  const [activeTab, setActiveTab] = useState(0)
  const [zoomed, setZoomed] = useState(false)

  const images = IMAGE_MAP[stage.id] ?? []
  const tabs = stage.imageTabs ?? null

  return (
    <div className="w-full">
      {/* 탭 (이미지 2장인 스테이지) */}
      {tabs && (
        <div className="flex gap-1 mb-2">
          {tabs.map((tab, i) => (
            <button key={i} onClick={() => setActiveTab(i)}
              className="mono text-xs px-3 py-1 rounded transition-colors"
              style={{
                border: `1px solid ${activeTab === i ? 'var(--cyan)' : 'var(--border)'}`,
                color: activeTab === i ? 'var(--cyan)' : 'var(--text-secondary)',
                background: activeTab === i ? 'rgba(0,229,255,0.08)' : 'transparent',
              }}>
              {tab}
            </button>
          ))}
        </div>
      )}

      {/* 이미지 */}
      <div className="relative rounded border overflow-hidden cursor-zoom-in"
        style={{ borderColor: 'var(--border)' }}
        onClick={() => setZoomed(true)}>
        <img
          src={images[activeTab]}
          alt={`Stage ${stage.id} puzzle`}
          className="w-full h-auto object-contain"
          style={{ maxHeight: '55vh' }}
        />
        <div className="absolute bottom-2 right-2 mono text-xs px-2 py-0.5 rounded"
          style={{ background: 'rgba(10,14,26,0.8)', color: 'var(--text-secondary)', border: '1px solid var(--border)' }}>
          TAP TO ZOOM
        </div>
      </div>

      {/* 확대 모달 */}
      {zoomed && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 cursor-zoom-out"
          style={{ background: 'rgba(0,0,0,0.92)' }}
          onClick={() => setZoomed(false)}>
          <img
            src={images[activeTab]}
            alt={`Stage ${stage.id} puzzle zoomed`}
            className="max-w-full max-h-full object-contain rounded"
            style={{ border: '1px solid var(--border)' }}
          />
        </div>
      )}
    </div>
  )
}
