import { Particle } from './particle.js'

export class Fire extends Particle {
  constructor (game, x, y) {
    super(game)
    this.image = game.assets.fire
    this.size = Math.random() * 100 + 50
    this.x = x
    this.y = y
    this.speedX = 1
    this.speedY = 1
    this.angle = 0
    this.angleVelocity = Math.random() * 0.2 - 0.4
  }

  update () {
    super.update()

    this.angle += this.angleVelocity
    this.x += Math.sin(this.angle * 10)
  }

  draw (context) {
    context.save()
    context.translate(this.x, this.y)
    context.rotate(this.angle)
    context.drawImage(this.image, -this.size / 2, -this.size / 2, this.size, this.size)
    context.restore()
  }
}
