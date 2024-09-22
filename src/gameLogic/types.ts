export interface Tile {
  suit: "bamboo" | "characters" | "dots" | "winds" | "dragons";
  value: number | string;
}

export interface Player {
  id: number;
  hand: Tile[];
  discards: Tile[];
  exposedSets: Tile[][];
}

export interface GameState {
  players: Player[];
  currentPlayerIndex: number;
  wallTiles: Tile[];
  discardPile: Tile[];
  dora: Tile[];
  round: number;
  prevailingWind: "east" | "south" | "west" | "north";
}
