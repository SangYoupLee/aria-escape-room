import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchRankings } from '../lib/supabase'

function formatTime(seconds) {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

export default function Ranking() {
  const navigate = useNavigate()
  const [rankings, setRankings] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchRankings().then((data) => {
      setRankings(data)
      setLoading(false)
    })
  }, [])

  return (
    <div className="min-h-screen flex flex-col">
      {/* 상단 바 */}
      <div className="flex justify-between items-center px-4 py-2 border-b"
        style={{ borderColor: 'var(--border)', background: 'rgba(10,14,26,0.95)' }}>
        <span className="mono text-xs" style={{ color: 'var(--cyan)' }}>A.R.I.A SYSTEM / CLEAR RANKING</span>
        <button onClick={() => navigate('/')} className="mono text-xs" style={{ color: 'var(--text-secondary)' }}>
          ← HOME
        </button>
      </div>

      <div className="flex-1 max-w-2xl mx-auto w-full px-4 py-6">
        <h1 className="mono text-xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
          ADMINISTRATOR RECORDS
        </h1>

        {loading ? (
          <p className="mono text-sm cursor" style={{ color: 'var(--text-secondary)' }}>LOADING</p>
        ) : rankings.length === 0 ? (
          <p className="mono text-sm" style={{ color: 'var(--text-secondary)' }}>
            기록 없음 — 첫 번째 클리어 관리자가 되십시오.
          </p>
        ) : (
          <div className="space-y-2">
            {/* 헤더 */}
            <div className="grid grid-cols-12 gap-2 px-3 pb-2 border-b"
              style={{ borderColor: 'var(--border)' }}>
              {['#', '관리자', '클리어 타임', '힌트', '오답'].map((h, i) => (
                <span key={i} className={`mono text-xs ${i === 0 ? 'col-span-1' : i === 1 ? 'col-span-5' : 'col-span-2'}`}
                  style={{ color: 'var(--text-secondary)' }}>{h}</span>
              ))}
            </div>

            {rankings.map((r, i) => (
              <div key={r.session_id ?? i}
                className="grid grid-cols-12 gap-2 px-3 py-2 rounded border fade-in"
                style={{
                  borderColor: i === 0 ? 'rgba(0,229,255,0.3)' : 'var(--border)',
                  background: i === 0 ? 'rgba(0,229,255,0.04)' : 'rgba(13,18,33,0.6)',
                }}>
                <span className="mono text-sm col-span-1" style={{ color: i === 0 ? 'var(--cyan)' : 'var(--text-secondary)' }}>
                  {i + 1}
                </span>
                <span className="mono text-sm col-span-5 truncate" style={{ color: 'var(--text-primary)' }}>
                  {r.nickname}
                </span>
                <span className="mono text-sm col-span-2" style={{ color: 'var(--cyan)' }}>
                  {formatTime(r.total_play_time)}
                </span>
                <span className="mono text-sm col-span-2" style={{ color: 'var(--text-secondary)' }}>
                  {r.total_hints_used}
                </span>
                <span className="mono text-sm col-span-2" style={{ color: r.total_wrong_answers > 0 ? 'var(--orange)' : 'var(--text-secondary)' }}>
                  {r.total_wrong_answers}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
