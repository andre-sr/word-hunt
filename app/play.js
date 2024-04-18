//VARIAVEIS
const btnRestart = document.querySelector('#restart-btn')
const modalElement = document.querySelector('.modal')

let clickCount = true
let firstRow
let firstColumn
let secondRow
let secondColumn

let wordString
let element

let checkedWordList = []
let winningCount = 0

//FUNCOES
function firstClick(e) { //Função que pega a localização da primeira celula clicada por meio do id do elemento
    console.log('teste')
    let stringId = e.srcElement.id
    let numberId = stringId.match(/\d+/g)
    firstRow = parseInt(numberId[0])
    firstColumn = parseInt(numberId[1])
    element = document.querySelector(`#r${firstRow}-c${firstColumn}`)
    element.classList.add('selected-cell')
    clickCount = false
}

function secondClick(e) { //Função que pega a localização da segunda celula clicada por meio do id do elemento
    let stringId = e.srcElement.id
    let numberId = stringId.match(/\d+/g)
    secondRow = parseInt(numberId[0])
    secondColumn = parseInt(numberId[1])
    element.classList.remove('selected-cell')
    clickCount = true

   getWordString()
}

function getWordString() { //Função que retornara uma string formada pelas letras existentes entre as duas celulas que foram clicadas
    let word
    if (word = horizontalCheck()) { // Cada um desses 'ifs' retorna a string nos casos da palavra estar na horizontal, vertical e diagonal respectivamente
        if (chosedWordList.includes(word)) {
            for (let i = firstColumn; i <= secondColumn; i++) {
                const cell = document.querySelector(`#r${firstRow}-c${i}`)
                cell.classList.add('green-cell')  
            }
            let wordOnList = document.querySelector(`#word${chosedWordList.indexOf(word)}`)    
            wordOnList.classList.add('green-word')
            dealWithCount(word) 
        }
    } else if (word = verticalCheck()) {
        if (chosedWordList.includes(word)) {
            for (let i = firstRow; i <= secondRow; i++) {
                const cell = document.querySelector(`#r${i}-c${firstColumn}`)
                cell.classList.add('green-cell')
            }
            let wordOnList = document.querySelector(`#word${chosedWordList.indexOf(word)}`)    
            wordOnList.classList.add('green-word')
            dealWithCount(word) 
        }
    } else if (word = diagonalCheck()) {
        if (chosedWordList.includes(word)) {
            let cont = 0 
            for (let i = firstRow; i <= secondRow; i++) {
                const cell = document.querySelector(`#r${i}-c${firstColumn+cont}`)
                cell.classList.add('green-cell')
                cont = cont + 1
            }
            let wordOnList = document.querySelector(`#word${chosedWordList.indexOf(word)}`)    
            wordOnList.classList.add('green-word')
            dealWithCount(word)
        }
    } else { // Caso as celulas selecionadas retornem uma "linha invalida" esta parte do código será executada
        //wrongAnimation()
        //refazer está animação e a lógica presente nela
    }

    if (winningCount == 12) { 
        endGame()
        console.log('Ganhou!')
    }
    
}

function horizontalCheck() {
    if (firstRow == secondRow) {
        wordString = ''
        if (firstColumn > secondColumn) {
            let temp = firstColumn
            firstColumn = secondColumn
            secondColumn = temp 
        }
        for (let i = firstColumn; i <= secondColumn; i++) {
            wordString = wordString + tableRepresentation[firstRow][i]
        }
        return wordString
    }
    return null
}

function verticalCheck() {
    if (firstColumn == secondColumn) {
        wordString = ''
        if (firstRow > secondRow) {
            let temp = firstRow
            firstRow = secondRow
            secondRow = temp 
        }
        for (let i = firstRow; i <= secondRow; i++) {
            wordString = wordString + tableRepresentation[i][firstColumn]
        }
        return wordString
    }
    return null
}

function diagonalCheck() {
    if (Math.abs(firstRow - secondRow) <= 1 === Math.abs(firstColumn - secondColumn) <= 1) {
        wordString = ''
        let cont = 0
        if (firstRow > secondRow || firstColumn > secondColumn) {
            let temp = firstRow
            firstRow = secondRow
            secondRow = temp 
            temp = firstColumn
            firstColumn = secondColumn
            secondColumn = temp
        }
        for (let i = firstRow; i <= secondRow; i++) {
            wordString = wordString + tableRepresentation[i][firstColumn+cont]
            cont = cont + 1
        }
        return wordString
    } 
    return null
}

function wrongAnimation() {
    tableContainer.style.animation = 'animation 1s'
}

function negativeChange(n1, n2) {
    if (n1 > n2) {
        let temp = n1
        n1 = n2
        n2 = temp 
    }
}

function dealWithCount(word) {
    if (checkedWordList.includes(word)) {

    } else {
        checkedWordList.push(word)
        winningCount = winningCount + 1
        console.log(winningCount)
    }
}

function endGame() {
    modalElement.classList.remove('hidden')
}

function restartGame() {
    tableRepresentation = []
    tableSolution = []
    checkedWordList = []
    winningCount = 0
    createTable()
    startGame()
}

//EVENTOS
btnRestart.addEventListener('click', () => {
    modalElement.classList.add('hidden')
    restartGame()
})