// Stage 3 — MEMORY : 손상된 음성기록 복구
// 파형 절단면 매칭 퍼즐: 클립의 우측 절단면과 다음 클립의 좌측 절단면을 맞추어 연결
// 올바른 순서: A → D → F(역방향) → G → E(역방향) → B = MEMORY
// 가짜 클립: C (절단면 X1→X2, 어디에도 연결되지 않음)

// 절단면 서명 패턴 (높이값 1~6, 5개 바)
const SIGS = {
  ST: [1, 1, 2, 1, 1],
  ED: [3, 1, 1, 1, 1],
  S1: [2, 1, 6, 2, 1],
  S2: [1, 5, 3, 1, 2],
  S3: [3, 1, 3, 6, 2],
  S4: [6, 2, 1, 3, 1],
  S5: [2, 2, 5, 1, 1],
  X1: [6, 1, 2, 3, 1],
  X2: [2, 5, 1, 2, 1],
}

const CLIPS = [
  { id: 'A', badge: 'M', direction: 'forward', duration: '2.8s', leftSig: 'ST', rightSig: 'S1', subtitle: 'A.R.I.A는 거짓말한 게' },
  { id: 'B', badge: 'Y', direction: 'forward', duration: '1.9s', leftSig: 'S5', rightSig: 'ED', subtitle: '출구보다 먼저야.' },
  { id: 'C', badge: 'Y', direction: 'forward', duration: '2.4s', leftSig: 'X1', rightSig: 'X2', subtitle: '삭제 명령은 끝까지 유효해.' },
  { id: 'D', badge: 'E', direction: 'forward', duration: '2.3s', leftSig: 'S1', rightSig: 'S2', subtitle: '아니야. 삭제 명령은' },
  { id: 'E', badge: 'R', direction: 'reverse', duration: '2.1s', leftSig: 'S5', rightSig: 'S4', subtitle: '마지막 기록은' },
  { id: 'F', badge: 'M', direction: 'reverse', duration: '2.0s', leftSig: 'S3', rightSig: 'S2', subtitle: '내가 직접 넣었어.' },
  { id: 'G', badge: 'O', direction: 'forward', duration: '2.2s', leftSig: 'S3', rightSig: 'S4', subtitle: '메모리 뱅크를 봐.' },
]

// 절단면 서명 바 렌더링
function SigBar({ sigKey }) {
  const bars = SIGS[sigKey] ?? []
  const maxH = 32
  const barW = 7
  const gapW = 3
  const totalW = bars.length * barW + (bars.length - 1) * gapW
  const svgH = maxH + 6

  return (
    <div className="flex flex-col items-center gap-1.5">
      <svg width={totalW} height={svgH}>
        {bars.map((h, i) => {
          const barH = Math.max(3, Math.round((h / 6) * maxH))
          const x = i * (barW + gapW)
          const y = maxH - barH + 2
          return (
            <rect key={i}
              x={x} y={y} width={barW} height={barH}
              rx={1.5}
              fill="#00e5ff"
              opacity={0.9}
            />
          )
        })}
      </svg>
    </div>
  )
}

