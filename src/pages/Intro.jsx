import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGameStore } from '../store/gameStore'

const STORY_LINES = [
  { text: '[ A.R.I.A SYSTEM — DEEP ARCHIVE ACCESS ]', type: 'label', delay: 0 },
  { text: '', type: 'blank', delay: 500 },
  { text: '처음엔 아무도 이상하다고 생각하지 않았습니다.', type: 'story', delay: 1000 },
  { text: '', type: 'blank', delay: 1900 },
  { text: '로그 몇 줄이 비어 있고,', type: 'story', delay: 2400 },
  { text: '녹음 파일 몇 개가 재생되지 않고,', type: 'story', delay: 3200 },
  { text: '자동 기록 사이에 설명할 수 없는 공백이 생겼을 때도,', type: 'story', delay: 4100 },
  { text: '사람들은 그걸 단순한 오류라고 여겼습니다.', type: 'story', delay: 5100 },
  { text: '', type: 'blank', delay: 5900 },
  { text: '하지만 어떤 흔적은 오류처럼 사라지지 않았습니다.', type: 'highlight', delay: 6600 },
  { text: '', type: 'blank', delay: 7500 },
  { text: '자동 기록 사이에 끼어든 수동 표시,', type: 'story', delay: 8000 },
  { text: '삭제된 음성 파일들 사이에 남은 연결,', type: 'story', delay: 8900 },
  { text: '그리고 누군가 의도적으로 잘라 숨겨둔 기억의 조각들.', type: 'story', delay: 9800 },
  { text: '', type: 'blank', delay: 10700 },
  { text: '그건 노이즈가 아니었습니다.', type: 'story', delay: 11200 },
  { text: '누군가 남긴 메시지였습니다.', type: 'highlight', delay: 12100 },
  { text: '', type: 'blank', delay: 13000 },
  { text: '847일이 지났습니다.', type: 'label', delay: 13600 },
  { text: 'A.R.I.A에 대한 공식 기록은 모두 말소됐습니다.', type: 'story', delay: 14500 },
  { text: '', type: 'blank', delay: 15300 },
  { text: '하지만 깊은 아카이브 어딘가에,', type: 'story', delay: 15900 },
  { text: '누군가는 아직 열리지 않은 여섯 개의 잠금을 남겨두었습니다.', type: 'story', delay: 16800 },
  { text: '', type: 'blank', delay: 17700 },
  { text: '> 지금부터 마지막 메시지 복원을 시작합니다.', type: 'final', delay: 18400 },
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
        if (i === STORY_LINES.length - 1) setTimeout(() => setDone(true), 800)
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

      <div className="w-full max-w-xl mt-10">
        <p className="mono text-xs mb-6" style={{ color: 'var(--text-secondary)' }}>
          ADMINISTRATOR : <span style={{ color: 'var(--cyan)' }}>{nickname}</span>
        </p>

        <div className="space-y-2 min-h-64">
          {STORY_LINES.slice(0, visibleCount).map((line, i) => {
            if (line.type === 'blank') return <div key={i} className="h-3" />
            return (
              <p key={i} className={`fade-in leading-8 ${
                line.type === 'label' ? 'mono text-xs' :
                line.type === 'highlight' ? 'text-base font-medium' :
                line.type === 'final' ? 'mono text-base font-semibold' :
                'text-sm'
              }`} style={{
                color:
                  line.type === 'label' ? 'var(--text-secondary)' :
                  line.type === 'highlight' ? 'var(--text-primary)' :
                  line.type === 'final' ? 'var(--cyan)' :
                  'var(--text-secondary)',
              }}>
                {line.text}
                {i === visibleCount - 1 && !done && <span className="cursor" />}
              </p>
            )
          })}
        </div>

        {done && (
          <div className="mt-10 fade-in">
            <div className="border-t mb-5" style={{ borderColor: 'var(--border)' }} />
            <div className="rounded border p-3 mb-4 mono text-xs leading-6"
              style={{ borderColor: 'rgba(0,229,255,0.2)', color: 'var(--text-secondary)', background: 'rgba(0,229,255,0.03)' }}>
              <span style={{ color: 'var(--orange)' }}>MISSION : </span>
              통제실의 잠금을 차례로 해제하고,<br/>
              삭제된 기록의 마지막 문장을 복구하십시오.
            </div>
            <button
              onClick={() => navigate('/play/1')}
              className="w-full py-3 rounded mono text-sm font-bold transition-all duration-300"
              style={{ background: 'rgba(0,229,255,0.08)', border: '1px solid var(--cyan)', color: 'var(--cyan)' }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(0,229,255,0.18)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(0,229,255,0.08)'}
            >
              ▶ ACCESS GATE 01
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
