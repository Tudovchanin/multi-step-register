const step = document.querySelectorAll('.step')

const topicsModule = (function () {
	// Приватная переменная для хранения тем
	let arrTopics = [];

	// Приватная функция для добавления темы
	function addTopic(topic) {
		arrTopics.push(topic);
	}

	// Публичный метод для получения тем
	function getTopics() {
		return arrTopics;
	}

	// Возвращаем объект, содержащий публичные методы
	return {
		addTopic: addTopic,
		getTopics: getTopics
	};
})();

function firstChecking(event) {
	event.preventDefault();

	if (!emailChecking(getDataEmail()) || !nameChecking(getDataName())) {
		if (!emailChecking(getDataEmail()) && !nameChecking(getDataName())) {
			activateErrorName()
			activateErrorEmail()
		}
		return;
	}
	showEmail(getDataEmail());
	showName(getDataName());
	switcheForm(step[0], step[1])
	activeIcone(1)
}

function secondCheck(event) {
	event.preventDefault();
	if (topicsModule.getTopics().length === 0) {
		return;
	}
	showTopics(topicsModule.getTopics())
	switcheForm(step[1], step[2])
	activeIcone(2)
}

function ChangeBackgroundColor(btn, event) {
	event.preventDefault();
	btn.classList.toggle('hover');
	btn.classList.toggle('btn-active');
	const topics = btn.textContent;
	saveTopics(topicsModule.getTopics(), topics)
}

function getDataEmail() {
	const userEmail = document.getElementById('email').value;
	return userEmail;
}
function getDataName() {
	const userName = document.getElementById('username').value;
	return userName
}

function emailChecking(email) {
	const emailPattern = /[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}/;
	if (!emailPattern.test(email)) {
		activateErrorEmail()
		return false;
	}
	deactivateErrorEmail()
	return true;
}
function nameChecking(name) {
	const errorName = document.querySelector('.error-name');
	if (!(name.trim().length > 0)) {
		activateErrorName()
		return false;
	}
	deactivateErrorName()
	errorName.classList.remove('error-active')
	return true;
}


function showName(value) {
	let name = document.querySelector('.username');
	name.textContent = value;
}
function showEmail(value) {
	let email = document.querySelector('.email');
	email.textContent = value;
}

function showTopics(arrValuue) {
	let topics = document.querySelectorAll('.user-topics');
	topics.forEach((element, index) => {
		if (arrValuue[index] !== undefined) {
			element.textContent = `● ${arrValuue[index]}`
		}
	});
}


function saveTopics(arr, topics) {
	if (arr.includes(topics)) {
		const index = arr.indexOf(topics);
		arr.splice(index, 1);
		return false;
	}
	arr.push(topics);
}


function switcheForm(current, next) {
	current.classList.add('hidden');
	next.classList.remove('hidden');
}

function activeIcone(order) {
	console.log(order);
	const icon = document.querySelectorAll('.icon');
	const serialNumber = document.querySelector('.number-step');
	icon[order].classList.toggle('icon-active');
	serialNumber.textContent = order + 1
}

function activateErrorName() {
	const errorName = document.querySelector('.error-name');
	errorName.classList.add('error-active')
}
function deactivateErrorName() {
	const errorName = document.querySelector('.error-name');
	errorName.classList.remove('error-active')
}
function activateErrorEmail() {
	const errorEmail = document.querySelector('.error-email');
	errorEmail.classList.add('error-active')
}


function deactivateErrorEmail() {
	const errorEmail = document.querySelector('.error-email');
	errorEmail.classList.remove('error-active')
}