const $start = document.querySelector('#start')
const $game = document.querySelector('#game')
const $time = document.querySelector('#time')
const $result = document.querySelector('#result')
const $timeHeader = document.querySelector('#time-header')
const $resultHeader = document.querySelector('#result-header')
const $gameTime = document.querySelector('#game-time')

let score = 0
let isGameStarted = false
let colors = ['red','blue','green','pink','gray','yellow','brown','silver']

$start.addEventListener('click',startGame)
$game.addEventListener('click',handleBoxClick)
$gameTime.addEventListener('input',setGetTime)

function startGame() {
    score = 0
    setGetTime()
    $gameTime.setAttribute('disabled','true')
    isGameStarted = true
    $game.style.backgroundColor = '#fff'
    hide(start)
    //$start.classList.add('hide')

    const interval = setInterval(function() {
        const time = parseFloat($time.textContent)

        if(time <= 0) {
            clearInterval(interval)
            endGame()
        } else {
            $time.textContent = (time - 0.1).toFixed(1)
        }

    }, 100)

    renderBox()
}

function snow($el) {
    $el.classList.remove('hide')
}

function hide($el) {
    $el.classList.add('hide')
}

function endGame() {
    isGameStarted = false
    setGameScore()
    $gameTime.removeAttribute('disabled')
    $start.classList.remove('hide')
    $game.innerHTML = ''
    $game.style.backgroundColor = '#ccc'
    hide($timeHeader)
    //$timeHeader.classList.add('hide')
    snow($resultHeader)
    //$resultHeader.classList.remove('hide')
}

function setGameScore() {
    $result.textContent = score.toString()
}

function setGetTime() {
    let time = +$gameTime.value // + или parseInt() - приводят к числу
    $time.textContent = time.toFixed(1)
    snow($timeHeader)
    //$timeHeader.classList.remove('hide')
    hide($resultHeader)
    //$resultHeader.classList.add('hide')
}

function handleBoxClick(event) {
   if(!isGameStarted) {
       return
   }

   if(event.target.dataset.box) {
        score++
        renderBox()
    }
}

function renderBox() {
    $game.innerHTML = ''
    const box = document.createElement('div')
    const boxSize = getRamdom(30,100)
    const gameSize = $game.getBoundingClientRect()
    const maxTop = gameSize.height - boxSize
    const maxLeft = gameSize.width - boxSize
    const randomColorIndex = getRamdom(0,colors.length)

    box.style.height = box.style.width = boxSize + 'px'
    box.style.position = 'absolute'
    box.style.backgroundColor = colors[randomColorIndex]
    box.style.top = getRamdom(0,maxTop) +'px'
    box.style.left = getRamdom(0,maxLeft) + 'px'
    box.style.cursor = 'pointer'
    box.setAttribute('data-box','true')

    $game.insertAdjacentElement("afterbegin",box)
}

function getRamdom(min,max) {
    return Math.floor(Math.random() * (max - min) + min)
}


