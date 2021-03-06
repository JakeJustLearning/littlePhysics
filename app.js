window.maxFPS = 1
window.lastFrameTimeMS = Date.now()
    // HARDWARE CLASSES

class Game {
    constructor() {
        this.gameObjects = []
        this.controller = new Controller
        this.physics = new Engine
        this.gameOn = true
        this.controller.name = 'game con'
        this.initGame()
        window.addEventListener('keydown', this.controller.keyDown)
        window.addEventListener('keyup', this.controller.keyUp)
    }

    initGame() {
        this.createWorld()
        this.createPlayer()
    }

    // LOGICING

    loopUpdate() {
        // console.log('logicing')
        this.applyPlayerInput()
        // this.physics.run(this.gameObjects.filter(gameObj => gameObj.controlling == true))
        this.physics.run(this.gameObjects)
    }

    applyPlayerInput() {
        
        this.gameObjects.filter(gameObj => gameObj.controlling == true)
            .forEach(gameObj => {
                console.log(`applying ${this.controller.getInputs()}`)
                gameObj.velX -= this.controller.getInputs()[0] 
                gameObj.velY -= this.controller.getInputs()[2] 
                gameObj.velX += this.controller.getInputs()[1] 
                gameObj.velY += this.controller.getInputs()[3]
                console.log(gameObj)
            })
    }

    fireBullet() {
        let bullet = new Rectangle(this.gameObjects[1].x,this.gameObjects[1].y,0,-6,false,8,4)
        bullet.deletable = true
        bullet.hasGravity = false
        this.gameObjects.push(bullet)
    }

    cleanObjects(){
        this.gameObjects = this.gameObjects.filter(gameObj => !gameObj.deletable)

    }


    // RENDERING
    loopDraw() {
        // console.log('drawing')
        scrn.clearRect(0, 0, canvas.width, canvas.height)
        this.gameObjects.forEach(gameObj => {
            this.drawObject(gameObj)
        })

    }

    drawObject(gameObj) {
        if(gameObj.sprite) {
            scrn.drawImage(gameObj.sprite,gameObj.x, gameObj.y, gameObj.width, gameObj.height )
        }
        else {
            scrn.lineWidth = 4
            scrn.strokeStyle = 'lime'
            scrn.fillStyle = 'lime'
            scrn.beginPath()
            scrn.beginPath()
            scrn.rect(gameObj.x, gameObj.y, gameObj.width, gameObj.height)
            scrn.stroke()
            scrn.fill()
            scrn.closePath()
        }
    }
    createWorld() {
        const ground = new Rectangle(0, 150, 0, 0, false, canvas.width, 2)
        this.gameObjects.push(ground)
    }
    createPlayer() {
        const player = new Player(100, 130, 0, 0, true, 30, 15)
        player.sprite = new Image
        player.sprite.src ='assets/player.png'
        this.gameObjects.push(player)
    }
}
// CONTROLS
class Controller {
    constructor() {
        this.left = 0
        this.right = 0
        this.down = 0
        this.up = 0
        this.keyDown = this.keyDown.bind(this)
        this.keyUp = this.keyUp.bind(this)
        // this.getInputs = this.getInputs.bind(this)
        // this.getInputs = this.getInput
    }
    keyDown(event) {
        // if (document.getElementById('play-space').getAttribute('focus-within')) {

        switch (event.keyCode) {
            case 32:
                game.fireBullet()
                break
            case 37:
                this.left = 1;
                event.preventDefault()
                console.log(` left is down here are the controls ${this.getInputs}`)
                break
            case 39:
                this.right = 1

                event.preventDefault()
                break
            case 38:
                this.up = 1

                event.preventDefault()
                break
            case 40:
                this.down = 1

                event.preventDefault()
                break
            default:
                break
        }
            // }
    }
    keyUp(event) {
         console.log(`key up ${event.keyCode}`)
        // if (document.getElementById('play-space').getAttribute('focus-within')) {
        switch (event.keyCode) {
            case 37:
                this.left = 0
                event.preventDefault()
                console.log(`left has been lifted ${this.left}`)
                console.log(`here are the controls ${this.getInputs}`)
                break
            case 39:
                this.right = 0
                event.preventDefault()
                break
            case 38:
                this.up = 0
                event.preventDefault()
                break
            case 40:
                this.down = 0
                event.preventDefault()
                break
            default:
                break
        }
            // }
    }
    getInputs() {
        console.log(this.left, this.right, this.up, this.down)
        return [this.left, this.right, this.up, this.down]
    }
}

