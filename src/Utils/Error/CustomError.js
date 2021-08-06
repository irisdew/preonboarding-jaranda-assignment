export default class CustomError extends Error {
  constructor(state) {
    super(state.desc)

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, CustomError)
    }

    this.type = state.name
  }
}
