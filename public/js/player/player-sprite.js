import { Sprite } from '../utils/sprite.js'

export const
  STANDING_ANIMATION = 0,
  JUMPING_ANIMATION = 1,
  FALLING_ANIMATION = 2,
  RUNNING_ANIMATION = 3,
  SITTING_ANIMATION = 5

export class PlayerSprite extends Sprite {
  constructor (assets) {
    super(assets['player'], [7, 7, 7, 9, 11, 5, 7, 7, 12, 4], 20)
  }
}
