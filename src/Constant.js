export const storageKeys = Object.freeze({
  USER_LIST: { name: 'USER_LIST', desc: '등록된 유저 목록' },
  CURRENT_ACCOUNT: { name: 'CURRENT_ACCOUNT', desc: '로그인된 계정' },
  REMEMBER_ME: { name: 'REMEMBER_ME', desc: '아이디 기억하기' },
})

export const authType = Object.freeze({
  ADMIN: { name: 'admin', desc: '관리자' },
  TEACHER: { name: 'teacher', desc: '선생님' },
  PARENT: { name: 'parent', desc: '학부모' },
  STUDENT: { name: 'student', desc: '학생' },
})

export const accountInfoType = Object.freeze({
  EMAIL: { name: 'email', desc: '이메일' },
  ADDRESS: { name: 'address', desc: '주소' },
  CARD_NUMBER: { name: 'card_number', desc: '결제 수단' },
  PASSWORD: { name: 'password', desc: '비밀번호' },
})

export const loginMaintenance = Object.freeze({
  LOGIN_MAINTENANCE_TIME: { time: 1000 * 3600 * 3, decs: '로그인 유지 시간' },
  LOGIN_CHECK_INTERVAL_TIME: {
    time: 1000 * 60 * 10,
    decs: '로그인 상태 체크 시간 간격',
  },
})

// TODO error state
export const errorState = Object.freeze({
  NO_ACCOUNT_REGISTERED: {
    name: 'NO_ACCOUNT_REGISTERED',
    desc: '등록된 계정이 없습니다.',
  },
  PASSWORD_MISMATCH: {
    name: 'PASSWORD_MISMATCH',
    desc: '패스워드가 일치하지 않습니다.',
  },
  NO_PREVIOUS_PASSWORD: {
    name: 'NO_PREVIOUS_PASSWORD',
    desc: '이전 비밀번호를 입력해주세요.',
  },
  INVALID_PREVIOUS_PASSWORD: {
    name: 'INVALID_PREVIOUS_PASSWORD',
    desc: '이전 비밀번호를 확인해주세요.',
  },
  INVALID_NEW_PASSWORD: {
    name: 'INVALID_NEW_PASSWORD',
    desc: '비밀번호를 규칙에 맞게 입력해주세요.',
  },
  INVALID_EMAIL: {
    name: 'INVALID_EMAIL',
    desc: '유효하지 않은 이메일입니다.',
  },
  MY_INFO_EDIT_ERROR: {
    name: 'MY_INFO_EDIT_ERROR',
    desc: '내 정보 수정 기능이 원활하지 않습니다.',
  NO_RESULT_SEARCH: {
    name: 'NO_RESULT_SEARCH',
    desc: '일치하는 검색결과가 없습니다.',
  },
  INIT_RESULT_SEARCH: {
    name: 'INIT_RESULT_SEARCH',
    desc: '검색결과가 초기화 되었습니다.',
  },
})

export const errorMsg = Object.freeze({
  EMAIL_BLANK: { name: 'EMAIL_BLANK', desc: '이메일을 입력해주세요' },
  EMAIL_INVALID: {
    name: 'EMAIL_INVALID',
    desc: '유효한 이메일을 입력해주세요.',
  },
  EMAIL_DUPLICATE: {
    name: 'EMAIL_DUPLICATE',
    desc: '이미 가입된 이메일 입니다.',
  },
  PASSWORD_BLANK: { name: 'PASSWORD_BLANK', desc: '비밀번호를 입력해주세요' },
  PASSWORD_INVALID: {
    name: 'PASSWORD_INVALID',
    desc: '비밀번호 규칙에 맞는 비밀번호를 입력해주세요',
  },
  PASSWORD_MISSMATCH: {
    name: 'PASSWORD',
    desc: '비밀번호가 일치하지 않습니다.',
  },
  NAME_BLANK: { name: 'NAME_BLANK', desc: '이름을 입력해주세요.' },
  NAME_INVALID: { name: 'NAME_INVALID', desc: '유효한 이름을 입력해주세요.' },
  AGE_BLANK: { name: 'AGE_BLANK', desc: '나이를 입력해주세요.' },
  AGE_INVALID: { name: 'AGE_INVALID', desc: '유효한 나이를 입력해주세요.' },
  ADDRESS_BLANK: { name: 'ADDRESS_BLANK', desc: '주소를 입력해주세요.' },
  CARD_BLANK: { name: 'CARD_BLANK', desc: '카드번호를 입력해주세요.' },
  AUTH_BLANK: { name: 'AUTH_BLANK', desc: '회원 유형을 선택해주세요.' },
  ISNOT_KOREAN: { name: 'ISNOT_KOREAN', desc: '한글만 입력하실 수 있습니다.' },
  ISNOT_NUMERIC: {
    name: 'ISNOT_NUMERIC',
    desc: '숫자만 입력하실 수 있습니다.',
  },
  SIGNUP_SUCCESSED: {
    name: 'SIGNUP_SUCCESSED',
    desc: '회원가입이 완료되었습니다.',
  },
})

export const fetchDataType = Object.freeze({
  USERS: { name: 'users', decs: '유저 목록' },
})
