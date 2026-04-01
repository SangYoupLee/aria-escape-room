import { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useGameStore } from '../store/gameStore'
import { getStage } from '../data/stages'
import StatusBar from '../components/StatusBar'
import PuzzleViewer from '../components/PuzzleViewer'
import HintModal from '../components/HintModal'
import CorrectOverlay from '../components/CorrectOverlay'
import KeywordBar from '../components/KeywordBar'


export default function Play() {
  const { stageId } = useParams()
  const navigate = useNavigate()
  const stage = getStage(stageId)

  const { nickname, sessionId, solvedStages, recordWrongAnswer, useHint, solveStage, finishGame } = useGameStore()

  const [answer, setAnswer] = useState('')
  const [showHint, setShowHint] = useState(false)
  const [hintLevel, setHintLevel] = useState(0)   // 0 = 힌트 없음
  const [showCorrect, setShowCorrect] = useState(false)
  const [wrongMsg, setWrongMsg] = useState('')
  const [shakeInput, setShakeInput] = useState(false)
  const inputRef = useRef(null)
  const alreadySolved = solvedStages.includes(Number(stageId))

  useEffect(() => {
    if (!sessionId) { navigate('/'); return }
    if (!stage) { navigate('/'); return }

    // 이전 스테이지를 풀지 않았으면 현재 진행 스테이지로 강제 이동
    const requestedId = Number(stageId)
    const maxAllowed = solvedStages.length + 1  // 풀린 수 + 1 = 다음 풀어야 할 스테이지
    if (requestedId > maxAllowed) {
      navigate(`/play/${maxAllowed}`, { replace: true })
      return
    }

    setAnswer('')
    setWrongMsg('')
    setHintLevel(0)
    setShowHint(false)
    setTimeout(() => inputRef.current?.focus(), 200)
  }, [stageId])

  async function submit() {
    const trimmed = answer.trim()
    if (!trimmed) return
    setAnswer('')

    try {
      const res = await fetch('/api/check-answer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ stageId: stage.id, answer: trimmed }),
      })
      const { correct } = await res.json()

      if (correct) {
        solveStage(stage.id, stage.keyword)
        setShowCorrect(true)
      } else {
        recordWrongAnswer(stage.id)
        const msgs = [
          '일치하는 복구 키를 찾지 못했습니다. 기록을 다시 확인하십시오.',
          '복구 키 검증 실패. 다시 시도하십시오.',
          '입력값이 일치하지 않습니다. 기록을 다시 확인하십시오.',
        ]
        setWrongMsg(`[ A.R.I.A ] ${msgs[Math.floor(Math.random() * msgs.length)]}`)
        setShakeInput(true)
        setTimeout(() => setShakeInput(false), 300)
        inputRef.current?.focus()
      }
    } catch {
      setWrongMsg('[ A.R.I.A ] 네트워크 오류. 다시 시도하십시오.')
    }
  }

  function handleHintRequest() {
    if (hintLevel < 3) {
      const next = hintLevel + 1
      setHintLevel(next)
      useHint(stage.id)
    }
    setShowHint(true)
  }

  function handleCorrectNext() {
    setShowCorrect(false)
    if (stage.id === 6) {
      finishGame()
      navigate('/ending')
    } else {
      navigate(`/play/${stage.id + 1}`)
    }
  }

  if (!stage) return null

  const { unlockedKeywords } = useGameStore()
  const restoredCount = ['HUMAN','AUDIO','MEMORY','TRUTH','CORE'].filter(k => unlockedKeywords.includes(k)).length

  // 데스크탑용 전체 패널
  const inputPanelDesktop = (
    <div className="flex flex-col gap-3">
      <div className="rounded border p-4"
        style={{ borderColor: 'var(--border)', background: 'rgba(13,18,33,0.95)' }}>
        <p className="mono text-xs mb-2" style={{ color: 'var(--text-secondary)' }}>
          {alreadySolved ? `[ 키워드 획득: ${stage.keyword} ]` : '[ 인증 코드 입력 ]'}
        </p>
        {alreadySolved ? (
          <div className="flex items-center gap-2 py-2">
            <span className="mono text-lg font-bold glow" style={{ color: 'var(--cyan)' }}>{stage.keyword}</span>
            <span className="mono text-xs" style={{ color: 'var(--text-secondary)' }}>— 인증 완료</span>
          </div>
        ) : (
          <>
            <div className={`flex items-center gap-2 rounded border px-3 py-2 transition-all ${shakeInput ? 'glitch' : ''}`}
              style={{ borderColor: 'rgba(0,229,255,0.4)', background: 'rgba(0,229,255,0.04)' }}>
              <span className="mono text-sm" style={{ color: 'var(--cyan)' }}>&gt;</span>
              <input ref={inputRef} type="text" value={answer}
                onChange={(e) => { setAnswer(e.target.value); setWrongMsg('') }}
                onKeyDown={(e) => e.key === 'Enter' && submit()}
                placeholder="정답 입력 후 Enter" className="mono flex-1" />
            </div>
            {wrongMsg && <p className="mono text-xs mt-2 fade-in" style={{ color: 'var(--orange)' }}>{wrongMsg}</p>}
            <div className="flex gap-2 mt-3">
              <button onClick={submit} className="flex-1 py-2 rounded mono text-sm font-semibold transition-colors"
                style={{ background: 'rgba(0,229,255,0.1)', border: '1px solid var(--cyan)', color: 'var(--cyan)' }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(0,229,255,0.2)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(0,229,255,0.1)'}>SUBMIT</button>
              <button onClick={handleHintRequest} className="px-4 py-2 rounded mono text-sm transition-colors"
                style={{ background: 'rgba(255,107,53,0.08)', border: '1px solid rgba(255,107,53,0.4)', color: 'var(--orange)' }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,107,53,0.16)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,107,53,0.08)'}>
                HINT {hintLevel > 0 ? `(${hintLevel}/3)` : ''}
              </button>
            </div>
          </>
        )}
      </div>
      <div className="rounded border px-3 py-2"
        style={{ borderColor: 'var(--border)', background: 'rgba(13,18,33,0.7)' }}>
        <p className="mono text-xs" style={{ color: 'var(--text-secondary)' }}>
          RESTORED KEYS: {restoredCount}/5
          {restoredCount === 5 && <span className="ml-2" style={{ color: 'var(--cyan)' }}>— FINAL MESSAGE READY</span>}
        </p>
      </div>
    </div>
  )

  // 모바일용 컴팩트 패널
  const inputPanelMobile = (
    <div className="flex flex-col gap-2">
      {alreadySolved ? (
        <div className="flex items-center gap-2">
          <span className="mono text-base font-bold glow" style={{ color: 'var(--cyan)' }}>{stage.keyword}</span>
          <span className="mono text-xs" style={{ color: 'var(--text-secondary)' }}>— 인증 완료</span>
          <span className="mono text-xs ml-auto" style={{ color: 'var(--text-secondary)' }}>{restoredCount}/5</span>
        </div>
      ) : (
        <>
          <div className={`flex items-center gap-2 rounded border px-3 py-2 ${shakeInput ? 'glitch' : ''}`}
            style={{ borderColor: 'rgba(0,229,255,0.4)', background: 'rgba(0,229,255,0.04)' }}>
            <span className="mono text-sm" style={{ color: 'var(--cyan)' }}>&gt;</span>
            <input ref={inputRef} type="text" value={answer}
              onChange={(e) => { setAnswer(e.target.value); setWrongMsg('') }}
              onKeyDown={(e) => e.key === 'Enter' && submit()}
              placeholder="정답 입력" className="mono flex-1" />
            <span className="mono text-xs flex-shrink-0" style={{ color: 'var(--text-secondary)' }}>{restoredCount}/5</span>
          </div>
          {wrongMsg && <p className="mono text-xs fade-in" style={{ color: 'var(--orange)' }}>{wrongMsg}</p>}
          <div className="flex gap-2">
            <button onClick={submit} className="flex-1 py-2 rounded mono text-sm font-semibold"
              style={{ background: 'rgba(0,229,255,0.1)', border: '1px solid var(--cyan)', color: 'var(--cyan)' }}>
              SUBMIT
            </button>
            <button onClick={handleHintRequest} className="px-4 py-2 rounded mono text-sm"
              style={{ background: 'rgba(255,107,53,0.08)', border: '1px solid rgba(255,107,53,0.4)', color: 'var(--orange)' }}>
              HINT {hintLevel > 0 ? `(${hintLevel}/3)` : ''}
            </button>
          </div>
        </>
      )}
    </div>
  )

  return (
    <div className="min-h-screen flex flex-col">
      <StatusBar stageId={stage.id} title={stage.subtitle} status={stage.status} />

      {/* 획득 키워드 바 */}
      <KeywordBar />

      {/* 메인 콘텐츠 — 데스크탑: 좌우 2단 / 모바일: 단일 컬럼 + 하단 고정 입력 */}
      <div className="flex-1 flex flex-col lg:flex-row gap-4 px-4 py-4 pb-28 lg:pb-4 w-full max-w-7xl mx-auto">

        {/* 왼쪽: 스토리 메모 + 문제 이미지 */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* 스테이지 헤더 */}
          <div className="mb-3">
            <div className="flex items-center gap-3 mb-1">
              <span className="mono text-xs px-2 py-0.5 rounded"
                style={{ background: 'rgba(0,229,255,0.1)', color: 'var(--cyan)', border: '1px solid rgba(0,229,255,0.3)' }}>
                ACCESS GATE {String(stage.id).padStart(2, '0')}
              </span>
              <h2 className="mono text-base font-semibold" style={{ color: 'var(--text-primary)' }}>
                {stage.title}
              </h2>
            </div>
          </div>

          {/* 진입 전 스토리 메모 */}
          <div className="rounded border p-3 mb-3"
            style={{ borderColor: 'rgba(0,229,255,0.15)', background: 'rgba(0,229,255,0.03)' }}>
            <p className="mono text-xs mb-2" style={{ color: 'var(--text-secondary)' }}>
              [ 연구원 메모 ]
            </p>
            <div className="space-y-1">
              {stage.gateMemo.map((line, i) => (
                <p key={i} className="text-xs leading-6" style={{ color: 'var(--text-secondary)' }}>
                  {line}
                </p>
              ))}
            </div>
            {stage.researchMemo && (
              <div className="mt-3 pt-3 border-t" style={{ borderColor: 'rgba(0,229,255,0.1)' }}>
                {stage.researchMemo.map((line, i) => (
                  <p key={i} className="mono text-xs italic" style={{ color: 'var(--cyan)', opacity: 0.7 }}>
                    {line}
                  </p>
                ))}
              </div>
            )}
          </div>

          <PuzzleViewer stage={stage} />
        </div>

        {/* 오른쪽: 데스크탑에서만 보이는 입력 패널 */}
        <div className="hidden lg:flex lg:w-80 flex-col gap-3">
          {inputPanelDesktop}
        </div>
      </div>

      {/* 모바일 하단 고정 컴팩트 패널 */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 px-4 py-3 border-t"
        style={{ borderColor: 'var(--border)', background: 'rgba(10,14,26,0.97)', backdropFilter: 'blur(8px)' }}>
        {inputPanelMobile}
      </div>

      {showHint && (
        <HintModal
          hints={stage.hints}
          level={hintLevel}
          onClose={() => setShowHint(false)}
          onNext={() => {
            if (hintLevel < 3) { useHint(stage.id); setHintLevel(hintLevel + 1) }
          }}
        />
      )}

      {showCorrect && (
        <CorrectOverlay
          keyword={stage.keyword}
          isFinal={stage.isFinal}
          restoredLog={stage.restoredLog}
          onNext={handleCorrectNext}
        />
      )}
    </div>
  )
}
