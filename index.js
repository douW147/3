"use strict";

var field = ["", "", "", "", "", "", "", "", ""];
var counter = 0;
var isGame = false;
var isPlayAvailible = true;
var isRefreshAvailible = false;
var isVsComputer = false;
const X = "X";
const O = "O";
const CELLIDNAME = "cell";
const CELLCLASSNAME = "cell";
const DISABLEBUTTONCLASSNAME = "controll-buttons__controll-button_disabled";
const MESSAGEHEADINGCLASSNAME = "message";
const MESSAGEHEADING = document.querySelector(
    `body > h1.${MESSAGEHEADINGCLASSNAME}`
);
const CELLS = document.getElementsByClassName(CELLCLASSNAME);
const PLAYBUTTON = document.querySelector(
    "body > div.controll-buttons > button:nth-child(1)"
);
const REFRESHBUTTON = document.querySelector(
    "body > div.controll-buttons > button:nth-child(2)"
);
const VS1BUTTON = document.querySelector(
    "body > div.controll-buttons > button:nth-child(3)"
);
const VSCOMPUTERBUTTON = document.querySelector(
    "body > div.controll-buttons > button:nth-child(4)"
);

function onPlayClick() {
    if (!isGame && isPlayAvailible) {
        isGame = true;
        isPlayAvailible = false;
        isRefreshAvailible = true;
        PLAYBUTTON.classList.add(DISABLEBUTTONCLASSNAME);
        REFRESHBUTTON.classList.remove(DISABLEBUTTONCLASSNAME);
    }
}

function onRefreshClick() {
    if (isRefreshAvailible) {
        resetProperties(field, counter, isGame, MESSAGEHEADING, CELLS);
    }
}

function on1Vs1Click() {
    VS1BUTTON.classList.remove(DISABLEBUTTONCLASSNAME);
    VSCOMPUTERBUTTON.classList.add(DISABLEBUTTONCLASSNAME);
    isVsComputer = false;
    resetProperties();
}

function on1vsComputerClick() {
    VSCOMPUTERBUTTON.classList.remove(DISABLEBUTTONCLASSNAME);
    VS1BUTTON.classList.add(DISABLEBUTTONCLASSNAME);
    isVsComputer = true;
    resetProperties();
}

function resetProperties() {
    field = ["", "", "", "", "", "", "", "", ""];
    counter = 0;
    isGame = true;
    MESSAGEHEADING.innerHTML = "";
    isPlayAvailible = false;
    isRefreshAvailible = true;
    PLAYBUTTON.classList.add(DISABLEBUTTONCLASSNAME);
    REFRESHBUTTON.classList.remove(DISABLEBUTTONCLASSNAME);
    setCellsEmpty(CELLS);
}

function setCellsEmpty(cells) {
    for (let index = 0; index < cells.length; index++) {
        cells[index].innerHTML = "";
    }
}

function xOrO(counter) {
    if (counter % 2 === 0) {
        return X;
    }
    return O;
}

function isWin(symbol) {
    if (field[0] === symbol && field[1] === symbol && field[2] === symbol) {
        return true;
    } else if (
        field[3] === symbol &&
        field[4] === symbol &&
        field[5] === symbol
    ) {
        return true;
    } else if (
        field[6] === symbol &&
        field[7] === symbol &&
        field[8] === symbol
    ) {
        return true;
    } else if (
        field[0] === symbol &&
        field[3] === symbol &&
        field[6] === symbol
    ) {
        return true;
    } else if (
        field[1] === symbol &&
        field[4] === symbol &&
        field[7] === symbol
    ) {
        return true;
    } else if (
        field[2] === symbol &&
        field[5] === symbol &&
        field[8] === symbol
    ) {
        return true;
    } else if (
        field[0] === symbol &&
        field[4] === symbol &&
        field[8] === symbol
    ) {
        return true;
    } else if (
        field[2] === symbol &&
        field[4] === symbol &&
        field[6] === symbol
    ) {
        return true;
    }
    return false;
}

function isDraw(field) {
    var fieldsCounter = 0;
    field.forEach((e) => {
        if (e === X || e === O) {
            fieldsCounter += 1;
        }
    });
    return fieldsCounter === 9;
}

function isGameEnds() {
    if (counter >= 4) {
        if (isWin(X)) {
            MESSAGEHEADING.innerHTML = "X wins";
            isGame = false;
        }
        if (isWin(O)) {
            MESSAGEHEADING.innerHTML = "O wins";
            isGame = false;
        }
        if (isDraw(field)) {
            MESSAGEHEADING.innerHTML = "Draw";
            isGame = false;
        }
    }
}

function generateComputerId() {
    while (true) {
        const id = Math.floor(Math.random() * 8);
        if (field[id] === "" && field[id] !== X && field[id] !== O) {
            return id;
        }
    }
}

function computerGoes() {
    if (isVsComputer && counter % 2 !== 0) {
        const id = generateComputerId();
        makeStep(id);
    }
}

function makeStep(id) {
    const whichGoes = xOrO(counter);
    if (field[id] === "" && field[id] !== X && field[id] !== O) {
        field[id] = whichGoes;
        counter += 1;
        document.getElementById(`${CELLIDNAME}${id + 1}`).innerHTML = whichGoes;
    }
}

function onCellClick(event) {
    if (isGame) {
        const id = event.target.id.substring(4, 5) - 1;
        makeStep(id);
        isGameEnds();
        computerGoes(); 
        isGameEnds();
    }
}