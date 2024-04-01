import { State } from './state.js'
import { JUMPING_STATE, ROLLING_STATE, RUNNING_STATE, SITTING_STATE, STANDING_STATE } from './states.js'
import { STANDING_ANIMATION } from '../player-sprite.js'

export class Standing extends State {
  enter () {
    this.player.sprite.chooseAnimation(STANDING_ANIMATION)
    this.player.game.setSpeed(0)
  }

  get handlers () {
    return {
      ArrowUp: JUMPING_STATE,
      ArrowDown: SITTING_STATE,
      ArrowLeft: RUNNING_STATE,
      ArrowRight: RUNNING_STATE,
      Enter: ROLLING_STATE,
    }
  }
}
