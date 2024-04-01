import { State } from './state.js'
import { RUNNING_STATE, STANDING_STATE } from './states.js'
import { FALLING_ANIMATION } from '../player-sprite.js'

export class Falling extends State {
  enter () {
    this.player.sprite.chooseAnimation(FALLING_ANIMATION)
  }

  handleInput (input) {
    if (this.player.onGround()) return this.player.setState(
      this.player.game.gameSpeed === 0 ? STANDING_STATE : RUNNING_STATE)
  }
}
