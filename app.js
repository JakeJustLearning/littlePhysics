$(document).ready(function() {

    function startGame() {
        console.log('game on wayne')
        drawGround()

    }

    function drawRectangle(height, width, x, y) {
        console.log('drawing a rectangle')
        scrn.beginPath()
        scrn.rect()

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

    const canvas = document.querySelector('#game-screen')
    const scrn = canvas.getContext('2d')
    console.log('width is ' + canvas.width)
    console.log('height is ' + canvas.height)

    // Power switch Behavior
    document.querySelector('#power-switch').addEventListener("click", function() {
        console.log('power is clicked')
        if (document.querySelector('#power-light').getAttribute('data-lightOn') == 'true') {
            console.log('power-is-on')
            document.querySelector('#power-switch').style.transform = 'translateY(0px)'
            $('#power-light').attr('data-lightOn', false)
        } else {
            console.log('power-is-off')
            document.querySelector('#power-switch').style.transform = 'translateY(-20px)'
            $('#power-light').attr('data-lightOn', true);
            startGame()
        }
    })



});