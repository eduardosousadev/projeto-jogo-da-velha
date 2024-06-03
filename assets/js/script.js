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
let numberOfClicks = 0;
let hasLine = false;

// Functions
function reset() {
    if(hasLine) {
        document.querySelector(".line").style.setProperty("display", "none", "important");
        document.querySelector(".line").style.setProperty("width", "0px", "important");
        setTimeout(() => {
            document.querySelector(".line").style.setProperty("display", "inline", "important");
        },1000);
        hasLine = false;
    };

    if(numberOfClicks === 0) {
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
    } else {
        warning = "";
    
        // Generating number between 0 and 1
        let random = Math.floor(Math.random() * 2);
    
        playerTurn = random === 0 ? "X" : "O";
        
        for(let i in board) board[i] = "";
    
        playing = true;
    
        renderBoard();
        renderInformation();
    };
    numberOfClicks++
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
    numberOfClicks = 0;
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

    const possibility1 = ['a1', 'a2', 'a3'];
    const possibility2 = ['b1', 'b2', 'b3'];
    const possibility3 = ['c1', 'c2', 'c3'];
    const possibility4 = ['a1', 'b1', 'c1'];
    const possibility5 = ['a2', 'b2', 'c2'];
    const possibility6 = ['a3', 'b3', 'c3'];
    const possibility7 = ['a1', 'b2', 'c3'];
    const possibility8 = ['a3', 'b2', 'c1'];

    for(let possibility in possibilities) {
        let newArrayOfPossibility = possibilities[possibility].split(",");
        let hasWon = newArrayOfPossibility.every(item => board[item] == player); 

        if(hasWon) {
            if(JSON.stringify(newArrayOfPossibility) === JSON.stringify(possibility1)) {
                styleLine("300px", "18%", "5px", "0deg");
            } else if(JSON.stringify(newArrayOfPossibility) === JSON.stringify(possibility2)) {
                styleLine("300px", "50%", "5px", "0deg");
            } else if(JSON.stringify(newArrayOfPossibility) === JSON.stringify(possibility3)) {
                styleLine("300px", "83%", "5px", "0deg");
            } else if(JSON.stringify(newArrayOfPossibility) === JSON.stringify(possibility4)) {
                styleLine("300px", "5px", "17%", "90deg");
            } else if(JSON.stringify(newArrayOfPossibility) === JSON.stringify(possibility5)) {
                styleLine("300px", "5px", "50%", "90deg");
            } else if(JSON.stringify(newArrayOfPossibility) === JSON.stringify(possibility6)) {
                styleLine("300px", "5px", "82%", "90deg");
            } else if(JSON.stringify(newArrayOfPossibility) === JSON.stringify(possibility7)) {
                styleLine("425px", "5px", "5px", "45deg");
            } else if(JSON.stringify(newArrayOfPossibility) === JSON.stringify(possibility8)) {
                styleLine("425px", "5px", "305px", "135deg");
            }
            hasLine = true;
            return true; 
        };
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
    if(!isFull() || (isFull() && warning !== "Jogo empatado!")) {
        document.querySelector(selector3).classList.toggle("hide");
    };
};

function toggleBoard() {
    document.querySelector(".block-area").classList.toggle("z-index");
    document.querySelector(".area").classList.toggle("opacity");
};

function styleLine(widthValue, topValue, leftValue, rotateValue) {
    const lineDiv = document.querySelector(".line");

    lineDiv.style.setProperty("width", widthValue, "important");
    lineDiv.style.setProperty("top", topValue, "important");
    lineDiv.style.setProperty("left", leftValue, "important");
    lineDiv.style.setProperty("rotate", rotateValue, "important");
};

// Events
reset();

document.querySelector(".reset").addEventListener("click", reset);

document.querySelectorAll(".item").forEach((item) => {
    item.addEventListener("click", itemClick);
});