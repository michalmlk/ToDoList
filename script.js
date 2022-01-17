let todoInput //place, where user inserts data
let errorInfo //info bout error
let addBtn
let ulList //list of tasks
let newTodo
let manageTools

let popup
let popupInfo //popup text
let todoToEdit //edited todos
let popupInput
let popupAddBnt
let popupCloseBtn

const main = () => {
	prepareDOMElements()
	prepareDOMEvents()
}
const prepareDOMElements = () => {
	//preparing elements
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
	//preparing events
	addBtn.addEventListener('click', addNewTodo)
	ulList.addEventListener('click', checkClick)
	popupAddBnt.addEventListener('click', acceptTodo)
	todoInput.addEventListener('keyup', checkKeyDown) //enter listener
}
//tools(buttons)
document.addEventListener('DOMContentLoaded', main)
//if DOM will be loaded, then switch on the main
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
	btnEdit.addEventListener('click',editTodo)

	const btnDel = document.createElement('button')
	btnDel.classList.add('delete')
	btnDel.innerHTML = '<i class="fas fa-times"></i>'
	btnDel.addEventListener('click',deleteTask)

	toolSpace.append(btnComplete, btnEdit, btnDel)
}
//adding new todos
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
//accept edited todos
const acceptTodo = e => {
	if (popupInput.value !== '') {
		todoToEdit.firstChild.textContent = popupInput.value
		popup.style.display = 'none'
	} else {
		popupInfo.textContent = 'Your input is empty'
	}
}
//edit todos
const editTodo = e => {
	//popup opening function
	popup.style.display = 'flex'
	todoToEdit = e.target.closest('li')
	popupInput.value = todoToEdit.firstChild.textContent
}
//closing up popup
const closePopup = () => {
	popup.style.display = 'none'
}
//delete task
const deleteTask = e => {
	ulList.removeChild(e.target.closest('li'))
	const allToDos = ulList.querySelectorAll('li')
	if (allToDos.length === 0) {
		errorInfo.textContent = 'Nothing to do'
	}
}
//enter listener
const checkKeyDown = e => {
	if (e.key === 'Enter') {
		addNewTodo()
	}
}
//functional buttons 
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
