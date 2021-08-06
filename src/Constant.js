// Constant.js
// 기타 contstants 관리

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
  },
})

export const fetchDataType = Object.freeze({
  USERS: { name: 'users', decs: '유저 목록' },
})
