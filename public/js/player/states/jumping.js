import { State } from './state.js'
import { FALLING_STATE } from './states.js'
import { JUMPING_ANIMATION } from '../player-sprite.js'

export class Jumping extends State {
  enter () {
    this.player.sprite.chooseAnimation(JUMPING_ANIMATION)
    this.player.speedY = -25
  }

  handleInput (input) {
    if (this.player.speedY > 0) this.player.setState(FALLING_STATE)
  }
}
