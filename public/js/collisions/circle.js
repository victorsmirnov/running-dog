import { doCirclePolygonCollide, doCirclesCollide } from './colliders.js'
import { Polygon } from './polygon.js'
import { Vector } from './vector.js'
import { Projection } from './projection.js'

export class Circle {
  constructor (centerX, centerY, radius) {
    this.center = new Vector(centerX, centerY)
    this.radius = radius
  }

  collides (shape) {
    if (shape instanceof Circle) {
      return doCirclesCollide(this, shape)
    }
    if (shape instanceof Polygon) {
      return doCirclePolygonCollide(this, shape)
    }
    return false
  }

  project (axis) {
    const centerProjection = this.center.dot(axis)
    return new Projection(centerProjection - this.radius, centerProjection + this.radius)
  }

  draw (context, color = 'white') {
    context.beginPath()
    context.arc(this.center.x, this.center.y, this.radius, 0, 2 * Math.PI)
    context.closePath()
    context.lineWidth = 5
    context.strokeStyle = color
    context.stroke()
  }
}
