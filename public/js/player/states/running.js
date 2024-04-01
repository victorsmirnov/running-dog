import { State } from './state.js'
import { JUMPING_STATE, ROLLING_STATE, SITTING_STATE } from './states.js'
import { RUNNING_ANIMATION } from '../player-sprite.js'
import { Dust } from '../../particles/dust.js'

export class Running extends State {
  enter () {
    this.player.y = this.player.game.gameHeight - this.player.height
    this.player.speedX = 0
    this.player.speedY = 0
    this.player.sprite.chooseAnimation(RUNNING_ANIMATION)
    this.setGameSpeed(1)
  }

  get handlers () {
    return {
      ArrowUp: JUMPING_STATE,
      ArrowDown: SITTING_STATE,
      ArrowLeft: (player) => { player.speedX = -10 },
      ArrowRight: (player) => { player.speedX = 10 },
      Enter: ROLLING_STATE
    }
  }

  handleInput (input) {
    this.game.particles.push(new Dust(
      this.game,
      this.player.x + this.player.width * (Math.random() < 0.5 ? 1 : 3) / 4,
      this.player.y + this.player.height))

    return super.handleInput(input)
  }
}
