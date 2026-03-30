# AI 통제실 탈출 웹앱 기획서 v2

## 1. 프로젝트 개요

### 프로젝트명
AI 통제실 탈출

### 목표
카카오톡 방탈출 스타일의 문제 진행을 웹앱 형태로 구현한다.  
사용자는 문제 이미지를 보고 정답을 입력해 다음 단계로 넘어가며, 힌트, 기록, 랭킹을 함께 확인할 수 있다.

### 핵심 컨셉
- AI 통제실 세계관
- 문제별 키워드 획득
- 마지막 문제에서 이전 정답들을 다시 활용
- 단순 탈출이 아니라 **기록 복구 / 진실 회수 / 통제권 복구**로 마무리

---

## 2. 전체 문제 흐름

### 문제 순서
1. HUMAN
2. AUDIO
3. MEMORY
4. TRUTH
5. CORE
6. I AM HERE

### 전체 서사 흐름
- HUMAN: 관리자 인증
- AUDIO: 이동/기록 접근
- MEMORY: 음성기록 복구
- TRUTH: 삭제된 기억 중첩 복원
- CORE: 권한 버스 후보 판독
- I AM HERE: 마지막 메시지 복원

### 엔딩 방향
- AI를 파괴하지 않음
- 통제권 회수
- 삭제된 기록 복구
- 복구된 마지막 메시지 확인
- 출구 봉쇄 해제

---

## 3. 문제별 기획 요약

### 문제 1: HUMAN
- 유형: 달력 + 인덱스 해독형
- 핵심: 자동 기록 / 수동 기록 차이를 이용해 숫자 추출
- 인덱스 코드 예시: `8 21 13 1 14`
- 정답: `HUMAN`

### 문제 2: AUDIO
- 유형: 로그 + 지도 경로 판독형
- 사용 이미지: 로그 화면 + 지도 화면
- 핵심: 경로/존 이동을 따라 글자 획득
- 정답: `AUDIO`

### 문제 3: MEMORY
- 유형: 패킷 체인 + 일부 역방향 판독형
- 핵심:
  - 진짜 음성 조각 연결
  - 가짜 음성 제거
  - 일부 역방향 자막 해석
- 정답: `MEMORY`

### 문제 4: TRUTH
- 유형: 레이어 A/B 대조형
- 핵심:
  - 반복 노이즈 제거
  - 두 레이어를 비교해 글자 판독
- 정답: `TRUTH`

### 문제 5: CORE
- 유형: 권한 버스 후보 판독형
- 핵심:
  - 각 후보는 4글자 슬롯으로 구성
  - 각 슬롯 안의 좌측/중앙/우측 조각을 합쳐 글자 판독
  - 후보 중 조건에 맞는 최종 모듈 선택
- 정답: `CORE`

### 문제 6: I AM HERE
- 유형: 이전 정답 회수형 최종 퍼즐
- 핵심:
  - 이전 5개 정답 길이와 동일한 줄 사용
  - 번호가 적힌 칸의 글자만 순서대로 읽음
- 정답: `I AM HERE`

---

## 4. 문제별 풀이 방식 요약

### HUMAN 풀이
1. 달력에서 자동 기록과 수동 기록의 차이를 확인
2. 특정 날짜 숫자를 추출
3. 인덱스 규칙으로 알파벳 변환
4. HUMAN 도출

### AUDIO 풀이
1. 이동 로그를 확인
2. 지도에서 실제 경로를 대조
3. 경로 상 문자들을 순서대로 읽음
4. AUDIO 도출

### MEMORY 풀이
1. 체인이 이어지는 음성 조각만 선택
2. 반복/가짜 조각 제거
3. 일부 역방향 카드의 자막과 흐름 해석
4. MEMORY 도출

### TRUTH 풀이
1. 레이어 A/B를 비교
2. 반복되는 공통 잔상은 노이즈로 판단
3. 남는 선을 읽어 글자 판독
4. TRUTH 도출

