export class InputHandler {
  constructor () {
    this.listenKeys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' ', 'd', 'p']
    this.keys = []
    this.touchY = 0
    this.touchThreshold = 15

    window.addEventListener('keydown', (event) => this.keyDown(event.key))
    window.addEventListener('keyup', (event) => this.keyUp(event.key))
    window.addEventListener('touchstart', (event) => this.touchStart(event))
    window.addEventListener('touchmove', (event) => this.touchMove(event))
    window.addEventListener('touchend', (event) => this.touchEnd(event))
  }

  isKeyPressed (key) {
    if (Array.isArray(key)) return key.some((key) => this.keys.includes(key))
    return this.keys.includes(key)
  }

  skipKey (key) {
    return !this.listenKeys.includes(key)
  }

  keyDown (key) {
    if (this.skipKey(key)) return

    if (!this.keys.includes(key)) this.keys.push(key)
  }

  keyUp (key) {
    if (this.skipKey(key) || !this.isKeyPressed(key)) return

    this.keys.splice(this.keys.indexOf(key), 1)
  }

  touchStart (event) {
    this.touchY = event.touches[0].clientY
  }

  touchMove (event) {
    const deltaY = event.touches[0].clientY - this.touchY
    if (deltaY > this.touchThreshold) {
      this.keyDown(' ')
      this.keyUp('ArrowUp')
    } else if (deltaY < -this.touchThreshold) {
      this.keyDown('ArrowUp')
      this.keyUp(' ')
    }
  }

  touchEnd (event) {
    this.keyUp('ArrowUp')
    this.keyUp(' ')
  }
}
