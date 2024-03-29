export class Vector {
  constructor (x, y) {
    this.x = x
    this.y = y
  }
  sub (vector) {
    return new Vector(this.x - vector.x, this.y - vector.y)
  }

  perp (vector) {
    return new Vector(-this.y, this.x)
  }

  dot (vector) {
    return this.x * vector.x + this.y * vector.y
  }

  distance (vector) {
    return Math.sqrt((this.x - vector.x) ** 2 + (this.y - vector.y) ** 2)
  }
}
