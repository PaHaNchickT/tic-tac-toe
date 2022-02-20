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
const h1 = document.querySelector('h1')
const h2 = document.querySelector('h2')
let counter = 0;

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
        }
        if (ceilO.includes(elem) === true) {
            final('O')
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
}

again.addEventListener('click', function () {
    again.classList.add('clicked')
    location.reload();
})