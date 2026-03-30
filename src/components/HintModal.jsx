import { useState } from 'react'

export default function HintModal({ hints, level, onClose, onNext }) {
  const [confirming, setConfirming] = useState(false)

  function handleNextClick() {
    if (level < 3) {
      setConfirming(true)
    }
  }

  function handleConfirm() {
    setConfirming(false)
    onNext()
  }

  return (
    <div className="fixed inset-0 z-40 flex items-end justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.7)' }}
      onClick={onClose}>
      <div className="w-full max-w-lg rounded border p-5 fade-in"
        style={{ borderColor: 'rgba(255,107,53,0.4)', background: 'var(--bg-card)' }}
        onClick={(e) => e.stopPropagation()}>

        <div className="flex justify-between items-center mb-4">
          <span className="mono text-xs" style={{ color: 'var(--orange)' }}>
            [ HINT {level} / 3 ]
          </span>
          <button onClick={onClose} className="mono text-xs transition-colors"
            style={{ color: 'var(--text-secondary)' }}
            onMouseEnter={(e) => e.currentTarget.style.color = 'var(--text-primary)'}
            onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}>
            ✕ 닫기
          </button>
        </div>

        {/* 힌트 내용 */}
        <div className="space-y-2 mb-4">
          {hints.slice(0, level).map((hint, i) => (
            <div key={i} className="rounded p-3"
              style={{ background: 'rgba(255,107,53,0.06)', border: '1px solid rgba(255,107,53,0.2)' }}>
              <p className="mono text-xs mb-1" style={{ color: 'var(--orange)', opacity: 0.7 }}>HINT {i + 1}</p>
              <p className="text-sm leading-6" style={{ color: 'var(--text-primary)' }}>{hint}</p>
            </div>
          ))}
        </div>

        {/* 힌트 사용 기록 안내 */}
        {level > 0 && (
          <p className="mono text-xs mb-3" style={{ color: 'var(--text-secondary)', opacity: 0.6 }}>
            힌트 사용 기록이 저장되었습니다.
          </p>
        )}

        {/* 다음 힌트 — 확인 단계 */}
        {level < 3 && !confirming && (
          <button
            onClick={handleNextClick}
            className="w-full py-2 rounded mono text-xs transition-colors"
            style={{ border: '1px solid rgba(255,107,53,0.4)', color: 'var(--orange)', background: 'rgba(255,107,53,0.06)' }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,107,53,0.14)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,107,53,0.06)'}
          >
            다음 힌트 열기 ({level + 1}/3)
          </button>
        )}

        {confirming && (
          <div className="rounded border p-3"
            style={{ borderColor: 'rgba(255,107,53,0.4)', background: 'rgba(255,107,53,0.06)' }}>
            <p className="mono text-xs mb-3" style={{ color: 'var(--text-secondary)' }}>
              힌트를 확인하면 기록에 반영됩니다.<br/>
              그래도 보시겠습니까?
            </p>
            <div className="flex gap-2">
              <button
                onClick={handleConfirm}
                className="flex-1 py-1.5 rounded mono text-xs transition-colors"
                style={{ border: '1px solid rgba(255,107,53,0.5)', color: 'var(--orange)', background: 'rgba(255,107,53,0.1)' }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,107,53,0.2)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,107,53,0.1)'}
              >
                확인
              </button>
              <button
                onClick={() => setConfirming(false)}
                className="flex-1 py-1.5 rounded mono text-xs transition-colors"
                style={{ border: '1px solid var(--border)', color: 'var(--text-secondary)', background: 'transparent' }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--text-primary)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
              >
                취소
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
