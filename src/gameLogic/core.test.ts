import { initializeGame, drawTile, discardTile, nextTurn } from './core';
import { tilesRemaining } from './types';

test('initializeGame should set up the game correctly', () => {
  const initialGameState = initializeGame(4);
  expect(initialGameState.players.length).toBe(4);
  expect(initialGameState.players[0].hand.length).toBe(13);
  expect(initialGameState.players[1].hand.length).toBe(13);
  expect(initialGameState.players[2].hand.length).toBe(13);
  expect(initialGameState.players[3].hand.length).toBe(13);
  expect(tilesRemaining(initialGameState.wallTiles)).toBe(144 - 13 * 4); // 144 total tiles, 13 per player
});

test('drawTile should draw a tile for the specified player', () => {
  const initialGameState = initializeGame(4);
  const initialWallSize = tilesRemaining(initialGameState.wallTiles);
  const newGameState = drawTile(initialGameState, 0);
  expect(newGameState.players[0].hand.length).toBe(14);
  expect(tilesRemaining(newGameState.wallTiles)).toBe(initialWallSize - 1);
});

test('discardTile should discard a tile for the specified player', () => {
  const initialGameState = initializeGame(4);
  const gameStateAfterDraw = drawTile(initialGameState, 0);
  const tileToDiscard = gameStateAfterDraw.players[0].hand[0];
  const newGameState = discardTile(gameStateAfterDraw, 0, tileToDiscard);
  expect(newGameState.players[0].hand.length).toBe(13);
  expect(newGameState.discardPile.length).toBe(1);
  expect(newGameState.discardPile[0]).toBe(tileToDiscard);
});

test('nextTurn should move to the next player', () => {
  const initialGameState = initializeGame(4);
  const newGameState = nextTurn(initialGameState);
  expect(newGameState.currentPlayerIndex).toBe(1);
});
