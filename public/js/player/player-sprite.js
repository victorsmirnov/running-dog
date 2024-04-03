import { Sprite } from '../utils/sprite.js'

export const STANDING_ANIMATION = 0
export const JUMPING_ANIMATION = 1
export const FALLING_ANIMATION = 2
export const RUNNING_ANIMATION = 3
export const HIT_ANIMATION = 4
export const SITTING_ANIMATION = 5
export const ROLLING_ANIMATION = 6

export class PlayerSprite extends Sprite {
  constructor (assets) {
    super(assets.player, [7, 7, 7, 9, 11, 5, 7, 7, 12, 4], 20)
  }
}