### CORE 풀이
1. 후보 모듈 4개 확인
2. 각 글자 슬롯 내부의 좌측/중앙/우측 조각을 합쳐 글자 복원
3. 후보 단어 확인
4. 조건 규칙으로 필터링
5. CORE 선택

### I AM HERE 풀이
1. 이전 문제 정답 길이와 맞는 슬롯 줄 확인
2. 번호가 적힌 칸만 순서대로 추출
3. 글자를 이어 마지막 메시지 복원
4. I AM HERE 도출

---

## 5. 최종 채택 이미지 목록

### 문제 1
- `ep1_human_verification_v4_original_calendar_numeric_index.png`

### 문제 2
- `ep2_trace_reconstruction_v5_fixed.png`
- `ep2_node_map_v5_fixed.png`

### 문제 3
- `ep3_packet_chain_reverse_visual_v12_exact_fix.png`

### 문제 4
- `ep4_memory_cache_layer_A_v4_h_fixed.png`
- `ep4_memory_cache_layer_B_v5_h_diagonal_removed.png`

### 문제 5
- `ep5_slot_slice_router_refined_v3_restored_input.png`

### 문제 6
- `ep6_final_message_restore_i_am_here_v2_fix.png`

### 엔딩
- `final_ending_i_am_here.png`

---

## 6. 웹앱 구조 개요

### 목표 UX
- 문제 이미지를 중심으로 플레이
- 정답 입력 시 다음 문제로 이동
- 힌트 버튼 제공
- 타이머/힌트 수/오답 수 표시
- 세션 종료 후 기록 저장
- 랭킹 페이지 제공

### 실제 라우트 추천
- `/`
- `/intro`
- `/play/:stageId`
- `/ending`
- `/ranking`
- `/admin` (선택)

### 사용자 체감 화면
1. 시작 화면
2. 닉네임 입력
3. 오프닝
4. 문제 1
5. 문제 2
6. 문제 3
7. 문제 4
8. 문제 5
9. 문제 6
10. 엔딩
11. 랭킹
12. 내 기록 보기

---

## 7. 전체 FLOW CHART

```text
[START]
  ↓
[닉네임 입력]
  ↓
[오프닝]
  ↓
[문제 1: HUMAN]
  ├─ 정답 → HUMAN 획득 → 문제 2
  ├─ 오답 → 재입력
  └─ 힌트 → 힌트 단계 증가
  ↓
[문제 2: AUDIO]
  ├─ 정답 → AUDIO 획득 → 문제 3
  ├─ 오답 → 재입력
  └─ 힌트 → 힌트 단계 증가
  ↓
[문제 3: MEMORY]
  ├─ 정답 → MEMORY 획득 → 문제 4
  ├─ 오답 → 재입력
  └─ 힌트 → 힌트 단계 증가
  ↓
[문제 4: TRUTH]
  ├─ 정답 → TRUTH 획득 → 문제 5
  ├─ 오답 → 재입력
  └─ 힌트 → 힌트 단계 증가
  ↓
[문제 5: CORE]
  ├─ 정답 → CORE 획득 → 문제 6
  ├─ 오답 → 재입력
  └─ 힌트 → 힌트 단계 증가
  ↓
[문제 6: I AM HERE]
  ├─ 정답 → 엔딩 이동
  ├─ 오답 → 재입력
  └─ 힌트 → 힌트 단계 증가
  ↓
[엔딩]
  ↓
[기록 저장]
  ↓
[랭킹 / 다시하기]
```

---

## 8. 문제 페이지 상태 흐름

```text
문제 페이지 진입
  ↓
문제 이미지 확인
  ↓
정답 입력
  ├─ 정답
  │    ↓
  │  키워드 획득 연출
  │    ↓
  │  다음 문제 해금
  │    ↓
  │  다음 스테이지 이동
  │
  ├─ 오답
  │    ↓
  │  오답 메시지 표시
  │    ↓
  │  재입력
  │
  └─ 힌트 요청
       ↓
     힌트 모달
       ├─ 힌트 1
       ├─ 힌트 2
       └─ 힌트 3
```

