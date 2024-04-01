import { State } from './state.js'
import { FALLING_STATE, RUNNING_STATE } from './states.js'
import { ROLLING_ANIMATION } from '../player-sprite.js'

export class Rolling extends State {
  enter () {
    this.player.sprite.chooseAnimation(ROLLING_ANIMATION)
    this.player.game.setSpeed(2)
  }

  get handlers () {
    return {
      ArrowUp: (player) => {
        if (player.onGround()) player.speedY = -27
      }
    }
  }

  handleInput (input) {
    if (!input.isKeyPressed('Enter')) {
      return this.player.setState(
        this.player.onGround() ? RUNNING_STATE : FALLING_STATE)
    }

    // Enter key should be pressed to keep rolling!
    super.handleInput(input)
  }
}
