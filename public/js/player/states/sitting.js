import { State } from './state.js'
import { ROLLING_STATE, RUNNING_STATE, SITTING_STATE, STANDING_STATE } from './states.js'
import { SITTING_ANIMATION } from '../../animation/player-sprite.js'

export class Sitting extends State {
  enter () {
    this.player.y = this.player.game.gameHeight - this.player.height
    this.player.speedX = 0
    this.player.speedY = 0
    this.setPlayerAnimation(SITTING_ANIMATION)
    this.setGameSpeed(0)
  }

  get handlers () {
    return {
      ArrowUp: STANDING_STATE,
      ArrowDown: SITTING_STATE,
      ArrowLeft: RUNNING_STATE,
      ArrowRight: RUNNING_STATE,
      Enter: ROLLING_STATE
    }
  }
}
