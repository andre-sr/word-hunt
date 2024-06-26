//VAR
const tableContainer = document.querySelector('#table-container')
const btnStart = document.querySelector('#start')
const ulElement = document.querySelector('.word-list')

let tableSizeRow = 17;
let tableSizeColumn = 17;
let tableRepresentation = [];
let tableSolution = [];

const wordList = [
    "banana", "carro", "cachorro", "computador", "lua", "bicicleta", "sol", "gato", "livro", "montanha",
    "chocolate", "elefante", "avião", "jardim", "telefone", "piano", "sorvete", "praia", "foguete",
    "eletricidade", "dinossauro", "navio", "chá", "sapato", "cadeira", "escola", "planeta", "microfone",
    "borboleta", "aranha", "macaco", "tigre", "leão", "bola", "uva", "morango", "pera", "abacaxi", "laranja",
    "limão", "pêssego", "kiwi", "melancia", "melão", "goiaba", "maçã", "cenoura", "beterraba", "alface",
    "avestruz", "quadro", "cachecol", "laptop", "camisa", "caneta", "violão", "espada", "amendoim", "tubarão",
    "papagaio", "teclado", "espelho", "almofada", "colher", "travesseiro", "tênis", "cometa", "almofada", "travesseiro",
    "quadro", "vela", "escova", "pincel", "girafa", "escorregador", "pijama", "piscina", "escova", "espelho",
    "mochila", "fantasia", "lápis", "hidratante", "fotografia", "caixa", "pente", "joaninha", "picolé", "diamante","abacate", "helicóptero", "leopardo", "gorila", "orangotango", "pinguim", "baleia", "golfinho", "tartaruga",
    "lobo", "raposa", "urso", "veado", "javali", "esquilo", "castor", "lontra", "morcego", "coruja", "golfinho", "tartaruga", "veado", "lobo", "raposa", "esquilo", "lontra", "morcego", "panda", "canguru",
    "tamanduá", "suricato", "chimpazé", "antílope", "marmota", "camaleão", "doninha", "texugo", "coiote",
    "sagui", "quati", "rinoceronte", "hipopótamo", "zebra", 
];
const wordListBug = ["pneu", "poggers", "pé", "chat", "inca", "corvo", "topo", "fogo", "copo", "ovo"]  

let chosedWordList = []

//FUNCTIONS
function createTable() { //função responsavel por criar os elementos HTML da table, além depreencher as duas arrays usadas no jogo
    tableContainer.innerHTML = ''
    let table = document.createElement('table')

    for (let rowNumber = 0; rowNumber < tableSizeRow; rowNumber++) {
        let rowRepresenntation = []
        let rowSolution = []
        const row = document.createElement('tr')
        for (let columnNumber = 0; columnNumber < tableSizeRow; columnNumber++) {
            rowRepresenntation.push('0')
            rowSolution.push('0')
            const cell = document.createElement('td')
            cell.id = `r${rowNumber}-c${columnNumber}`
            cell.textContent = `‎`
            row.append(cell)
        }
        table.append(row)
        tableRepresentation.push(rowRepresenntation)
        tableSolution.push(rowSolution)
    }
    tableContainer.append(table)
}

function attTableElement() { //função usada para atualizar a parte visual da table baseada na array tableRepresentation
    for (let rowNumber = 0; rowNumber < tableSizeRow; rowNumber++) {
        for (let columnNumber = 0; columnNumber < tableSizeRow; columnNumber++) {
            let cellElement = document.querySelector(`#r${rowNumber}-c${columnNumber}`)

            cellElement.textContent = tableRepresentation[rowNumber][columnNumber]
            if (tableRepresentation[rowNumber][columnNumber] === tableSolution[rowNumber][columnNumber]) {
                //cellElement.style.background = 'blue'
            }
        }
    }
}

function randomFiller() { //função responsavel por identificar as celular que não possuem palavras nela e sortear um letra para preenche-la
    for (let rowNumber = 0; rowNumber < tableSizeRow; rowNumber++) {
        for (let columnNumber = 0; columnNumber < tableSizeRow; columnNumber++) {
           if (tableRepresentation[rowNumber][columnNumber] === '0') {
                tableRepresentation[rowNumber][columnNumber] = getRandomLetter()
           }
        }
    }
}

function getRandomLetter() { //precisa explicar?!
    randomNumber = Math.floor(Math.random() * 26)
    randomLetter = String.fromCharCode(97 + randomNumber)
    return randomLetter
}

function choseWord() { //função responsavel por sortear as 12 palavras que serão usadas no jogo
    chosedWordList = []
    for (let i = 0; i < 12; i++) {
        let chosedWordN = Math.floor(Math.random() * wordList.length)
        let chosedWord = wordList[chosedWordN]

        while (chosedWordList.includes(chosedWord)){
            chosedWordN = Math.floor(Math.random() * wordList.length)
            chosedWord = wordList[chosedWordN]
        }    
        chosedWordList.push(chosedWord)
    }
}

function attWordListElement() { //função responsavel por atualizar a lista de palavras no lado direito da tela
    ulElement.innerHTML = ''
    for (let i = 0; i < chosedWordList.length; i++) {
        li = document.createElement('li')
        li.textContent = chosedWordList[i]
        li.classList.add('word')
        li.id = `word${i}`
        ulElement.append(li)
    }
}

