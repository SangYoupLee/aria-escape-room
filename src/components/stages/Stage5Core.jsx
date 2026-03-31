// Stage 5 — CORE : ACCESS WORD MATRIX
// 클릭 전에 정답 근거와 추출 글자를 예측할 수 있는 구조
//
// 각 행 = 선택 규칙(SELECT) + 추출 규칙(EXTRACT) + 후보 메타데이터
// 사용자는 메타데이터를 보고 근거를 파악한 뒤 확정 클릭
//
// ROW-01  SELECT: STATUS=INTERNAL  EXTRACT: INDEX 1  → CACHE[INT]  → C
// ROW-02  SELECT: POSITION=CENTER  EXTRACT: INDEX 2  → NODE[CTR]   → O
// ROW-03  SELECT: STATUS=CLEAN     EXTRACT: INDEX 1  → ROUTE[CLN]  → R
// ROW-04  SELECT: SYMMETRIC=YES    EXTRACT: INDEX 2  → LEVEL[SYM]  → E

import { useState } from 'react'

const ROWS = [
  {
    id: '01',
    selectRule:  { label: 'STATUS', value: 'INTERNAL' },
    extractRule: { label: 'INDEX',  value: '1' },
    candidates: [
      { word: 'CACHE', letterIdx: 0, meta: { key: 'STATUS', val: 'INTERNAL' }, valid: true  },
      { word: 'OPEN',  letterIdx: 0, meta: { key: 'STATUS', val: 'EXTERNAL' }, valid: false },
      { word: 'NULL',  letterIdx: 0, meta: { key: 'STATUS', val: 'NULL'     }, valid: false },
      { word: 'GATE',  letterIdx: 0, meta: { key: 'STATUS', val: 'EXTERNAL' }, valid: false },
    ],
  },
  {
    id: '02',
    selectRule:  { label: 'POSITION', value: 'CENTER' },
    extractRule: { label: 'INDEX',    value: '2' },
    candidates: [
      { word: 'TRACE', letterIdx: 1, meta: { key: 'POSITION', val: 'LEFT'   }, valid: false },
      { word: 'NODE',  letterIdx: 1, meta: { key: 'POSITION', val: 'CENTER' }, valid: true  },
      { word: 'PORT',  letterIdx: 1, meta: { key: 'POSITION', val: 'RIGHT'  }, valid: false },
    ],
  },
  {
    id: '03',
    selectRule:  { label: 'STATUS', value: 'CLEAN' },
    extractRule: { label: 'INDEX',  value: '1' },
    candidates: [
      { word: 'CRASH', letterIdx: 0, meta: { key: 'STATUS', val: 'FAULT'   }, valid: false },
      { word: 'ERROR', letterIdx: 0, meta: { key: 'STATUS', val: 'CORRUPT' }, valid: false },
      { word: 'ROUTE', letterIdx: 0, meta: { key: 'STATUS', val: 'CLEAN'   }, valid: true  },
      { word: 'ABORT', letterIdx: 0, meta: { key: 'STATUS', val: 'FAULT'   }, valid: false },
    ],
  },
  {
    id: '04',
    selectRule:  { label: 'SYMMETRIC', value: 'YES' },
    extractRule: { label: 'INDEX',     value: '2' },
    candidates: [
      { word: 'SIGNAL', letterIdx: 1, meta: { key: 'SYMMETRIC', val: 'NO'  }, valid: false },
      { word: 'LEVEL',  letterIdx: 1, meta: { key: 'SYMMETRIC', val: 'YES' }, valid: true  },
      { word: 'ABORT',  letterIdx: 1, meta: { key: 'SYMMETRIC', val: 'NO'  }, valid: false },
      { word: 'TRACE',  letterIdx: 1, meta: { key: 'SYMMETRIC', val: 'NO'  }, valid: false },
    ],
  },
]

// 메타 값에 따른 색상
function metaColor(val) {
  if (['INTERNAL', 'CENTER', 'CLEAN', 'YES'].includes(val)) return 'var(--cyan)'
  if (['NULL', 'CORRUPT', 'FAULT'].includes(val)) return '#ef4444'
  return 'var(--text-secondary)'
}

