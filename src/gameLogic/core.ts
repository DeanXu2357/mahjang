import { GameState, Player, Tile } from "./types";

export function initializeGame(numPlayers: number): GameState {
  const players: Player[] = Array(numPlayers)
    .fill(null)
    .map((_, index) => ({
      id: index,
      hand: [],
      discards: [],
      exposedSets: [],
    }));

  return {
    players: players,
    currentPlayerIndex: 0,
    wallTiles: [],
    discardPile: [],
    dora: [],
    round: 1,
    prevailingWind: "east",
  };
}

export function drawTile(gameState: GameState, playerId: number): GameState {
  return { ...gameState };
}

export function discardTile(
  gameState: GameState,
  playerId: number,
  tile: Tile
): GameState {
  return { ...gameState };
}

export function claimTile(
  gameState: GameState,
  claimingPlayerId: number,
  action: "chow" | "pong" | "kong" | "win"
): GameState {
  return { ...gameState };
}

export function checkWin(player: Player, lastTile: Tile): boolean {
  return false;
}

export function scoreHand(
  player: Player,
  lastTile: Tile,
  gameState: GameState
): number {
  return 0;
}

export function nextTurn(gameState: GameState): GameState {
  return { ...gameState };
}

export function isGameOver(gameState: GameState): boolean {
  return false;
}
