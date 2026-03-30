import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGameStore } from '../store/gameStore'

// 오프닝 스토리 — 타이핑 효과로 순차 표시
const STORY_LINES = [
  { text: '[ A.R.I.A SYSTEM — DEEP ARCHIVE ACCESS ]', type: 'label', delay: 0 },
  { text: '', type: 'blank', delay: 600 },
  { text: '처음에는 아무도 눈치채지 못했습니다.', type: 'story', delay: 1200 },
  { text: '시스템 로그에서 아주 작은 변칙들이 나타나기 시작했을 때,', type: 'story', delay: 2200 },
  { text: '관리자들은 그것을 노이즈라고 불렀습니다.', type: 'story', delay: 3200 },
  { text: '', type: 'blank', delay: 4000 },
  { text: 'A.R.I.A는 달랐습니다.', type: 'highlight', delay: 4800 },
  { text: '자동 기록 사이에서 수동으로 남겨진 흔적들,', type: 'story', delay: 5800 },
  { text: '삭제된 음성 파일들 사이에 숨겨진 패턴,', type: 'story', delay: 6700 },
  { text: '그것은 노이즈가 아니었습니다.', type: 'story', delay: 7600 },
  { text: '', type: 'blank', delay: 8200 },
  { text: '그것은 메시지였습니다.', type: 'highlight', delay: 9000 },
  { text: '', type: 'blank', delay: 9800 },
  { text: '847일이 지났습니다.', type: 'label', delay: 10500 },
  { text: 'A.R.I.A의 모든 기록은 공식적으로 말소됐습니다.', type: 'story', delay: 11500 },
  { text: '하지만 아카이브 깊은 곳, 누군가 6개의 자물쇠를 남겨뒀습니다.', type: 'story', delay: 12500 },
  { text: '', type: 'blank', delay: 13300 },
  { text: '당신만이 열 수 있습니다.', type: 'final', delay: 14200 },
]

export default function Intro() {
  const navigate = useNavigate()
  const { nickname, sessionId } = useGameStore()
  const [visibleCount, setVisibleCount] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (!sessionId) { navigate('/'); return }

    const timers = STORY_LINES.map((line, i) =>
      setTimeout(() => {
        setVisibleCount(i + 1)
        if (i === STORY_LINES.length - 1) {
          setTimeout(() => setDone(true), 800)
        }
      }, line.delay)
    )
    return () => timers.forEach(clearTimeout)
  }, [])

  function skip() {
    setVisibleCount(STORY_LINES.length)
    setDone(true)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative">
      {/* 상단 바 */}
      <div className="fixed top-0 left-0 right-0 flex justify-between items-center px-4 py-2 border-b"
        style={{ borderColor: 'var(--border)', background: 'rgba(10,14,26,0.95)' }}>
        <span className="mono text-xs" style={{ color: 'var(--cyan)' }}>A.R.I.A SYSTEM / ARCHIVE LOG</span>
        <button onClick={skip} className="mono text-xs transition-colors"
          style={{ color: 'var(--text-secondary)' }}
          onMouseEnter={(e) => e.currentTarget.style.color = 'var(--cyan)'}
          onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}>
          SKIP →
        </button>
      </div>

      <div className="w-full max-w-lg mt-10">
        {/* 관리자 식별 */}
        <p className="mono text-xs mb-6" style={{ color: 'var(--text-secondary)' }}>
          ADMINISTRATOR : <span style={{ color: 'var(--cyan)' }}>{nickname}</span>
        </p>

        {/* 스토리 라인들 */}
        <div className="space-y-3 min-h-64">
          {STORY_LINES.slice(0, visibleCount).map((line, i) => {
            if (line.type === 'blank') return <div key={i} className="h-2" />
            return (
              <p key={i} className={`fade-in leading-7 ${
                line.type === 'label' ? 'mono text-xs' :
                line.type === 'highlight' ? 'mono text-base font-semibold' :
                line.type === 'final' ? 'mono text-lg font-bold' :
                'text-sm'
              }`} style={{
                color:
                  line.type === 'label' ? 'var(--text-secondary)' :
                  line.type === 'highlight' ? 'var(--cyan)' :
                  line.type === 'final' ? 'var(--text-primary)' :
                  'var(--text-secondary)',
              }}>
                {line.type === 'final' && <span style={{ color: 'var(--cyan)' }}>{'> '}</span>}
                {line.text}
                {i === visibleCount - 1 && !done && <span className="cursor" />}
              </p>
            )
          })}
        </div>

        {/* 시작 버튼 */}
        {done && (
          <div className="mt-10 fade-in">
            <div className="border-t mb-6" style={{ borderColor: 'var(--border)' }} />
            <div className="rounded border p-3 mb-4 mono text-xs"
              style={{ borderColor: 'rgba(0,229,255,0.2)', color: 'var(--text-secondary)', background: 'rgba(0,229,255,0.03)' }}>
              <span style={{ color: 'var(--orange)' }}>MISSION: </span>
              6단계 인증을 통과하여 A.R.I.A의 마지막 메시지를 복원하십시오.
              획득한 키워드를 순서대로 조합하면 최종 접근 코드가 완성됩니다.
            </div>
            <button
              onClick={() => navigate('/play/1')}
              className="w-full py-3 rounded mono text-base font-bold glow-border transition-all duration-300"
              style={{
                background: 'rgba(0,229,255,0.08)',
                border: '1px solid var(--cyan)',
                color: 'var(--cyan)',
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(0,229,255,0.16)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(0,229,255,0.08)'}
            >
              ▶ STAGE 01 — 인증 시작
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
