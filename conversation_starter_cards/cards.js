'use strict';

/** @constant {Number} The number of cards that will be printed on each page */
const CARDS_PER_PAGE = 6;

	/** {HTMLTextAreaElement} The input field for the cards' text */
let inputField,
	/** {HTMLDivElement} The container element for all the printable cards */
	cardsContainer;

window.onload = function () {
	inputField = document.querySelector('#input-form textarea');
	inputField.oninput = generateCards;
	cardsContainer = document.getElementById('cards-container');
	generateCards();
};

function generateCards() {
	// Clear any old cards.
	cardsContainer.innerHTML = '';
	// Get the latest list.
	let cardsTextList = parseCardsText();
	// Pad it out in case there are not enough to perfectly fill all pages.
	padCardsList(cardsTextList);
	// Add the cards.
	addCardFronts(cardsTextList);
	addCardBacks(cardsTextList);
}

/**
 * Convert the plain text cards list from the form to an array, removing any empty lines.
 * @returns {Array<String>} - The array of the text for each card
 */
function parseCardsText() {
	let input = inputField?.value?.trim();
	if (!input) {
		return [];
	}
	
	let cardsTextList = [];
	for (let cardText of input.split('\n')) {
		let trimmedCardText = cardText.trim();
		if (!trimmedCardText) { continue; }
		cardsTextList.push(trimmedCardText);
	}
	return cardsTextList;
}

/**
 * Pad the card list to be a multiple of 6 so they fill the last page.
 * @param {Array<String>} cardsTextList - The array of the text for each card
 */
function padCardsList(cardsTextList) {
	let extraCardsNeeded = (cardsTextList.length % CARDS_PER_PAGE);
	extraCardsNeeded = (extraCardsNeeded === 0 ? 0 : (CARDS_PER_PAGE - extraCardsNeeded));
	for (let i = 0; i < extraCardsNeeded; i++) {
		cardsTextList.push('');
	}
}

/**
 * Create the elements for all the card fronts and add them to the page.
 * @param {Array<String>} cardsTextList - The array of the text for each card
 */
function addCardFronts(cardsTextList) {
	cardsTextList.forEach((cardText, i) =>
		addCardFront(cardText, i));
}

/**
 * Create a new element for the card front text and add it to the page.
 * @param {String} cardText - The text to add to the card (may include HTML)
 * @param {Number} i - The index on the list
 */
function addCardFront(cardText, i) {
	let card = document.createElement('div');
	card.className = 'card card-front';
	card.innerHTML = cardText + `<span class="card-number">${i + 1}</span>`;
	cardsContainer.appendChild(card);
}

/**
 * Create the elements for all the card backs and add them to the page.
 * @param {Array<String>} cardsTextList - 
 */
function addCardBacks(cardsTextList) {
	cardsTextList.forEach(() =>
		addCardBack());
}

/**
 * Create a new element for a card back and add it to the page.
 */
function addCardBack() {
	let card = document.createElement('div');
	card.className = 'card card-back';
	document.body.appendChild(card);
}
