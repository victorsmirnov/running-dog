export class Layer {
  sourceX = 0

  sourceY = 0

  constructor (image, speedModifier) {
    this.image = image
    this.speedModifier = speedModifier
  }

  restart () {
    this.sourceX = 0
    this.sourceY = 0
  }

  draw (context) {
    const canvas = context.canvas
    context.drawImage(
      this.image,
      this.sourceX, this.sourceY, canvas.width, canvas.height,
      0, 0, canvas.width, canvas.height
    )
    context.drawImage(
      this.image,
      0, 0, this.image.width, this.image.height,
      this.image.width - this.sourceX - 1, 0, this.image.width, this.image.height
    )
  }

  update (gameSpeed) {
    this.sourceX += this.speedModifier * gameSpeed
    if (this.sourceX >= this.image.width) {
      this.sourceX = 0
    }
  }
}
