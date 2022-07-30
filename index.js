"use strict";

let fieldOfCells = ["", "", "", "", "", "", "", "", ""];
let stepsCounter = 0;
let isGameStarted = false;
let isGameInitialized = false;
let isRefreshButtonAvailible = false;
let isGameVsComputer = false;
const firtsStepSymbol = "X";
const SecondStepSymbol = "O";
const cellIdName = "cell";
const disableButtonClassName = "controll-buttons__controll-button_disabled";
const messageHeadingClassName = "message";
const messageHeading = document.getElementById("messageHeading");
const allCells = document.getElementsByClassName("field__cell");
const gameInitializationButton = document.getElementById("gameInitializationButton");
const refreshButton = document.getElementById("refreshButton");
const playerVsPlayerButton = document.getElementById("playerVsPlayerButton");
const playerVsComputerButton = document.getElementById("playerVsComputerButton");

function onGameInitializationButtonClick() {
    if (!isGameStarted && !isGameInitialized) {
        isGameStarted = true;
        isGameInitialized = true;
        isRefreshButtonAvailible = true;
        
        gameInitializationButton.classList.add(disableButtonClassName);
        refreshButton.classList.remove(disableButtonClassName);
    }
}

function onRefreshClick() {
    if (isRefreshButtonAvailible) {
        refreshGame();
    }
}

function on1Vs1Click() {
    if (!isGameInitialized || isGameVsComputer === false) {
        return
    }
    isGameVsComputer = false;

    playerVsPlayerButton.classList.remove(disableButtonClassName);
    playerVsComputerButton.classList.add(disableButtonClassName);

    refreshGame();
}

function on1vsComputerClick() {
    if (!isGameInitialized || isGameVsComputer === true) {
        return
    }
    playerVsComputerButton.classList.remove(disableButtonClassName);
    playerVsPlayerButton.classList.add(disableButtonClassName);
    isGameVsComputer = true;
    
    refreshGame();
}

function onCellClick(event) {
    if (!isGameStarted) {
        return
    }

    const clickedCellId = event.target.id.slice(-1);

    if (!isPlayerCanSteps(clickedCellId)) {
        return
    }
    
    makeStep(clickedCellId);
    setGameEndMessage();

    if (!isComputerCanSteps()) {
        return
    }
    makeComputerStep(); 
    setGameEndMessage();
}

function refreshGame() {
    fieldOfCells = ["", "", "", "", "", "", "", "", ""];
    stepsCounter = 0;
    isGameStarted = true;
    messageHeading.innerHTML = "";
    isGameInitialized = true;
    isRefreshButtonAvailible = true;

    gameInitializationButton.classList.add(disableButtonClassName);
    refreshButton.classList.remove(disableButtonClassName);
    
    setCellsEmpty(allCells);
}

function setCellsEmpty(allCells) {
    for (let cellId = 0; cellId < allCells.length; cellId++) {
        allCells[cellId].innerHTML = "";
    }
}

function choseSymbolWhichSteps(stepsCounter) {
    if (stepsCounter % 2 === 0) {
        return firtsStepSymbol;
    }
    return SecondStepSymbol;
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
    const isAllCellsTaken = fieldOfCells.every(cell => cell === firtsStepSymbol || cell === SecondStepSymbol);
    return isAllCellsTaken;
}

function setGameEndMessage() {
    if (stepsCounter >= 4) {
        if (isWin(firtsStepSymbol)) {
            messageHeading.innerHTML = `${firtsStepSymbol.toUpperCase()} wins`;
            isGameStarted = false;
        }
        if (isWin(SecondStepSymbol)) {
            messageHeading.innerHTML = `${SecondStepSymbol.toUpperCase()} wins`;
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
        const randomCellId = Math.floor(Math.random() * 9);
        if (isPlayerCanSteps(randomCellId)) {
            return randomCellId;
        }
    }
}

function increaseStepsCounter() {
    stepsCounter++;
}

function makeStep(cellId) {
    const curentStepSymbol = choseSymbolWhichSteps(stepsCounter);
    fieldOfCells[cellId] = curentStepSymbol;

    increaseStepsCounter();

    const currentCell = document.getElementById(`${cellIdName}${cellId}`);
    currentCell.innerHTML = curentStepSymbol;
}

function makeComputerStep() {
        const randomCellId = generateCellIdForComputerStep();
        makeStep(randomCellId);
}

function isPlayerCanSteps(cellId) {
    return fieldOfCells[cellId] === "";
}

function isComputerCanSteps() {
    return (isGameVsComputer 
        && stepsCounter % 2 !== 0 
        && stepsCounter <= 8
    );
}