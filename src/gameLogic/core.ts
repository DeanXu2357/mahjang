import {
  GameState,
  Player,
  Tile,
  characterTiles,
  bambooTiles,
  dotTiles,
  flowerTiles,
  honorTiles,
} from "./types";
import { createWall, drawTileFromWall } from "./utils";

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

export function tilesRemaining(gameState: GameState): number {
  return gameState.wallTiles.tiles.length - gameState.wallTiles.nextTileIndex;
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
