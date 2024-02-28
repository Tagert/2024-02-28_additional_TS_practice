"use strict";

export type PlatformGamesType = {
  id: number;
  title: string;
  releaseYear: number;
  platform: "PC" | "Console" | "Mobile";
  type: "PC game" | "Board game";
};

export type BoardGameType = Omit<PlatformGamesType, "platform"> & {
  numberOfPlayers: number;
};

export type GameInventoryType = (PlatformGamesType | BoardGameType)[];
