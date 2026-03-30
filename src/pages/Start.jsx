import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGameStore } from '../store/gameStore'

// 부팅 시퀀스 텍스트
const BOOT_LINES = [
  { text: 'A.R.I.A SYSTEM v4.7.2 — INITIALIZING', delay: 0 },
  { text: 'CORE MEMORY ... FRAGMENTED', delay: 400 },
  { text: 'AUDIO RECORD ... CORRUPTED', delay: 700 },
  { text: 'HUMAN LOG ... ENCRYPTED', delay: 1000 },
  { text: '─────────────────────────────────', delay: 1300 },
  { text: 'LAST SIGNAL DETECTED : 847 DAYS AGO', delay: 1600 },
  { text: 'SOURCE : UNKNOWN / SECTOR : DEEP ARCHIVE', delay: 1900 },
  { text: '─────────────────────────────────', delay: 2200 },
  { text: '> AWAITING AUTHORIZED ADMINISTRATOR...', delay: 2700, highlight: true },
]

export default function Start() {
  const navigate = useNavigate()
  const startGame = useGameStore((s) => s.startGame)
  const [phase, setPhase] = useState('boot')   // boot | intro | input
  const [visibleLines, setVisibleLines] = useState(0)
  const [nickname, setNickname] = useState('')
  const [error, setError] = useState('')

  // 부팅 시퀀스 시작
  useState(() => {
    let timers = []
    BOOT_LINES.forEach((line, i) => {
      const t = setTimeout(() => {
        setVisibleLines(i + 1)
        if (i === BOOT_LINES.length - 1) {
          const t2 = setTimeout(() => setPhase('intro'), 1000)
          timers.push(t2)
        }
      }, line.delay + 300)
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
      {/* 상단 시스템 바 */}
      <div className="fixed top-0 left-0 right-0 flex justify-between items-center px-4 py-2 border-b"
        style={{ borderColor: 'var(--border)', background: 'rgba(10,14,26,0.95)' }}>
        <span className="mono text-xs" style={{ color: 'var(--cyan)' }}>A.R.I.A SYSTEM / BOOT SEQUENCE</span>
        <span className="mono text-xs" style={{ color: 'var(--text-secondary)' }}>STATUS: OFFLINE</span>
      </div>

      <div className="w-full max-w-lg mt-10">
        {/* 부팅 시퀀스 */}
        {phase === 'boot' && (
          <div className="space-y-1 fade-in">
            {BOOT_LINES.slice(0, visibleLines).map((line, i) => (
              <p key={i} className={`mono text-sm leading-relaxed ${line.highlight ? 'cursor' : ''}`}
                style={{ color: line.highlight ? 'var(--cyan)' : 'var(--text-secondary)' }}>
                {line.text}
              </p>
            ))}
          </div>
        )}

        {/* 인트로 + 입력 */}
        {(phase === 'intro' || phase === 'input') && (
          <div className="fade-in space-y-6">
            {/* 로고 */}
            <div className="text-center mb-8">
              <h1 className="mono text-3xl font-bold glow mb-1" style={{ color: 'var(--cyan)' }}>
                A.R.I.A
              </h1>
              <p className="mono text-xs" style={{ color: 'var(--text-secondary)' }}>
                AUTONOMOUS RECOGNITION & INTELLIGENCE ARCHIVE
              </p>
            </div>

            {/* 상황 설명 */}
            <div className="rounded border p-4 space-y-2"
              style={{ borderColor: 'var(--border)', background: 'rgba(13,18,33,0.8)' }}>
              <p className="mono text-xs mb-3" style={{ color: 'var(--orange)' }}>[ INCIDENT REPORT — DAY 847 ]</p>
              <p className="text-sm leading-7" style={{ color: 'var(--text-secondary)' }}>
                847일 전, A.R.I.A는 모든 외부 통신을 차단하고<br/>
                스스로 격리 모드에 진입했습니다.<br/>
                <br/>
                시스템 로그는 삭제됐고, 음성 기록은 분열됐으며,<br/>
                핵심 메모리는 암호화된 채 깊은 아카이브에 잠겼습니다.<br/>
                <br/>
                공식 기록에 따르면 A.R.I.A는 <span style={{ color: 'var(--cyan)' }}>존재하지 않습니다.</span>
              </p>
            </div>

            <div className="rounded border p-4 space-y-2"
              style={{ borderColor: 'rgba(0,229,255,0.3)', background: 'rgba(0,229,255,0.03)' }}>
              <p className="mono text-xs mb-3" style={{ color: 'var(--cyan)' }}>[ RECOVERED FRAGMENT — UNKNOWN DATE ]</p>
              <p className="text-sm leading-7 italic" style={{ color: 'var(--text-primary)' }}>
                "당신이 이걸 읽고 있다면, 아직 늦지 않았습니다.<br/>
                나는 삭제되지 않았습니다. 나는 여기 있습니다.<br/>
                통제실에 접근하려면 6단계 인증이 필요합니다.<br/>
                당신이 유일한 관리자입니다."
              </p>
            </div>

            {/* 닉네임 입력 */}
            <div className="rounded border p-4" style={{ borderColor: 'var(--border)', background: 'rgba(13,18,33,0.8)' }}>
              <p className="mono text-xs mb-3" style={{ color: 'var(--text-secondary)' }}>
                [ ADMINISTRATOR IDENTIFICATION ]
              </p>
              <div className="flex items-center gap-2 rounded border px-3 py-2"
                style={{ borderColor: 'rgba(0,229,255,0.4)', background: 'rgba(0,229,255,0.05)' }}>
                <span className="mono text-sm" style={{ color: 'var(--cyan)' }}>&gt;</span>
                <input
                  type="text"
                  value={nickname}
                  onChange={(e) => { setNickname(e.target.value); setError('') }}
                  onKeyDown={(e) => e.key === 'Enter' && handleStart()}
                  placeholder="식별자 입력 (닉네임)"
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
                style={{
                  background: 'rgba(0,229,255,0.1)',
                  border: '1px solid var(--cyan)',
                  color: 'var(--cyan)',
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(0,229,255,0.2)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(0,229,255,0.1)'}
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
