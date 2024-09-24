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
  const wall = createWall([
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

  let updatedWall = wall;
  for (let i = 0; i < 13; i++) {
    for (let j = 0; j < numPlayers; j++) {
      const [tile, newWall] = drawTileFromWall(updatedWall);
      updatedWall = newWall;
      if (tile) {
        players[j].hand.push(tile);
      }
    }
  }

  return {
    players: players,
    currentPlayerIndex: 0,
    wallTiles: updatedWall,
    discardPile: [],
    dora: [],
    round: 1,
    prevailingWind: "east",
  };
}

function createWall(tiles: Tile[]): Wall {
  return {
    tiles: shuffleTiles([...tiles]),
    nextTileIndex: 0,
  };
}

function drawTileFromWall(wall: Wall): [Tile | undefined, Wall] {
  if (wall.nextTileIndex < wall.tiles.length) {
    const tile = wall.tiles[wall.nextTileIndex];
    return [tile, { ...wall, nextTileIndex: wall.nextTileIndex + 1 }];
  }
  return [undefined, wall];
}

function shuffleTiles(tiles: Tile[]): Tile[] {
  const shuffledTiles = [...tiles];
  for (let i = shuffledTiles.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledTiles[i], shuffledTiles[j]] = [shuffledTiles[j], shuffledTiles[i]];
  }
  return shuffledTiles;
}

export function wallTilesRemaining(wall: Wall): number {
  return wall.tiles.length - wall.nextTileIndex;
}

export function drawTile(gameState: GameState, playerId: number): GameState {
  const player = gameState.players.find((p) => p.id === playerId);
  if (player) {
    const [tile, newWall] = drawTileFromWall(gameState.wallTiles);
    if (tile) {
      player.hand.push(tile);
    }
    return { ...gameState, wallTiles: newWall };
  }
  return gameState;
}

export function discardTile(
  gameState: GameState,
  playerId: number,
  tile: Tile,
): GameState {
  const player = gameState.players.find((p) => p.id === playerId);
  if (player) {
    const tileIndex = player.hand.findIndex((t) => t.id === tile.id);
    if (tileIndex !== -1) {
      player.hand.splice(tileIndex, 1);
      gameState.discardPile.push(tile);
    }
  }
  return { ...gameState };
}

export function claimTile(
  gameState: GameState,
  claimingPlayerId: number,
  action: "chow" | "pong" | "kong" | "win",
): GameState {
  // Implementation depends on game rules and additional context
  return { ...gameState };
}

export function checkWin(player: Player, lastTile: Tile): boolean {
  // Implement win condition check logic here
  return false;
}

export function scoreHand(
  player: Player,
  lastTile: Tile,
  gameState: GameState,
): number {
  // Implement scoring logic here
  return 0;
}

export function nextTurn(gameState: GameState): GameState {
  return {
    ...gameState,
    currentPlayerIndex:
      (gameState.currentPlayerIndex + 1) % gameState.players.length,
  };
}

export function isGameOver(gameState: GameState): boolean {
  // Implement game over condition check here
  return false;
}
