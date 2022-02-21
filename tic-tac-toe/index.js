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
const stats = document.querySelector('.stats')
const settings = document.querySelector('.settings')
const settingsWindow = document.querySelector('.settings-window')
const statsWindow = document.querySelector('.stats-window')
const back = document.querySelector('.back')
settingsWindow.classList.add('inactive')
statsWindow.classList.add('inactive')
back.classList.add('inactive')

input.value = ''
let player
let counter = 0;
let playerList = localStorage.getItem('playerList')
let whoWinner
let out
let empty
let theme = localStorage.getItem('theme')
if (theme === null) {
    theme = 1;
}
changeColor(theme)

area.addEventListener('click', e => {
    if (e.target.className == `ceil free color${theme}-1`) {
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
    localStorage.setItem('theme', theme);
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
    }
    out = out.slice(0, 10)
    out = out.sort(function (a, b) {
        return a[0] - b[0]
    })
    out = out.filter(e => {
        return e[1] !== 'undefined'
    })
    console.log(out)
    out.forEach((el, ind) => {
        document.querySelectorAll('.lditm').forEach((e, i) => {
            if (ind === i) {
                e.innerHTML = `${ind+1}st. ${el[2]} (${el[1]}, ${el[0]} steps)`
            }
        })
    })
}

stats.addEventListener('click', function () {
    home()
    statsWindow.classList.remove('inactive')
    statsWindow.classList.add('active')
    settingsWindow.classList.add('inactive')
    settingsWindow.classList.remove('active')
})

settings.addEventListener('click', function () {
    home()
    settingsWindow.classList.remove('inactive')
    settingsWindow.classList.add('active')
    statsWindow.classList.add('inactive')
    statsWindow.classList.remove('active')
})

function home() {
    document.querySelector('.start').classList.remove('active')
    document.querySelector('.start').classList.add('inactive')
    back.classList.remove('inactive')
    back.classList.add('active')
}

back.addEventListener('click', function () {
    statsWindow.classList.remove('active')
    settingsWindow.classList.remove('active')
    settingsWindow.classList.add('inactive')
    statsWindow.classList.add('inactive')
    document.querySelector('.start').classList.add('active')
    document.querySelector('.start').classList.remove('inactive')
    back.classList.add('inactive')
    back.classList.remove('active')
})

function changeColor(num) {
    cleanThemes()
    document.querySelector('header').classList.add(`color${num}-2`)
    document.querySelector('.main').classList.add(`color${num}-3`)
    document.querySelectorAll('.ceil').forEach(e => {
        e.classList.add(`color${num}-1`)
    })
    document.querySelector('footer').classList.add(`color${num}-2`)
}

function cleanThemes() {
    [1, 2, 3].forEach(num => {
        document.querySelector('header').classList.remove(`color${num}-2`)
        document.querySelector('.main').classList.remove(`color${num}-3`)
        document.querySelectorAll('.ceil').forEach(e => {
            e.classList.remove(`color${num}-1`)
        })
        document.querySelector('footer').classList.remove(`color${num}-2`)
    })

}

document.querySelector('.theme1').addEventListener('click', function () {
    theme = 1;
    changeColor(theme)
})

document.querySelector('.theme2').addEventListener('click', function () {
    theme = 2;
    changeColor(theme)
})

document.querySelector('.theme3').addEventListener('click', function () {
    theme = 3;
    changeColor(theme)
})