// SOFTWARE CLASSES
class GameObject {
    constructor(x, y, velX, velY, gravity) {
        this.x = x
        this.y = y
        this.velX = velX || 0
        this.velY = velY || 0
        this.shape = ''

        this.isColliding = false
        this.hasGravity = gravity || true

    }
}

class Rectangle extends GameObject {
    constructor(x, y, velX, velY, gravity, width, height) {
        super(x, y, velX, velY, gravity)
        this.width = width
        this.height = height
        this.shape = 'rectangle'
        this.deletable
    }
}

class Player extends Rectangle {
    constructor(x, y, velX, velY, gravity, width, height) {
        super(x, y, velX, velY, gravity, width, height)
        this.controlling = true
    }

}

class Engine {
    constructor() {
        this.maxVelX = 5
        this.maxVelY = 12
        this.gravity = 0.5
    }
    run(gameObjects) {
        gameObjects.forEach(gameObj => {
            // console.log(this)
            this.yMovement(gameObj)
            this.xMovement(gameObj)
            this.friction(gameObj);
            if (gameObj.hasGravity == true) this.applyGravity(gameObj);
            this.checkBoundary(gameObj);
            

        })
    }

    yMovement(gameObject) {
    
        // console.log(`yMovement on ${gameObject}`)
        // console.log(`Y: ${gameObject.y} = ${gameObject.y} + ${gameObject.velY}`)
        // console.log('ymovement')
        gameObject.y += gameObject.velY
    }

    xMovement(gameObject) {
        // console.log(`xMovement on ${gameObject}`)
        // console.log(`X: ${gameObject.x} = ${gameObject.x} + ${gameObject.velX}`)
        gameObject.x += gameObject.velX*2

    }
    friction(gameObject) {
        // console.log(`friction on ${gameObject}`)
        // console.log(`before friction VelX = ${gameObject.velX} VelY = ${gameObject.velY} `)
        gameObject.velX *= 0.8
        // gameObject.velY -= 1
        // console.log(`After apply friction VelX = ${gameObject.velX} VelY = ${gameObject.velY} `)
    }

    applyGravity(gameObject) {
        gameObject.velY += this.gravity

    }

    checkBoundary(gameObject) {
        if ((gameObject.x + gameObject.width) >= 320) {
            gameObject.x = (318 - gameObject.width)
            gameObject.velX = 0
        }
        if (gameObject.x <= 0 ) {
            gameObject.x = 1
            gameObject.velX = 0
        }
        if (gameObject.y + gameObject.height >= 130) {
            gameObject.y = 130 - gameObject.height
            gameObject.velY = 0
        }

    
    }
}






// Global Functions
window.mainLoop = function() {
    if(game.gameOn == true) {
        game.loopUpdate()
        game.loopDraw()
        setTimeout(requestAnimationFrame(mainLoop), (1000/maxFPS))
    }
}

function gameOn() {
    console.log('new game')
    window.canvas = document.querySelector('#game-screen')
    window.scrn = canvas.getContext('2d')
    window.game = new Game
    mainLoop(game)
}


$(document).ready(function() {




    // function startGame() {
    //     console.log('game on wayne')
    //     drawGround()
    //     drawRectangle(25, 30, (150 - 15), (140 - 25))

    // }

    function drawRectangle(height, width, x, y) {
        console.log('drawing a rectangle')
        scrn.lineWidth = 1
        scrn.strokeStyle = 'lime'
        scrn.fillStyle = 'lime'
        scrn.beginPath()
        scrn.rect(x, y, width, height)
        scrn.fill()
        scrn.stroke()
        scrn.closePath()

    }

    function drawGround() {
        console.log('drawing the ground')
        scrn.lineWidth = 5
        scrn.strokeStyle = 'lime'
        scrn.beginPath()
        scrn.moveTo(0, 145)
        scrn.lineTo(300, 145)
        scrn.stroke()
        scrn.closePath()
    }




    // Power switch Behavior
    document.querySelector('#power-switch').addEventListener("click", function() {
        console.log('power is clicked')
        if (document.querySelector('#power-light').getAttribute('data-lightOn') == 'true') {
            console.log('power-is-on')
            game.gameOn = false
            document.querySelector('#power-switch').style.transform = 'translateY(0px)'
            $('#power-light').attr('data-lightOn', false)
            mainLoop
            scrn.clearRect(0, 0, canvas.width, canvas.height)

        } else {
            console.log('power-is-off')
            document.querySelector('#power-switch').style.transform = 'translateY(-20px)'
            $('#power-light').attr('data-lightOn', true);
            gameOn()
        }
    })



});