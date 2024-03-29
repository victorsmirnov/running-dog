import { State } from './state.js'
import { JUMPING_STATE, RUNNING_STATE, SITTING_STATE } from './states.js'
import { STANDING_ANIMATION } from '../player-sprite.js'

export class Standing extends State {
  enter () {
    this.player.sprite.chooseAnimation(STANDING_ANIMATION)
    this.player.game.setSpeed(0)
  }

  handleInput (input) {
    if (input.isKeyPressed('ArrowUp')) this.player.setState(JUMPING_STATE)
    if (input.isKeyPressed('ArrowRight')) this.player.setState(RUNNING_STATE)
    if (input.isKeyPressed('ArrowDown')) this.player.setState(SITTING_STATE)
  }
}
