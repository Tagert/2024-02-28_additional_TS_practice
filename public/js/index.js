"use strict";
//DOM - Variables
const mainContainer = document.querySelector(".main-container");
const gameCardContainer = document.querySelector(".game-card-container");
const numberOfPlayersDiv = document.querySelector(".number-players-card");
const platformDiv = document.querySelector(".platform-card");
const selectType = document.getElementById("selectType");
const idInput = document.getElementById("idNum");
const titleInput = document.getElementById("title");
const releaseYearInput = document.getElementById("releaseYear");
const numberOfPlayersInput = document.getElementById("numberOfPlayers");
const platformSelect = document.getElementById("platform");
// Changing inputs by type
selectType.addEventListener("change", () => {
    const selectedValue = selectType.value;
    numberOfPlayersDiv.style.display = "none";
    platformDiv.style.display = "none";
    if (selectedValue === "platformGame") {
        platformDiv.style.display = "flex";
    }
    else if (selectedValue === "boardGame") {
        numberOfPlayersDiv.style.display = "flex";
    }
});
// Type testing
const pcGameNo1 = {
    id: 1,
    title: "string",
    releaseYear: 2010,
    platform: "PC",
    type: "PC game",
};
const boardGameNo1 = {
    id: 2,
    title: "string",
    releaseYear: 2010,
    numberOfPlayers: 5,
    type: "Board game",
};
const mainInventoryArray = [];
const createGameObject = () => {
    const selectedValue = selectType.value;
    if (selectedValue === "platformGame") {
        const game = {
            id: Number(idInput.value),
            title: titleInput.value,
            releaseYear: Number(releaseYearInput.value),
            type: "PC game",
            platform: platformSelect.value,
        };
        return game;
    }
    else if (selectedValue === "boardGame") {
        const game = {
            id: Number(idInput.value),
            title: titleInput.value,
            releaseYear: Number(releaseYearInput.value),
            type: "Board game",
            numberOfPlayers: parseInt(numberOfPlayersInput.value),
        };
        return game;
    }
    throw new Error("Invalid game type");
};
const btn = document.getElementById("btn");
btn.addEventListener("click", () => {
    const newGame = createGameObject();
    addGameToInventory(newGame);
    generateGameCard();
    console.log(newGame);
});
//
const addGameToInventory = (game) => {
    mainInventoryArray.push(game);
    console.log(mainInventoryArray);
    generateGameCard();
};
const createGameCard = (game) => {
    const card = document.createElement("div");
    card.classList.add("game-card");
    const titleHeading = document.createElement("h2");
    titleHeading.innerText = game.title;
    card.append(titleHeading);
    const yearParagraph = document.createElement("p");
    yearParagraph.innerText = `Year: ${game.releaseYear}`;
    card.append(yearParagraph);
    if ("numberOfPlayers" in game) {
        const playersParagraph = document.createElement("p");
        playersParagraph.innerText = `Players: ${game.numberOfPlayers}`;
        card.append(playersParagraph);
    }
    if ("platform" in game) {
        const platformParagraph = document.createElement("p");
        platformParagraph.innerText = `Platform: ${game.platform}`;
        card.append(platformParagraph);
    }
    return card;
};
const renderGameCards = () => {
    gameCardContainer.innerHTML = "";
    mainInventoryArray.forEach((game) => {
        const card = createGameCard(game);
        gameCardContainer.appendChild(card);
    });
};
const generateGameCard = () => {
    renderGameCards();
};
export {};
