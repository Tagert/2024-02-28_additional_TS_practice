"use strict";

import { PlatformGamesType, BoardGameType, GameInventoryType } from "./types";

//DOM - Variables
const mainContainer: HTMLDivElement = document.querySelector(
  ".main-container"
) as HTMLDivElement;

const gameCardContainer: HTMLDivElement = document.querySelector(
  ".game-card-container"
) as HTMLDivElement;

const numberOfPlayersDiv: HTMLDivElement = document.querySelector(
  ".number-players-card"
) as HTMLDivElement;

const platformDiv: HTMLDivElement = document.querySelector(
  ".platform-card"
) as HTMLDivElement;

const selectType: HTMLSelectElement = document.getElementById(
  "selectType"
) as HTMLSelectElement;

const idInput: HTMLInputElement = document.getElementById(
  "idNum"
) as HTMLInputElement;

const titleInput: HTMLInputElement = document.getElementById(
  "title"
) as HTMLInputElement;

const releaseYearInput: HTMLInputElement = document.getElementById(
  "releaseYear"
) as HTMLInputElement;

const numberOfPlayersInput: HTMLInputElement = document.getElementById(
  "numberOfPlayers"
) as HTMLInputElement;

const platformSelect: HTMLSelectElement = document.getElementById(
  "platform"
) as HTMLSelectElement;

const btn: HTMLButtonElement = document.getElementById(
  "btn"
) as HTMLButtonElement;

const allGameSort: HTMLButtonElement = document.getElementById(
  "allGameSort"
) as HTMLButtonElement;

const platformGameSort: HTMLButtonElement = document.getElementById(
  "platformGameSort"
) as HTMLButtonElement;

const boardGameSort: HTMLButtonElement = document.getElementById(
  "boardGameSort"
) as HTMLButtonElement;

const mainInventoryArray: GameInventoryType = [];

selectType.addEventListener("change", () => {
  const selectedValue = selectType.value;

  numberOfPlayersDiv.style.display = "none";
  platformDiv.style.display = "none";

  if (selectedValue === "platformGame") {
    platformDiv.style.display = "flex";
  } else if (selectedValue === "boardGame") {
    numberOfPlayersDiv.style.display = "flex";
  }
});

let gameIdCounter: number = 100;

const createGameObject = (): PlatformGamesType | BoardGameType => {
  const selectedValue = selectType.value;

  let newId: number;

  if (selectedValue === "platformGame") {
    newId = gameIdCounter++;

    const game: PlatformGamesType = {
      id: newId,
      title: titleInput.value,
      releaseYear: Number(releaseYearInput.value),
      type: "PC game",
      platform: platformSelect.value as "PC" | "Console" | "Mobile",
    };

    idInput.value = (newId + 1).toString();

    return game;
  } else if (selectedValue === "boardGame") {
    newId = gameIdCounter++;

    const game: BoardGameType = {
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
const addGameToInventory = (game: PlatformGamesType | BoardGameType) => {
  mainInventoryArray.push(game);

  console.log(mainInventoryArray);
  generateGameCard();
};

const createGameCard = (
  game: PlatformGamesType | BoardGameType
): HTMLDivElement => {
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

const sortGamesByType = (type: "all" | "platform" | "board") => {
  let sortedGames: GameInventoryType = [];

  if (type === "all") {
    sortedGames = [...mainInventoryArray];
  } else if (type === "platform") {
    sortedGames = mainInventoryArray.filter(
      (game) => "platform" in game
    ) as GameInventoryType;
  } else if (type === "board") {
    sortedGames = mainInventoryArray.filter(
      (game) => "numberOfPlayers" in game
    ) as GameInventoryType;
  }

  renderGameCards(sortedGames);
};

const renderGameCards = (games: GameInventoryType = mainInventoryArray) => {
  gameCardContainer.innerHTML = "";

  games.forEach((game) => {
    const card = createGameCard(game);
    gameCardContainer.appendChild(card);
  });
};

const removeGameFromInventory = (game: PlatformGamesType | BoardGameType) => {
  const findIndexToRemove = mainInventoryArray.findIndex(
    (g) => g.id === game.id
  );

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
