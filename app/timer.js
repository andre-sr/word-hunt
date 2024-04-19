//VARIAVEIS
const timerElement = document.querySelector('#timer')
const modalTimerElement = document.querySelector('#modal-time')
const recordListElement = document.querySelector('#record-list-element')

let pastSeconds = 0
let intervalId = null

const recordList = JSON.parse(localStorage.getItem('recordList')) || []

//FUNCOES
function timer() {
    pastSeconds += 1
    timerElement.innerHTML = ` ${attTimer()}`
}

function startTimer() {
    pastSeconds = 0
    intervalId = setInterval(timer, 1000)
    timerElement.innerHTML = ` ${attTimer()}`
}

function attTimer() {
    const time = new Date (pastSeconds*1000)
    const formatedTime = time.toLocaleString('pt-br', {minute: '2-digit', second: '2-digit'})
    timerElement.innerHTML = ` ${formatedTime}`
    return formatedTime
}

function stopTimer() {
    modalTimerElement.textContent = `${attTimer()}`
    clearInterval(intervalId)
    intervalId = null
    createRecord(pastSeconds, attTimer())
}

//EVENTOS