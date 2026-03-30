// Stage 1 — HUMAN : 달력 인증 퍼즐
// MAY 2031, 월요일 시작. 1일 = 목요일
// 파란 점 = 자동 기록, 빨간 사각형 + 순서번호 = 수동 기록
// 수동 기록 날짜를 순서 번호 순으로 읽어 인덱스 변환 → HUMAN

const DAYS = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']

// 자동 기록 날짜 (파란 점)
const AUTO_DAYS = new Set([2, 5, 6, 7, 9, 10, 11, 16, 18, 22, 23, 24, 29, 30])

// 수동 기록: { 날짜: 순서번호 }
// #1→8일(H=8), #2→21일(U=21), #3→13일(M=13), #4→1일(A=1), #5→14일(N=14) = HUMAN
const MANUAL_DAYS = { 1: 4, 8: 1, 13: 3, 14: 5, 21: 2 }

// A~Z 인덱스 테이블 행 구성
const INDEX_ROW1 = Array.from({ length: 13 }, (_, i) => i + 1)   // 01~13
const INDEX_ROW2 = Array.from({ length: 13 }, (_, i) => i + 14)  // 14~26

export default function Stage1Human() {
  const startOffset = 3 // 1일 = 목요일 (MON 기준 3번째)
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
          HUMAN AUTH LOCKED
        </span>
      </div>

      {/* 모바일: 세로 스택 / 데스크탑: 가로 2단 */}
      <div className="flex flex-col md:flex-row">

        {/* ── 관리자 메모 패널 (모바일: 상단, 데스크탑: 좌측) ── */}
        <div className="md:w-44 flex-shrink-0 p-3 flex flex-col gap-3
                        border-b md:border-b-0 md:border-r"
          style={{ borderColor: 'var(--border)' }}>

          <div className="rounded border p-2"
            style={{ borderColor: 'var(--border)', background: 'rgba(0,0,0,0.25)' }}>
            <p className="mono text-xs mb-2" style={{ color: 'var(--cyan)' }}>[ 관리자 메모 ]</p>
            <p className="text-xs leading-6" style={{ color: 'var(--text-secondary)' }}>
              AI는 반복을 남긴다.<br />
              인간은 의도를 남긴다.
            </p>
            {/* 범례 */}
            <div className="mt-2 space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                  style={{ background: '#3b82f6' }} />
                <span className="mono text-xs" style={{ color: 'var(--text-secondary)' }}>자동 기록</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 flex-shrink-0 rounded-sm"
                  style={{ border: '2px solid #ef4444' }} />
                <span className="mono text-xs" style={{ color: 'var(--text-secondary)' }}>수동 기록</span>
              </div>
            </div>
            <p className="mono text-xs mt-3" style={{ color: 'var(--text-secondary)', lineHeight: '1.7' }}>
              수동 기록만 남겨라.<br />
              번호 순서가 인증 순서다.
            </p>
          </div>

          <div className="rounded border p-2"
            style={{ borderColor: 'var(--border)', background: 'rgba(0,0,0,0.25)' }}>
            <p className="mono text-xs mb-2" style={{ color: 'var(--cyan)' }}>[ 인증 패널 ]</p>
            <p className="mono text-xs leading-6" style={{ color: 'var(--text-secondary)' }}>
              형식 : 영문 대문자 5자리<br />
              입력 제한 : 없음<br />
              응답 : 문자 인덱스 대조
            </p>
          </div>
        </div>

        {/* ── 달력 + 인덱스 테이블 ── */}
        <div className="flex-1 p-3 flex flex-col gap-3 min-w-0">

          {/* 달력 헤더 텍스트 */}
          <div>
            <p className="mono text-xs font-semibold" style={{ color: 'var(--text-primary)' }}>
              보안 달력 기록 / MAY 2031
            </p>
            <p className="mono text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>
              AUTO = BLUE &nbsp;/&nbsp; MANUAL = RED
            </p>
          </div>

          {/* 달력 그리드 */}
          <div className="rounded border overflow-hidden w-full"
            style={{ borderColor: 'var(--border)' }}>

            {/* 요일 헤더 */}
            <div className="grid grid-cols-7 border-b" style={{ borderColor: 'var(--border)' }}>
              {DAYS.map((d) => (
                <div key={d} className="py-1.5 text-center mono"
                  style={{
                    fontSize: '10px',
                    color: 'var(--text-secondary)',
                    borderRight: '1px solid var(--border)',
                  }}>
                  {d}
                </div>
              ))}
            </div>

            {/* 날짜 행 */}
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
                        minHeight: '36px',
                        borderRight: di < 6 ? '1px solid var(--border)' : 'none',
                        background: order ? 'rgba(239,68,68,0.06)' : 'transparent',
                      }}>
                      {day && (
                        <>
                          {/* 날짜 숫자 — 상단 좌측 */}
                          <span className="absolute top-1 left-1.5 mono"
                            style={{ fontSize: '10px', color: 'var(--text-secondary)', lineHeight: 1 }}>
                            {day}
                          </span>

                          {/* 자동 기록 — 파란 점 (하단 중앙) */}
                          {isAuto && (
                            <span className="absolute bottom-1.5 left-1/2 -translate-x-1/2 rounded-full"
                              style={{ width: '5px', height: '5px', background: '#3b82f6' }} />
                          )}

                          {/* 수동 기록 — 빨간 테두리 박스 */}
                          {order && (
                            <span className="absolute inset-1 rounded-sm pointer-events-none"
                              style={{ border: '2px solid #ef4444' }} />
                          )}

                          {/* 순서 번호 — 셀 중앙, 크게 */}
                          {order && (
                            <span className="mono font-bold"
                              style={{ fontSize: '16px', color: '#ef4444', lineHeight: 1 }}>
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

          {/* AUTH INDEX TABLE */}
          <div className="rounded border p-3"
            style={{ borderColor: 'var(--border)', background: 'rgba(0,0,0,0.25)' }}>
            <p className="mono text-xs mb-1" style={{ color: 'var(--cyan)' }}>[ AUTH INDEX TABLE ]</p>
            <p className="mono text-xs mb-2" style={{ color: 'var(--text-secondary)' }}>
              인증 문자는 인덱스 번호와 대응됩니다.
            </p>
            <div className="space-y-1">
              {[INDEX_ROW1, INDEX_ROW2].map((row, ri) => (
                <div key={ri} className="flex gap-1">
                  {row.map((n) => (
                    <span key={n} className="mono text-center flex-1"
                      style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>
                      {String(n).padStart(2, '0')}
                    </span>
                  ))}
                </div>
              ))}
            </div>
            <p className="mono text-xs mt-3 text-center"
              style={{ color: 'var(--text-primary)', letterSpacing: '0.08em' }}>
              모든 것을 기록 하라 &nbsp; A to Z
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
