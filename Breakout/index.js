const grid = document.querySelector('.grid')
const scoreDisplay = document.querySelector('#score')
const blockWidth = 100
const blockHeight = 20
const user = document.createElement('div')
const ball = document.createElement('div')
const ballDiameter = 20

const startPosition = [230, 10]
const ballStartPosition = [270, 40]
const width = 560
const height = 300


let currentPosition = startPosition
let ballCurrentPosition = ballStartPosition
let ballX = 2
let ballY = 2
let score = 0
let timerId


class Block {
    constructor(xAxis, yAxis) {
        this.bottomLeft = [xAxis, yAxis]
        this.bottomRight = [xAxis + blockWidth, yAxis]
        this.topLeft = [xAxis, yAxis + blockHeight]
        this.topRight = [xAxis + blockWidth, yAxis + blockHeight]
    }
}

const blocks = [
    new Block(10, 270),
    new Block(120, 270),
    new Block(230, 270),
    new Block(340, 270),
    new Block(450, 270),

    new Block(10, 240),
    new Block(120, 240),
    new Block(230, 240),
    new Block(340, 240),
    new Block(450, 240),

    new Block(10, 210),
    new Block(120, 210),
    new Block(230, 210),
    new Block(340, 210),
    new Block(450, 210),
]

function addBlock() {

    for (let i = 0; i < blocks.length; i++) {
        const block = document.createElement('div')
        block.classList.add('block')
        block.style.left = blocks[i].bottomLeft[0] + 'px'
        block.style.bottom = blocks[i].bottomLeft[1] + 'px'
        grid.appendChild(block)
    }
}

function drawUser() {

    user.style.left = currentPosition[0] + 'px'
    user.style.bottom = currentPosition[1] + 'px'
}

function moveUser(e) {
    switch (e.key) {
        case 'ArrowLeft':
            if (currentPosition[0] > 0) {
                currentPosition[0] -= 10
                drawUser()
            }

            break;
        case 'ArrowRight':
            if (currentPosition[0] < width - blockWidth) {
                currentPosition[0] += 10
                drawUser()
            }
            break;
        case 'ArrowUp':
            if (currentPosition[0] < 0) {
                currentPosition[1] += 10
                drawUser()
            }
            break;
        case 'ArrowDown':
            if (currentPosition[0] < height - blockHeight) {
                currentPosition[1] -= 10
                drawUser()
            }
            break;
    }
}

function drawBall() {
    ball.style.left = ballCurrentPosition[0] + 'px'
    ball.style.bottom = ballCurrentPosition[1] + 'px'
}

function moveBall() {
    ballCurrentPosition[0] += ballX
    ballCurrentPosition[1] += ballY
    drawBall()
    checkForCollisions()
}

function changeDirection() {
    if(ballX === 2 && ballY === 2) {
        ballY = -2
        return
    }
    if (ballX === 2 && ballY === -2) {
        ballX = -2
        return
    }
    if (ballX === -2 && ballY === -2) {
        ballY = 2
        return
    }
    if (ballX === -2 && ballY === 2) {
        ballX = 2
        return
    }
}

function checkForCollisions() {
    // check for block collisions
    for (let i = 0; i < blocks.length; i++){
        if (ballCurrentPosition[0] > blocks[i].bottomLeft[0] && 
            ballCurrentPosition[0] < blocks[i].bottomRight[0] &&
            (ballCurrentPosition[1] + ballDiameter) > blocks[i].bottomLeft[1] &&
            ballCurrentPosition[1] < blocks[i].topLeft[1]
        ) {
            const allBlocks = Array.from(document.querySelectorAll('.block'))
            allBlocks[i].classList.remove('block')
            blocks.splice(i, 1)
            changeDirection()
            score++
            scoreDisplay.innerHTML = 'Score: ' + score
        }
        
    }

    // check for user collisions 
    if (
        (ballCurrentPosition[0] > currentPosition[0] && ballCurrentPosition[0] < (currentPosition[0] + blockWidth)) &&
        (ballCurrentPosition[1] > currentPosition[1] && ballCurrentPosition[1] < (currentPosition[1] + blockHeight))
    ) {
        changeDirection()
    }

    // check for wall collisions
    if (ballCurrentPosition[0] > (width - ballDiameter) || 
        ballCurrentPosition[1] >= (height - ballDiameter) ||
        ballCurrentPosition[0] <= 0) {
        changeDirection()
    }

    // check for win 
    if (blocks.length === 0) {
        scoreDisplay.innerHTML = 'You won!'
        clearInterval(timerId)
        document.removeEventListener('keydown', moveUser)
    }


    if(ballCurrentPosition[1] <= 0) {
        clearInterval(timerId)
        scoreDisplay.innerHTML = 'You lose'
        document.removeEventListener('keydown', moveUser)
    }
}

addBlock()

user.classList.add('user')
drawUser()
grid.appendChild(user)


ball.classList.add('ball')
drawBall()
grid.appendChild(ball)

document.addEventListener('keydown', moveUser)
timerId = setInterval(moveBall, 30)
