import { Enemy } from './enemy.js'
import { Sprite } from '../utils/sprite.js'

export class ClimbingEnemy extends Enemy {
  constructor (game) {
    super(game, new Sprite(game.assets['enemy-spider-big'], [6], 20))

    this.x = this.game.gameWidth - this.width
    this.y = Math.random() * this.game.gameHeight / 2
    this.speedX = 0
    this.speedY = Math.random() > 0.5 ? 1 : -1
  }

  update (timestamp) {
    super.update(timestamp)

    if (this.y > this.game.gameHeight - this.game.groundMargin - this.height) this.speedY *= -1
    if (this.y < -this.height) this.markForDeletion = true
  }

  draw (context) {
    super.draw(context)

    context.beginPath()
    context.moveTo(this.x + this.width / 2, 0)
    context.lineTo(this.x + this.width / 2, this.y + 50)
    context.stroke()
  }
}
