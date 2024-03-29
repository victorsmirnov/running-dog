import { Vector } from './vector.js'
import { Projection } from './projection.js'
import { doCirclePolygonCollide, doCirclesCollide, doPolygonsCollide } from './colliders.js'
import { Circle } from './circle.js'

export class Polygon {
  constructor (vertices) {
    this.vertices = vertices.map(vertex => new Vector(...vertex))
  }

  get axes () {
    const axes = []
    for (let i = 0; i < this.vertices.length; i++) {
      axes.push(
        this.vertices[i]
          .sub(this.vertices[(i + 1) % this.vertices.length])
          .perp())
    }
    return axes
  }

  collides (shape) {
    if (shape instanceof Circle) {
      return doCirclePolygonCollide(shape, this)
    }
    if (shape instanceof Polygon) {
      return doPolygonsCollide(this, shape)
    }
    return false
  }

  project (axis) {
    let min = axis.dot(this.vertices[0])
    let max = min

    for (const vertex of this.vertices.slice(1)) {
      let p = axis.dot(vertex)
      if (p < min) min = p
      if (p > max) max = p
    }

    return new Projection(min, max)
  }

  draw(context, color = 'pink') {
    context.beginPath()
    context.moveTo(this.vertices[0].x, this.vertices[0].y)
    for (let i = 1; i < this.vertices.length; i++) {
      context.lineTo(this.vertices[i].x, this.vertices[i].y)
    }
    context.closePath()
    context.lineWidth = 5
    context.strokeStyle = color
    context.stroke()
  }
}
