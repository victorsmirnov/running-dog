import { Falling } from './falling.js'
import { Jumping } from './jumping.js'
import { Running } from './running.js'
import { Rolling } from './rolling.js'
import { Sitting } from './sitting.js'
import { Standing } from './standing.js'
import { FALLING_STATE, JUMPING_STATE, ROLLING_STATE, RUNNING_STATE, SITTING_STATE, STANDING_STATE } from './states.js'

export function createStates (game) {
  return {
    [FALLING_STATE]: new Falling(game),
    [JUMPING_STATE]: new Jumping(game),
    [RUNNING_STATE]: new Running(game),
    [ROLLING_STATE]: new Rolling(game),
    [SITTING_STATE]: new Sitting(game),
    [STANDING_STATE]: new Standing(game)
  }
}
