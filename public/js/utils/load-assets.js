import { loadImage } from './load-image.js'

export async function loadAssets () {
  const assets = {}

  async function loadAsset (name, url) {
    assets[name] = await loadImage(url)
  }

  await Promise.all([
    loadAsset('enemy-fly', 'assets/enemy-fly.png'),
    loadAsset('enemy-plant', 'assets/enemy-plant.png'),
    loadAsset('enemy-spider-big', 'assets/enemy-spider-big.png'),
    loadAsset('layer-1', 'assets/forest-1.png'),
    loadAsset('layer-2', 'assets/forest-2.png'),
    loadAsset('layer-3', 'assets/forest-3.png'),
    loadAsset('layer-4', 'assets/forest-4.png'),
    loadAsset('layer-5', 'assets/forest-5.png'),
    loadAsset('player', 'assets/player.png'),
    loadAsset('fire', 'assets/fire.png')
  ])

  return assets
}
