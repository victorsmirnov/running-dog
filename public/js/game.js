import { Background } from './background/background.js'
import { InputHandler } from './input-handler.js'
import { Player } from './player/player.js'
import { FlyingEnemy } from './enemies/flying-enemy.js'
import { GroundEnemy } from './enemies/ground-enemy.js'
import { ClimbingEnemy } from './enemies/climbing-enemy.js'

export class Game {
  debugMode = false

  gamePaused = false

  gameOver = false

  gameScore = 0

  gameSpeed = 0

  gameMaxSpeed = 5

  groundMargin = 50

  enemies = []

  enemyNextTime = 0

  constructor (assets) {
    this.assets = assets

    this.canvas = document.getElementById('canvas1')
    this.canvas.width = window.innerWidth // 1400 // parseInt(getComputedStyle(this.canvas).width)
    this.canvas.height = 500 // window.innerHeight // 720 // parseInt(getComputedStyle(this.canvas).height)
    this.context = this.canvas.getContext('2d')

    this.gameWidth = this.canvas.width
    this.gameHeight = this.canvas.height

    this.input = new InputHandler()

    this.player = new Player(this)

    this.background = new Background(this)
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

    requestAnimationFrame((timestamp) => this.animate(timestamp))
  }

  update (timestamp) {
    this.background.update()
    this.updateEnemies(timestamp)
    this.player.update(timestamp)
    this.processCollisions()
  }

  draw (context) {
    context.clearRect(0, 0, this.canvas.width, this.canvas.height)

    this.background.draw(context)
    this.player.draw(context)
    this.enemies.forEach((enemy) => enemy.draw(context))

    this.displayStatusText(context)
    if (this.debugMode) this.displayDebugText(context)
  }

  processCollisions () {
    const playerShape = this.player.getCollisionShape()
    const collides = (enemy) => playerShape.collides(enemy.getCollisionShape())
    if (this.enemies.find(collides) !== undefined) this.gameOver = true
  }

  updateEnemies (timestamp) {
    if (timestamp > this.enemyNextTime) {
      this.addEnemy()
      this.enemyNextTime = timestamp + Math.random() * 1000 + 1500
    }

    this.enemies.forEach((enemy) => enemy.update(timestamp))
    this.gameScore += this.enemies.filter((enemy) => enemy.markForDeletion).length
    this.enemies = this.enemies.filter((enemy) => !enemy.markForDeletion)
  }

  addEnemy () {
    this.enemies.push(new FlyingEnemy(this))
    if (this.gameSpeed > 0) this.enemies.push(
      Math.random() < 0.5 ? new GroundEnemy(this) : new ClimbingEnemy(this))
  }

  displayStatusText (context) {
    context.textAlign = 'left'
    context.fillStyle = 'black'
    context.font = '40px Helvetica'
    context.fillText(`Score: ${this.gameScore}`, 20, 50)
    context.fillStyle = 'white'
    context.font = '40px Helvetica'
    context.fillText(`Score: ${this.gameScore}`, 22, 52)

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
