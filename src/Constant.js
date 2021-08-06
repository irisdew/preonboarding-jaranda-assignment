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
  NO_RESULT_SEARCH: {
    name: 'NO_RESULT_SEARCH',
    desc: '일치하는 검색결과가 없습니다.',
  },
  INIT_RESULT_SEARCH: {
    name: 'INIT_RESULT_SEARCH',
    desc: '검색결과가 초기화 되었습니다.',
  },
})

export const fetchDataType = Object.freeze({
  USERS: { name: 'users', decs: '유저 목록' },
})
