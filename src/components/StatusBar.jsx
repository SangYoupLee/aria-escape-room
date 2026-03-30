import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGameStore } from '../store/gameStore'

function formatTime(seconds) {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0')
  const s = (seconds % 60).toString().padStart(2, '0')
  return `${m}:${s}`
}

export default function StatusBar({ stageId, title, status }) {
  const navigate = useNavigate()
  const { getElapsedSeconds, totalHintsUsed, nickname } = useGameStore()
  const [elapsed, setElapsed] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setElapsed(getElapsedSeconds()), 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="flex items-center justify-between px-4 py-2 border-b"
      style={{ borderColor: 'var(--border)', background: 'rgba(10,14,26,0.95)' }}>
      {/* 왼쪽: 시스템 타이틀 */}
      <div>
        <p className="mono text-xs" style={{ color: 'var(--cyan)' }}>
          A.R.I.A SYSTEM / {title}
        </p>
        <p className="mono text-xs" style={{ color: 'var(--text-secondary)' }}>
          STATUS: <span style={{ color: 'var(--orange)' }}>{status}</span>
        </p>
      </div>

      {/* 오른쪽: 타이머, 힌트, 스테이지 */}
      <div className="flex items-center gap-4">
        <span className="mono text-xs" style={{ color: 'var(--text-secondary)' }}>
          HINT <span style={{ color: 'var(--orange)' }}>{totalHintsUsed}</span>
        </span>
        <span className="mono text-xs" style={{ color: 'var(--cyan)' }}>
          {formatTime(elapsed)}
        </span>
        <span className="mono text-xs px-2 py-0.5 rounded"
          style={{ background: 'rgba(0,229,255,0.1)', color: 'var(--cyan)', border: '1px solid rgba(0,229,255,0.3)' }}>
          {String(stageId).padStart(2, '0')} / 06
        </span>
      </div>
    </div>
  )
}
