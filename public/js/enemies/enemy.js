import { Polygon } from '../collisions/polygon.js'

export class Enemy {
  constructor (game, sprite) {
    this.game = game
    this.sprite = sprite
    this.width = this.sprite.frameWidth
    this.height = this.sprite.frameHeight
    this.speedX = 0
    this.speedY = 0
    this.markForDeletion = false
  }

  draw (context) {
    this.sprite.draw(context, this.x, this.y, this.width, this.height)

    if (this.game.debugMode) this.getCollisionShape().draw(context, 'blue')
  }

  getCollisionShape () {
    return new Polygon([
      [this.x, this.y],
      [this.x + this.width, this.y],
      [this.x + this.width, this.y + this.height],
      [this.x, this.y + this.height]
    ])
  }

  update (timestamp) {
    this.sprite.update(timestamp)

    this.x -= this.speedX + this.game.gameSpeed
    this.y += this.speedY

    this.markForDeletion = this.x + this.width < 0
  }
}
