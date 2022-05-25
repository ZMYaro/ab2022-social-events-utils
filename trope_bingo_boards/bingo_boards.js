'use strict';

	/** {HTMLTextAreaElement} The input field for the tropes text */
let inputField,
	/** {HTMLDivElement} The container element for all the printable board pages */
	boardPagesContainer;

window.onload = function () {
	inputField = document.querySelector('#input-form textarea');
	inputField.oninput = generateBoardPages;
	boardPagesContainer = document.getElementById('board-pages-container');
	generateBoardPages();
};

function generateBoardPages() {
	// Clear any old board pages.
	boardPagesContainer.innerHTML = '';
	// Get the latest tropes list.
	let tropesList = parseTropesText();
	
	// Hard-coded list for testing...
	generateBingoPage([
		'one',
		'two',
		'three',
		'four',
		'five',
		'six',
		'seven',
		'eight',
		'nine',
		'ten',
		'eleven',
		'twelve',
		'thirteen',
		'fourteen',
		'fifteen',
		'sixteen',
		'seventeen',
		'eighteen',
		'nineteen',
		'twenty',
		'twenty-one',
		'twenty-two',
		'twenty-three',
		'twenty-four'
	]);
}

/**
 * Convert the plain text tropes list from the form to an array, removing any empty lines.
 * @returns {Array<String>} - The array of the text of each trope
 */
function parseTropesText() {
	let input = inputField?.value?.trim();
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

function generateBingoPage(tropes) {
	var page = document.createElement('div');
	page.className = 'bingo-page';
	page.innerHTML =
		'<h1 class="bingo-heading">Anime Trope Bingo</h1>' +
		generateBingoTableHTML(tropes) +
		'<img src="ab_logo.png" alt="Anime Boston" class="footer-logo" />';
	boardPagesContainer.appendChild(page);
}

function generateBingoTableHTML(tropes) {
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
				<td>${tropes[0]}</td>
				<td>${tropes[1]}</td>
				<td>${tropes[2]}</td>
				<td>${tropes[3]}</td>
				<td>${tropes[4]}</td>
			</tr>
			<tr>
				<td>${tropes[5]}</td>
				<td>${tropes[6]}</td>
				<td>${tropes[7]}</td>
				<td>${tropes[8]}</td>
				<td>${tropes[9]}</td>
			</tr>
			<tr>
				<td>${tropes[10]}</td>
				<td>${tropes[11]}</td>
				<td>FREE<br />SPACE</td>
				<td>${tropes[12]}</td>
				<td>${tropes[13]}</td>
			</tr>
			<tr>
				<td>${tropes[14]}</td>
				<td>${tropes[15]}</td>
				<td>${tropes[16]}</td>
				<td>${tropes[17]}</td>
				<td>${tropes[18]}</td>
			</tr>
			<tr>
				<td>${tropes[19]}</td>
				<td>${tropes[20]}</td>
				<td>${tropes[21]}</td>
				<td>${tropes[22]}</td>
				<td>${tropes[23]}</td>
			</tr>
		</tbody>
	</table>`;
}
