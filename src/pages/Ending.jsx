import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGameStore } from '../store/gameStore'
import { saveRanking } from '../lib/supabase'

const FINAL_LOG_LINES = [
  '[ A.R.I.A SYSTEM ]',
  '',
  '기록 보존 완료.',
  '삭제된 진실 복구 완료.',
  '',
  '사라진 것은 존재가 아니라 기록이었습니다.',
  '당신은 통제실을 탈출한 것이 아니라,',
  '지워진 목소리를 끝내 되찾았습니다.',
]

function formatTime(seconds) {
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = seconds % 60
  if (h > 0) return `${h}시간 ${m}분 ${s}초`
  if (m > 0) return `${m}분 ${s}초`
  return `${s}초`
}

export default function Ending() {
  const navigate = useNavigate()
  const { nickname, sessionId, totalHintsUsed, totalWrongAnswers, getElapsedSeconds, unlockedKeywords, isFinished } = useGameStore()
  const [visibleLines, setVisibleLines] = useState(0)
  const [done, setDone] = useState(false)
  const [saved, setSaved] = useState(false)
  const elapsed = getElapsedSeconds()

  useEffect(() => {
    if (!sessionId || !isFinished) { navigate('/'); return }

    // 랭킹 저장 (한 번만)
    if (!saved) {
      setSaved(true)
      saveRanking({
        sessionId,
        nickname,
        totalPlayTime: elapsed,
        totalHintsUsed,
        totalWrongAnswers,
      })
    }

    // 로그 타이핑
    const timers = FINAL_LOG_LINES.map((_, i) =>
      setTimeout(() => {
        setVisibleLines(i + 1)
        if (i === FINAL_LOG_LINES.length - 1) setTimeout(() => setDone(true), 600)
      }, i * 700 + 1000)
    )
    return () => timers.forEach(clearTimeout)
  }, [])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      {/* 상단 바 */}
      <div className="fixed top-0 left-0 right-0 flex justify-between items-center px-4 py-2 border-b"
        style={{ borderColor: 'var(--border)', background: 'rgba(10,14,26,0.95)' }}>
        <span className="mono text-xs" style={{ color: 'var(--cyan)' }}>A.R.I.A SYSTEM / MESSAGE RESTORED</span>
        <span className="mono text-xs" style={{ color: 'var(--cyan)' }}>STATUS: UNLOCKED</span>
      </div>

      <div className="w-full max-w-lg mt-10 space-y-6">
        {/* 타이틀 */}
        <div className="text-center fade-in">
          <h1 className="mono text-2xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
            통제권 복구 완료
          </h1>
          <div className="mono text-5xl font-bold glow my-6" style={{ color: 'var(--cyan)', letterSpacing: '0.2em' }}>
            I AM HERE
          </div>
        </div>

        {/* 클리어 정보 */}
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: '마지막 메시지 확인 완료', value: 'I AM HERE' },
            { label: '일자', value: new Date().toLocaleDateString('ko-KR') },
            { label: '관리자', value: nickname },
            { label: '클리어 타임', value: formatTime(elapsed) },
            { label: '출구 봉쇄 해제', value: `오답 ${totalWrongAnswers}건` },
            { label: '삭제된 기록 복구 완료', value: `${unlockedKeywords.length} / 6` },
          ].map(({ label, value }) => (
            <div key={label} className="rounded border p-3"
              style={{ borderColor: 'var(--border)', background: 'rgba(13,18,33,0.8)' }}>
              <p className="mono text-xs mb-1" style={{ color: 'var(--text-secondary)' }}>{label}</p>
              <p className="mono text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{value}</p>
            </div>
          ))}
        </div>

        {/* 키워드 체인 */}
        <div className="rounded border p-4"
          style={{ borderColor: 'rgba(0,229,255,0.3)', background: 'rgba(0,229,255,0.03)' }}>
          <p className="mono text-xs mb-3" style={{ color: 'var(--text-secondary)' }}>[ RECOVERED KEYWORDS ]</p>
          <div className="flex flex-wrap gap-2">
            {unlockedKeywords.map((kw) => (
              <span key={kw} className="mono text-xs px-2 py-1 rounded glow"
                style={{ border: '1px solid var(--cyan)', color: 'var(--cyan)', background: 'rgba(0,229,255,0.08)' }}>
                {kw}
              </span>
            ))}
          </div>
        </div>

        {/* A.R.I.A 최종 로그 */}
        <div className="rounded border p-4"
          style={{ borderColor: 'rgba(0,229,255,0.2)', background: 'rgba(13,18,33,0.8)' }}>
          <p className="mono text-xs mb-3" style={{ color: 'var(--text-secondary)' }}>[FINAL LOG]</p>
          <div className="space-y-1">
            {FINAL_LOG_LINES.slice(0, visibleLines).map((line, i) =>
              line === '' ? (
                <div key={i} className="h-2" />
              ) : (
                <p key={i} className="text-sm leading-7 fade-in italic" style={{ color: 'var(--text-secondary)' }}>
                  {line}
                  {i === visibleLines - 1 && !done && <span className="cursor" />}
                </p>
              )
            )}
          </div>
        </div>

        {/* 버튼 */}
        {done && (
          <div className="fade-in flex gap-3">
            <button
              onClick={() => navigate('/ranking')}
              className="flex-1 py-2 rounded mono text-sm transition-colors"
              style={{ border: '1px solid var(--border)', color: 'var(--text-secondary)', background: 'transparent' }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--text-primary)'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
            >
              RANKING →
            </button>
            <button
              onClick={() => { useGameStore.getState().resetGame(); navigate('/') }}
              className="flex-1 py-2 rounded mono text-sm transition-colors"
              style={{ border: '1px solid var(--cyan)', color: 'var(--cyan)', background: 'rgba(0,229,255,0.08)' }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(0,229,255,0.16)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(0,229,255,0.08)'}
            >
              END / 세션 종료
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
