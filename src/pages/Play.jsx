import { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useGameStore } from '../store/gameStore'
import { getStage } from '../data/stages'
import StatusBar from '../components/StatusBar'
import PuzzleViewer from '../components/PuzzleViewer'
import HintModal from '../components/HintModal'
import CorrectOverlay from '../components/CorrectOverlay'
import KeywordBar from '../components/KeywordBar'

function normalizeAnswer(raw) {
  return raw.trim().toLowerCase().replace(/\s+/g, ' ')
}

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
    setAnswer('')
    setWrongMsg('')
    setHintLevel(0)
    setShowHint(false)
    setTimeout(() => inputRef.current?.focus(), 200)
  }, [stageId])

  function submit() {
    const normalized = normalizeAnswer(answer)
    const isCorrect = stage.answers.map(a => normalizeAnswer(a)).includes(normalized)

    if (isCorrect) {
      solveStage(stage.id, stage.keyword)
      setShowCorrect(true)
    } else {
      recordWrongAnswer(stage.id)
      setWrongMsg(`[ ERROR ${Math.floor(Math.random() * 900) + 100} ] 인증 실패 — 다시 시도하십시오.`)
      setShakeInput(true)
      setTimeout(() => setShakeInput(false), 300)
      inputRef.current?.focus()
    }
    setAnswer('')
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

  return (
    <div className="min-h-screen flex flex-col">
      <StatusBar stageId={stage.id} title={stage.subtitle} status={stage.status} />

      {/* 획득 키워드 바 */}
      <KeywordBar />

      {/* 메인 콘텐츠 — 데스크탑: 좌(이미지) + 우(입력) 2단, 모바일: 단일 컬럼 */}
      <div className="flex-1 flex flex-col lg:flex-row gap-4 px-4 py-4 w-full max-w-7xl mx-auto">

        {/* 왼쪽: 문제 이미지 */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* 스테이지 헤더 */}
          <div className="mb-3">
            <div className="flex items-center gap-3 mb-1">
              <span className="mono text-xs px-2 py-0.5 rounded"
                style={{ background: 'rgba(0,229,255,0.1)', color: 'var(--cyan)', border: '1px solid rgba(0,229,255,0.3)' }}>
                STAGE {String(stage.id).padStart(2, '0')}
              </span>
              <h2 className="mono text-base font-semibold" style={{ color: 'var(--text-primary)' }}>
                {stage.title}
              </h2>
            </div>
            <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>{stage.description}</p>
          </div>
          <PuzzleViewer stage={stage} />
        </div>

        {/* 오른쪽: 입력 패널 (데스크탑에서 고정 너비) */}
        <div className="lg:w-80 flex flex-col gap-3">
          {/* 입력 영역 */}
          <div className="rounded border p-4"
            style={{ borderColor: 'var(--border)', background: 'rgba(13,18,33,0.9)' }}>
            <p className="mono text-xs mb-2" style={{ color: 'var(--text-secondary)' }}>
              {alreadySolved ? `[ 키워드 획득: ${stage.keyword} ]` : '[ 인증 코드 입력 ]'}
            </p>

            {alreadySolved ? (
              <div className="flex items-center gap-2 py-2">
                <span className="mono text-lg font-bold glow" style={{ color: 'var(--cyan)' }}>
                  {stage.keyword}
                </span>
                <span className="mono text-xs" style={{ color: 'var(--text-secondary)' }}>— 인증 완료</span>
              </div>
            ) : (
              <>
                <div className={`flex items-center gap-2 rounded border px-3 py-2 transition-all ${shakeInput ? 'glitch' : ''}`}
                  style={{ borderColor: 'rgba(0,229,255,0.4)', background: 'rgba(0,229,255,0.04)' }}>
                  <span className="mono text-sm" style={{ color: 'var(--cyan)' }}>&gt;</span>
                  <input
                    ref={inputRef}
                    type="text"
                    value={answer}
                    onChange={(e) => { setAnswer(e.target.value); setWrongMsg('') }}
                    onKeyDown={(e) => e.key === 'Enter' && submit()}
                    placeholder="정답 입력 후 Enter"
                    className="mono text-sm flex-1"
                  />
                </div>

                {wrongMsg && (
                  <p className="mono text-xs mt-2 fade-in" style={{ color: 'var(--orange)' }}>
                    {wrongMsg}
                  </p>
                )}

                <div className="flex gap-2 mt-3">
                  <button
                    onClick={submit}
                    className="flex-1 py-2 rounded mono text-sm font-semibold transition-colors"
                    style={{ background: 'rgba(0,229,255,0.1)', border: '1px solid var(--cyan)', color: 'var(--cyan)' }}
                    onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(0,229,255,0.2)'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(0,229,255,0.1)'}
                  >
                    SUBMIT
                  </button>
                  <button
                    onClick={handleHintRequest}
                    className="px-4 py-2 rounded mono text-sm transition-colors"
                    style={{
                      background: 'rgba(255,107,53,0.08)',
                      border: '1px solid rgba(255,107,53,0.4)',
                      color: 'var(--orange)',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,107,53,0.16)'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,107,53,0.08)'}
                  >
                    HINT {hintLevel > 0 ? `(${hintLevel}/3)` : ''}
                  </button>
                </div>
              </>
            )}
          </div>

          {/* 획득 키워드 목록 (사이드) */}
          <div className="rounded border p-3"
            style={{ borderColor: 'var(--border)', background: 'rgba(13,18,33,0.7)' }}>
            <p className="mono text-xs mb-2" style={{ color: 'var(--text-secondary)' }}>[ 획득 키워드 ]</p>
            <div className="space-y-1">
              {['HUMAN','AUDIO','MEMORY','TRUTH','CORE','I AM HERE'].map((kw, i) => {
                const unlocked = useGameStore.getState().unlockedKeywords.includes(kw)
                return (
                  <div key={kw} className="flex items-center gap-2">
                    <span className="mono text-xs w-4" style={{ color: 'var(--text-secondary)' }}>{i+1}</span>
                    <span className="mono text-xs" style={{ color: unlocked ? 'var(--cyan)' : 'var(--border)' }}>
                      {unlocked ? kw : '■ ■ ■ ■ ■'}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
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
        <CorrectOverlay keyword={stage.keyword} isFinal={stage.isFinal} onNext={handleCorrectNext} />
      )}
    </div>
  )
}
