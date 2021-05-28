class Game {
    constructor() {
        this.gameObjects = []
        this.controller = new Controller
        this.initGame()
    }

    initGame() {
        createGround()

    }

    loopDraw() {
        canvas.clearRect(0, 0, canvas.width, canvas.height)
        scrn.lineWidth = 1
        scrn.strokeStyle = 'lime'
        scrn.fillStyle = 'lime'
        this.gameObjects.forEach(gameObj => {
            this.drawObject(gameObj)
        })
        scrn.stroke()
        scrn.fill()
        scrn.closePath()
    }

    drawObject(gamObj) {
        scrn.beginPath()
        scrn.beginPath()
        scrn.rect(gamObj.x, gamObj.y, gamObj.width, gamObj.height)
    }
}

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

class Square extends GameObject {
    constructor(x, y, velX, velY, gravity, width, height) {
        super(x, y, velX, velY, gravity)
        this.width = width
        this.height = height
        this.shape = 'rectangle'
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
    }
    keyUp(event) {
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
    }

}

function initGame() {
    const canvas = document.querySelector('#game-screen')
    const scrn = canvas.getContext('2d')
    const controller = new Controller()
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
            document.querySelector('#power-switch').style.transform = 'translateY(0px)'
            $('#power-light').attr('data-lightOn', false)
            scrn.clearRect(0, 0, canvas.width, canvas.height)
        } else {
            console.log('power-is-off')
            document.querySelector('#power-switch').style.transform = 'translateY(-20px)'
            $('#power-light').attr('data-lightOn', true);
            initGame()
        }
    })



});