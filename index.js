var field = ["", "", "", "", "", "", "", "", ""];
var counter = 0; 
var isGame = false;
var isPlayAvailible = true;
var isRefreshAvailible = false;
var isVsComputer = false;
const X = "X";
const O = "O";
const cellIdName = "cell";
const cellClassName = "cell";
const disableButtonClassName = "controll-buttons__controll-button_disabled"
const messageHeadingClassName = "message"
const messageHeading = document.querySelector(`body > h1.${messageHeadingClassName}`);
var cells = document.getElementsByClassName(cellClassName);
const playButton = document.querySelector("body > div.controll-buttons > button:nth-child(1)");
const refreshButton = document.querySelector("body > div.controll-buttons > button.controll-buttons__controll-button:nth-child(2)")

function onPlayClick () {
    if (!isGame && isPlayAvailible) {
        isGame = true;
        isPlayAvailible = false;
        isRefreshAvailible = true;
        playButton.classList.add(disableButtonClassName);
        refreshButton.classList.remove(disableButtonClassName);
    }
}

function onRefreshClick () {
    if (isRefreshAvailible) {
        field = ["", "", "", "", "", "", "", "", ""];
        counter = 0; 
        isGame = true;
        messageHeading.innerHTML = "";
        setCellsEmpty(cells);
    }
}

function setCellsEmpty (cells) {
    for (let index = 0; index < cells.length; index++) {
        cells[index].innerHTML = ""
    }
}

function xOrO( counter) {
    if (counter % 2 === 0) {
        return X
    } 
    return O
}

function isWin (symbol) {
    if (field[0] === symbol && field[1] === symbol && field[2] === symbol) {
        return true
    } else if (field[3] === symbol && field[4] === symbol  && field[5] === symbol) {
        return true
    } else if (field[6] === symbol && field[7] === symbol  && field[8] === symbol) {
        return true
    } else if (field[0] === symbol && field[3] === symbol  && field[6] === symbol) {
        return true
    } else if (field[1] === symbol && field[4] === symbol  && field[7] === symbol) {
        return true
    } else if (field[2] === symbol && field[5] === symbol  && field[8] === symbol) {
        return true
    } else if (field[0] === symbol && field[4] === symbol  && field[8] === symbol) {
        return true
    } else if (field[2] === symbol && field[4] === symbol  && field[6] === symbol) {
        return true
    }
    return false
}

function isDraw (field) {
    var fieldsCounter = 0;
    field.forEach(e => {
        if (e === X || e === O) {
            fieldsCounter += 1;
        }
    });
    return fieldsCounter === 9;
}

function onCellClick (event) {
    if (isGame) {
        const id = event.target.id.substring(4,5) - 1;
        const whichGoes = xOrO(counter);
        if (field[id] === "" && (field[id] !== X && field[id] !== O)) {  // if cell isn`t taken
            field[id] = whichGoes;
            counter+=1;
            document.getElementById(`${cellIdName}${id+1}`).innerHTML = whichGoes;
        } else {
            // cell is taken
        }
        if ( counter >= 4) {
            if (isWin(X)) {
                console.log("x wins");
                messageHeading.innerHTML = "X wins";
                isGame = false;
            }
            if (isWin(O)) {
                messageHeading.innerHTML = "O wins";
                isGame = false;
            }
            if (isDraw(field)) {
                messageHeading.innerHTML = "Draw";
                isGame = false;
            }
        }
    }
}



