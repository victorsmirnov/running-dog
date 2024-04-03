import { State } from './state.js'
import { HIT_ANIMATION } from '../player-sprite.js'
import { FALLING_STATE, RUNNING_STATE } from './states.js'

export class Hit extends State {
  enter () {
    this.setGameSpeed(0)
    this.leaveStateAt = Date.now() + 500
    this.setPlayerAnimation(HIT_ANIMATION)
  }

  handleInput (input) {
    if (Date.now() > this.leaveStateAt) {
      return this.player.setState(
        this.player.onGround() ? RUNNING_STATE : FALLING_STATE)
    }
  }
}
