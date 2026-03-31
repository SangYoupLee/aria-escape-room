// Stage 1 — HUMAN : 달력 인증 퍼즐
const DAYS = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']
const AUTO_DAYS = new Set([2, 5, 6, 7, 9, 10, 11, 16, 18, 22, 23, 24, 29, 30])
const MANUAL_DAYS = { 1: 4, 8: 1, 13: 3, 14: 5, 21: 2 }
const INDEX_ROW1 = Array.from({ length: 13 }, (_, i) => i + 1)
const INDEX_ROW2 = Array.from({ length: 13 }, (_, i) => i + 14)

export default function Stage1Human() {
  const startOffset = 3
  const cells = [
    ...Array(startOffset).fill(null),
    ...Array.from({ length: 31 }, (_, i) => i + 1),
  ]
  while (cells.length % 7 !== 0) cells.push(null)
  const weeks = []
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7))

  return (
    <div className="w-full rounded border overflow-hidden"
      style={{ borderColor: 'var(--border)', background: 'var(--bg-secondary)' }}>

      {/* 타이틀 바 */}
      <div className="flex justify-between items-center px-3 py-2 border-b"
        style={{ borderColor: 'var(--border)' }}>
        <span className="mono text-xs" style={{ color: 'var(--cyan)' }}>
          A.R.I.A SYSTEM / CALENDAR RECORD
        </span>
        <span className="mono text-xs" style={{ color: 'var(--orange)' }}>
          AUTH LOCKED
        </span>
      </div>

      <div className="flex flex-col md:flex-row">

        {/* 좌측 패널 — 관리자 메모만 */}
        <div className="md:w-48 flex-shrink-0 p-3 flex flex-col gap-3
                        border-b md:border-b-0 md:border-r"
          style={{ borderColor: 'var(--border)' }}>

          <div className="rounded border p-3"
            style={{ borderColor: 'var(--border)', background: 'rgba(0,0,0,0.25)' }}>
            <p className="mono text-sm mb-2" style={{ color: 'var(--cyan)' }}>[ 관리자 메모 ]</p>
            <p className="text-sm leading-7" style={{ color: 'var(--text-secondary)' }}>
              AI는 반복을 남긴다.<br />
              인간은 의도를 남긴다.
            </p>
            <div className="mt-3 space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full flex-shrink-0"
                  style={{ background: '#3b82f6' }} />
                <span className="mono text-sm" style={{ color: 'var(--text-secondary)' }}>자동 기록</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 flex-shrink-0 rounded-sm"
                  style={{ border: '2px solid #ef4444' }} />
                <span className="mono text-sm" style={{ color: 'var(--text-secondary)' }}>수동 기록</span>
              </div>
            </div>
            <p className="mono text-sm mt-3" style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
              수동 기록만 추려라.<br />
              빨간 숫자를 순서대로 따라가라.
            </p>
          </div>
        </div>

        {/* 달력 + 인덱스 테이블 */}
        <div className="flex-1 p-3 flex flex-col gap-3 min-w-0 overflow-y-auto scrollbar-visible" style={{ maxHeight: '80vh' }}>

          <div>
            <p className="mono text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
              보안 달력 기록 / MAY 2031
            </p>
            <p className="mono text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>
              AUTO = BLUE &nbsp;/&nbsp; MANUAL = RED
            </p>
          </div>

          {/* 달력 */}
          <div className="rounded border overflow-hidden w-full"
            style={{ borderColor: 'var(--border)' }}>

            <div className="grid grid-cols-7 border-b" style={{ borderColor: 'var(--border)' }}>
              {DAYS.map((d) => (
                <div key={d} className="py-2 text-center mono"
                  style={{
                    fontSize: '12px',
                    color: 'var(--text-secondary)',
                    borderRight: '1px solid var(--border)',
                  }}>
                  {d}
                </div>
              ))}
            </div>

            {weeks.map((week, wi) => (
              <div key={wi} className="grid grid-cols-7"
                style={{ borderBottom: wi < weeks.length - 1 ? '1px solid var(--border)' : 'none' }}>
                {week.map((day, di) => {
                  const isAuto = day && AUTO_DAYS.has(day)
                  const order = day ? MANUAL_DAYS[day] : null
                  return (
                    <div key={di}
                      className="relative flex flex-col items-center justify-center select-none"
                      style={{
                        aspectRatio: '1',
                        minHeight: '52px',
                        borderRight: di < 6 ? '1px solid var(--border)' : 'none',
                        background: order ? 'rgba(239,68,68,0.06)' : 'transparent',
                      }}>
                      {day && (
                        <>
                          {/* 날짜 숫자 — 2배 크기 */}
                          <span className="absolute top-1 left-2 mono font-semibold"
                            style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1 }}>
                            {day}
                          </span>
                          {isAuto && (
                            <span className="absolute bottom-1.5 left-1/2 -translate-x-1/2 rounded-full"
                              style={{ width: '6px', height: '6px', background: '#3b82f6' }} />
                          )}
                          {order && (
                            <span className="absolute inset-1 rounded-sm pointer-events-none"
                              style={{ border: '2px solid #ef4444' }} />
                          )}
                          {order && (
                            <span className="mono font-bold"
                              style={{ fontSize: '20px', color: '#ef4444', lineHeight: 1 }}>
                              {order}
                            </span>
                          )}
                        </>
                      )}
                    </div>
                  )
                })}
              </div>
            ))}
          </div>

          {/* AUTH INDEX TABLE — 설명 없이 숫자+A to Z만 */}
          <div className="rounded border p-4"
            style={{ borderColor: 'var(--border)', background: 'rgba(0,0,0,0.25)' }}>
            <p className="mono text-sm mb-3" style={{ color: 'var(--cyan)' }}>[ AUTH INDEX TABLE ]</p>
            <div className="space-y-2">
              {[INDEX_ROW1, INDEX_ROW2].map((row, ri) => (
                <div key={ri} className="flex gap-1">
                  {row.map((n) => (
                    <span key={n} className="mono text-center flex-1 font-semibold"
                      style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                      {String(n).padStart(2, '0')}
                    </span>
                  ))}
                </div>
              ))}
            </div>
            <p className="mono text-base mt-4 text-center font-semibold"
              style={{ color: 'var(--text-primary)', letterSpacing: '0.08em' }}>
              모든 것을 기록하라 &nbsp; A to Z
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
