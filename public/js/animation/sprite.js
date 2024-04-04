export class Sprite {
  constructor (image, frames, fps = 20) {
    this.image = image
    this.frames = frames
    this.fps = fps
    this.frameWidth = image.width / Math.max(...frames)
    this.frameHeight = image.height / frames.length
    this.animation = 0
    this.frame = 0
    this.nextFrameTime = 0
    this.markForDeletion = false
  }

  setAnimation (animation) {
    this.animation = animation
    this.frame = 0
  }

  update (timestamp) {
    if (this.nextFrameTime === 0) this.nextFrameTime = timestamp + 1000 / this.fps
    if (timestamp < this.nextFrameTime) return

    this.frame = (this.frame + 1) % this.frames[this.animation]
    this.nextFrameTime = timestamp + 1000 / this.fps
  }

  draw (context, x = undefined, y = undefined, width = undefined, height = undefined) {
    context.drawImage(this.image,
      this.frame * this.frameWidth,
      this.animation * this.frameHeight,
      this.frameWidth, this.frameHeight,
      (x ?? this.x), (y ?? this.y), (width ?? this.frameWidth), (height ?? this.frameHeight))
  }
}
