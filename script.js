// let playerText = document.getElementById('playerText')
// let restartBtn = document.getElementById('restartBtn')
// let boxes = Array.from(document.getElementsByClassName('box'))

// let winnerIndicator = getComputedStyle(document.body).getPropertyValue('--winning-blocks')

// const O_TEXT = "O"
// const X_TEXT = "X"
// let currentPlayer = X_TEXT
// let spaces = Array(9).fill(null)

// const startGame = () => {
//     boxes.forEach(box => box.addEventListener('click', boxClicked))
// }

// function boxClicked(e) {
//     const id = e.target.id

//     if(!spaces[id]){
//         spaces[id] = currentPlayer
//         e.target.innerText = currentPlayer

//         if(playerHasWon() !==false){
//             playerText.innerHTML = `${currentPlayer} has won!`
//             let winning_blocks = playerHasWon()

//             winning_blocks.map( box => boxes[box].style.backgroundColor=winnerIndicator)
//             return
//         }

//         currentPlayer = currentPlayer == X_TEXT ? O_TEXT : X_TEXT
//     }
// }

// const winningCombos = [
//     [0,1,2],
//     [3,4,5],
//     [6,7,8],
//     [0,3,6],
//     [1,4,7],
//     [2,5,8],
//     [0,4,8],
//     [2,4,6]
// ]

// function playerHasWon() {
//     for (const condition of winningCombos) {
//         let [a, b, c] = condition

//         if(spaces[a] && (spaces[a] == spaces[b] && spaces[a] == spaces[c])) {
//             return [a,b,c]
//         }
//     }
//     return false
// }

// restartBtn.addEventListener('click', restart)

// function restart() {
//     spaces.fill(null)

//     boxes.forEach( box => {
//         box.innerText = ''
//         box.style.backgroundColor=''
//     })

//     playerText.innerHTML = 'Tic Tac Toe'

//     currentPlayer = X_TEXT
// }

// startGame()




const statusDisplay = document.querySelector('.game--status');

let gameActive = true;

let currentPlayer = "X";

let gameState = ["", "", "", "", "", "", "", "", ""];

const winningMessage = () => `Player ${currentPlayer} has won!`;
const drawMessage = () => `Game ended in a draw!`;
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;

statusDisplay.innerHTML = currentPlayerTurn();

document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
document.querySelector('.game--restart').addEventListener('click', handleRestartGame);

function handleCellClick(clickedCellEvent) {   
        const clickedCell = clickedCellEvent.target;
        const clickedCellIndex = parseInt(
          clickedCell.getAttribute('data-cell-index')
        );

        if (gameState[clickedCellIndex] !== "" || !gameActive) {
            return;
        }

        handleCellPlayed(clickedCell, clickedCellIndex);
        handleResultValidation();
}

function handleCellPlayed(clickedCell, clickedCellIndex) {

        gameState[clickedCellIndex] = currentPlayer;
        clickedCell.innerHTML = currentPlayer;
    }

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    function handleResultValidation() {
        let roundWon = false;
        for (let i = 0; i <= 7; i++) {
            const winCondition = winningConditions[i];
            let a = gameState[winCondition[0]];
            let b = gameState[winCondition[1]];
            let c = gameState[winCondition[2]];
            if (a === '' || b === '' || c === '') {
                continue;
            }
            if (a === b && b === c) {
                roundWon = true;
                break
            }
        }
    if (roundWon) {
        statusDisplay.innerHTML = winningMessage();
        gameActive = false;
        return;
    }

    let roundDraw = !gameState.includes("");
    if (roundDraw) {
        statusDisplay.innerHTML = drawMessage();
        gameActive = false;
        return;
    }

    handlePlayerChange();
}

function handlePlayerChange() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.innerHTML = currentPlayerTurn();
}

function handleRestartGame() {
    gameActive = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.innerHTML = currentPlayerTurn();
    document.querySelectorAll('.cell')
               .forEach(cell => cell.innerHTML = "");
}    