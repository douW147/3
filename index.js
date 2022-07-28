"use strict";

let fieldOfCells = ["", "", "", "", "", "", "", "", ""];
let stepsCounter = 0;
let isGameStarted = false;
let isPlayButtonAvailible = true;
let isRefreshButtonAvailible = false;
let isGameVsComputer = false;
const symbolOfX = "X";
const symbolOfO = "O";
const cellIdName = "cell";
const cellClassName = "field__cell";
const disableButtonClassName = "controll-buttons__controll-button_disabled";
const messageHeadingClassName = "message";
const messageHeadingId = "messageHeading";
const playButtonId = "playButton";
const refreshButtonId = "refreshButton";
const playerVsPlayerButtonId = "playerVsPlayerButton";
const playerVsComputerButtonId = "playerVsComputerButton"; 
const messageHeading = document.getElementById(messageHeadingId);
const allCells = document.getElementsByClassName(cellClassName);
const playButton = document.getElementById(playButtonId);
const refreshButton = document.getElementById(refreshButtonId);
const playerVsPlayerButton = document.getElementById(playerVsPlayerButtonId);
const playerVsComputerButton = document.getElementById(playerVsComputerButtonId);

function onPlayClick() {
    if (!isGameStarted && isPlayButtonAvailible) {
        isGameStarted = true;
        isPlayButtonAvailible = false;
        isRefreshButtonAvailible = true;
        
        playButton.classList.add(disableButtonClassName);
        refreshButton.classList.remove(disableButtonClassName);
    }
}

function onRefreshClick() {
    if (isRefreshButtonAvailible) {
        resetProperties();
    }
}

function on1Vs1Click() {
    isGameVsComputer = false;

    playerVsPlayerButton.classList.remove(disableButtonClassName);
    playerVsComputerButton.classList.add(disableButtonClassName);

    resetProperties();
}

function on1vsComputerClick() {
    playerVsComputerButton.classList.remove(disableButtonClassName);
    playerVsPlayerButton.classList.add(disableButtonClassName);
    isGameVsComputer = true;
    
    resetProperties();
}

function onCellClick(event) {
    if (isGameStarted) {
        const clickedCellId = event.target.id.slice(-1);
        makeStep(clickedCellId);
        isGameEnds();
        computerGoes(); 
        isGameEnds();
    }
}

function resetProperties() {
    fieldOfCells = ["", "", "", "", "", "", "", "", ""];
    stepsCounter = 0;
    isGameStarted = true;
    messageHeading.innerHTML = "";
    isPlayButtonAvailible = false;
    isRefreshButtonAvailible = true;

    playButton.classList.add(disableButtonClassName);
    refreshButton.classList.remove(disableButtonClassName);
    
    setCellsEmpty(allCells);
}

function setCellsEmpty(cells) {
    for (let cellId = 0; cellId < cells.length; cellId++) {
        cells[cellId].innerHTML = "";
    }
}

function chooseSymbolWhichGoes(stepsCounter) {
    if (stepsCounter % 2 === 0) {
        return symbolOfX;
    }
    return symbolOfO;
}

function isWin(symbol) {
    if (fieldOfCells[0] === symbol 
        && fieldOfCells[1] === symbol 
        && fieldOfCells[2] === symbol) {
        return true;
    } else if (
        fieldOfCells[3] === symbol 
        && fieldOfCells[4] === symbol 
        && fieldOfCells[5] === symbol
    ) {
        return true;
    } else if (
        fieldOfCells[6] === symbol &&
        fieldOfCells[7] === symbol &&
        fieldOfCells[8] === symbol
    ) {
        return true;
    } else if (
        fieldOfCells[0] === symbol 
        && fieldOfCells[3] === symbol 
        && fieldOfCells[6] === symbol
    ) {
        return true;
    } else if (
        fieldOfCells[1] === symbol 
        && fieldOfCells[4] === symbol 
        && fieldOfCells[7] === symbol
    ) {
        return true;
    } else if (
        fieldOfCells[2] === symbol 
        && fieldOfCells[5] === symbol 
        && fieldOfCells[8] === symbol
    ) {
        return true;
    } else if (
        fieldOfCells[0] === symbol 
        && fieldOfCells[4] === symbol 
        && fieldOfCells[8] === symbol
    ) {
        return true;
    } else if (
        fieldOfCells[2] === symbol 
        && fieldOfCells[4] === symbol 
        && fieldOfCells[6] === symbol
    ) {
        return true;
    }
    return false;
}

function isDraw(fieldOfCells) {
    const isAllCellsTaken = fieldOfCells.every(cell => cell === symbolOfX || cell === symbolOfO);
    return isAllCellsTaken;
}

function isGameEnds() {
    if (stepsCounter >= 4) {
        if (isWin(symbolOfX)) {
            messageHeading.innerHTML = `${symbolOfX.toUpperCase()} wins`;
            isGameStarted = false;
        }
        if (isWin(symbolOfO)) {
            messageHeading.innerHTML = `${symbolOfO.toUpperCase()} wins`;
            isGameStarted = false;
        }
        if (isDraw(fieldOfCells)) {
            messageHeading.innerHTML = "Draw";
            isGameStarted = false;
        }
    }
}

function generateCellIdForComputerStep() {
    while (true) {
        const randomId = Math.floor(Math.random() * 9);
        if (fieldOfCells[randomId] === "" 
            && fieldOfCells[randomId] !== symbolOfX 
            && fieldOfCells[randomId] !== symbolOfO) {
            return randomId;
        }
    }
}

function computerGoes() {
    if (isGameVsComputer 
        && stepsCounter % 2 !== 0 
        && stepsCounter <= 8) {
        const id = generateCellIdForComputerStep();
        makeStep(id);
    }
}

function increaseStepsCounter() {
    stepsCounter++;
}

function makeStep(id) {
    const whichGoes = chooseSymbolWhichGoes(stepsCounter);
    if (fieldOfCells[id] === "" && fieldOfCells[id] !== symbolOfX && fieldOfCells[id] !== symbolOfO) {

        fieldOfCells[id] = whichGoes;

        increaseStepsCounter();

        const currentCell = document.getElementById(`${cellIdName}${id}`);
        currentCell.innerHTML = whichGoes;
    }
}