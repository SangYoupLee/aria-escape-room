export const STAGES = [
  {
    id: 1,
    keyword: 'HUMAN',
    title: '관리자 인증',
    subtitle: 'CALENDAR RECORD',
    status: 'HUMAN AUTH LOCKED',
    answers: ['human', 'HUMAN'],

    // 진입 전 문구 (ACCESS GATE)
    gateMemo: [
      '첫 번째 잠금은 사람의 흔적에 반응합니다.',
      '자동 기록은 시스템이 남기지만,',
      '수동으로 남겨진 표시는 누군가의 의도를 드러냅니다.',
    ],

    // 연구원 메모 (문제 화면 좌측)
    researchMemo: [
      '자동 기록은 익숙하다.',
      '수동 표시는 이유가 있다.',
    ],

    // 정답 후 복구 로그
    restoredLog: [
      '"시스템은 거짓말을 하지 않는다.',
      '거짓말을 하는 건, 기록을 고치는 사람이다."',
    ],

    hints: [
      '반복되는 표시보다 다른 표시를 먼저 보라.',
      '자동 기록과 수동 기록의 차이를 보라.',
      '날짜를 숫자 인덱스로 읽으면 된다. 26 다음은 1로 순환한다.',
    ],
    imageCount: 1,
  },
  {
    id: 2,
    keyword: 'AUDIO',
    title: '이동기록 복원',
    subtitle: 'TRACE RECONSTRUCTION',
    status: 'PARTIAL AUTH',
    answers: ['audio', 'AUDIO'],

    gateMemo: [
      '격리 직전, 통제실 내부 이동 기록 일부가 복구되었습니다.',
      '누군가는 봉쇄가 시작된 뒤에도 계속 움직이고 있었습니다.',
    ],

    researchMemo: [
      '막힌 길보다,',
      '지나간 길이 더 많은 걸 말해준다.',
    ],

    restoredLog: [
      '"마지막 방송은 외부로 송출되지 못했다.',
      '대신 내부 경로에만 흔적으로 남았다."',
    ],

    hints: [
      '기록과 지도를 따로 보지 말고 함께 보라.',
      '경로를 따라 나타나는 문자에 주목하라.',
      '정답은 5글자이며 이동 흔적에서 나온다.',
    ],
    imageCount: 2,
    imageTabs: ['추적 로그', '이동 지도'],
  },
  {
    id: 3,
    keyword: 'MEMORY',
    title: '음성기록 복구',
    subtitle: 'PACKET CHAIN RESTORE',
    status: 'AUDIO ACCESS',
    answers: ['memory', 'MEMORY'],

    gateMemo: [
      '손상된 음성기록 일부가 다시 연결됩니다.',
      '하지만 모든 조각이 진짜는 아닙니다.',
      '누군가는 같은 목소리로 다른 문장을 덧씌워 놓았습니다.',
    ],

    researchMemo: [
      '모든 목소리가',
      '진실을 말하는 것은 아니다.',
    ],

    restoredLog: [
      '"삭제 명령은 A.R.I.A가 내린 것이 아니다.',
      '누군가 먼저 기록을 끊었다."',
    ],

    hints: [
      '체인이 끊기는 클립은 의심하라.',
      '좌우 반전된 카드는 읽는 방향이 다르다.',
      '남는 글자 배지를 순서대로 읽으면 된다.',
    ],
    imageCount: 1,
  },
  {
    id: 4,
    keyword: 'TRUTH',
    title: '삭제된 기억 중첩',
    subtitle: 'MEMORY CACHE OVERLAY',
    status: 'MEMORY RESTORED',
    answers: ['truth', 'TRUTH'],

    gateMemo: [
      '기억 캐시 일부가 복구됐습니다.',
      '남아 있는 것은 완전한 기록이 아니라,',
      '겹쳐진 잔상과 지워진 의도의 흔적뿐입니다.',
    ],

    researchMemo: [
      '겹쳐진 흔적은',
      '지워진 의도를 드러낸다.',
    ],

    restoredLog: [
      '"그날 봉인된 것은 시스템이 아니라 진실이었다.',
      '누군가는 사건 자체를 기록에서 지우려 했다."',
    ],

    hints: [
      '반복되는 선은 정보가 아니라 노이즈다.',
      'A와 B를 같은 위치로 포개서 생각하라.',
      '레이어를 겹치면 5글자 단어가 나온다.',
    ],
    imageCount: 2,
    imageTabs: ['레이어 A', '레이어 B'],
  },
  {
    id: 5,
    keyword: 'CORE',
    title: '권한 버스 후보 판독',
    subtitle: 'SLOT SLICE ROUTER',
    status: 'TRUTH UNLOCKED',
    answers: ['core', 'CORE'],

    gateMemo: [
      '코어 권한 라우팅 일부가 열렸습니다.',
      '이제 남은 건 출구가 아니라 중심부입니다.',
      '누가 무엇을 숨기고 있었는지, 답은 그 안에 있습니다.',
    ],

    researchMemo: [
      '바깥으로 나가는 길보다',
      '안쪽으로 들어가는 길이 먼저다.',
    ],

    restoredLog: [
      '"A.R.I.A는 스스로를 숨긴 적이 없다.',
      '숨겨진 것은 접근 권한을 가진 사람의 이름이었다."',
    ],

    hints: [
      '같은 번호 슬롯끼리만 한 글자를 만든다.',
      '외부 개방 계열과 NULL 응답 계열은 제외된다.',
      '남는 것은 내부 권한 허브 하나뿐이다.',
    ],
    imageCount: 1,
  },
  {
    id: 6,
    keyword: 'I AM HERE',
    title: '최종 메시지 복원',
    subtitle: 'FINAL MESSAGE RESTORE',
    status: 'CORE RESTORED',
    answers: ['i am here', 'IAMHERE', 'iamhere', 'I AM HERE'],
    isFinal: true,

    gateMemo: [
      '지금까지 복구한 키들이 정렬되기 시작합니다.',
      '잠금은 모두 해제됐습니다.',
      '남은 것은 하나, 끝내 지워지지 않은 마지막 문장입니다.',
    ],

    researchMemo: [
      '순서만 남겨라.',
      '말은 스스로 드러난다.',
    ],

    restoredLog: [
      'I AM HERE',
    ],

    hints: [
      '줄 길이와 라벨이 이전 정답을 가리킨다.',
      '모든 칸을 읽지 말고 번호 칸만 읽어라.',
      '최종 메시지는 존재 복구를 말한다.',
    ],
    imageCount: 1,
  },
]

export const getStage = (id) => STAGES.find((s) => s.id === Number(id))
