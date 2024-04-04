import { State } from './state.js'
import { HIT_ANIMATION } from '../../animation/player-sprite.js'
import { FALLING_STATE, RUNNING_STATE } from './states.js'

export class Hit extends State {
  enter () {
    this.leaveStateAt = Date.now() + 500
    this.setGameSpeed(0)
    this.setPlayerAnimation(HIT_ANIMATION)
  }

  handleInput (input) {
    if (Date.now() > this.leaveStateAt) {
      return this.setPlayerState(
        this.player.onGround() ? RUNNING_STATE : FALLING_STATE)
    }
  }
}
