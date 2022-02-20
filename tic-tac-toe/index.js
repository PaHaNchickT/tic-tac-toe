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

area.addEventListener('click', e => {
    if (e.target.className == 'ceil free') {
        e.target.classList.remove('free')
        if (symbol === 0) {
            e.target.classList.remove('O')
            e.target.classList.add('X')
            symbol = 1
        } else {
            e.target.classList.add('O')
            e.target.classList.remove('X')
            symbol = 0
        }
    }
    play();
})

function play() {
    let ceil = document.querySelectorAll('.ceil')
    let ceilX = []
    let ceilO = []
    ceil.forEach((el, i) => {
        if (el.className.slice(el.className.length-1, el.className.length) === 'X') {
            ceilX.push(i)
        }
        if (el.className.slice(el.className.length-1, el.className.length) === 'O') {
            ceilO.push(i)
        }
    })
    ceilX = String(ceilX)
    ceilO = String(ceilO)
    combo.forEach(elem => {
        if (ceilX.includes(elem) === true) {
            alert('X wins')
        }
        if (ceilO.includes(elem) === true) {
            alert('O wins')
        }
    })
    // console.log(String(ceilX))
    // console.log(String(ceilO))
}
