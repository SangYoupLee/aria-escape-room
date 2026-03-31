import { useGameStore } from '../store/gameStore'

const ALL_KEYWORDS = ['HUMAN', 'AUDIO', 'MEMORY', 'TRUTH', 'CORE', 'I AM HERE']

export default function KeywordBar() {
  const { unlockedKeywords } = useGameStore()

  return (
    <div className="flex gap-3 px-4 py-2.5 border-b overflow-x-auto"
      style={{ borderColor: 'var(--border)', background: 'rgba(13,18,33,0.6)' }}>
      {ALL_KEYWORDS.map((kw) => {
        const unlocked = unlockedKeywords.includes(kw)
        return (
          <span key={kw}
            className="mono font-semibold px-3 py-1 rounded whitespace-nowrap transition-all"
            style={{
              fontSize: '13px',
              border: `1px solid ${unlocked ? 'var(--cyan)' : 'var(--border)'}`,
              color: unlocked ? 'var(--cyan)' : 'var(--text-secondary)',
              background: unlocked ? 'rgba(0,229,255,0.1)' : 'transparent',
              boxShadow: unlocked ? '0 0 8px rgba(0,229,255,0.2)' : 'none',
              opacity: unlocked ? 1 : 0.35,
              letterSpacing: '0.06em',
            }}>
            {unlocked ? kw : '■■■■■'}
          </span>
        )
      })}
    </div>
  )
}
