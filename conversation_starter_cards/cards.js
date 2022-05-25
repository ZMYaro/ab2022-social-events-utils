'use strict';

/** @constant {Number} The number of cards that will be printed on each page */
const CARDS_PER_PAGE = 6;

window.onload = addCards;

function addCards() {
	let cardsTextList = parseCardsText();
	padCardsList(cardsTextList);
	addCardFronts(cardsTextList);
	addCardBacks(cardsTextList);
}

/**
 * Convert the plain text cards list from index.html to an array, removing any empty lines.
 * This has *some* amount of error handling for people messing up the `CARDS_TEXT` array.
 * @returns {Array<String>} - The array of the text for each card
 */
function parseCardsText() {
	if (!CARDS_TEXT) {
		alert('The “CARDS_TEXT” list was removed or damaged in edit_this_to_change_the_cards.js!');
		return [];
	}
	let cardsTextList = [];
	for (let cardText of CARDS_TEXT.split('\n')) {
		let trimmedCardText = cardText.trim();
		if (!trimmedCardText) { continue; }
		cardsTextList.push(trimmedCardText);
	}
	if (cardsTextList.length === 0) {
		alert('No card text was found in edit_this_to_change_the_cards.js!');
		return [];
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
	document.body.appendChild(card);
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
