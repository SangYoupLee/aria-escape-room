export default function HintModal({ hints, level, onClose, onNext }) {
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
          <button onClick={onClose} className="mono text-xs" style={{ color: 'var(--text-secondary)' }}>
            ✕ CLOSE
          </button>
        </div>

        <div className="space-y-2 mb-4">
          {hints.slice(0, level).map((hint, i) => (
            <div key={i} className="rounded p-3"
              style={{ background: 'rgba(255,107,53,0.06)', border: '1px solid rgba(255,107,53,0.2)' }}>
              <p className="mono text-xs mb-1" style={{ color: 'var(--orange)', opacity: 0.7 }}>HINT {i + 1}</p>
              <p className="text-sm" style={{ color: 'var(--text-primary)' }}>{hint}</p>
            </div>
          ))}
        </div>

        {level < 3 && (
          <button
            onClick={onNext}
            className="w-full py-2 rounded mono text-xs transition-colors"
            style={{
              border: '1px solid rgba(255,107,53,0.4)',
              color: 'var(--orange)',
              background: 'rgba(255,107,53,0.06)',
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,107,53,0.14)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,107,53,0.06)'}
          >
            다음 힌트 보기 ({level + 1}/3)
          </button>
        )}
      </div>
    </div>
  )
}
