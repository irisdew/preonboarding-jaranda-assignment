export default class Generator {
  constructor(key) {
    this.key = key
    !this.load() && this.save()
  }

  save(data = null) {
    return localStorage.setItem(this.key, JSON.stringify(data))
  }

  load() {
    return JSON.parse(localStorage.getItem(this.key))
  }

  remove() {
    localStorage.removeItem(this.key)
  }
}
