export class Score {
  constructor (game) {
    this.game = game
    this.fontColor = 'black'
    this.fontSize = 30
    this.fontFamily = 'Creepster'
    this.livesImage = game.assets.lives
  }

  draw (context) {
    context.save()

    this.showScore(context)
    this.showLives(context)

    if (this.game.gameOver) {
      this.showGameOver(context)
    }

    context.restore()
  }

  showScore (context) {
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
  }

  showLives (context) {
    const headSize = 30
    let head = 1
    while (head <= this.game.gameLives) {
      context.drawImage(
        this.livesImage,
        this.game.gameWidth - (20 + headSize) * head, 25, headSize, headSize)
      head++
    }
  }

  showGameOver (context) {
    context.textAlign = 'center'
    context.font = `${this.fontSize * 2.5}px ${this.fontFamily}`
    context.fillText('Game Over', this.game.gameWidth / 2, this.game.gameHeight / 2)
  }
}
