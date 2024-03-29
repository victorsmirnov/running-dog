import { State } from './state.js'
import { RUNNING_STATE, STANDING_STATE } from './states.js'
import { SITTING_ANIMATION } from '../player-sprite.js'

export class Sitting extends State {
  enter () {
    this.player.y = this.player.game.gameHeight - this.player.height
    this.player.speedX = 0
    this.player.speedY = 0
    this.player.sprite.chooseAnimation(SITTING_ANIMATION)
    this.player.game.setSpeed(0)
  }

  handleInput (input) {
    if (input.isKeyPressed('ArrowUp')) this.player.setState(STANDING_STATE)
    if (input.isKeyPressed(['ArrowLeft', 'ArrowRight'])) this.player.setState(RUNNING_STATE)
  }
}
