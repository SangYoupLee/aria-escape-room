// Stage 2 — AUDIO : 이동기록 복원
import { useState } from 'react'

const NODES = [
  { id: '01', label: '연구실',    cctv: 'CCTV-01', x: 80,  y: 90  },
  { id: '02', label: '복도',      cctv: 'CCTV-02', x: 230, y: 90  },
  { id: '04', label: '출입문',    cctv: 'CCTV-04', x: 380, y: 90  },
  { id: '03', label: '보조패널',  cctv: 'CCTV-03', x: 115, y: 200 },
  { id: '05', label: '아카이브',  cctv: 'CCTV-05', x: 265, y: 200 },
  { id: '06', label: '음성기록실',cctv: 'CCTV-06', x: 390, y: 200 },
]

const EDGES = [
  { from: '01', to: '03', letter: 'A', t: 0.5  },
  { from: '03', to: '04', letter: 'U', t: 0.7  },
  { from: '04', to: '02', letter: 'D', t: 0.5  },
  { from: '02', to: '05', letter: 'I', t: 0.3  },
  { from: '05', to: '06', letter: 'O', t: 0.5  },
  { from: '01', to: '02', letter: 'R', t: 0.5  },
  { from: '01', to: '05', letter: 'M', t: 0.35 },
  { from: '03', to: '05', letter: 'R', t: 0.5  },
  { from: '04', to: '05', letter: 'E', t: 0.4  },
  { from: '04', to: '06', letter: 'A', t: 0.5  },
]

const LOG_ENTRIES = [
  { id: 'A', time: '08:17', zone: '05' },
  { id: 'B', time: '08:11', zone: '03' },
  { id: 'C', time: '08:19', zone: '06' },
  { id: 'D', time: '08:15', zone: '02' },
  { id: 'E', time: '08:12', zone: '05' },
  { id: 'F', time: '08:14', zone: '04' },
]

function nodeById(id) {
  return NODES.find((n) => n.id === id)
}

function lerp(a, b, t) {
  return a + (b - a) * t
}

