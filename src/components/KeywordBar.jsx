import { useGameStore } from '../store/gameStore'

const ALL_KEYWORDS = ['HUMAN', 'AUDIO', 'MEMORY', 'TRUTH', 'CORE', 'I AM HERE']

export default function KeywordBar() {
  const { unlockedKeywords } = useGameStore()

  return (
    <div className="flex gap-2 px-4 py-2 border-b overflow-x-auto"
      style={{ borderColor: 'var(--border)', background: 'rgba(13,18,33,0.6)' }}>
      {ALL_KEYWORDS.map((kw) => {
        const unlocked = unlockedKeywords.includes(kw)
        return (
          <span key={kw}
            className="mono text-xs px-2 py-0.5 rounded whitespace-nowrap transition-all"
            style={{
              border: `1px solid ${unlocked ? 'var(--cyan)' : 'var(--border)'}`,
              color: unlocked ? 'var(--cyan)' : 'var(--text-secondary)',
              background: unlocked ? 'rgba(0,229,255,0.08)' : 'transparent',
              opacity: unlocked ? 1 : 0.4,
            }}>
            {unlocked ? kw : '■■■■■'}
          </span>
        )
      })}
    </div>
  )
}
