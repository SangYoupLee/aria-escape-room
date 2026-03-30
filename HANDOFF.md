# A.R.I.A 방탈출 — 인계 문서

새 대화에서 이 파일을 먼저 읽으면 맥락을 바로 파악할 수 있습니다.

---

## 프로젝트 기본 정보

- **GitHub**: https://github.com/SangYoupLee/aria-escape-room
- **스택**: React 19 + Vite 6 + Tailwind CSS + Zustand + React Router v7 + Supabase
- **Node.js**: v20.15.0 (Vite 8 호환 안 됨 → Vite 6 사용)
- **로컬 경로**: `c:/dev/escaperoom`

---

## 브랜치 구조

```
master                  ← 안정 버전 (이미지 기반, 동작 확인 완료)
feature/web-components  ← 웹 컴포넌트 전환 작업 중 (현재 여기서 작업)
```

새 대화에서 작업 재개 시:
```bash
cd c:/dev/escaperoom
git checkout feature/web-components
npm run dev
```

---

## 게임 구조

**정답 순서**: HUMAN → AUDIO → MEMORY → TRUTH → CORE → I AM HERE

**라우트**:
- `/` — 시작 (부팅 시퀀스 + 닉네임 입력)
- `/intro` — 오프닝 스토리 (타이핑 효과)
- `/play/:stageId` — 공통 플레이 템플릿 (1~6)
- `/ending` — 엔딩
- `/ranking` — 랭킹

**스테이지 접근 가드**: 이전 스테이지 미클리어 시 현재 진행 스테이지로 강제 리다이렉트 (`Play.jsx` useEffect)

---

## 파일 구조 핵심

```
src/
  data/stages.js          ← 스테이지 데이터 (정답, 힌트, 스토리 메모 전부)
  store/gameStore.js      ← Zustand 게임 상태 (persist로 세션 저장)
  lib/supabase.js         ← Supabase 클라이언트 (미연동 시 null 처리)
  pages/
    Start.jsx             ← 시작 화면
    Intro.jsx             ← 오프닝 스토리
    Play.jsx              ← 공통 플레이 템플릿
    Ending.jsx            ← 엔딩
    Ranking.jsx           ← 랭킹
  components/
    StatusBar.jsx         ← 상단 바 (타이머, 힌트수, 스테이지)
    KeywordBar.jsx        ← 키워드 획득 바 (상단)
    PuzzleViewer.jsx      ← 이미지/웹컴포넌트 전환 로직
    HintModal.jsx         ← 힌트 모달 (확인 단계 포함)
    CorrectOverlay.jsx    ← 정답 오버레이 (복구 로그 포함)
    stages/
      Stage1Human.jsx     ← Stage 1 웹 컴포넌트 (완성)
```

---

## 웹 컴포넌트 전환 현황

`PuzzleViewer.jsx`의 `WEB_COMPONENTS` 맵에 완성된 것만 등록:

```js
const WEB_COMPONENTS = {
  1: Stage1Human,   // ✅ 완성
  // 2~6 미완성 → 이미지 fallback 사용 중
}
```

### 각 스테이지 전환 난이도 및 우선순위

| Stage | 정답 | 난이도 | 메모 |
|---|---|---|---|
| 1 HUMAN | ✅ 완성 | 낮음 | CSS 달력, 완료 |
| 6 I AM HERE | 다음 추천 | 낮음 | 단순 그리드, 빠르게 가능 |
| 4 TRUTH | 3번째 추천 | 중간 | 레이어 A/B 토글, 오히려 웹이 더 효과적 |
| 2 AUDIO | 4번째 | 중간 | 로그 테이블 + SVG 지도 필요 |
| 3 MEMORY | 5번째 | 높음 | 카드 7개 + 반전 효과 |
| 5 CORE | 마지막 | 높음 | 슬롯 3분할 복잡 |

---

## 배포 (Vercel) — 순서대로

### 1단계: Supabase 설정

1. https://supabase.com 접속 → 새 프로젝트 생성
2. SQL Editor에서 테이블 생성:

```sql
create table rankings (
  id uuid default gen_random_uuid() primary key,
  session_id text unique,
  nickname text not null,
  total_play_time integer not null,
  total_hints_used integer default 0,
  total_wrong_answers integer default 0,
  finished_at timestamptz default now()
);

-- 랭킹 조회용 인덱스
create index on rankings (total_play_time asc);
```

3. Settings → API → `URL`과 `anon public key` 복사
4. 로컬에서 `.env` 파일 생성:

```
VITE_SUPABASE_URL=https://xxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...
```

### 2단계: Vercel 배포

1. https://vercel.com → GitHub 계정 연동
2. "New Project" → `aria-escape-room` 레포 선택
3. Framework: **Vite** 자동 감지됨
4. Environment Variables 추가:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
5. Deploy 클릭

이후 `master` 브랜치에 push할 때마다 자동 배포됨.

### 3단계: 브랜치 병합

웹 컴포넌트 전환이 완료되면:
```bash
git checkout master
git merge feature/web-components
git push
```

---

## 현재 남은 주요 작업

### 필수 (배포 전)
- [ ] Supabase 연동 (랭킹 저장/조회)
- [ ] Vercel 배포 + 환경변수 설정
- [ ] 모바일 실기기 테스트
- [ ] iOS 입력창 자동 줌인 방지 (font-size 16px 미만 이슈)

### 웹 컴포넌트 전환
- [x] Stage 1 HUMAN — 달력
- [ ] Stage 6 I AM HERE — 글자 추출 그리드 (다음 추천)
- [ ] Stage 4 TRUTH — 레이어 A/B 오버레이
- [ ] Stage 2 AUDIO — 로그 테이블 + 지도
- [ ] Stage 3 MEMORY — 패킷 카드
- [ ] Stage 5 CORE — 슬롯 조각

### 선택 (배포 후)
- [ ] 내 기록 보기 페이지
- [ ] 3회 오답 시 힌트 자동 유도
- [ ] 관리자 패널 (`/admin`)
- [ ] 랭킹 초기화 기능

---

## 새 대화 시작 시 전달할 멘트

```
c:/dev/escaperoom 에서 A.R.I.A 방탈출 웹앱 개발 중.
HANDOFF.md 파일 읽어줘. 거기서 이어서 작업할게.
현재 feature/web-components 브랜치, Stage 1 웹 컴포넌트 완성.
다음은 Stage 6 웹 컴포넌트 또는 Vercel 배포.
```
