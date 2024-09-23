import {
  GameState,
  Player,
  Tile,
  Wall,
  characterTiles,
  bambooTiles,
  dotTiles,
  flowerTiles,
  honorTiles,
} from "./types";

export function initializeGame(numPlayers: number): GameState {
  const walls = new MahjongWall([
    ...characterTiles,
    ...bambooTiles,
    ...dotTiles,
    ...honorTiles,
    ...flowerTiles,
  ]);

  const players: Player[] = Array(numPlayers)
    .fill(null)
    .map((_, index) => ({
      id: index,
      hand: [],
      discards: [],
      exposedSets: [],
    }));

  for (let i = 0; i < 13; i++) {
    for (let j = 0; j < numPlayers; j++) {
      const tile = walls.drawTile();
      if (tile) {
        players[j].hand.push(tile);
      }
    }
  }

  return {
    players: players,
    currentPlayerIndex: 0,
    wallTiles: walls,
    discardPile: [],
    dora: [],
    round: 1,
    prevailingWind: "east",
  };
}

class MahjongWall implements Wall {
  private tiles: Tile[];
  private nextTileIndex: number;

  constructor(tiles: Tile[]) {
    this.tiles = [...tiles]; // Create a copy of the passed array
    this.nextTileIndex = 0;
    this.shuffle(); // Shuffle the wall upon creation
  }

  drawTile(): Tile | undefined {
    if (this.nextTileIndex < this.tiles.length) {
      const tile = this.tiles[this.nextTileIndex];
      this.nextTileIndex++;
      return tile;
    }
    return undefined; // No more tiles to draw
  }

  shuffle(): void {
    for (let i = this.tiles.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.tiles[i], this.tiles[j]] = [this.tiles[j], this.tiles[i]];
    }
    this.nextTileIndex = 0; // Reset the indicator after shuffling
  }

  tilesRemaining(): number {
    return this.tiles.length - this.nextTileIndex;
  }
}

// Shuffle function (Fisher-Yates algorithm)
function shuffleArray<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export function drawTile(gameState: GameState, playerId: number): GameState {
  return { ...gameState };
}

export function discardTile(
  gameState: GameState,
  playerId: number,
  tile: Tile,
): GameState {
  return { ...gameState };
}

export function claimTile(
  gameState: GameState,
  claimingPlayerId: number,
  action: "chow" | "pong" | "kong" | "win",
): GameState {
  return { ...gameState };
}

export function checkWin(player: Player, lastTile: Tile): boolean {
  return false;
}

export function scoreHand(
  player: Player,
  lastTile: Tile,
  gameState: GameState,
): number {
  return 0;
}

export function nextTurn(gameState: GameState): GameState {
  return { ...gameState };
}

export function isGameOver(gameState: GameState): boolean {
  return false;
}
