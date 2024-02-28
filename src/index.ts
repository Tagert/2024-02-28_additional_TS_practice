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

// Changing inputs by type
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

// Type testing
const pcGameNo1: PlatformGamesType = {
  id: 1,
  title: "string",
  releaseYear: 2010,
  platform: "PC",
  type: "PC game",
};

const boardGameNo1: BoardGameType = {
  id: 2,
  title: "string",
  releaseYear: 2010,
  numberOfPlayers: 5,
  type: "Board game",
};

const mainInventoryArray: GameInventoryType = [];

const createGameObject = (): PlatformGamesType | BoardGameType => {
  const selectedValue = selectType.value;

  if (selectedValue === "platformGame") {
    const game: PlatformGamesType = {
      id: Number(idInput.value),
      title: titleInput.value,
      releaseYear: Number(releaseYearInput.value),
      type: "PC game",
      platform: platformSelect.value as "PC" | "Console" | "Mobile",
    };

    return game;
  } else if (selectedValue === "boardGame") {
    const game: BoardGameType = {
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

const btn = document.getElementById("btn") as HTMLButtonElement;
btn.addEventListener("click", () => {
  const newGame = createGameObject();
  addGameToInventory(newGame);
  generateGameCard();
  console.log(newGame);
});

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
