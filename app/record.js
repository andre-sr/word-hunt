//VARIAVEIS
const recordListElement = document.querySelector('#record-list-element')
const recordList = JSON.parse(localStorage.getItem('recordList')) || []

//FUNÇÕES
function recordListCreator() {
    recordListElement.innerHTML = ''
    recordListLenght = recordList.length
    /*if (recordList.length > 5) {
        recordListLenght = 5
    }*/
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


recordListCreator()
//EVENTOS