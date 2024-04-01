export class Score {
  constructor (game) {
    this.game = game
    this.fontSize = 30
    this.fontFamily = 'Helvetica'
  }

  draw (context) {
    context.font = `${this.fontSize}px ${this.fontFamily}`
    context.textAlign = 'left'
    context.fillStyle = 'black'
    context.fillText(`Score: ${this.game.gameScore}`, 20, 50)
    context.fillStyle = this.game.fontColor
    context.fillText(`Score: ${this.game.gameScore}`, 22, 52)

  }
}
