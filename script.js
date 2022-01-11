let todoInput //miejsce, gdzie user wprowadza dane
let errorInfo //info o errorze
let addBtn
let ulList //lista zadań
let newTodo
let manageTools

let popup //popup
let popupInfo //tekst w popupie
let todoToEdit //edytowany todos
let popupInput
let popupAddBnt
let popupCloseBtn

const main = () => {
	//wywołanie
	prepareDOMElements()
	prepareDOMEvents()
}
const prepareDOMElements = () => {
	//pobieranie elemntów
	todoInput = document.querySelector('.todo-input')
	errorInfo = document.querySelector('.error-info')
	addBtn = document.querySelector('.btn-add')
	ulList = document.querySelector('.todolist ul')

	popup = document.querySelector('.popup')
	popupInfo = document.querySelector('.popup-info')
	popupInput = document.querySelector('.popup-input')
	popupAddBnt = document.querySelector('.accept')
	popupCloseBtn = document.querySelector('.cancel')
}
const prepareDOMEvents = () => {
	//nasluchiwania
	addBtn.addEventListener('click', addNewTodo)
	ulList.addEventListener('click', checkClick)
	popupAddBnt.addEventListener('click', acceptTodo)
	todoInput.addEventListener('keyup', checkKeyDown) //nasluchiwanie na entera
}
//narzedzia(przyciski)
document.addEventListener('DOMContentLoaded', main) //jeżeli cał DOM zostanie załadowany, dopiero wtedy włącz funkcje main
const createTools = () => {
	const toolSpace = document.createElement('div')
	toolSpace.classList.add('tools')

	newTodo.appendChild(toolSpace)

	const btnComplete = document.createElement('button')
	btnComplete.classList.add('complete')
	btnComplete.innerHTML = '<i class="fas fa-check"></i>'

	const btnEdit = document.createElement('button')
	btnEdit.classList.add('edit')
	btnEdit.textContent = 'EDIT'

	const btnDel = document.createElement('button')
	btnDel.classList.add('delete')
	btnDel.innerHTML = '<i class="fas fa-times"></i>'

	toolSpace.append(btnComplete, btnEdit, btnDel)
}
//dodanie nowego todosa
const addNewTodo = () => {
	if (todoInput.value !== '') {
		newTodo = document.createElement('li')
		newTodo.textContent = todoInput.value
		ulList.append(newTodo)

		createTools()

		//reset
		todoInput.value = ''
		errorInfo.textContent = ''
	} else {
		errorInfo.textContent = 'Type a task!'
	}
}
//accept edytowanego todosa
const acceptTodo = e => {
	if (popupInput.value !== '') {
		todoToEdit.firstChild.textContent = popupInput.value
		popup.style.display = 'none'
	} else {
		popupInfo.textContent = 'Your input is empty'
	}
}
//edycja todosa
const editTodo = e => {
	//funkcja do otwierania popupu
	popup.style.display = 'flex'
	todoToEdit = e.target.closest('li')
	popupInput.value = todoToEdit.firstChild.textContent
}
//zamykanie popupu
const closePopup = () => {
	popup.style.display = 'none'
}
//usuwanie zadanie
const deleteTask = e => {
	ulList.removeChild(e.target.closest('li'))
	const allToDos = ulList.querySelectorAll('li')
	if (allToDos.length === 0) {
		errorInfo.textContent = 'Nothing to do'
	}
}
//sprawdzenie czy kliknieto enter
const checkKeyDown = e => {
	if (e.key === 'Enter') {
		addNewTodo()
	}
}
//obsługa przycisków funkcyjnych
const checkClick = e => {
	if (e.target.matches('.complete')) {
		e.target.closest('li').classList.toggle('completed')
		e.target.classList.toggle('completed')
	} else if (e.target.matches('.edit')) {
		e.target.addEventListener('click', editTodo)
		popupCloseBtn.addEventListener('click', closePopup)
	} else if (e.target.matches('.delete')) {
		e.target.addEventListener('click', deleteTask)
	}
}
