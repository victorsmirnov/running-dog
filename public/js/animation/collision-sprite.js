import { Sprite } from './sprite.js'

export class CollisionSprite extends Sprite {
  constructor (game, x, y) {
    super(game.assets.boom, [5], 20)

    this.game = game
    const sizeModifier = Math.random() + 0.5
    this.width = this.frameWidth * sizeModifier
    this.height = this.frameHeight * sizeModifier
    this.x = x - this.width / 2
    this.y = y - this.height / 2
  }

  update (timestamp) {
    this.x -= this.game.gameSpeed
    if (timestamp < this.nextFrameTime) return

    this.frame = this.frame + 1
    this.markForDeletion = this.frame > this.frames[this.animation]
    this.nextFrameTime = timestamp + 1000 / this.fps
  }

  draw (context) {
    super.draw(context, this.x, this.y, this.width, this.height)
  }
}
