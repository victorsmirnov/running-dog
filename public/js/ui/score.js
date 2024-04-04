export class Score {
  constructor (game) {
    this.game = game
    this.fontColor = 'black'
    this.fontSize = 30
    this.fontFamily = 'Creepster'
  }

  draw (context) {
    context.save()
    context.shadowOffsetX = 2
    context.shadowOffsetY = 2
    context.shadowColor = 'white'
    context.shadowBlur = 0

    context.textAlign = 'left'
    context.fillStyle = this.fontColor

    context.font = `${this.fontSize}px ${this.fontFamily}`
    context.fillText(`Score: ${this.game.gameScore}`, 20, 50)

    context.font = `${this.fontSize * 0.8}px ${this.fontFamily}`
    context.fillText(`Time: ${(this.game.duration / 1000).toFixed(1)}`, 20, 80)

    context.restore()
  }
}
