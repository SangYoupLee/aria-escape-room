import { useEffect, useState } from 'react'

export default function CorrectOverlay({ keyword, isFinal, restoredLog, onNext }) {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setShow(true), 100)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: 'rgba(0,0,0,0.9)' }}>
      {show && (
        <div className="text-center unlock-anim px-8 py-10 max-w-sm w-full">
          <p className="mono text-xs mb-4" style={{ color: 'var(--text-secondary)' }}>
            {isFinal ? '[ FINAL MESSAGE RESTORED ]' : '[ KEYWORD RESTORED ]'}
          </p>

          <div className="mono font-bold glow mb-6"
            style={{ color: 'var(--cyan)', fontSize: isFinal ? '2.5rem' : '2rem', letterSpacing: '0.15em' }}>
            {keyword}
          </div>

          {/* 복구 로그 */}
          {restoredLog && restoredLog.length > 0 && !isFinal && (
            <div className="rounded border p-3 mb-6 text-left"
              style={{ borderColor: 'rgba(0,229,255,0.2)', background: 'rgba(0,229,255,0.04)' }}>
              <p className="mono text-xs mb-2" style={{ color: 'var(--text-secondary)' }}>복구 로그</p>
              {restoredLog.map((line, i) => (
                <p key={i} className="text-xs leading-6 italic" style={{ color: 'var(--text-secondary)' }}>
                  {line}
                </p>
              ))}
            </div>
          )}

          {isFinal && (
            <div className="rounded border p-3 mb-6"
              style={{ borderColor: 'rgba(0,229,255,0.2)', background: 'rgba(0,229,255,0.04)' }}>
              <p className="text-xs leading-6" style={{ color: 'var(--text-secondary)' }}>
                삭제된 진실 복구 완료.<br/>
                지워진 목소리를 끝내 되찾았습니다.
              </p>
            </div>
          )}

          <div className="mono text-xs mb-5" style={{ color: 'var(--text-secondary)' }}>
            {isFinal
              ? '모든 잠금이 해제됐습니다.'
              : '아카이브 심층 구역 접근 권한이 부분적으로 복구되었습니다.'}
          </div>

          <button
            onClick={onNext}
            className="mono text-sm px-8 py-2 rounded transition-all"
            style={{ background: 'rgba(0,229,255,0.08)', border: '1px solid var(--cyan)', color: 'var(--cyan)' }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(0,229,255,0.18)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(0,229,255,0.08)'}
          >
            {isFinal ? '▶ 엔딩 확인' : '▶ 다음 잠금으로'}
          </button>
        </div>
      )}
    </div>
  )
}
