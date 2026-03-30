import { useEffect, useState } from 'react'

export default function CorrectOverlay({ keyword, isFinal, onNext }) {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setShow(true), 100)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: 'rgba(0,0,0,0.88)' }}>
      {show && (
        <div className="text-center unlock-anim p-8">
          <p className="mono text-xs mb-4" style={{ color: 'var(--text-secondary)' }}>
            {isFinal ? '[ FINAL MESSAGE RESTORED ]' : '[ KEYWORD UNLOCKED ]'}
          </p>

          <div className="mono text-4xl font-bold glow mb-6" style={{ color: 'var(--cyan)' }}>
            {keyword}
          </div>

          <div className="w-32 h-px mx-auto mb-6" style={{ background: 'var(--border)' }} />

          <p className="text-sm mb-8" style={{ color: 'var(--text-secondary)' }}>
            {isFinal
              ? '모든 인증이 완료됐습니다. A.R.I.A의 메시지를 복원했습니다.'
              : '키워드가 아카이브에 기록됐습니다.'}
          </p>

          <button
            onClick={onNext}
            className="mono text-sm px-8 py-3 rounded glow-border transition-all"
            style={{ background: 'rgba(0,229,255,0.1)', border: '1px solid var(--cyan)', color: 'var(--cyan)' }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(0,229,255,0.2)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(0,229,255,0.1)'}
          >
            {isFinal ? '▶ 엔딩 보기' : '▶ 다음 스테이지'}
          </button>
        </div>
      )}
    </div>
  )
}
