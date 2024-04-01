import { Enemy } from './enemy.js'
import { Sprite } from '../utils/sprite.js'
import { Circle } from '../collisions/circle.js'

export class FlyingEnemy extends Enemy {
  constructor (game) {
    super(game, new Sprite(game.assets['enemy-fly'], [6], 20))

    this.x = this.game.gameWidth - this.width - Math.random() * this.game.gameWidth / 6
    this.y = Math.random() * this.game.gameHeight / 2
    this.speedX = Math.random() + 1
    this.speedY = 0

    this.angle = 0
    this.andgleSpeed = Math.random() * 0.1 + 0.1
  }

  update (timestamp) {
    super.update(timestamp)

    this.angle += this.andgleSpeed
    this.y += Math.sin(this.angle) * 2
  }

  getCollisionShape () {
    return new Circle(
      this.x + this.width / 2,
      this.y + this.height / 2,
      this.width / 3)
  }
}
