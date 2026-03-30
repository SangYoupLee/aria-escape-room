// Stage 1 — HUMAN : 달력 인증 퍼즐
// MAY 2031, 월요일 시작. 1일 = 목요일
// 파란 점 = 자동 기록, 빨간 사각형 + 순서번호 = 수동 기록
// 수동 기록 날짜를 순서 번호 순으로 읽어 인덱스 변환 → HUMAN

const DAYS = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']

// 자동 기록 날짜 (파란 점)
const AUTO_DAYS = new Set([2, 5, 6, 7, 9, 10, 11, 16, 18, 22, 23, 24, 29, 30])

// 수동 기록: { 날짜: 순서번호 }
// 순서대로: #1→8일(H), #2→21일(U), #3→13일(M), #4→1일(A), #5→14일(N) = HUMAN
const MANUAL_DAYS = { 1: 4, 8: 1, 13: 3, 14: 5, 21: 2 }

// A~Z 인덱스 테이블 (1=A, 2=B, ..., 26=Z)
const INDEX_TABLE = Array.from({ length: 26 }, (_, i) => i + 1)

export default function Stage1Human() {
  // MAY 2031: 1일이 목요일 → MON 기준으로 offset = 3 (0=MON)
  const startOffset = 3
  const totalDays = 31
  // 달력 셀 배열: null = 빈칸, number = 날짜
  const cells = [
    ...Array(startOffset).fill(null),
    ...Array.from({ length: totalDays }, (_, i) => i + 1),
  ]
  // 6주 채우기
  while (cells.length % 7 !== 0) cells.push(null)

  const weeks = []
  for (let i = 0; i < cells.length; i += 7) {
    weeks.push(cells.slice(i, i + 7))
  }

  return (
    <div className="w-full h-full rounded border overflow-hidden"
      style={{ borderColor: 'var(--border)', background: 'var(--bg-secondary)', fontFamily: 'inherit' }}>

      {/* 상단 타이틀 바 */}
      <div className="flex justify-between items-center px-4 py-2 border-b"
        style={{ borderColor: 'var(--border)' }}>
        <span className="mono text-xs" style={{ color: 'var(--cyan)' }}>
          A.R.I.A SYSTEM / CALENDAR RECORD
        </span>
        <span className="mono text-xs" style={{ color: 'var(--orange)' }}>
          HUMAN AUTH LOCKED
        </span>
      </div>

      <div className="flex flex-col lg:flex-row h-full">
        {/* 왼쪽: 관리자 메모 패널 */}
        <div className="lg:w-48 flex-shrink-0 p-3 border-b lg:border-b-0 lg:border-r space-y-4"
          style={{ borderColor: 'var(--border)' }}>

          <div className="rounded border p-2 space-y-1"
            style={{ borderColor: 'var(--border)', background: 'rgba(0,0,0,0.2)' }}>
            <p className="mono text-xs mb-2" style={{ color: 'var(--cyan)' }}>[ 관리자 메모 ]</p>
            <p className="text-xs leading-5" style={{ color: 'var(--text-secondary)' }}>
              AI는 반복을 남긴다.<br />
              인간은 의도를 남긴다.
            </p>
            <div className="pt-2 space-y-1">
              <div className="flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full flex-shrink-0"
                  style={{ background: '#3b82f6' }} />
                <span className="mono text-xs" style={{ color: 'var(--text-secondary)' }}>
                  = 자동 기록
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-block w-2 h-2 flex-shrink-0 rounded-sm"
                  style={{ border: '1.5px solid #ef4444' }} />
                <span className="mono text-xs" style={{ color: 'var(--text-secondary)' }}>
                  = 수동 기록
                </span>
              </div>
            </div>
            <p className="mono text-xs pt-2" style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
              수동 기록만 남겨라.<br />
              번호 순서가 인증 순서다.
            </p>
          </div>

          <div className="rounded border p-2"
            style={{ borderColor: 'var(--border)', background: 'rgba(0,0,0,0.2)' }}>
            <p className="mono text-xs mb-2" style={{ color: 'var(--cyan)' }}>[ 인증 패널 ]</p>
            <p className="mono text-xs leading-5" style={{ color: 'var(--text-secondary)' }}>
              형식 : 영문 대문자 5자리<br />
              입력 제한 : 없음<br />
              용답 : 문자 인덱스 대조
            </p>
          </div>
        </div>

        {/* 오른쪽: 달력 + 인덱스 테이블 */}
        <div className="flex-1 p-3 flex flex-col gap-3">
          {/* 달력 헤더 */}
          <div>
            <p className="mono text-xs mb-1" style={{ color: 'var(--text-primary)' }}>
              보안 달력 기록 / MAY 2031
            </p>
            <p className="mono text-xs" style={{ color: 'var(--text-secondary)' }}>
              AUTO = BLUE&nbsp;&nbsp;/&nbsp;&nbsp;MANUAL = RED
            </p>
          </div>

          {/* 달력 그리드 */}
          <div className="rounded border overflow-hidden"
            style={{ borderColor: 'var(--border)' }}>
            {/* 요일 헤더 */}
            <div className="grid grid-cols-7 border-b" style={{ borderColor: 'var(--border)' }}>
              {DAYS.map((d) => (
                <div key={d} className="py-1 text-center mono text-xs"
                  style={{ color: 'var(--text-secondary)', borderRight: '1px solid var(--border)' }}>
                  {d}
                </div>
              ))}
            </div>

            {/* 주별 행 */}
            {weeks.map((week, wi) => (
              <div key={wi} className="grid grid-cols-7"
                style={{ borderBottom: wi < weeks.length - 1 ? '1px solid var(--border)' : 'none' }}>
                {week.map((day, di) => {
                  const isAuto = day && AUTO_DAYS.has(day)
                  const manualOrder = day && MANUAL_DAYS[day]
                  return (
                    <div key={di}
                      className="relative flex items-center justify-center"
                      style={{
                        minHeight: '44px',
                        borderRight: di < 6 ? '1px solid var(--border)' : 'none',
                        background: manualOrder ? 'rgba(239,68,68,0.04)' : 'transparent',
                      }}>
                      {day && (
                        <>
                          {/* 날짜 숫자 */}
                          <span className="mono text-xs select-none"
                            style={{ color: day ? 'var(--text-secondary)' : 'transparent', opacity: 0.7 }}>
                            {day}
                          </span>

                          {/* 자동 기록 — 파란 점 */}
                          {isAuto && (
                            <span className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full"
                              style={{ background: '#3b82f6' }} />
                          )}

                          {/* 수동 기록 — 빨간 사각형 + 순서번호 */}
                          {manualOrder && (
                            <>
                              <span className="absolute inset-1 rounded-sm pointer-events-none"
                                style={{ border: '1.5px solid #ef4444' }} />
                              <span className="absolute bottom-1 right-1.5 mono leading-none"
                                style={{ fontSize: '9px', color: '#ef4444', fontWeight: 700 }}>
                                {manualOrder}
                              </span>
                            </>
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
            style={{ borderColor: 'var(--border)', background: 'rgba(0,0,0,0.2)' }}>
            <p className="mono text-xs mb-2" style={{ color: 'var(--cyan)' }}>
              [ AUTH INDEX TABLE ]
            </p>
            <p className="mono text-xs mb-2" style={{ color: 'var(--text-secondary)' }}>
              인증 문자는 인덱스 번호와 대응됩니다.
            </p>
            <div className="space-y-1">
              {[INDEX_TABLE.slice(0, 13), INDEX_TABLE.slice(13)].map((row, ri) => (
                <div key={ri} className="flex gap-1 flex-wrap">
                  {row.map((n) => (
                    <span key={n} className="mono text-xs w-5 text-center"
                      style={{ color: 'var(--text-secondary)' }}>
                      {String(n).padStart(2, '0')}
                    </span>
                  ))}
                </div>
              ))}
            </div>
            <p className="mono text-xs mt-3 text-center"
              style={{ color: 'var(--text-primary)', letterSpacing: '0.05em' }}>
              모든 것을 기록 하라&nbsp;&nbsp;A to Z
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
