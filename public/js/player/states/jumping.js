import { State } from './state.js'
import { DIVING_STATE, FALLING_STATE, ROLLING_STATE } from './states.js'
import { JUMPING_ANIMATION } from '../player-sprite.js'

export class Jumping extends State {
  enter () {
    this.player.speedY = -25
    this.setPlayerAnimation(JUMPING_ANIMATION)
  }

  get handlers () {
    return {
      ArrowDown: DIVING_STATE,
      Enter: ROLLING_STATE
    }
  }

  handleInput (input) {
    if (this.player.speedY > 0) return this.player.setState(FALLING_STATE)

    super.handleInput(input)
  }
}
