import { Enemy } from './enemy.js'
import { Sprite } from '../animation/sprite.js'

export class GroundEnemy extends Enemy {
  constructor (game) {
    super(game, new Sprite(game.assets['enemy-plant'], [2], 20))

    this.x = this.game.gameWidth - this.width
    this.y = this.game.gameHeight - this.game.groundMargin - this.height
    this.speedX = 0
    this.speedY = 0
  }
}
