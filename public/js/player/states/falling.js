import { State } from './state.js'
import { DIVING_STATE, RUNNING_STATE, STANDING_STATE } from './states.js'
import { FALLING_ANIMATION } from '../player-sprite.js'

export class Falling extends State {
  enter () {
    this.setPlayerAnimation(FALLING_ANIMATION)
  }

  get handlers () {
    return {
      ArrowDown: DIVING_STATE
    }
  }

  handleInput (input) {
    if (this.player.onGround()) {
      return this.player.setState(
        this.game.gameSpeed === 0 ? STANDING_STATE : RUNNING_STATE)
    }

    super.handleInput(input)
  }
}