function wordPlacement() { //função responsavel por posicionar as palavras selecionadas na tableSolution
    for (let x = 0; x < chosedWordList.length; x++) {
        var test = false
        var trueTest = true
        let chosedWordString = chosedWordList[x] 
        let rowNumber 
        let columnNumber

        while (test == false && x < 4) { //nô que cuida do posicionamento das palavras na horizontal
            rowNumber = Math.floor(Math.random() * tableSizeRow)
            columnNumber  = Math.floor(Math.random() * tableSizeColumn)

            if (tableSizeRow - columnNumber >= chosedWordString.length) {
                test = true
                trueTest = true
                for (let i = 0; i < chosedWordString.length; i++) {
                    if (tableSolution[rowNumber][columnNumber+i] !== '0') {
                        test = false
                    }
                    if (tableSolution[rowNumber][columnNumber+i] === chosedWordString[i]) {
                        test = true
                    }
                    if (test === false) {
                        trueTest = false
                    }
                    test = trueTest
                } 
                if (test === true && trueTest === true) {
                    for (let i = 0; i < chosedWordString.length; i++) {
                        tableSolution[rowNumber][columnNumber+i] = chosedWordString[i]
                    }
                }
            }
        }

        while (test == false && x > 3 && x < 8) { //nô que cuida do posicionamento das palavras na vertical
            rowNumber = Math.floor(Math.random() * tableSizeRow)
            columnNumber  = Math.floor(Math.random() * tableSizeColumn)
            
            if (tableSizeColumn - rowNumber >= chosedWordString.length) {
                test = true
                trueTest = true
                for (let i = 0; i < chosedWordString.length; i++) {
                    if (tableSolution[rowNumber+i][columnNumber] !== '0') {
                        test = false
                    }
                    if (tableSolution[rowNumber+i][columnNumber] === chosedWordString[i]) {
                        test = true
                    }
                    if (test === false) {
                        trueTest = false
                    }
                    test = trueTest
                } 
                if (test === true && trueTest === true) {
                    for (let i = 0; i < chosedWordString.length; i++) {
                        tableSolution[rowNumber+i][columnNumber] = chosedWordString[i]
                    }
                } 
            }
        }

        var contError = 0
        while (test == false && x > 7 && x < 12) { //nô responsavel pelo posicionamento das palavras na diagonal
            rowNumber = Math.floor(Math.random() * tableSizeRow)
            columnNumber  = Math.floor(Math.random() * tableSizeColumn)

            if (tableSizeColumn - rowNumber >= chosedWordString.length && tableSizeRow - columnNumber >= chosedWordString.length) {
                test = true
                trueTest = true
                for (let i = 0; i < chosedWordString.length; i++) {
                    if (tableSolution[rowNumber+i][columnNumber+i] !== '0') {
                        test = false
                    }
                    if (tableSolution[rowNumber+i][columnNumber+i] === chosedWordString[i]) {
                        test = true
                    }
                    if (test === false) {
                        trueTest = false
                    }
                    test = trueTest
                } 
                if (test === true && trueTest === true) {
                    for (let i = 0; i < chosedWordString.length; i++) {
                        tableSolution[rowNumber+i][columnNumber+i] = chosedWordString[i]
                    }
                }
                contError = contError + 1
                if (contError > 100) {               
                    let chosedWordN = Math.floor(Math.random() * wordListBug.length)
                    let newWord = wordListBug[chosedWordN]         
                    chosedWordList[x] = newWord
                    chosedWordString = chosedWordList[x] 
                    contError = 0
                }
            }
        }
    }
    tableSolutionToTableRepresentation()
}

function tableSolutionToTableRepresentation() {
    for (let rowNumber = 0; rowNumber < tableSizeRow; rowNumber++) {
        for (let columnNumber = 0; columnNumber < tableSizeRow; columnNumber++) {
            if (tableSolution[rowNumber][columnNumber] !== '0') {
                tableRepresentation[rowNumber][columnNumber] = tableSolution[rowNumber][columnNumber]
            } 
        }
    }
}

function eventListenerCreator() { //função responsavel por criar os event listener para todas as celulas do table
    for (let rowNumber = 0; rowNumber < tableSizeRow; rowNumber++) {
        for (let columnNumber = 0; columnNumber < tableSizeRow; columnNumber++) {
            const cell  = document.querySelector(`#r${rowNumber}-c${columnNumber}`)
            cell.addEventListener('click', (e) => {
                if (clickCount === true) { // as funções e a variavei presente neste if, estão escritas no arquivo pĺay.js
                    firstClick(e)      
                } else {
                    secondClick(e)                 
                } 
            })    
        }
    }
}

function startGame() {
    choseWord()
    wordPlacement() 
    randomFiller()
    attTableElement()
    eventListenerCreator()
    attWordListElement()
    startTimer()
}

//EVENTS
btnStart.addEventListener('click', () => {
    btnStart.textContent = 'Restart'
    restartGame()
})


//AO CARREGAR A PÁGINA
createTable()