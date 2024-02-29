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
const btn = document.getElementById("btn");
const allGameSort = document.getElementById("allGameSort");
const platformGameSort = document.getElementById("platformGameSort");
const boardGameSort = document.getElementById("boardGameSort");
const mainInventoryArray = [];
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
let gameIdCounter = 100;
const createGameObject = () => {
    const selectedValue = selectType.value;
    let newId;
    if (selectedValue === "platformGame") {
        newId = gameIdCounter++;
        const game = {
            id: newId,
            title: titleInput.value,
            releaseYear: Number(releaseYearInput.value),
            type: "PC game",
            platform: platformSelect.value,
        };
        idInput.value = (newId + 1).toString();
        return game;
    }
    else if (selectedValue === "boardGame") {
        newId = gameIdCounter++;
        const game = {
            id: newId,
            title: titleInput.value,
            releaseYear: Number(releaseYearInput.value),
            type: "Board game",
            numberOfPlayers: parseInt(numberOfPlayersInput.value),
        };
        idInput.value = (newId + 1).toString();
        return game;
    }
    throw new Error("Invalid game type");
};
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
    const idParagraph = document.createElement("p");
    idParagraph.innerText = `Unique identifier: ${game.id.toString()}`;
    card.append(idParagraph);
    const yearParagraph = document.createElement("p");
    yearParagraph.innerText = `Release Year: ${game.releaseYear}`;
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
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("remove-btn");
    deleteButton.innerText = "Remove a card";
    card.append(deleteButton);
    deleteButton.addEventListener("click", () => {
        removeGameFromInventory(game);
        renderGameCards();
    });
    return card;
};
const sortGamesByType = (type) => {
    let sortedGames = [];
    if (type === "all") {
        sortedGames = [...mainInventoryArray];
    }
    else if (type === "platform") {
        sortedGames = mainInventoryArray.filter((game) => "platform" in game);
    }
    else if (type === "board") {
        sortedGames = mainInventoryArray.filter((game) => "numberOfPlayers" in game);
    }
    renderGameCards(sortedGames);
};
const renderGameCards = (games = mainInventoryArray) => {
    gameCardContainer.innerHTML = "";
    games.forEach((game) => {
        const card = createGameCard(game);
        gameCardContainer.appendChild(card);
    });
};
const removeGameFromInventory = (game) => {
    const findIndexToRemove = mainInventoryArray.findIndex((g) => g.id === game.id);
    if (findIndexToRemove !== -1) {
        mainInventoryArray.splice(findIndexToRemove, 1);
    }
};
const generateGameCard = () => {
    renderGameCards();
};
btn.addEventListener("click", () => {
    const newGame = createGameObject();
    addGameToInventory(newGame);
    generateGameCard();
});
allGameSort.addEventListener("click", () => {
    sortGamesByType("all");
});
platformGameSort.addEventListener("click", () => {
    sortGamesByType("platform");
});
boardGameSort.addEventListener("click", () => {
    sortGamesByType("board");
});
export {};
