import Storage from 'Utils/Storage/Generator'
import { storageKeys } from 'Constant'

export const userListStorage = new Storage(storageKeys.USER_LIST.name)
export const currentAccountStorage = new Storage(
  storageKeys.CURRENT_ACCOUNT.name
)
export const rememberMeStorage = new Storage(storageKeys.REMEMBER_ME.name)
