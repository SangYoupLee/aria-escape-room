import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// 랭킹 저장
export async function saveRanking({ sessionId, nickname, totalPlayTime, totalHintsUsed, totalWrongAnswers }) {
  const { error } = await supabase.from('rankings').insert({
    session_id: sessionId,
    nickname,
    total_play_time: totalPlayTime,
    total_hints_used: totalHintsUsed,
    total_wrong_answers: totalWrongAnswers,
    finished_at: new Date().toISOString(),
  })
  if (error) console.error('랭킹 저장 실패:', error)
}

// 랭킹 조회
export async function fetchRankings() {
  const { data, error } = await supabase
    .from('rankings')
    .select('*')
    .order('total_play_time', { ascending: true })
    .limit(50)
  if (error) console.error('랭킹 불러오기 실패:', error)
  return data ?? []
}
