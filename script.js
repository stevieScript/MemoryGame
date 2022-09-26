const allCards = document.querySelectorAll(".card");
const holder = document.querySelector("section");
const guessCount = document.querySelector("span");
const btn = document.querySelector("button");
let count = 0;

guessCount.textContent = count;

let cardOne;
let cardTwo;
let freeze = false;
let selectedCard = false;

const languages = [
	"img/js.svg",
	"img/react.svg",
	"img/css.png",
	"img/python.png",
	"img/nodejs.svg",
	"img/html.svg",
	"img/postgresql.png",
	"img/redux.png",
	"img/js.svg",
	"img/react.svg",
	"img/css.png",
	"img/python.png",
	"img/nodejs.svg",
	"img/html.svg",
	"img/postgresql.png",
	"img/redux.png",
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
	let counter = array.length;
	// While there are elements in the array
	while (counter > 0) {
		// Pick a random index
		let index = Math.floor(Math.random() * counter);
		// Decrease counter by 1
		counter--;
		// And swap the last element with it
		let temp = array[counter];
		array[counter] = array[index];
		array[index] = temp;
	}
	return array;
}

let shuffledLanguages = shuffle(languages);

document.addEventListener(
	"DOMContentLoaded",
	createDivsForLanguages(shuffledLanguages)
);

//selection function loops over the array of Languages
// it creates a new div and gives it a class with the value of the language
// it also adds an event listener for a click for each card
function createDivsForLanguages(languageArray) {
	for (let language of languageArray) {
		// create a new div and img to serve as the front and back faces of the card
		const card = document.createElement("div");
		const front = document.createElement("img");
		const back = document.createElement("img");

		// add classes
		card.classList = "card";
		front.classList = "front";
		back.classList = "back";

		//This logo idea for the back is pretty corny. Sorry
		// give it a src attribute for the image and a data attribute to check to see if the cards match
		back.src = "img/springboard-logo.png";
		front.src = language;
		card.setAttribute("data-language", language);

		//Add both images to the card
		card.appendChild(front);
		card.appendChild(back);
		// add card to section
		holder.appendChild(card);
		// call a function handleCardClick when a div is clicked on
		card.addEventListener("click", handleCardClick);
	}
}

// TODO: Implement selection function!
function handleCardClick(e) {
	let selection = e.target; //Clicked Item
	if (freeze) return; //If two cards a face-up, get out
	if (selection === cardOne) return; //Ensures 2 different cards

	selection.classList.add("face-up"); //Add class
	gameOver();
	//set the clicked item to 1 of two cards
	if (selectedCard === false) {
		selectedCard = true;
		cardOne = selection;
	} else {
		selectedCard = false;
		cardTwo = selection;
		doCardsMatch();
	}
}

function doCardsMatch() {
	// Pair for if they match
	let pair = cardOne.dataset.language === cardTwo.dataset.language;
	if (pair) {
		//So you can't keep clicking them
		cardOne.removeEventListener("click", handleCardClick);
		cardTwo.removeEventListener("click", handleCardClick);
	} else {
		freeze = true; //Only 2 at a time
		setTimeout(() => {
			//Wait before flipping over
			cardTwo.classList.remove("face-up");
			cardOne.classList.remove("face-up");
			freeze = false;
			count += 1;
			guessCount.textContent = count;
		}, 1000);
	}
	// gameOver();
}

function gameOver() {
	let pairs = document.querySelectorAll(".face-up");
	if (pairs.length === languages.length) {
		alert("You got the whole stack, you win!");
		location.reload();
	}
}

btn.addEventListener("click", () => {
	location.reload();
});
