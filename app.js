window.maxFPS = 30
window.lastFrameTimeMS = Date.now()
    // HARDWARE CLASSES

class Game {
    constructor() {
        this.gameObjects = []
        this.controller = new Controller
        this.physics = new Engine
        this.gameOn = true

        this.initGame()
    }

    initGame() {
        this.createWorld()
        this.createPlayer()
    }

    // LOGICING

    loopUpdate() {
        // console.log('logicing')
        this.applyPlayerInput()
        this.physics.run(this.gameObjects.filter(gameObj => gameObj.controlling == true))
    }


    applyPlayerInput() {
        const inputs = this.controller.getInputs()
        this.gameObjects.filter(gameObj => gameObj.controlling == true)
            .forEach(gameObj => {
                gameObj.velX -= inputs[0] ? 1 : 0
                gameObj.velY += inputs[0] ? 1 : 0
                gameObj.VelX += inputs[0] ? 1 : 0
                gameObj.VelY -= inputs[0] ? 1 : 0
            })


    }

    // RENDERING
    loopDraw() {
        // console.log('drawing')
        scrn.clearRect(0, 0, canvas.width, canvas.height)

        this.gameObjects.forEach(gameObj => {
            this.drawObject(gameObj)
        })

    }

    drawObject(gamObj) {
        scrn.lineWidth = 4
        scrn.strokeStyle = 'lime'
        scrn.fillStyle = 'lime'
        scrn.beginPath()
        scrn.beginPath()
        scrn.rect(gamObj.x, gamObj.y, gamObj.width, gamObj.height)
        scrn.stroke()
        scrn.fill()
        scrn.closePath()
    }
    createWorld() {
        const ground = new Rectangle(0, 145, 0, 0, false, canvas.width, 10)
        this.gameObjects.push(ground)
    }
    createPlayer() {
        const player = new Player(100, 110, 0, 0, true, 25, 30)
        this.gameObjects.push(player)
    }
}
// CONTROLS
class Controller {
    constructor() {
        this.left = false
        this.right = false
        this.down = false
        this.up = false
        window.addEventListener('keydown', this.keyDown)
        window.addEventListener('keyup', this.keyUp)
    }

    keyDown(event) {
        // if (document.getElementById('play-space').getAttribute('focus-within')) {
        console.log(event.code)
        switch (event.keyCode) {
            case 37:
                this.left = true;
                break
            case 39:
                this.right = true
                break
            case 38:
                this.up = true
                break
            case 40:
                this.down = true
                break
            default:
                break
        }
        event.preventDefault()
            // }
    }
    keyUp(event) {
        // if (document.getElementById('play-space').getAttribute('focus-within')) {
        console.log(event.code)
        switch (event.keyCode) {
            case 37:
                this.left = false
                break
            case 39:
                this.right = false
                break
            case 38:
                this.up = false
                break
            case 40:
                this.down = false
                break
            default:
                break
        }
        event.preventDefault()
            // }
    }

    getInputs() {
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
        this.shap = ''

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
        this.gravity = 1.5
    }
    run(gameObjects) {
        gameObjects.forEach(gameObj => {
            this.yMovement(gameObj)
            this.xMovement(gameObj)
            this.friction(gameObj);
            (gameObj.gravity) ? this.gravity(gameObj): console.log('nograv');
            if (gameObj.y + gameObj.height > 145) {
                gameObj.y = 145 - gameObj.height
                gameObj.VelY = 0
            }
        })

    }

    yMovement(gameObject) {
        gameObject.y += gameObject.velY
    }

    xMovement(gameObject) {
        gameObject.x += gameObject.velX

    }
    friction(gameObject) {
        gameObject.velX *= 0.8
        gameObject.velY *= 0.9
    }

    gravity(gameObject) {
        gameObject.velY -= 1.5
    }

}






// Global Functions
window.mainLoop = function() {
    game.loopUpdate()
    game.loopDraw()
    setTimeout(requestAnimationFrame(mainLoop), (1000 / maxFPS))
}

function gameOn() {
    console.log('new game')
    window.canvas = document.querySelector('#game-screen')
    window.scrn = canvas.getContext('2d')
    window.game = new Game
        // mainLoop(game)
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
            scrn.clearRect(0, 0, canvas.width, canvas.height)
        } else {
            console.log('power-is-off')
            document.querySelector('#power-switch').style.transform = 'translateY(-20px)'
            $('#power-light').attr('data-lightOn', true);
            gameOn()
        }
    })



});