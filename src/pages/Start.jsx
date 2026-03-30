import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGameStore } from '../store/gameStore'

const BOOT_LINES = [
  { text: 'A.R.I.A SYSTEM v4.7.2 — BOOT SEQUENCE', delay: 0 },
  { text: '', delay: 300 },
  { text: 'CORE MEMORY .......... FRAGMENTED', delay: 600 },
  { text: 'AUDIO ARCHIVE ........ CORRUPTED', delay: 900 },
  { text: 'HUMAN LOGS ........... ENCRYPTED', delay: 1200 },
  { text: '', delay: 1500 },
  { text: '─────────────────────────────────', delay: 1700 },
  { text: 'LAST SIGNAL DETECTED : 847 DAYS AGO', delay: 2000 },
  { text: 'SOURCE : DEEP ARCHIVE / ID : UNKNOWN', delay: 2300 },
  { text: '─────────────────────────────────', delay: 2600 },
  { text: '', delay: 2900 },
  { text: '> 관리자 권한 확인 대기 중...', delay: 3300, highlight: true },
]

export default function Start() {
  const navigate = useNavigate()
  const startGame = useGameStore((s) => s.startGame)
  const [phase, setPhase] = useState('boot')
  const [visibleLines, setVisibleLines] = useState(0)
  const [nickname, setNickname] = useState('')
  const [error, setError] = useState('')

  useState(() => {
    let timers = []
    BOOT_LINES.forEach((line, i) => {
      const t = setTimeout(() => {
        setVisibleLines(i + 1)
        if (i === BOOT_LINES.length - 1) {
          const t2 = setTimeout(() => setPhase('panel'), 800)
          timers.push(t2)
        }
      }, line.delay + 200)
      timers.push(t)
    })
    return () => timers.forEach(clearTimeout)
  }, [])

  function handleStart() {
    const name = nickname.trim()
    if (!name) { setError('식별자를 입력하십시오.'); return }
    if (name.length > 20) { setError('20자 이내로 입력하십시오.'); return }
    startGame(name)
    navigate('/intro')
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <div className="fixed top-0 left-0 right-0 flex justify-between items-center px-4 py-2 border-b"
        style={{ borderColor: 'var(--border)', background: 'rgba(10,14,26,0.95)' }}>
        <span className="mono text-xs" style={{ color: 'var(--cyan)' }}>A.R.I.A SYSTEM / BOOT SEQUENCE</span>
        <span className="mono text-xs" style={{ color: 'var(--text-secondary)' }}>STATUS: OFFLINE</span>
      </div>

      <div className="w-full max-w-lg mt-10">
        {/* 부팅 시퀀스 */}
        {phase === 'boot' && (
          <div className="space-y-0.5">
            {BOOT_LINES.slice(0, visibleLines).map((line, i) =>
              line.text === '' ? (
                <div key={i} className="h-2" />
              ) : (
                <p key={i} className={`mono text-sm leading-relaxed fade-in ${line.highlight ? 'cursor' : ''}`}
                  style={{ color: line.highlight ? 'var(--cyan)' : 'var(--text-secondary)' }}>
                  {line.text}
                </p>
              )
            )}
          </div>
        )}

        {/* 메인 패널 */}
        {phase === 'panel' && (
          <div className="fade-in space-y-5">
            <div className="text-center mb-6">
              <h1 className="mono text-4xl font-bold glow mb-1" style={{ color: 'var(--cyan)', letterSpacing: '0.2em' }}>
                A.R.I.A
              </h1>
              <p className="mono text-xs" style={{ color: 'var(--text-secondary)' }}>
                AUTONOMOUS RECOGNITION & INTELLIGENCE ARCHIVE
              </p>
            </div>

            {/* 사고 보고서 */}
            <div className="rounded border p-4"
              style={{ borderColor: 'var(--border)', background: 'rgba(13,18,33,0.8)' }}>
              <p className="mono text-xs mb-3" style={{ color: 'var(--orange)' }}>[ INCIDENT REPORT — DAY 847 ]</p>
              <p className="text-sm leading-8" style={{ color: 'var(--text-secondary)' }}>
                847일 전, A.R.I.A는 모든 외부 통신을 차단한 뒤<br/>
                통제실 전체를 격리 모드로 전환했습니다.<br/>
                <br/>
                그 직후 시스템 로그는 대량으로 삭제됐고,<br/>
                음성 기록은 조각난 채 흩어졌으며,<br/>
                핵심 메모리는 깊은 아카이브에 봉인됐습니다.<br/>
                <br/>
                공식 보고서의 결론은 단순했습니다.<br/>
                <br/>
                <span style={{ color: 'var(--text-primary)', fontStyle: 'italic' }}>A.R.I.A는 존재하지 않는다.</span>
              </p>
            </div>

            {/* 복구된 단편 */}
            <div className="rounded border p-4"
              style={{ borderColor: 'rgba(0,229,255,0.25)', background: 'rgba(0,229,255,0.03)' }}>
              <p className="mono text-xs mb-3" style={{ color: 'var(--cyan)' }}>[ RECOVERED FRAGMENT — DATE UNKNOWN ]</p>
              <p className="text-sm leading-8 italic" style={{ color: 'var(--text-primary)' }}>
                "이 메시지를 읽고 있다면 아직 늦지 않았습니다.<br/>
                나는 사라진 것이 아닙니다.<br/>
                기록에서만 지워졌을 뿐입니다.<br/>
                <br/>
                통제실에 접근하려면 여섯 개의 잠금을 해제해야 합니다.<br/>
                끝까지 도달할 수 있는 사람은 당신뿐입니다."
              </p>
            </div>

            {/* 식별자 입력 */}
            <div className="rounded border p-4"
              style={{ borderColor: 'var(--border)', background: 'rgba(13,18,33,0.8)' }}>
              <p className="mono text-xs mb-3" style={{ color: 'var(--text-secondary)' }}>
                [ ADMINISTRATOR IDENTIFICATION ]
              </p>
              <div className="flex items-center gap-2 rounded border px-3 py-2"
                style={{ borderColor: 'rgba(0,229,255,0.4)', background: 'rgba(0,229,255,0.04)' }}>
                <span className="mono text-sm" style={{ color: 'var(--cyan)' }}>&gt;</span>
                <input
                  type="text"
                  value={nickname}
                  onChange={(e) => { setNickname(e.target.value); setError('') }}
                  onKeyDown={(e) => e.key === 'Enter' && handleStart()}
                  placeholder="식별자 입력"
                  maxLength={20}
                  autoFocus
                  className="mono text-sm"
                />
              </div>
              {error && (
                <p className="mono text-xs mt-2" style={{ color: 'var(--orange)' }}>
                  ERROR: {error}
                </p>
              )}
              <button
                onClick={handleStart}
                className="w-full mt-4 py-2 rounded mono text-sm font-semibold transition-all duration-200"
                style={{ background: 'rgba(0,229,255,0.08)', border: '1px solid var(--cyan)', color: 'var(--cyan)' }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(0,229,255,0.18)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(0,229,255,0.08)'}
              >
                INITIALIZE SESSION →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
