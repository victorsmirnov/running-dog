import { Falling } from './falling.js'
import { Jumping } from './jumping.js'
import { Running } from './running.js'
import { Sitting } from './sitting.js'
import { Standing } from './standing.js'
import { FALLING_STATE, JUMPING_STATE, RUNNING_STATE, SITTING_STATE, STANDING_STATE } from './states.js'

export function createStates (player) {
  return {
    [FALLING_STATE]: new Falling(player),
    [JUMPING_STATE]: new Jumping(player),
    [RUNNING_STATE]: new Running(player),
    [SITTING_STATE]: new Sitting(player),
    [STANDING_STATE]: new Standing(player),
  }
}
