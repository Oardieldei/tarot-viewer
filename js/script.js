let fullInfoObject = null

async function loadLayout() {
  try {
    const response = await fetch('./js/test.json')
    if (!response.ok) throw new Error("Ошибка загрузки JSON")
    fullInfoObject = await response.json()
    superStarTer()
  } catch (err) {
    console.error("Ошибка:", err)
  }
}

const calendarDates = document.querySelector('.calendar__dates')

const applyTheme = () => {
	document.body.classList.add(`theme__${fullInfoObject.theme}`)
}

const getNumberOfFirstDay = (y, m) => {
	const chosenDate = new Date(y, m - 1)
	const firstDay = chosenDate.getDay()
	return firstDay === 0 ? 7 : firstDay
}

const getLastDay = (y, m) => {
	let lastDay = new Date(y, m, 0)
	return lastDay.getDate()
}

const getNumberOfLastDay = (y, m) => {
	const chosenDate = new Date(y, m, 0)
	const lastDay = chosenDate.getDay()
	return lastDay === 0 ? 7 : lastDay
}

const createEmptyCellForDay = () => {
	const newCell = document.createElement('div')
	newCell.classList.add('calendar__dates_cell')
	newCell.classList.add('calendar__dates_cell_empty')
	calendarDates.append(newCell)
}

const showForm = (index) => {}

const createCellForDay = (dateNum) => {
	const newCell = document.createElement('div')
	newCell.classList.add('calendar__dates_cell')
	if (dateNum < 10) newCell.classList.add('calendar__dates_cell__short_date')
	newCell.id = `day${dateNum}`
	calendarDates.append(newCell)

	const newCellInfo = document.createElement('div')
	newCellInfo.classList.add('calendar__dates_cell__info')
	newCell.append(newCellInfo)
	newCellInfo.innerText = dateNum

	const newCellCard = document.createElement('div')
	newCellCard.classList.add('calendar__dates_cell__card')
	newCell.append(newCellCard)

	newCell.addEventListener('click', () => {
		showForm(dateNum)
	})
}

const createEmptyCellsBefore = (y, m) => {
	for (let i = 0; i < getNumberOfFirstDay(y, m) - 1; i++) {
		createEmptyCellForDay()
	}
}

const createCells = (y, m) => {
	for (let i = 0; i < getLastDay(y, m); i++) {
		createCellForDay(i + 1)
	}
}

const createEmptyCellsAfter = (y, m) => {
	for (let i = 0; i < 7 - getNumberOfLastDay(y, m); i++) {
		createEmptyCellForDay()
	}
}

const renderCalendar = (y, m) => {
	calendarDates.innerHTML = ''
	createEmptyCellsBefore(y, m)
	createCells(y, m)
	createEmptyCellsAfter(y, m)
}

const renderCards = () => {

}

const superStarTer = () => {
  applyTheme()
  renderCalendar(fullInfoObject.year, fullInfoObject.month)
  renderCards()
}

loadLayout()