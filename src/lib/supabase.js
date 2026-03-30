import { createClient } from '@supabase/supabase-js'

// Supabase가 설정되지 않은 경우 null로 처리 (개발 중 무시)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

const isConfigured = supabaseUrl && supabaseAnonKey

export const supabase = isConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

// 랭킹 저장
export async function saveRanking(data) {
  if (!supabase) {
    console.info('[Supabase 미연동] 랭킹 저장 건너뜀')
    return
  }
  const { error } = await supabase.from('rankings').insert({
    session_id: data.sessionId,
    nickname: data.nickname,
    total_play_time: data.totalPlayTime,
    total_hints_used: data.totalHintsUsed,
    total_wrong_answers: data.totalWrongAnswers,
    finished_at: new Date().toISOString(),
  })
  if (error) console.error('랭킹 저장 실패:', error)
}

// 랭킹 조회
export async function fetchRankings() {
  if (!supabase) {
    console.info('[Supabase 미연동] 랭킹 비어있음')
    return []
  }
  const { data, error } = await supabase
    .from('rankings')
    .select('*')
    .order('total_play_time', { ascending: true })
    .limit(50)
  if (error) console.error('랭킹 불러오기 실패:', error)
  return data ?? []
}
