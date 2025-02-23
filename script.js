let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const boardElement = document.getElementById('board');
const statusElement = document.getElementById('status');

// Function to render the game board
function renderBoard() {
    boardElement.innerHTML = '';
    board.forEach((cell, index) => {
        const cellElement = document.createElement('div');
        cellElement.classList.add('cell');
        cellElement.textContent = cell;

        if (cell === 'X') {
            cellElement.classList.add('x');
        } else if (cell === 'O') {
            cellElement.classList.add('o');
        }

        cellElement.addEventListener('click', () => handleClick(index), { once: true });
        boardElement.appendChild(cellElement);
    });
}

// Function to handle a cell click
function handleClick(index) {
    if (!gameActive || board[index] !== '') return;

    board[index] = currentPlayer;
    renderBoard();
    checkWinner();
    if (gameActive) switchPlayer();
}

// Function to check for a winner
function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            gameActive = false;
            statusElement.textContent = `🎉 Player ${currentPlayer} wins!`;
            return;
        }
    }

    if (board.every(cell => cell !== '')) {
        gameActive = false;
        statusElement.textContent = "🤝 It's a draw!";
    } else {
        statusElement.textContent = `Player ${currentPlayer}'s turn`;
    }
}

// Function to switch players
function switchPlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

// Function to reset the game - Ensure this is globally accessible
window.resetGame = function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentPlayer = 'X';
    renderBoard();
    statusElement.textContent = `Player ${currentPlayer}'s turn`;
};

// Initialize the game on page load
document.addEventListener('DOMContentLoaded', renderBoard);