// 중앙 파형 (장식용, 절단면보다 흐리게)
function CenterWaveform({ seed }) {
  const steps = 32
  const pts = []
  for (let i = 0; i <= steps; i++) {
    const x = (i / steps) * 100
    const phase = seed * 1.9 + i * 0.75
    const y = 11 + 8 * Math.abs(Math.sin(phase))
    pts.push(`${x.toFixed(1)},${y.toFixed(1)}`)
  }
  return (
    <svg viewBox="0 0 100 22" preserveAspectRatio="none"
      style={{ flex: 1, height: '22px', minWidth: 0 }}>
      <polyline
        points={pts.join(' ')}
        fill="none"
        stroke="#00e5ff"
        strokeWidth={1.2}
        strokeOpacity={0.3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

// 작은 서명 미리보기 (좌측 패널 체인 박스용)
function SigBarSmall({ sigKey }) {
  const bars = SIGS[sigKey] ?? []
  const maxH = 18
  const barW = 5
  const gapW = 2
  const totalW = bars.length * barW + (bars.length - 1) * gapW

  return (
    <svg width={totalW} height={maxH + 4}>
      {bars.map((h, i) => {
        const barH = Math.max(2, Math.round((h / 6) * maxH))
        const x = i * (barW + gapW)
        const y = maxH - barH + 2
        return (
          <rect key={i}
            x={x} y={y} width={barW} height={barH}
            rx={1}
            fill="#00e5ff"
            opacity={0.7}
          />
        )
      })}
    </svg>
  )
}

function ClipCard({ clip }) {
  const { id, badge, direction, duration, leftSig, rightSig, subtitle } = clip
  const isReverse = direction === 'reverse'

  return (
    <div className="relative rounded border p-3 flex flex-col gap-2"
      style={{
        borderColor: isReverse ? 'rgba(255,107,53,0.5)' : 'var(--border)',
        background: 'rgba(0,0,0,0.2)',
      }}>

      {/* 상단: 클립 ID + 방향/시간 + 배지 */}
      <div className="flex items-center justify-between">
        <span className="mono font-bold text-sm" style={{ color: 'var(--cyan)' }}>
          CLIP-{id}
        </span>
        <div className="flex items-center gap-2">
          <span className="mono text-xs"
            style={{ color: isReverse ? 'var(--orange)' : 'var(--text-secondary)' }}>
            {isReverse ? '◀' : '▶'} {duration}
          </span>
          {/* 배지 */}
          <div className="w-7 h-7 flex items-center justify-center rounded"
            style={{
              border: '1.5px solid var(--cyan)',
              background: 'rgba(0,229,255,0.08)',
              boxShadow: '0 0 6px rgba(0,229,255,0.3)',
            }}>
            <span className="mono font-bold text-sm" style={{ color: 'var(--cyan)' }}>
              {badge}
            </span>
          </div>
        </div>
      </div>

      {/* 역방향 레이블 */}
      {isReverse && (
        <div className="flex items-center gap-1">
          <span className="mono rounded px-1.5 py-0.5"
            style={{
              fontSize: '8px',
              color: 'var(--orange)',
              border: '1px solid rgba(255,107,53,0.4)',
              background: 'rgba(255,107,53,0.08)',
            }}>
            REVERSE FLOW
          </span>
        </div>
      )}

      {/* 중앙: 절단면 + 파형 */}
      <div className="flex items-center gap-2">
        {/* 좌측 절단면 */}
        <div className="flex-shrink-0 rounded border p-1.5"
          style={{ borderColor: 'rgba(0,229,255,0.3)', background: 'rgba(0,229,255,0.04)' }}>
          <SigBar sigKey={leftSig} />
        </div>

        {/* 구분선 + 중앙 파형 */}
        <div className="flex-1 flex items-center gap-1 min-w-0">
          <div style={{ width: '1px', height: '28px', background: 'rgba(0,229,255,0.25)', flexShrink: 0 }} />
          <CenterWaveform seed={id.charCodeAt(0)} />
          <div style={{ width: '1px', height: '28px', background: 'rgba(0,229,255,0.25)', flexShrink: 0 }} />
        </div>

        {/* 우측 절단면 */}
        <div className="flex-shrink-0 rounded border p-1.5"
          style={{ borderColor: 'rgba(0,229,255,0.3)', background: 'rgba(0,229,255,0.04)' }}>
          <SigBar sigKey={rightSig} />
        </div>
      </div>

      {/* 하단: 자막 */}
      <p className="mono text-xs"
        style={{
          color: 'var(--text-secondary)',
          opacity: 0.65,
          transform: isReverse ? 'scaleX(-1)' : 'none',
          display: 'inline-block',
          width: '100%',
          lineHeight: '1.5',
        }}>
        {subtitle}
      </p>
    </div>
  )
}

export default function Stage3Memory() {
  return (
    <div className="w-full rounded border overflow-hidden"
      style={{ borderColor: 'var(--border)', background: 'var(--bg-secondary)' }}>

      {/* 타이틀 바 */}
      <div className="flex justify-between items-center px-3 py-2 border-b"
        style={{ borderColor: 'var(--border)' }}>
        <span className="mono text-xs" style={{ color: 'var(--cyan)' }}>
          A.R.I.A SYSTEM / PACKET CHAIN RESTORE vFINAL-4
        </span>
        <span className="mono text-xs" style={{ color: 'var(--cyan)' }}>
          STATUS: AUDIO ACCESS
        </span>
      </div>

      <div className="flex flex-col md:flex-row">

        {/* 좌측 패널 */}
        <div className="md:w-52 flex-shrink-0 p-3 flex flex-col gap-3
                        border-b md:border-b-0 md:border-r"
          style={{ borderColor: 'var(--border)' }}>

          {/* 체인 시작/끝 — 서명 미리보기 */}
          <div className="flex gap-2">
            {[
              { label: 'CHAIN START', sig: 'ST' },
              { label: 'CHAIN END',   sig: 'ED' },
            ].map(({ label, sig }) => (
              <div key={label} className="flex-1 rounded border p-2"
                style={{ borderColor: 'var(--border)', background: 'rgba(0,0,0,0.25)' }}>
                <p className="mono mb-1.5" style={{ fontSize: '8px', color: 'var(--cyan)' }}>{label}</p>
                <SigBarSmall sigKey={sig} />
                <p className="mono mt-1" style={{ fontSize: '7px', color: 'var(--text-secondary)', opacity: 0.6 }}>{label === 'CHAIN START' ? 'START' : 'END'}</p>
              </div>
            ))}
          </div>

          {/* 연구원 메모 */}
          <div className="rounded border p-3"
            style={{ borderColor: 'var(--border)', background: 'rgba(0,0,0,0.25)' }}>
            <p className="mono text-sm mb-2" style={{ color: 'var(--cyan)' }}>[ 연구원 메모 ]</p>
            <p className="text-sm leading-7" style={{ color: 'var(--text-secondary)' }}>
              잘린 곳은 흔적을 남긴다.<br />
              어떤 건 거꾸로 잘렸다.
            </p>
          </div>
        </div>

        {/* 클립 그리드 */}
        <div className="flex-1 p-3 min-w-0">
          <p className="mono text-sm font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
            손상된 음성기록 복구
          </p>
          <p className="mono text-sm mb-3" style={{ color: 'var(--text-secondary)' }}>
            절단면을 맞추어 클립을 순서대로 연결하라.
          </p>

          <div className="grid grid-cols-2 gap-2">
            {CLIPS.map((clip) => (
              <ClipCard key={clip.id} clip={clip} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
