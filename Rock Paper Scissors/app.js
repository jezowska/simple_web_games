const computerChoiceDisplay = document.getElementById('computer-choice');
const userChoiceDisplay = document.getElementById('user-choice');
const resultDisplay = document.getElementById('result');
const possibleChoices = document.querySelectorAll('button');
let userChoice;
let computerChoice;
let result;
possibleChoices.forEach(possibleChoice => possibleChoice.addEventListener('click', (e) => {
    userChoice = e.target.id;
    userChoiceDisplay.innerHTML = userChoice;
    computerChoiceDisplay.innerHTML = generateComputerChoice();
    resultDisplay.innerHTML = getResult();
}))

function generateComputerChoice() {
    const randomNumber = Math.floor(Math.random() * possibleChoices.length) + 1;
    
    if (randomNumber === 1) {
        computerChoice = 'rock';
        return computerChoice; 
    }
    if (randomNumber === 2) {
        computerChoice ='paper';
        return computerChoice; 
    }
    else {
        computerChoice ='scissors';
        return computerChoice; 
    }
}

function getResult() {
    if(computerChoice === userChoice) {
        return 'its a draw!'
    }
    if(computerChoice === 'rock' && userChoice === "paper") {
        return 'you win!'
    }
    if(computerChoice === 'scissors' && userChoice === "rock") {
        return 'you win!'
    }
    if(computerChoice === 'paper' && userChoice === "scissors") {
        return 'you win!'
    }
    else {
        return 'you lost!'
    }
    
}