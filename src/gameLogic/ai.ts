import { GameState, Tile } from "./types";

export function getAIAction(
  gameState: GameState,
  playerId: number
): "draw" | "discard" | "claim" {
  // Implementation
  return "draw";
}

export function chooseDiscardTile(hand: Tile[]): Tile {
  // Implementation
  return hand[0];
}