export default function Stage2Audio() {
  const [activeTab, setActiveTab] = useState('log')

  return (
    <div className="w-full rounded border overflow-hidden"
      style={{ borderColor: 'var(--border)', background: 'var(--bg-secondary)' }}>

      {/* 타이틀 바 */}
      <div className="flex justify-between items-center px-4 py-2 border-b"
        style={{ borderColor: 'var(--border)' }}>
        <span className="mono text-xs" style={{ color: 'var(--cyan)' }}>
          A.R.I.A SYSTEM / TRACE RECONSTRUCTION
        </span>
        <span className="mono text-xs" style={{ color: 'var(--orange)' }}>
          STATUS: PARTIAL AUTH
        </span>
      </div>

      {/* 탭 버튼 */}
      <div className="flex gap-2 p-3 border-b" style={{ borderColor: 'var(--border)' }}>
        {[
          { key: 'log', label: '추적 로그' },
          { key: 'map', label: '이동 지도' },
        ].map(({ key, label }) => (
          <button key={key} onClick={() => setActiveTab(key)}
            className="mono font-semibold px-8 py-3 rounded transition-colors"
            style={{
              fontSize: '16px',
              border: `1.5px solid ${activeTab === key ? 'var(--cyan)' : 'var(--border)'}`,
              color: activeTab === key ? 'var(--cyan)' : 'var(--text-secondary)',
              background: activeTab === key ? 'rgba(0,229,255,0.08)' : 'transparent',
            }}>
            {label}
          </button>
        ))}
      </div>

      {/* 추적 로그 탭 */}
      {activeTab === 'log' && (
        <div className="flex flex-col md:flex-row">

          <div className="md:w-52 flex-shrink-0 p-4 flex flex-col gap-4
                          border-b md:border-b-0 md:border-r"
            style={{ borderColor: 'var(--border)' }}>

            <div className="rounded border p-3"
              style={{ borderColor: 'var(--border)', background: 'rgba(0,0,0,0.25)' }}>
              <p className="mono text-sm mb-2" style={{ color: 'var(--cyan)' }}>[ 경로 요약 ]</p>
              <div className="flex flex-col gap-2">
                {[
                  { label: 'START', value: 'ZONE 01' },
                  { label: 'END',   value: 'ZONE 06' },
                ].map(({ label, value }) => (
                  <div key={label} className="mono text-sm flex gap-2"
                    style={{ color: 'var(--text-secondary)' }}>
                    <span style={{ color: 'var(--cyan)' }}>{label}</span>
                    <span>{value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded border p-3"
              style={{ borderColor: 'var(--border)', background: 'rgba(0,0,0,0.25)' }}>
              <p className="mono text-sm mb-2" style={{ color: 'var(--cyan)' }}>[ 연구원 메모 ]</p>
              <p className="text-sm leading-7" style={{ color: 'var(--text-secondary)' }}>
                인증서버 문제로,<br />
                한번 나갔던 ZONE은<br />
                다시 들어갈 수 없다.
              </p>
            </div>
          </div>

          <div className="flex-1 p-4 min-w-0">
            <p className="mono text-sm font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
              2차 추적 로그
            </p>
            <p className="mono text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>
              [ ZONE ACTIVITY SNAPSHOT ]
            </p>
            <div className="grid grid-cols-2 gap-3">
              {LOG_ENTRIES.map(({ id, time, zone }) => (
                <div key={id} className="rounded border p-4"
                  style={{ borderColor: 'var(--border)', background: 'rgba(0,0,0,0.2)' }}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="mono text-sm font-bold" style={{ color: 'var(--cyan)' }}>{id}</span>
                    <span className="mono text-sm" style={{ color: 'var(--text-secondary)' }}>{time}</span>
                  </div>
                  <div className="mono font-bold text-center py-1"
                    style={{ fontSize: '18px', color: 'var(--text-primary)', letterSpacing: '0.08em' }}>
                    ZONE &nbsp; {zone}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 이동 지도 탭 */}
      {activeTab === 'map' && (
        <div className="p-4">
          <div className="flex justify-between items-center mb-3">
            <p className="mono text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
              시설 내부 연결도
            </p>
            <div className="flex gap-5">
              <span className="mono text-sm" style={{ color: 'var(--text-secondary)' }}>ZONE 01 — START</span>
              <span className="mono text-sm" style={{ color: 'var(--text-secondary)' }}>ZONE 06 — END</span>
            </div>
          </div>

          <div className="rounded border p-3"
            style={{ borderColor: 'var(--border)', background: 'rgba(0,0,0,0.2)' }}>
            <p className="mono text-xs mb-3" style={{ color: 'var(--text-secondary)' }}>
              [ NODE MAP 01-06 ]
            </p>

            {/* viewBox 를 키워서 노드 간격 확보 */}
            <svg viewBox="0 0 470 290" className="w-full" style={{ maxHeight: '380px' }}>

              {/* 연결선 */}
              {EDGES.map((edge) => {
                const na = nodeById(edge.from)
                const nb = nodeById(edge.to)
                return (
                  <line key={`${edge.from}-${edge.to}`}
                    x1={na.x} y1={na.y} x2={nb.x} y2={nb.y}
                    stroke="#00e5ff" strokeWidth={1.5} strokeOpacity={0.55}
                  />
                )
              })}

              {/* 엣지 글자 배지 */}
              {EDGES.map((edge) => {
                const na = nodeById(edge.from)
                const nb = nodeById(edge.to)
                const bx = lerp(na.x, nb.x, edge.t)
                const by = lerp(na.y, nb.y, edge.t)
                const bSize = 20
                return (
                  <g key={`badge-${edge.from}-${edge.to}`}>
                    <rect
                      x={bx - bSize / 2} y={by - bSize / 2}
                      width={bSize} height={bSize} rx={3}
                      fill="rgba(255,107,53,0.2)"
                      stroke="var(--orange)"
                      strokeWidth={1.5}
                    />
                    <text x={bx} y={by + 5}
                      textAnchor="middle"
                      style={{ fontSize: '12px', fill: 'var(--orange)', fontFamily: 'monospace', fontWeight: 'bold' }}>
                      {edge.letter}
                    </text>
                  </g>
                )
              })}

              {/* 노드 */}
              {NODES.map((node) => (
                <g key={node.id}>
                  <text x={node.x} y={node.y - 28}
                    textAnchor="middle"
                    style={{ fontSize: '9px', fill: 'var(--text-secondary)', fontFamily: 'monospace', opacity: 0.6 }}>
                    {node.cctv}
                  </text>
                  <circle cx={node.x} cy={node.y} r={18}
                    fill="rgba(0,229,255,0.08)" stroke="#00e5ff" strokeWidth={2} />
                  <text x={node.x} y={node.y + 5}
                    textAnchor="middle"
                    style={{ fontSize: '11px', fill: '#00e5ff', fontFamily: 'monospace', fontWeight: 'bold' }}>
                    {node.id}
                  </text>
                  <text x={node.x} y={node.y + 32}
                    textAnchor="middle"
                    style={{ fontSize: '9px', fill: 'var(--text-secondary)', fontFamily: 'monospace' }}>
                    {node.label}
                  </text>
                </g>
              ))}
            </svg>
          </div>
        </div>
      )}
    </div>
  )
}
