export class Particle {
  constructor (game) {
    this.game = game
    this.markedForDeletion = false
    this.speedX = 0
    this.speedY = 0
    this.size = 0
  }

  update () {
    this.x -= this.speedX + this.game.gameSpeed
    this.y -= this.speedY
    this.size *= 0.95
    if (this.size < 0.5) this.markedForDeletion = true
  }
}
