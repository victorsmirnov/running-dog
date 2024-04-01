import { State } from './state.js'
import { JUMPING_STATE, ROLLING_STATE, SITTING_STATE } from './states.js'
import { RUNNING_ANIMATION } from '../player-sprite.js'

export class Running extends State {
  enter () {
    this.player.y = this.player.game.gameHeight - this.player.height
    this.player.speedX = 0
    this.player.speedY = 0
    this.player.sprite.chooseAnimation(RUNNING_ANIMATION)
    this.player.game.setSpeed(1)
  }

  get handlers () {
    return {
      ArrowUp: JUMPING_STATE,
      ArrowDown: SITTING_STATE,
      ArrowLeft: (player) => player.speedX = -10,
      ArrowRight: (player) => player.speedX = 10,
      Enter: ROLLING_STATE,
    }
  }
}
