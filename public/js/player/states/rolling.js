import { State } from './state.js'
import { DIVING_STATE, FALLING_STATE, RUNNING_STATE } from './states.js'
import { ROLLING_ANIMATION } from '../../animation/player-sprite.js'

export class Rolling extends State {
  enter () {
    this.setPlayerAnimation(ROLLING_ANIMATION)
    this.setGameSpeed(2)
  }

  get handlers () {
    return {
      ArrowDown: DIVING_STATE,
      ArrowUp: (player) => {
        if (player.onGround()) player.speedY = -27
      }
    }
  }

  handleInput (input) {
    if (!input.isKeyPressed('Enter')) {
      return this.setPlayerState(
        this.player.onGround() ? RUNNING_STATE : FALLING_STATE)
    }

    // I don't like fire particles as it is now.
    // this.game.particles.push(new Fire(this.game, this.player.x, this.player.y + 50))

    // Enter key should be pressed to keep rolling!
    super.handleInput(input)
  }
}
