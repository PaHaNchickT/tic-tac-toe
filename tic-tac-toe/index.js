const area = document.querySelector('.game-area');
let symbol = 0;
const combo = [
    '0,1,2',
    '3,4,5',
    '6,7,8',
    '0,3,6',
    '1,4,7',
    '2,5,8',
    '0,4,8',
    '2,4,6'
]
const bg = document.querySelector('.bg')
const retry = document.querySelector('.retry')
const again = document.querySelector('.again')
const h1 = document.querySelector('.h1')
const h2 = document.querySelector('h2')
const input = document.querySelector('input')
const start = document.querySelector('.go')
input.value = ''
let player
let counter = 0;
let playerList = localStorage.getItem('playerList')
let whoWinner
let out

let LSplayer = localStorage.getItem('player')
let LSwinner = localStorage.getItem('winner')
let LScounter = localStorage.getItem('counter')

area.addEventListener('click', e => {
    if (e.target.className == 'ceil free') {
        e.target.classList.remove('free')
        if (symbol === 0) {
            e.target.classList.remove('O')
            e.target.classList.add('X')
            symbol = 1
            counter++
        } else {
            e.target.classList.add('O')
            e.target.classList.remove('X')
            symbol = 0
            counter++
        }
    }
    play();
})

function play() {
    let ceil = document.querySelectorAll('.ceil')
    let ceilX = []
    let ceilO = []
    ceil.forEach((el, i) => {
        if (el.className.slice(el.className.length - 1, el.className.length) === 'X') {
            ceilX.push(i)
        }
        if (el.className.slice(el.className.length - 1, el.className.length) === 'O') {
            ceilO.push(i)
        }
    })
    ceilX = String(ceilX)
    ceilO = String(ceilO)
    combo.forEach(elem => {
        if (ceilX.includes(elem) === true) {
            final('X')
            whoWinner = 'X'
        }
        if (ceilO.includes(elem) === true) {
            final('O')
            whoWinner = 'O'
        }
    })
}

function final(win) {
    bg.classList.add('active')
    bg.classList.remove('inactive')
    retry.classList.add('active')
    retry.classList.remove('inactive')
    h1.innerHTML = `${win} wins`
    h2.innerHTML = `during ${counter} steps`
    document.querySelector('.settings').classList.add('inactive')
    document.querySelector('.stats').classList.add('inactive')
}

again.addEventListener('click', function () {
    again.classList.add('clicked')
    document.location.reload()
})

start.addEventListener('click', function () {
    startButton()
})

input.addEventListener('keydown', function (event) {
    if (event.code === 'Enter') {
        input.blur()
        startButton()
    }
})

function startButton() {
    if (input.value === '' || input.value.includes(',')) {
        input.classList.add('input-error')
        input.value = ''
    } else {
        player = input.value
        bg.classList.remove('active')
        bg.classList.add('inactive')
        document.querySelector('.start').classList.add('inactive')
    }
}

function setLocalStorage() {
    localStorage.setItem('player', player);
    localStorage.setItem('counter', counter);
    localStorage.setItem('symbol', whoWinner);
}
window.addEventListener('beforeunload', setLocalStorage)

function getLocalStorage() {
    if (localStorage.getItem('player') && localStorage.getItem('counter')) {
        leaderBoard(localStorage.getItem('player'), localStorage.getItem('counter'), localStorage.getItem('symbol'))
    }
}
window.addEventListener('load', getLocalStorage)

function leaderBoard(player, counter, winner) {
    if (playerList === null) {
        playerList = []
    }
    if (typeof playerList == typeof 'jopa') {
        playerList = playerList.split(',')
    }
    if (player !== undefined && counter != 0) {
        playerList.unshift(player)
        playerList.unshift(winner)
        playerList.unshift(counter)
        localStorage.setItem('playerList', playerList);
    }

    if (out == undefined) {
        out = []
    }

    if (playerList !== null && playerList.length > 0) {
        let temp = []
        playerList.forEach((e, i) => {
            temp.push(e)
            if (i !== 0 && (i + 1) % 3 === 0) {
                out.push(temp)
                temp = []
            }
        })
        // if (out.length > 10) {
        //     out = out.slice(0, 10)
        // }
    }
    out = out.slice(0,10)
    out = out.sort(function(a,b) {
        return a[0] - b[0]
    })
    console.log(out)
}