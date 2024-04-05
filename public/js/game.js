import { Background } from './background/background.js'
import { InputHandler } from './input-handler.js'
import { Player } from './player/player.js'
import { FlyingEnemy } from './enemies/flying-enemy.js'
import { GroundEnemy } from './enemies/ground-enemy.js'
import { ClimbingEnemy } from './enemies/climbing-enemy.js'
import { Score } from './ui/score.js'
import { DIVING_STATE, HIT_STATE, ROLLING_STATE, STANDING_STATE } from './player/states/states.js'
import { CollisionSprite } from './animation/collision-sprite.js'

export class Game {
  constructor (assets) {
    this.assets = assets

    this.debugMode = false
    this.gamePaused = false
    this.gameOver = false
    this.gameScore = 0
    this.gameLives = 5
    this.gameStarted = 0
    this.gameSpeed = 0
    this.gameMaxSpeed = 5
    this.groundMargin = 40

    this.canvas = document.getElementById('canvas1')
    this.canvas.width = window.innerWidth // 1400 // parseInt(getComputedStyle(this.canvas).width)
    this.canvas.height = 500 // window.innerHeight // 720 // parseInt(getComputedStyle(this.canvas).height)
    this.context = this.canvas.getContext('2d')

    this.gameWidth = this.canvas.width
    this.gameHeight = this.canvas.height

    this.input = new InputHandler()
    this.player = new Player(this)
    this.enemies = []
    this.sprites = []
    this.particles = []
    this.enemyNextTime = 0
    this.background = new Background(this)
    this.scoreUI = new Score(this)

    // States depend on the game object, so can set player state only after the game object is fully initialized.
    this.player.setState(STANDING_STATE)
  }

  get duration () {
    return Date.now() - this.gameStarted
  }

  setSpeed (speed) {
    this.gameSpeed = speed * this.gameMaxSpeed
  }

  start () {
    this.gameStarted = Date.now()
    this.animate(0)
  }

  restart () {
    this.gameStarted = Date.now()
    this.player.restart()
    this.background.restart()
    this.enemies = []
    this.gameOver = false
    this.gameScore = 0
    this.gameLives = 5
  }

  animate (timestamp) {
    if (this.input.isKeyPressed('d')) this.debugMode = !this.debugMode

    if (this.input.isKeyPressed('p')) this.gamePaused = !this.gamePaused

    if (!this.gameOver && !this.gamePaused) this.update(timestamp)

    this.draw(this.context)

    if (this.gameOver && this.input.isKeyPressed(' ')) this.restart()

    window.requestAnimationFrame((timestamp) => this.animate(timestamp))
  }

  update (timestamp) {
    this.background.update()
    this.player.update(timestamp)
    this.updateEnemies(timestamp)
    this.updateSprites(timestamp)
    this.updateParticles(timestamp)
  }

  draw (context) {
    context.clearRect(0, 0, this.canvas.width, this.canvas.height)

    this.background.draw(context)
    this.player.draw(context)
    this.enemies.forEach((enemy) => enemy.draw(context))
    this.sprites.forEach((sprite) => sprite.draw(context))
    this.particles.forEach((particle) => particle.draw(context))
    this.scoreUI.draw(context)
  }

  updateEnemies (timestamp) {
    if (timestamp > this.enemyNextTime) {
      this.addEnemy()
      this.enemyNextTime = timestamp + Math.random() * 1000 + 1500
    }

    this.enemies.forEach((enemy) => enemy.update(timestamp))

    this.checkCollisions()

    this.enemies = this.enemies.filter((enemy) => !enemy.markForDeletion)
  }

  checkCollisions () {
    const playerShape = this.player.getCollisionShape()
    const collideWith = this.enemies
      .filter((enemy) => playerShape.collides(enemy.getCollisionShape()))
    if (collideWith.length > 0) this.playerCollidesWithEnemy()

    collideWith.forEach((enemy) => this.sprites.push(new CollisionSprite(
      this, enemy.x + enemy.width / 2, enemy.y + enemy.height / 2)))
    collideWith.forEach((enemy) => enemy.delete())
  }

  playerCollidesWithEnemy () {
    if (this.player.inState([ROLLING_STATE, DIVING_STATE])) {
      this.gameScore++
    } else {
      this.player.setState(HIT_STATE)
      this.gameLives -= 1
      this.gameOver = this.gameLives <= 0
    }
  }

  addEnemy () {
    const fly = new FlyingEnemy(this)
    this.enemies.push(fly)

    if (this.gameSpeed > 0) {
      const enemy = Math.random() < 0.5 ? new GroundEnemy(this) : new ClimbingEnemy(this)
      this.enemies.push(enemy)
    }
  }

  updateSprites (timestamp) {
    this.sprites.forEach((sprite) => sprite.update(timestamp))
    this.sprites = this.sprites.filter((sprite) => !sprite.markForDeletion)
  }

  updateParticles (timestamp) {
    this.particles.forEach((particle) => particle.update(timestamp))
    this.particles = this.particles.filter((particle) => !particle.markForDeletion)
  }
}
