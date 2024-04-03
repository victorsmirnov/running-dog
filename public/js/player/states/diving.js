import { State } from './state.js'
import { ROLLING_STATE, RUNNING_STATE } from './states.js'
import { ROLLING_ANIMATION } from '../player-sprite.js'

export class Diving extends State {
  enter () {
    this.player.speedY = 15
    this.setPlayerAnimation(ROLLING_ANIMATION)
    this.setGameSpeed(0)
  }

  get handlers () {
    return {}
  }

  handleInput (input) {
    if (this.player.onGround()) {
      this.player.setState(
        input.isKeyPressed('Enter') ? ROLLING_STATE : RUNNING_STATE)
    }

    // I don't like fire particles as it is now.
    // this.game.particles.push(new Fire(this.game, this.player.x, this.player.y + 50))

    // Enter key should be pressed to keep rolling!
    super.handleInput(input)
  }
}
