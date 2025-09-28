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

const cardDisplay = document.querySelector('.card-display__wrapper')
const cardDisplayCloser = document.querySelector('.card-display__closing-item')
const cardDisplayImg = cardDisplay.children[0].children[0].children[0]
const cardDisplayInfo = cardDisplay.children[0].children[1]
const cardDisplayInfoDate = cardDisplayInfo.children[0]
const cardDisplayInfoTitle = cardDisplayInfo.children[1]
const cardDisplayInfoColor = cardDisplayInfo.children[2]
const cardDisplayInfoText = cardDisplayInfo.children[3]
const cardDisplayBlock = cardDisplay.children[0]

const createCardImageUrl = (dateNum) => {
	const cardPath = (fullInfoObject.days[dateNum - 1].cardType === 'sa')
		? `./img/cards/${fullInfoObject.deck}/${fullInfoObject.days[dateNum - 1].cardName}.jpg`
		: `./img/cards/${fullInfoObject.deck}/${fullInfoObject.days[dateNum - 1].cardType}-${fullInfoObject.days[dateNum - 1].cardName}.jpg`

	return cardPath
}

const createCardReadableDate = (dateNum) => {
	const readableMonthes = [
		'января',
		'февраля',
		'марта',
		'апреля',
		'мая',
		'июня',
		'июля',
		'августа',
		'сентября',
		'октября',
		'ноября',
		'декабря'
	]

	return `${dateNum} ${readableMonthes[fullInfoObject.month]}`
}

const createCardReadableCardname = (dateNum) => {
	const cardType = fullInfoObject.days[dateNum - 1].cardType
	const cardName = fullInfoObject.days[dateNum - 1].cardName

	const readableCardNums = {
		"01": "Туз",
		"02": "Двойка",
		"03": "Тройка",
		"04": "Четверка",
		"05": "Пятерка",
		"06": "Шестерка",
		"07": "Семерка",
		"08": "Восьмерка",
		"09": "Девятка",
		"10": "Десятка",
		"korol": "Король",
		"koroleva": "Королева",
		"pazh": "Паж",
		"rycar": "Рыцарь"
	}

	const readableSuits = {
		'sa': 'Старший аркан',
		'kubkov': 'кубков',
		'mechei': 'мечей',
		'pentaklei': 'пентаклей',
		'zhezlov': 'жезлов'
	}

	const readableArcans = {
		"00-Shut": "Шут (Дурак)",
		"01-Mag": "Маг",
		"02-Zhrica": "Жрица",
		"03-Imperatrica": "Императрица",
		"04-Imperator": "Император",
		"05-Zhrec": "Жрец",
		"06-Vljublennye": "Влюбленные",
		"07-Kolesnica": "Колесница",
		"08-Spravedlivost": "Справедливость",
		"09-Otshelnik": "Отшельник",
		"10-Koleso-Fortuny": "Колесо фортуны",
		"11-Sila": "Сила",
		"12-Poveshennyj": "Повешенный",
		"13-Smert": "Смерть",
		"14-Umerennost": "Умеренность",
		"15-Diavol": "Дьявол",
		"16-Bashnja": "Башня",
		"17-Zvezda": "Звезда",
		"18-Luna": "Луна",
		"19-Solnce": "Солнце",
		"20-Sud": "Суд",
		"21-Mir": "Мир"
	}

	let resString = ''

	if (cardType === 'sa') {
		resString = `${readableSuits[cardType]}<br>${readableArcans[cardName]}`
	} else {
		resString = `${readableCardNums[cardName]} ${readableSuits[cardType]}`
	}

	return resString
}

const changeColor = (dateNum) => {
	const currColor = fullInfoObject.days[dateNum - 1].color
	const currDesc = fullInfoObject.days[dateNum - 1].description

	cardDisplayInfoColor.children[0].style.setProperty('--card-color', `#${currColor}`)
	cardDisplayInfoColor.children[1].innerText = `Цвет ауры дня. ${currDesc}`
}

const changeText = (dateNum) => {
	if (fullInfoObject.days[dateNum - 1].text === '') {
		cardDisplayInfoText.style.display = 'none'
	} else {
		cardDisplayInfoText.style.display = 'block'
	}
	cardDisplayInfoText.innerHTML = fullInfoObject.days[dateNum - 1].text
}

const changeForm = (dateNum) => {
	const cardPath = createCardImageUrl(dateNum)
	cardDisplayImg.src = cardPath
	cardDisplayInfoDate.innerText = createCardReadableDate(dateNum)
	cardDisplayInfoTitle.innerHTML = createCardReadableCardname(dateNum)
	changeColor(dateNum)
	changeText(dateNum)
}

const changeFormPosition = () => {
	cardDisplayBlock.style.top = '0px'
	const formHeight = cardDisplayBlock.offsetHeight
	const scrollY = window.scrollY
	const windowHeight = window.innerHeight

	if (scrollY + formHeight > scrollY + windowHeight) {
		const adjustedTop = Math.max(0, scrollY + windowHeight - formHeight)
		cardDisplayBlock.style.top = adjustedTop + 'px'
		cardDisplayCloser.style.top = adjustedTop + 'px'
	} else {
		cardDisplayBlock.style.top = scrollY + 'px'
		cardDisplayCloser.style.top = scrollY + 30 + 'px'
	}
}

const showForm = (dateNum) => {
	changeForm(dateNum)
	changeFormPosition()

	requestAnimationFrame(() => {
    cardDisplay.classList.add('show-on')
  })
}

const closeForm = () => {
	cardDisplay.classList.remove('show-on')
}

cardDisplayCloser.addEventListener('click', closeForm)
cardDisplay.addEventListener('click', (e) => {
	if (e.target === cardDisplay) closeForm()
})

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

	const cardPath = createCardImageUrl(dateNum)
	const dayCell = document.getElementById(`day${dateNum}`)
	dayCell.style.boxShadow = `0 0 12px 3px #${fullInfoObject.days[dateNum - 1].color}`

	const cardBlock = dayCell.children[1]
	cardBlock.innerHTML = ''
	const img = document.createElement('img')
	img.src = cardPath
	img.alt = 'Карта'
	img.style.width = '100%'
	img.style.maxHeight = '100%'
	cardBlock.appendChild(img)

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

const superStarTer = () => {
	applyTheme()
	renderCalendar(fullInfoObject.year, fullInfoObject.month)
}

loadLayout()

const wdayWrapper = document.getElementById("what-day__wrapper")
const wdayToggle = wdayWrapper.querySelector(".what-day__toggle")
const wdayInput = document.getElementById("wday-input")
const wdayBtn = document.querySelector(".what-day__btn")

wdayToggle.addEventListener("click", () => {
	const isOpen = wdayWrapper.getAttribute("data-state") === "open"
	wdayWrapper.setAttribute("data-state", isOpen ? "closed" : "open")
})

wdayInput.addEventListener("input", () => {
	wdayInput.value = wdayInput.value.replace(/\D/g, "")
	if (wdayInput.value.length > 2) {
		wdayInput.value = wdayInput.value.slice(0, 2)
	}
})

wdayBtn.addEventListener('click', () => {
	const dayNum = wdayInput.value.trim()
	if (!dayNum) return

	const targetId = `day${dayNum}`
	const targetEl = document.getElementById(targetId)

	if (targetEl) {
		targetEl.scrollIntoView({ behavior: "smooth", block: "center" })
	} else {
		wdayInput.value = ""
	}
})
