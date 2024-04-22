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

//Abaixo funções relacionadas com o local storage
function createRecord(pastSeconds, formatedTime) {
    const record = {
        formatedRec: formatedTime,
        unformatedRec: pastSeconds
    }
    recordList.push(record)
    recordList.sort((a, b) => a.unformatedRec - b.unformatedRec)
    recordListCreator()  
    toLocalStorage()  
}

function recordListCreator() {
    recordListElement.innerHTML = ''
    recordListLenght = recordList.length
    if (recordList.length > 5) {
        recordListLenght = 5
    }
    for (let i = 0; i < recordListLenght; i++) {
        let element = document.createElement('li')
        element.textContent = recordList[i].formatedRec
        let spanBar = document.createElement('span')
        spanBar.textContent = ' - '
        spanBar.classList.add('bar')
        element.append(spanBar)
        recordListElement.append(element)        
    }   
}

function toLocalStorage() {
    localStorage.setItem('recordList', JSON.stringify(recordList))
}

recordListCreator()

//EVENTOS