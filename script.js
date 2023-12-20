let gameBoard = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;
let status = document.querySelector(".status");
const cells = document.querySelectorAll(".cell");
const resetButton = document.querySelector(".reset-button");

const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

function checkWin() {
    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            gameActive = false;
            showPopup(`Player ${gameBoard[a]} wins!`);
            return;
        }
    }

    if (!gameBoard.includes("") && gameActive) {
        gameActive = false;
        showPopup("It's a draw!");
    }
}

function showPopup(message) {
    const popup = document.querySelector("#popup");
    const popupMessage = document.querySelector("#popupMessage");
    popupMessage.textContent = message;
    popup.style.display = "block";
}

function resetGame() {
    gameBoard = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    gameActive = true;
    status.textContent = "Player X's turn";
    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("x", "o");
    });
    const popup = document.querySelector("#popup");
    popup.style.display = "none";
}

cells.forEach(cell => {
    cell.addEventListener("click", handleClick);
});

resetButton.addEventListener("click", resetGame);

function handleClick(e) {
    const cell = e.target;
    const cellIndex = Array.from(cells).indexOf(cell);

    if (gameBoard[cellIndex] === "" && gameActive) {
        gameBoard[cellIndex] = currentPlayer;
        cell.textContent = currentPlayer;
        cell.classList.add(currentPlayer.toLowerCase());
        checkWin();

        if (gameActive) {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            status.textContent = `Player ${currentPlayer}'s turn`;
        }
    }
}