---

## 9. 페이지별 UI 설계

### 공통 UI
- 상단 진행바
- 현재 문제 번호
- 전체 진행률
- 타이머
- 힌트 수
- 오답 수
- 나가기 버튼

### 문제 페이지
- 메인 문제 이미지
- 보조 이미지(필요 시)
- 정답 입력창
- 제출 버튼
- 힌트 버튼
- 획득 키워드 패널

### 인터미션(문제 사이)
- `KEYWORD UNLOCKED`
- 짧은 시스템 로그
- 다음 스테이지 이동 버튼

### 엔딩 페이지
- 복구된 마지막 메시지
- 출구 봉쇄 해제
- 기록 복구 완료
- 랭킹 보기
- 다시하기

---

## 10. UI 통일 가이드

### 컬러
- 배경: 짙은 네이비 / 블랙
- 메인 포인트: 시안 블루
- 보조 포인트: 앰버 / 마젠타
- 텍스트: 화이트 / 그레이

### 형태
- 각 패널은 둥근 사각형
- 헤더 바는 얇고 넓게
- 내부 보조 패널은 같은 보더 규칙 사용
- 시스템 UI 느낌 유지

### 타이포
- 제목: 굵은 고딕
- 시스템 상태: 모노스페이스
- 입력창/정답 코드: 모노스페이스
- 설명 텍스트: 읽기 쉬운 고딕

### 상호작용
- 버튼 hover 시 시안 글로우
- 정답 맞춤 시 키워드 획득 애니메이션
- 힌트 열릴 때 모달 슬라이드 인
- 오답은 붉은색 대신 경고 앰버 계열 추천

---

## 11. 답안 입력 규칙

### 기본 규칙
- 대소문자 무시
- 좌우 공백 제거
- 연속 공백 1칸으로 정규화
- 일부 문장은 공백 제거 버전도 허용

### 예시
- `HUMAN` = 허용
- `human` = 허용
- ` I AM HERE ` = 허용
- `IAMHERE` = 허용

### 검증 로직 예시
- 정답 후보 배열 사용
- 입력값 normalize 후 비교

---

## 12. 힌트 정책

### 문제당 힌트 3단계 권장
- 힌트 1: 방향만 제시
- 힌트 2: 풀이 방식 절반 공개
- 힌트 3: 거의 직전까지 공개

### 예시
#### 문제 1 HUMAN
- 힌트 1: 반복되는 기록보다 다른 표시를 먼저 보라.
- 힌트 2: 자동 기록과 수동 기록의 차이를 보라.
- 힌트 3: 날짜를 숫자 인덱스로 읽어라.

#### 문제 2 AUDIO
- 힌트 1: 이동 기록과 지도를 함께 보라.
- 힌트 2: 실제 이동 가능한 경로를 따라가라.
- 힌트 3: 경로 상 글자를 순서대로 읽어라.

### 힌트 UX
- 별도 페이지보다 모달 추천
- 힌트 클릭 시 확인창
- 사용 후 힌트 수 증가
- 랭킹에 반영

---

## 13. 오답 처리 로직

### 기본 정책
- 오답 메시지 1개 고정
- 입력 횟수 저장
- 3회 이상 오답 시 힌트 사용 유도 가능

### 오답 메시지 예시
- `입력값이 일치하지 않습니다.`
- `복구 키 검증 실패. 다시 시도하십시오.`

### 저장 항목
- 문제별 오답 수
- 총 오답 수

---

## 14. 기록 / 랭킹 로직

### 저장 항목
- 닉네임
- 시작 시각
- 종료 시각
- 총 플레이 시간
- 문제별 풀이 시간
- 총 힌트 수
- 총 오답 수
- 클리어 여부

### 랭킹 기준 추천
1. 클리어 여부
2. 총 플레이 시간
3. 힌트 수
4. 오답 수

---

## 15. 데이터 구조 예시

