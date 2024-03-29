import { Layer } from './layer.js'

export class Background {
  layers = []

  constructor (game) {
    this.game = game

    this.layers = [
      new Layer(this.game.assets['layer-1'], .2),
      new Layer(this.game.assets['layer-2'], .4),
      new Layer(this.game.assets['layer-3'], .6),
      new Layer(this.game.assets['layer-4'], .8),
      new Layer(this.game.assets['layer-5'], 1)
    ]
  }

  restart () {
    this.layers.forEach((layer) => layer.restart())
  }

  draw (context) {
    this.layers.forEach((layer) => layer.draw(context))
  }

  update () {
    this.layers.forEach((layer) => layer.update(this.game.gameSpeed))
  }
}
