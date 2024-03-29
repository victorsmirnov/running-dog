import { State } from './state.js'
import { JUMPING_STATE, SITTING_STATE } from './states.js'
import { RUNNING_ANIMATION } from '../player-sprite.js'

export class Running extends State {
  enter () {
    this.player.y = this.player.game.gameHeight - this.player.height
    this.player.speedX = 0
    this.player.speedY = 0
    this.player.sprite.chooseAnimation(RUNNING_ANIMATION)
    this.player.game.setSpeed(1)
  }

  handleInput (input) {
    if (input.isKeyPressed('ArrowUp')) this.player.setState(JUMPING_STATE)
    if (input.isKeyPressed('ArrowDown')) this.player.setState(SITTING_STATE)
    if (input.isKeyPressed('ArrowLeft')) this.player.speedX = -10
    if (input.isKeyPressed('ArrowRight')) this.player.speedX = 10
  }
}
