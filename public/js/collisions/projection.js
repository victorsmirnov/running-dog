export class Projection {
  constructor (min, max) {
    this.min = min
    this.max = max
  }

  intersects (projection) {
    return Math.max(this.min, projection.min) <= Math.min(this.max, projection.max)
  }
}
