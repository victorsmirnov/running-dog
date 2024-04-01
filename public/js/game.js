import { Background } from './background/background.js'
import { InputHandler } from './input-handler.js'
import { Player } from './player/player.js'
import { FlyingEnemy } from './enemies/flying-enemy.js'
import { GroundEnemy } from './enemies/ground-enemy.js'
import { ClimbingEnemy } from './enemies/climbing-enemy.js'
import { Score } from './ui/score.js'
import { STANDING_STATE } from './player/states/states.js'

export class Game {
  constructor (assets) {
    this.assets = assets

    this.debugMode = false
    this.gamePaused = false
    this.gameOver = false
    this.gameScore = 0
    this.gameSpeed = 0
    this.gameMaxSpeed = 5
    this.groundMargin = 50

    this.canvas = document.getElementById('canvas1')
    this.canvas.width = window.innerWidth // 1400 // parseInt(getComputedStyle(this.canvas).width)
    this.canvas.height = 500 // window.innerHeight // 720 // parseInt(getComputedStyle(this.canvas).height)
    this.context = this.canvas.getContext('2d')

    this.gameWidth = this.canvas.width
    this.gameHeight = this.canvas.height
    this.fontColor = 'white'

    this.input = new InputHandler()
    this.player = new Player(this)
    this.enemies = []
    this.particles = []
    this.enemyNextTime = 0
    this.background = new Background(this)
    this.scoreUI = new Score(this)

    // States depend on the game object, so can set player state only after the game object is fully initialized.
    this.player.setState(STANDING_STATE)
  }

  setSpeed (speed) {
    this.gameSpeed = speed * this.gameMaxSpeed
  }

  start () {
    this.animate(0)
  }

  restart () {
    this.player.restart()
    this.background.restart()
    this.enemies = []
    this.gameOver = false
    this.gameScore = 0
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
    this.updateParticles(timestamp)
  }

  draw (context) {
    context.clearRect(0, 0, this.canvas.width, this.canvas.height)

    this.background.draw(context)
    this.player.draw(context)
    this.enemies.forEach((enemy) => enemy.draw(context))
    this.particles.forEach((particle) => particle.draw(context))

    this.scoreUI.draw(context)
    this.displayStatusText(context)
    if (this.debugMode) this.displayDebugText(context)
  }

  updateEnemies (timestamp) {
    if (timestamp > this.enemyNextTime) {
      this.addEnemy()
      this.enemyNextTime = timestamp + Math.random() * 1000 + 1500
    }

    this.enemies.forEach((enemy) => enemy.update(timestamp))

    const playerShape = this.player.getCollisionShape()
    this.enemies
      .filter((enemy) => playerShape.collides(enemy.getCollisionShape()))
      .forEach((enemy) => { enemy.markForDeletion = true })

    this.gameScore += this.enemies.filter((enemy) => enemy.markForDeletion).length
    this.enemies = this.enemies.filter((enemy) => !enemy.markForDeletion)
  }

  addEnemy () {
    this.enemies.push(new FlyingEnemy(this))
    if (this.gameSpeed > 0) {
      this.enemies.push(
        Math.random() < 0.5 ? new GroundEnemy(this) : new ClimbingEnemy(this))
    }
  }

  updateParticles (timestamp) {
    this.particles.forEach((particle) => particle.update())
    this.particles = this.particles.filter((particle) => !particle.markForDeletion)
  }

  displayStatusText (context) {
    if (this.gameOver) {
      context.textAlign = 'center'
      context.fillStyle = 'black'
      context.font = '80px Helvetica'
      context.fillText('Game Over', this.gameWidth / 2, this.gameHeight / 2)
      context.fillStyle = 'white'
      context.font = '80px Helvetica'
      context.fillText('Game Over', this.gameWidth / 2 + 2, this.gameHeight / 2 + 2)
    }
  }

  displayDebugText (context) {
    context.textAlign = 'left'
    context.fillStyle = 'black'
    context.font = '40px Helvetica'
    context.fillText(`Input: ${this.input.keys.join(', ')}`, this.gameWidth / 2, 50)
    context.textAlign = 'left'
    context.fillStyle = 'white'
    context.font = '40px Helvetica'
    context.fillText(`Input: ${this.input.keys.join(', ')}`, this.gameWidth / 2 + 2, 52)

    context.textAlign = 'left'
    context.fillStyle = 'black'
    context.font = '40px Helvetica'
    context.fillText(`State: ${this.player.state.constructor.name}`, this.gameWidth / 2, 90)
    context.textAlign = 'left'
    context.fillStyle = 'white'
    context.font = '40px Helvetica'
    context.fillText(`State: ${this.player.state.constructor.name}`, this.gameWidth / 2 + 2, 92)
  }
}
