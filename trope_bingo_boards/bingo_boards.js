'use strict';

/** @constant {Number} The number of cards that will be printed on each page */
const CARDS_PER_PAGE = 6;

window.onload = addPages;

function addPages() {
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
 * Convert the plain text cards list from index.html to an array, removing any empty lines.
 * This has *some* amount of error handling for people messing up the `TROPES` array.
 * @returns {Array<String>} - The array of the text for each card
 */
function parseTropesText() {
	if (!TROPES) {
		alert('The “TROPES” list was removed or damaged in edit_this_to_change_the_tropes!');
		return [];
	}
	let tropesList = [];
	for (let cardText of TROPES.split('\n')) {
		let trimmedTropeText = cardText.trim();
		if (!trimmedTropeText) { continue; }
		tropesList.push(trimmedTropeText);
	}
	if (tropesList.length === 0) {
		alert('No card text was found in edit_this_to_change_the_tropes!');
		return [];
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
	document.body.appendChild(page);
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
