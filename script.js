const gameBoard = document.getElementById("gameBoard");
const statusText = document.getElementById("status");
const resetBtn = document.getElementById("resetBtn");
const scoreX = document.getElementById("scoreX");
const scoreO = document.getElementById("scoreO");
const scoreTie = document.getElementById("scoreTie");

let board = Array(9).fill("");
let currentPlayer = "X";
let isGameOver = false;
let winsX = 0, winsO = 0, ties = 0;

function createBoard() {
    gameBoard.innerHTML = "";
    board.forEach((cell, index) => {
        const div = document.createElement("div");
        div.classList.add("cell");
        div.dataset.index = index;
        div.addEventListener("click", handleClick);
        gameBoard.appendChild(div);
    });
}

function handleClick(e) {
    const index = e.target.dataset.index;
    if (board[index] !== "" || isGameOver) return;

    board[index] = currentPlayer;
    e.target.textContent = currentPlayer;
    e.target.style.opacity = 0;
    setTimeout(() => e.target.style.opacity = 1, 50);

    if (checkWinner()) {
        statusText.textContent = `Player ${currentPlayer} Wins! 🎉`;
        isGameOver = true;
        currentPlayer === "X" ? ++winsX : ++winsO;
        scoreX.textContent = winsX;
        scoreO.textContent = winsO;
    } else if (board.every(cell => cell !== "")) {
        statusText.textContent = "It's a Tie! 🤝";
        isGameOver = true;
        ties++;
        scoreTie.textContent = ties;
    } else {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        statusText.textContent = `Player ${currentPlayer}'s turn`;
    }
}

function checkWinner() {
    const patterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    for (let pattern of patterns) {
        const [a, b, c] = pattern;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            document.querySelectorAll(".cell").forEach((cell, i) => {
                if ([a, b, c].includes(i)) cell.classList.add("winning-cell");
            });
            return true;
        }
    }
    return false;
}

resetBtn.addEventListener("click", () => {
    board.fill("");
    currentPlayer = "X";
    isGameOver = false;
    statusText.textContent = "Player X's turn";
    createBoard();
});

createBoard();
