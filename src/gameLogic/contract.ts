import { GameState, Player, Tile } from "./types";

export interface IMahjongGameLogic {
  initializeGame(numPlayers: number): GameState;
  drawTile(gameState: GameState, playerId: number): GameState;
  discardTile(gameState: GameState, playerId: number, tile: Tile): GameState;
  claimTile(
    gameState: GameState,
    claimingPlayerId: number,
    action: "chow" | "pong" | "kong" | "win",
  ): GameState;
  checkWin(player: Player, lastTile: Tile): boolean;
  scoreHand(player: Player, lastTile: Tile, gameState: GameState): number;
  nextTurn(gameState: GameState): GameState;
  isGameOver(gameState: GameState): boolean;
}
