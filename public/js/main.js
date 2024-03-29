import { Game } from './game.js'
import { loadAssets } from './utils/load-assets.js'

const assets = await loadAssets()
const game = new Game(assets)
game.start()
