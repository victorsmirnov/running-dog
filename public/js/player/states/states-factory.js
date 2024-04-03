import { Diving } from './diving.js'
import { Falling } from './falling.js'
import { Jumping } from './jumping.js'
import { Rolling } from './rolling.js'
import { Running } from './running.js'
import { Sitting } from './sitting.js'
import { Standing } from './standing.js'
import {
  DIVING_STATE,
  FALLING_STATE, HIT_STATE,
  JUMPING_STATE,
  ROLLING_STATE,
  RUNNING_STATE,
  SITTING_STATE,
  STANDING_STATE
} from './states.js'
import { Hit } from './hit.js'

export function createStates (game) {
  return {
    [DIVING_STATE]: new Diving(game),
    [FALLING_STATE]: new Falling(game),
    [HIT_STATE]: new Hit(game),
    [JUMPING_STATE]: new Jumping(game),
    [RUNNING_STATE]: new Running(game),
    [ROLLING_STATE]: new Rolling(game),
    [SITTING_STATE]: new Sitting(game),
    [STANDING_STATE]: new Standing(game)
  }
}
