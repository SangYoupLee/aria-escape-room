// Vercel Serverless Function — 정답 검증
// 클라이언트에는 노출되지 않음

const ANSWERS = {
  1: ['human'],
  2: ['audio'],
  3: ['memory'],
  4: ['truth'],
  5: ['core'],
  6: ['i am here', 'iamhere'],
}

function normalize(str) {
  return str.trim().toLowerCase().replace(/\s+/g, ' ')
}

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { stageId, answer } = req.body ?? {}

  if (!stageId || answer === undefined) {
    return res.status(400).json({ error: 'Missing stageId or answer' })
  }

  const valid = ANSWERS[Number(stageId)]
  if (!valid) {
    return res.status(400).json({ error: 'Invalid stageId' })
  }

  const correct = valid.includes(normalize(String(answer)))
  return res.status(200).json({ correct })
}
