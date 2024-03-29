import { PlayerSprite } from './player-sprite.js'
import { STANDING_STATE } from './states/states.js'
import { createStates } from './states/states-factory.js'
import { Circle } from '../collisions/circle.js'

export class Player {
  constructor (game) {
    this.game = game

    this.sprite = new PlayerSprite(this.game.assets)
    this.width = this.sprite.frameWidth
    this.height = this.sprite.frameHeight

    this.x = this.game.gameWidth / 4 - this.width / 2
    this.y = this.groundY()
    this.speedX = 0
    this.speedY = 0
    this.weight = 1

    this.states = createStates(this)
    this.setState(STANDING_STATE)
  }

  setState (state) {
    this.state = this.states[state]
    this.state.enter()
  }

  restart () {
    this.x = this.game.gameWidth / 4 - this.width / 2
    this.y = this.groundY()
    this.speedX = 0
    this.speedY = 0
    this.setState(STANDING_STATE)
  }

  draw (context) {
    this.sprite.draw(context, this.x, this.y)

    if (this.game.debugMode) this.getCollisionShape().draw(context, 'pink')
  }

  getCollisionShape() {
    return new Circle(
      this.x + this.width / 2 + 5,
      this.y + this.height / 2 + 5,
      this.width / 3)
  }

  update (timestamp) {
    this.state.handleInput(this.game.input)
    this.updateCoordinates()
    this.sprite.update(timestamp)
  }

  updateCoordinates () {
    this.x += this.speedX
    this.speedX = 0

    this.y += this.speedY
    this.speedY = this.onGround() ? 0 : this.speedY + this.weight

    if (this.x < 0) this.x = 0
    if (this.x + this.width > this.game.gameWidth) this.x = this.game.gameWidth - this.width

    if (this.y < 0) this.y = 0
    if (this.y > this.groundY()) this.y = this.groundY()
  }

  groundY () {
    return this.game.gameHeight - this.game.groundMargin - this.height
  }

  onGround () {
    return this.y === this.groundY()
  }
}
