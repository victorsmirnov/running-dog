export class State {
  constructor (game) {
    this.game = game
  }

  // When we create state, the game is not initialized yet,
  // so we can not access the player object in constructor.
  // @return Player
  get player () {
    return this.game.player
  }

  setGameSpeed (speed) {
    this.game.setSpeed(speed)
  }

  setPlayerAnimation (animation) {
    this.player.sprite.chooseAnimation(animation)
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
