// Initial data
let board = {
    a1: "", a2: "", a3: "",
    b1: "", b2: "", b3: "",
    c1: "", c2: "", c3: ""
};
let playerTurn = "";
let player = "";
let warning = "";
let playing = false;

// Functions
function reset() {
    toggleBoard();
    classList(".info-result", ".info-player", ".trophy")
    warning = "";

    // Generating number between 0 and 1
    let random = Math.floor(Math.random() * 2);

    playerTurn = random === 0 ? "X" : "O";
    
    for(let i in board) board[i] = "";

    playing = true;

    renderBoard();
    renderInformation();
};

function renderBoard() {
    for(let i in board) {
        let item = document.querySelector(`div[data-item=${i}]`);
        item.innerHTML = board[i] ? board[i] : "";
    };

    checkGame();
};

function renderInformation() {
    player = `É a vez do jogador ${playerTurn}`;
    document.querySelector(".info-player.turn").innerHTML = player;
    document.querySelector(".info-result").innerHTML = warning;
}

function itemClick(event) {
    let item = event.target.getAttribute("data-item");
    if(playing && !board[item]) {
        board[item] = playerTurn;
        renderBoard();
        togglePlayer();
    };
};

function togglePlayer() {
    playerTurn = playerTurn === "X" ? "O" : "X";
    renderInformation();
    
};

function checkGame() {
    if(checkWinnerFor("X")){
        toggleBoard();
        warning = 'O jogador "X" venceu!';
        classList(".info-player", ".info-result", ".trophy");
        playing = false;
    } else if(checkWinnerFor("O")) {
        toggleBoard();
        warning = 'O jogador "O" venceu!';
        classList(".info-player", ".info-result", ".trophy");
        playing = false;
    } else if(isFull()) {
        toggleBoard();
        warning = "Jogo empatado!";
        classList(".info-player", ".info-result");
        playing = false;
    };
};

function checkWinnerFor(player) {
    let possibilities = [
        "a1,a2,a3",
        "b1,b2,b3",
        "c1,c2,c3",

        "a1,b1,c1",
        "a2,b2,c2",
        "a3,b3,c3",

        "a1,b2,c3",
        "a3,b2,c1"
    ];

    for(let possibility in possibilities) {
        let newArrayOfPossibility = possibilities[possibility].split(",");
        let hasWon = newArrayOfPossibility.every(item => board[item] == player); 
        if(hasWon) return true;     
    };

    return false;
};

function isFull() {
    for(let item in board) {
        if(board[item] === "") return false;
    };

    return true;
};

function classList(selector1, selector2, selector3) {
    document.querySelector(selector1).classList.add("hide");
    document.querySelector(selector2).classList.remove("hide");
    // document.querySelector(selector3).classList.toggle("hide");
    if(!isFull() || (isFull() && warning !== "Jogo empatado!")) document.querySelector(selector3).classList.toggle("hide");
};

function toggleBoard() {
    document.querySelector(".block-area").classList.toggle("z-index");
    document.querySelector(".area").classList.toggle("opacity");
};

// Events
reset();

document.querySelector(".reset").addEventListener("click", reset);

document.querySelectorAll(".item").forEach((item) => {
    item.addEventListener("click", itemClick);
});
