export class State {
  constructor (player) {
    this.player = player
  }

  get handlers () {
    return {}
  }

  handleInput (input) {
    for (const [key, handler] of Object.entries(this.handlers)) {
      if (!input.isKeyPressed(key)) continue

      if (typeof handler === 'function') return handler(this.player, this.game)
      return this.player.setState(handler)
    }
  }
}
