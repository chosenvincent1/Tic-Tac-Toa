const X_CLASS = 'x'
const CIRCLE_CLASS = 'circle'
const cellElements = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const winningMessageText = document.querySelector('[winning-message-text]');
const winningMessageContainer = document.getElementById('winning-message');
const restartButton = document.getElementById('restartBtn');
let circleTurn; //this will determine if its circle's turn or x's turn

const WINNING_COMBINATION = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];



// restarts game
restartButton.addEventListener('click', startGame);

function startGame() {
    // circleTurn = false;
    //this executes the handleClick funtion
    //when each cell is clicked once.
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS);
        cell.classList.remove(CIRCLE_CLASS);
        // cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, {once: true})
    });
    hoverValue();
    winningMessageContainer.classList.remove('show');
}
startGame(); 


//this func tells what will happen when ever
//a cell is clicked
function handleClick(e) {
    const cell = e.target;
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
    placeValue(cell, currentClass);

    if (checkWinning(currentClass)) {
        endGame(false)
    }else if (isDraw()) {
        endGame(true);
    }else{
        swapTurn();
        hoverValue();
    }
}

//this place value in the cell
function placeValue(cell, currentClass) {
    cell.classList.add(currentClass);
}

//this is use to swap turn for each values
//circleturn will be the opposite of circleTurn
function swapTurn() {
    circleTurn = !circleTurn;
}

//thid hover unclicked value inside the cell
function hoverValue() {
    board.classList.remove(X_CLASS);
    board.classList.remove(CIRCLE_CLASS);

    if(circleTurn) {
        board.classList.add(CIRCLE_CLASS);
    }else{
        board.classList.add(X_CLASS);
    }
}

//if any of the W.C are true(some), 
//it will loop over all the combination(every)
//check if combination index has the same class
//get & return the cell index
function checkWinning(currentClass) {
    return WINNING_COMBINATION.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass);
        })
    })
}


//this function determines if its a draw
function isDraw() {
    return [...cellElements].every(cell =>{
        return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS);
    })
}

//this function returns a message if it's a win or draw
function endGame(draw) {
    if (draw) {
        winningMessageText.innerText = 'Draw!';
    }else{
        winningMessageText.innerText = `${circleTurn ? 'O' : 'x'} Wins!`;
    }
    winningMessageContainer.classList.add('show');
}