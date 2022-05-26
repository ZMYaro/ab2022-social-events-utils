'use strict';

/** {Number} The number of squares on a board minus the free space */
const BOARD_SQUARES = 24;

	/** {HTMLTextAreaElement} The input field for the number of boards */
let countInputField,
	/** {HTMLTextAreaElement} The input field for the tropes text */
	tropesInputField,
	/** {HTMLDivElement} The container element for all the printable bingo board pages */
	bingoPagesContainer;

/**
 * Shuffle the array in a quick, not perfectly random, but good enough manner.
 */
Array.prototype.lazyShuffle = function () {
	return this.sort(() => Math.random() < 0.5 ? -1 : 1);
};

window.onload = function () {
	countInputField = document.querySelector('#input-form input[type="number"]');
	tropesInputField = document.querySelector('#input-form textarea');
	countInputField.oninput = generateBingoPages;
	tropesInputField.oninput = generateBingoPages;
	bingoPagesContainer = document.getElementById('bingo-pages-container');
	generateBingoPages();
};

function generateBingoPages() {
	// Clear any old board pages.
	bingoPagesContainer.innerHTML = '';
	
	// Get the number of boards to generate.
	let boardsCount = parseInt(countInputField.value) || 0;
	// Get the latest tropes list.
	let tropesList = parseTropesText();
	
	// If there are not enough tropes to fill a board, quit.
	if (tropesList.length < BOARD_SQUARES || boardsCount === 0) {
		return;
	}
	
	// Generate a random selection of boards.
	let boardsList = getRandomBoards(tropesList, boardsCount);
	
	addBingoPageFronts(boardsList);
	addBingoPageBacks(boardsList);
}

/**
 * Convert the plain text tropes list from the form to an array, removing any empty lines.
 * @returns {Array<String>} - The array of the text of each trope
 */
function parseTropesText() {
	let input = tropesInputField?.value?.trim();
	if (!input) {
		return [];
	}
	
	let tropesList = [];
	for (let tropeText of input.split('\n')) {
		let trimmedTropeText = tropeText.trim();
		if (!trimmedTropeText) { continue; }
		tropesList.push(trimmedTropeText);
	}
	return tropesList;
}

/**
 * Generate a number of unique random bingo boards.
 * @param {Array<String>} tropesList - The array of the text of each trope
 * @param {Number} boardsCount - The number of boards to generate
 * @returns {Array<Array<String>>} - The list of the individual trope lists for all the boards
 */
function getRandomBoards(tropesList, boardsCount) {
	let boardsList = [], // The actual list of tropes for each board.
		stringifiedBoards = []; // Stringified trope lists for quick duplicate checking.
	
	for (let i = 0; i < boardsCount; i++) {
		let boardList,
			stringifiedBoard;
		do {
			// Generate a random board that is not a duplicate.
			boardList = tropesList.lazyShuffle().slice(0, BOARD_SQUARES);
			stringifiedBoard = JSON.stringify(boardList);
		} while (stringifiedBoards.includes(stringifiedBoard));
		
		// Add the new board to the list.
		boardsList.push(boardList);
		stringifiedBoards.push(stringifiedBoard);
	}
	
	return boardsList;
}

/**
 * Create and add all the possible bingo boards.
 * @param {Array<Array<String>>} boardsList - The list of the individual trope lists for all the boards
 */
function addBingoPageFronts(boardsList) {
	boardsList.forEach((boardTropes) =>
		addBingoPageFront(boardTropes));
}

/**
 * Create the element for a new page front and add it.
 * @param {Array<String>} boardTropes - The list of tropes to show on the board, in order
 */
function addBingoPageFront(boardTropes) {
	var page = document.createElement('div');
	page.className = 'bingo-page bingo-page-front';
	page.innerHTML = `
		<h1 class="heading">Anime Trop<span class="heading-last-letter">e</span></h1>
		${getBingoTableHTML(boardTropes)}
		<img src="footer_ab_logo.png" alt="Anime Boston" class="footer-logo" />`;
	bingoPagesContainer.appendChild(page);
}

/**
 * Generate the HTML for the bingo table itself.
 * @param {Array<String>} boardTropes - The list of tropes to show on the board, in order
 * @returns {String} - The HTML to add to the page
 */
function getBingoTableHTML(boardTropes) {
	return `<table class="bingo-table">
		<thead>
			<tr>
				<th>B</th>
				<th>I</th>
				<th>N</th>
				<th>G</th>
				<th>O</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td>${boardTropes[0]}</td>
				<td>${boardTropes[1]}</td>
				<td>${boardTropes[2]}</td>
				<td>${boardTropes[3]}</td>
				<td>${boardTropes[4]}</td>
			</tr>
			<tr>
				<td>${boardTropes[5]}</td>
				<td>${boardTropes[6]}</td>
				<td>${boardTropes[7]}</td>
				<td>${boardTropes[8]}</td>
				<td>${boardTropes[9]}</td>
			</tr>
			<tr>
				<td>${boardTropes[10]}</td>
				<td>${boardTropes[11]}</td>
				<td class="free-space">FREE!<br />SPACE</td>
				<td>${boardTropes[12]}</td>
				<td>${boardTropes[13]}</td>
			</tr>
			<tr>
				<td>${boardTropes[14]}</td>
				<td>${boardTropes[15]}</td>
				<td>${boardTropes[16]}</td>
				<td>${boardTropes[17]}</td>
				<td>${boardTropes[18]}</td>
			</tr>
			<tr>
				<td>${boardTropes[19]}</td>
				<td>${boardTropes[20]}</td>
				<td>${boardTropes[21]}</td>
				<td>${boardTropes[22]}</td>
				<td>${boardTropes[23]}</td>
			</tr>
		</tbody>
	</table>`;
}

/**
 * Create and add a back for each bingo board.
 * @param {Array<Array<String>>} boardsList - The list of the individual trope lists for all the boards
 */
function addBingoPageBacks(boardsList) {
	boardsList.forEach(() =>
		addBingoPageBack());
}

/**
 * Create the element for a new page back and add it.
 */
function addBingoPageBack() {
	var page = document.createElement('div');
	page.className = 'bingo-page bingo-page-back';
	bingoPagesContainer.appendChild(page);
}