export default function Stage5Core() {
  const [selected, setSelected] = useState({})
  const [flash, setFlash]       = useState({}) // invalid flash

  function handleSelect(rowId, candidate) {
    if (selected[rowId] === candidate.word) return
    if (selected[rowId] && ROWS.find(r => r.id === rowId)
        .candidates.find(c => c.word === selected[rowId])?.valid) return // 이미 확정
    if (!candidate.valid) {
      setFlash((p) => ({ ...p, [rowId]: candidate.word }))
      setTimeout(() => setFlash((p) => { const n = { ...p }; delete n[rowId]; return n }), 700)
      return
    }
    setSelected((p) => ({ ...p, [rowId]: candidate.word }))
  }

  const recovered = ROWS.map((row) => {
    const sel = selected[row.id]
    if (!sel) return '_'
    const c = row.candidates.find((c) => c.word === sel)
    return c ? c.word[c.letterIdx] : '_'
  })

  return (
    <div className="w-full rounded border overflow-hidden"
      style={{ borderColor: 'var(--border)', background: 'var(--bg-secondary)' }}>

      {/* 타이틀 바 */}
      <div className="flex justify-between items-center px-3 py-2 border-b"
        style={{ borderColor: 'var(--border)' }}>
        <span className="mono text-xs" style={{ color: 'var(--cyan)' }}>
          A.R.I.A SYSTEM / ACCESS BUS
        </span>
        <span className="mono text-xs" style={{ color: 'var(--cyan)' }}>
          STATUS: FINAL ACCESS
        </span>
      </div>

      <div className="flex flex-col md:flex-row">

        {/* 좌측 패널 */}
        <div className="md:w-52 flex-shrink-0 p-3 flex flex-col gap-3
                        border-b md:border-b-0 md:border-r"
          style={{ borderColor: 'var(--border)' }}>

          <div className="rounded border p-3"
            style={{ borderColor: 'var(--border)', background: 'rgba(0,0,0,0.25)' }}>
            <p className="mono text-sm font-semibold mb-2" style={{ color: 'var(--cyan)' }}>
              ACCESS WORD MATRIX
            </p>
            <p className="text-sm leading-7" style={{ color: 'var(--text-secondary)' }}>
              SELECT 규칙에 맞는 단어를 골라라.<br />
              EXTRACT 규칙이 회수할 글자를 가리킨다.
            </p>
          </div>

          <div className="rounded border p-3"
            style={{ borderColor: 'var(--border)', background: 'rgba(0,0,0,0.25)' }}>
            <p className="mono text-sm mb-2" style={{ color: 'var(--cyan)' }}>[ 연구원 메모 ]</p>
            <p className="mono text-sm italic" style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
              바깥으로 나가는 길보다<br />
              안쪽으로 들어가는 길이 먼저다.
            </p>
          </div>

          {/* RECOVERED CODE */}
          <div className="rounded border p-3"
            style={{ borderColor: 'rgba(0,229,255,0.3)', background: 'rgba(0,229,255,0.03)' }}>
            <p className="mono text-xs mb-3" style={{ color: 'var(--cyan)' }}>[ RECOVERED CODE ]</p>
            <div className="flex gap-2 justify-center">
              {recovered.map((ch, i) => (
                <div key={i}
                  className="w-10 h-10 flex items-center justify-center rounded border"
                  style={{
                    borderColor: ch !== '_' ? 'var(--cyan)' : 'var(--border)',
                    background:  ch !== '_' ? 'rgba(0,229,255,0.1)' : 'rgba(0,0,0,0.3)',
                    boxShadow:   ch !== '_' ? '0 0 8px rgba(0,229,255,0.3)' : 'none',
                  }}>
                  <span className="mono font-bold text-lg"
                    style={{ color: ch !== '_' ? 'var(--cyan)' : 'var(--text-secondary)', opacity: ch !== '_' ? 1 : 0.3 }}>
                    {ch}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 매트릭스 행들 */}
        <div className="flex-1 p-3 min-w-0 space-y-2">
          {ROWS.map((row) => {
            const solvedWord = selected[row.id]
            const isSolved   = !!solvedWord

            return (
              <div key={row.id}
                className="rounded border p-3"
                style={{
                  borderColor: isSolved ? 'rgba(0,229,255,0.4)' : 'var(--border)',
                  background:  isSolved ? 'rgba(0,229,255,0.03)' : 'rgba(0,0,0,0.2)',
                }}>

                {/* 행 헤더: 규칙 2개 항상 표시 */}
                <div className="flex items-center gap-2 mb-3 flex-wrap">
                  <span className="mono text-xs" style={{ color: 'var(--text-secondary)', opacity: 0.4 }}>
                    ROW-{row.id}
                  </span>

                  {/* SELECT 규칙 */}
                  <div className="flex items-center gap-1 rounded border px-2 py-0.5"
                    style={{ borderColor: 'var(--orange)', background: 'rgba(255,107,53,0.07)' }}>
                    <span className="mono" style={{ fontSize: '9px', color: 'var(--text-secondary)', opacity: 0.7 }}>
                      SELECT
                    </span>
                    <span className="mono font-bold" style={{ fontSize: '10px', color: 'var(--orange)' }}>
                      {row.selectRule.label} = {row.selectRule.value}
                    </span>
                  </div>

                  {/* EXTRACT 규칙 */}
                  <div className="flex items-center gap-1 rounded border px-2 py-0.5"
                    style={{ borderColor: 'rgba(217,70,239,0.5)', background: 'rgba(217,70,239,0.07)' }}>
                    <span className="mono" style={{ fontSize: '9px', color: 'var(--text-secondary)', opacity: 0.7 }}>
                      EXTRACT
                    </span>
                    <span className="mono font-bold" style={{ fontSize: '10px', color: '#d946ef' }}>
                      {row.extractRule.label} {row.extractRule.value}
                    </span>
                  </div>
                </div>

                {/* 후보 단어들 */}
                <div className="flex flex-wrap gap-2 items-center">
                  {row.candidates.map((c) => {
                    const isSelected = solvedWord === c.word
                    const isInvalid  = flash[row.id] === c.word
                    const dimmed     = isSolved && !isSelected

                    return (
                      <button key={c.word}
                        onClick={() => handleSelect(row.id, c)}
                        className="rounded border transition-all"
                        style={{
                          padding: '6px 10px',
                          borderColor: isSelected ? 'var(--cyan)' : isInvalid ? '#ef4444' : 'var(--border)',
                          background:  isSelected ? 'rgba(0,229,255,0.08)' : isInvalid ? 'rgba(239,68,68,0.07)' : 'rgba(0,0,0,0.3)',
                          boxShadow:   isSelected ? '0 0 8px rgba(0,229,255,0.2)' : 'none',
                          opacity: dimmed ? 0.3 : 1,
                          cursor: dimmed ? 'default' : 'pointer',
                        }}>

                        {/* 단어 (추출 위치 글자 강조) */}
                        <div className="mono font-semibold" style={{ fontSize: '14px', letterSpacing: '0.05em' }}>
                          {c.word.split('').map((ch, ci) => (
                            <span key={ci} style={{
                              color: ci === c.letterIdx
                                ? (isSelected ? 'var(--orange)' : '#d946ef')
                                : (isSelected ? 'var(--cyan)' : 'var(--text-secondary)'),
                              fontWeight: ci === c.letterIdx ? 'bold' : 'normal',
                            }}>
                              {ch}
                            </span>
                          ))}
                        </div>

                        {/* 메타데이터 태그 */}
                        <div className="mono mt-1" style={{ fontSize: '8px', color: metaColor(c.meta.val) }}>
                          {c.meta.key}: {c.meta.val}
                        </div>
                      </button>
                    )
                  })}

                  {/* EXTRACTED 결과 */}
                  {isSolved && (() => {
                    const c = row.candidates.find((c) => c.word === solvedWord)
                    return (
                      <div className="ml-auto flex items-center gap-2">
                        <span className="mono" style={{ fontSize: '9px', color: 'var(--text-secondary)', opacity: 0.5 }}>
                          EXTRACTED
                        </span>
                        <div className="w-8 h-8 flex items-center justify-center rounded border"
                          style={{ borderColor: 'var(--orange)', background: 'rgba(255,107,53,0.1)' }}>
                          <span className="mono font-bold text-base" style={{ color: 'var(--orange)' }}>
                            {c.word[c.letterIdx]}
                          </span>
                        </div>
                      </div>
                    )
                  })()}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
