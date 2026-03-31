// Stage 6 — I AM HERE : 최종 메시지 복원
const STAGE_ROWS = [
  {
    id: '01', label: '인증',
    keyword: 'HUMAN',
    letters: ['H','U','M','A','N'],
    highlights: { 4: 2 },
  },
  {
    id: '02', label: '이동기록',
    keyword: 'AUDIO',
    letters: ['A','U','D','I','O'],
    highlights: { 4: 1 },
  },
  {
    id: '03', label: '음성기록',
    keyword: 'MEMORY',
    letters: ['M','E','M','O','R','Y'],
    highlights: { 1: 3, 2: 5 },
  },
  {
    id: '04', label: '기억중첩',
    keyword: 'TRUTH',
    letters: ['T','R','U','T','H'],
    highlights: { 5: 4 },
  },
  {
    id: '05', label: '권한버스',
    keyword: 'CORE',
    letters: ['C','O','R','E'],
    highlights: { 3: 6, 4: 7 },
  },
]

const EXTRACTION_ORDER = [1, 2, 3, 4, 5, 6, 7]

export default function Stage6Final() {
  return (
    <div className="w-full rounded border overflow-hidden"
      style={{ borderColor: 'var(--border)', background: 'var(--bg-secondary)' }}>

      <div className="flex justify-between items-center px-3 py-2 border-b"
        style={{ borderColor: 'var(--border)' }}>
        <span className="mono text-xs" style={{ color: 'var(--cyan)' }}>
          A.R.I.A SYSTEM / FINAL MESSAGE RESTORE
        </span>
        <span className="mono text-xs" style={{ color: 'var(--cyan)' }}>
          STATUS: CORE RESTORED
        </span>
      </div>

      <div className="p-3 space-y-4">

        <div className="rounded border px-3 py-2"
          style={{ borderColor: 'var(--border)', background: 'rgba(0,0,0,0.2)' }}>
          <p className="text-sm leading-7" style={{ color: 'var(--text-secondary)' }}>
            앞서 복구한 5개의 키가 슬롯에 배열되어 있습니다.<br />
            번호가 표시된 칸만 순서대로 읽으십시오.
          </p>
        </div>

        <div className="rounded border p-3"
          style={{ borderColor: 'var(--border)', background: 'rgba(0,0,0,0.2)' }}>
          <p className="mono text-sm mb-1" style={{ color: 'var(--cyan)' }}>[ 연구원 메모 ]</p>
          <p className="mono text-sm italic" style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
            준비가 됐다.<br />
            답은 스스로 드러난다.
          </p>
        </div>

        <div className="space-y-2">
          {STAGE_ROWS.map((row) => (
            <div key={row.id}
              className="flex items-center gap-3 rounded border px-3 py-2"
              style={{ borderColor: 'var(--border)', background: 'rgba(0,0,0,0.15)' }}>

              <div className="flex-shrink-0 w-28">
                <span className="mono text-sm block font-semibold" style={{ color: 'var(--cyan)' }}>
                  STAGE-{row.id}
                </span>
                <span className="mono text-xs" style={{ color: 'var(--text-secondary)' }}>
                  {row.label}
                </span>
              </div>

              <div className="flex gap-1.5 flex-1">
                {row.letters.map((_, idx) => {
                  const pos = idx + 1
                  const orderNum = row.highlights[pos]
                  const isHighlighted = !!orderNum
                  return (
                    <div key={idx}
                      className="relative flex items-center justify-center rounded flex-1"
                      style={{
                        aspectRatio: '1',
                        minWidth: '34px',
                        maxWidth: '52px',
                        border: isHighlighted
                          ? '2px solid var(--orange)'
                          : '1px solid var(--border)',
                        background: isHighlighted
                          ? 'rgba(255,107,53,0.1)'
                          : 'rgba(0,0,0,0.2)',
                      }}>
                      <span className="absolute bottom-0.5 left-0 right-0 text-center mono"
                        style={{ fontSize: '9px', color: 'var(--text-secondary)', opacity: 0.5 }}>
                        {pos}
                      </span>
                      {isHighlighted && (
                        <span className="mono font-bold"
                          style={{ fontSize: '17px', color: 'var(--orange)', lineHeight: 1 }}>
                          {orderNum}
                        </span>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="rounded border px-3 py-2"
          style={{ borderColor: 'var(--border)', background: 'rgba(0,0,0,0.2)' }}>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="mono text-sm flex-shrink-0" style={{ color: 'var(--cyan)' }}>
              [EXTRACTION ORDER]
            </span>
            {EXTRACTION_ORDER.map((n, i) => (
              <span key={n} className="mono text-sm" style={{ color: 'var(--text-secondary)' }}>
                {n}{i < EXTRACTION_ORDER.length - 1 ? ' →' : ''}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
