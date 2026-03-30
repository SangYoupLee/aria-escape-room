import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const initialState = {
  sessionId: null,
  nickname: '',
  startedAt: null,
  currentStage: 1,
  solvedStages: [],        // [1, 2, 3, ...]
  unlockedKeywords: [],    // ['HUMAN', 'AUDIO', ...]
  stageStats: {},          // { 1: { attempts: 0, hintsUsed: 0, solvedAt: null } }
  totalHintsUsed: 0,
  totalWrongAnswers: 0,
  isFinished: false,
  finishedAt: null,
}

export const useGameStore = create(
  persist(
    (set, get) => ({
      ...initialState,

      startGame: (nickname) => {
        const sessionId = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
        set({
          ...initialState,
          sessionId,
          nickname,
          startedAt: Date.now(),
          stageStats: {
            1: { attempts: 0, hintsUsed: 0, solvedAt: null },
            2: { attempts: 0, hintsUsed: 0, solvedAt: null },
            3: { attempts: 0, hintsUsed: 0, solvedAt: null },
            4: { attempts: 0, hintsUsed: 0, solvedAt: null },
            5: { attempts: 0, hintsUsed: 0, solvedAt: null },
            6: { attempts: 0, hintsUsed: 0, solvedAt: null },
          },
        })
      },

      recordWrongAnswer: (stageId) => {
        const { stageStats, totalWrongAnswers } = get()
        set({
          totalWrongAnswers: totalWrongAnswers + 1,
          stageStats: {
            ...stageStats,
            [stageId]: {
              ...stageStats[stageId],
              attempts: (stageStats[stageId]?.attempts ?? 0) + 1,
            },
          },
        })
      },

      useHint: (stageId) => {
        const { stageStats, totalHintsUsed } = get()
        set({
          totalHintsUsed: totalHintsUsed + 1,
          stageStats: {
            ...stageStats,
            [stageId]: {
              ...stageStats[stageId],
              hintsUsed: (stageStats[stageId]?.hintsUsed ?? 0) + 1,
            },
          },
        })
      },

      solveStage: (stageId, keyword) => {
        const { solvedStages, unlockedKeywords, stageStats } = get()
        if (solvedStages.includes(stageId)) return
        set({
          solvedStages: [...solvedStages, stageId],
          unlockedKeywords: [...unlockedKeywords, keyword],
          currentStage: stageId < 6 ? stageId + 1 : stageId,
          stageStats: {
            ...stageStats,
            [stageId]: {
              ...stageStats[stageId],
              solvedAt: Date.now(),
            },
          },
        })
      },

      finishGame: () => {
        set({ isFinished: true, finishedAt: Date.now() })
      },

      getElapsedSeconds: () => {
        const { startedAt, finishedAt, isFinished } = get()
        if (!startedAt) return 0
        const end = isFinished ? finishedAt : Date.now()
        return Math.floor((end - startedAt) / 1000)
      },

      resetGame: () => set(initialState),
    }),
    {
      name: 'aria-game',
      partialize: (state) => ({
        sessionId: state.sessionId,
        nickname: state.nickname,
        startedAt: state.startedAt,
        currentStage: state.currentStage,
        solvedStages: state.solvedStages,
        unlockedKeywords: state.unlockedKeywords,
        stageStats: state.stageStats,
        totalHintsUsed: state.totalHintsUsed,
        totalWrongAnswers: state.totalWrongAnswers,
        isFinished: state.isFinished,
        finishedAt: state.finishedAt,
      }),
    }
  )
)