```json
{
  "id": 1,
  "title": "관리자 인증",
  "answer": ["HUMAN"],
  "keyword": "HUMAN",
  "images": ["ep1_human_verification_v4_original_calendar_numeric_index.png"],
  "hints": [
    "반복되는 기록보다 다른 표시를 먼저 보라.",
    "자동 기록과 수동 기록의 차이를 보라.",
    "날짜를 숫자 인덱스로 읽어라."
  ]
}
```

---

## 16. 프론트엔드 / 백엔드 / 배포 추천

### 프론트엔드
- React
- React Router
- Zustand 또는 Context API
- Tailwind CSS

### 백엔드
- Supabase 추천
- 이유:
  - 무료 플랜 사용 가능
  - DB + 간단한 인증/저장 편함
  - 랭킹 저장 용이

### 배포
- Vercel Hobby
- 또는 Cloudflare Pages

### 스토리지
- 문제 이미지: Supabase Storage 또는 Cloudflare R2 (선택)

---

## 17. 디렉터리 구조 예시

```text
src/
  app/
    routes/
      home/
      intro/
      play/
      ending/
      ranking/
  components/
    layout/
    puzzle/
    modal/
    ranking/
  features/
    session/
    puzzle/
    hint/
    timer/
    ranking/
  data/
    puzzles.ts
    hints.ts
    answers.ts
  assets/
    images/
      ep1/
      ep2/
      ep3/
      ep4/
      ep5/
      ep6/
      ending/
  lib/
    supabase/
    utils/
```

---

## 18. Codex / Claude Code 요청 가이드

### 같이 제공할 것
- 이 Markdown 문서
- 문제 이미지 전체
- 최종 채택 이미지 파일
- 원하는 UX 한 줄 설명

### 요청 예시 (한국어)
```text
이 프로젝트는 AI 통제실 테마의 온라인 방탈출 웹앱입니다.
첨부한 문제 이미지와 기획 문서를 기준으로 React + Vite + Tailwind + Supabase 기반 MVP를 만들어주세요.

필수 기능:
1. 닉네임 입력 후 게임 시작
2. 문제 1~6 순차 진행
3. 정답 입력 후 다음 스테이지 이동
4. 힌트 3단계 모달
5. 타이머, 힌트 수, 오답 수 표시
6. 엔딩 후 기록 저장
7. 랭킹 페이지 제공

중요:
- 첨부 이미지의 UI 톤을 최대한 유지
- 모바일 대응 우선
- 정답 검증은 대소문자 무시 및 공백 정규화
- 문제 데이터는 별도 파일로 분리
```

### 요청 예시 (영문)
```text
Build an MVP web app for an online escape room based on the attached planning document and puzzle images.

Tech stack:
- React + Vite
- Tailwind CSS
- Supabase

Required features:
1. Nickname input and session start
2. Sequential stage progression (1 to 6)
3. Answer input and validation
4. 3-level hint modal for each stage
5. Timer, hint count, wrong answer count
6. Ending page and result save
7. Ranking page

Important:
- Preserve the visual tone of the attached puzzle images
- Mobile-first responsive layout
- Normalize answers (ignore case, trim spaces)
- Keep puzzle/hint/answer data separated from UI
```

---

## 19. 최종 체크리스트

### 콘텐츠
- [ ] 문제 이미지 최종본 확정
- [ ] 힌트 1/2/3 문구 완성
- [ ] 오프닝/엔딩 문구 확정

### 기능
- [ ] 정답 검증
- [ ] 힌트 모달
- [ ] 타이머
- [ ] 오답 수 기록
- [ ] 세션 저장
- [ ] 랭킹 저장

### 운영
- [ ] 배포 도메인 연결
- [ ] 테스트 플레이
- [ ] 모바일 확인
- [ ] 랭킹 초기화 기능 여부 결정

---

## 20. 최종 한 줄 정리
이 프로젝트는 **문제 이미지를 중심으로 진행되는 AI 통제실 테마 온라인 방탈출 웹앱**이며,  
정답 입력, 힌트, 기록, 랭킹, 마지막 메시지 복원까지 포함한 구조로 설계한다.
