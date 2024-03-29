import { Vector } from './vector.js'

export function doCirclesCollide (circle1, circle2) {
  return circle1.center.distance(circle2.center) <= circle1.radius + circle2.radius
}

export function doPolygonsCollide (polygon1, polygon2) {
  for (const axis of polygon1.axes.concat(polygon2.axes)) {
    const projection1 = polygon1.project(axis)
    const projection2 = polygon2.project(axis)

    if (!projection1.intersects(projection2)) {
      return false
    }
  }
  return true
}

export function doCirclePolygonCollide (circle, polygon) {
  let minDistance = Number.MAX_VALUE
  let closestVertex = null

  for (const vertex of polygon.vertices) {
    const distance = circle.center.distance(vertex)
    if (distance < minDistance) {
      minDistance = distance
      closestVertex = vertex
    }
  }

  const axis = new Vector(
    closestVertex.x - circle.center.x, closestVertex.y - circle.center.y)
  const circleProjection = circle.project(axis)
  const polygonProjection = polygon.project(axis)

  return circleProjection.intersects(polygonProjection)
}
