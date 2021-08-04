// Constant.js
// 기타 contstants 관리

export const storageKeys = Object.freeze({
  USER_LIST: { name: 'USER_LIST', desc: '등록된 유저 목록' },
  CURRENT_ACCOUNT: { name: 'CURRENT_ACCOUNT', desc: '로그인된 계정' },
})

export const loginState = Object.freeze({
  SUCCESS: { name: 'SUCCESS', desc: '성공' },
  FAIL: {
    name: 'FAIL',
    reason: {
      NO_ACCOUNT_REGISTERED: {
        name: 'NO_ACCOUNT_REGISTERED',
        desc: '등록된 계정이 없습니다.',
      },
      PASSWORD_MISMATCH: {
        name: 'PASSWORD_MISMATCH',
        desc: '패스워드가 일치하지 않습니다.',
      },
    },
  },
})

// TODO error state
