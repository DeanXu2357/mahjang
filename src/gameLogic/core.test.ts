import {
  discardTile,
  drawTile,
  initializeGame,
  nextTurn,
  tilesRemaining,
} from "./core";
import {
  tileBamboo1,
  tileBamboo2,
  tileBamboo3,
  tileBamboo4,
  tileBamboo5,
  tileCharacter1,
  tileCharacter2,
  tileCharacter3,
  tileCharacter9,
  tileDot1,
  tileDot2,
  tileDot3,
  tileDot4,
  tileDot5,
  tileDot9,
  tileHonorEast,
  tileHonorNorth,
  tileHonorSouth,
  tileHonorWest,
} from "./types";
import {
  findValidChows,
  findValidKongs,
  findValidPongs,
  sortTiles,
} from "./utils";

test("initializeGame should set up the game correctly", () => {
  const initialGameState = initializeGame(4);
  expect(initialGameState.players.length).toBe(4);
  expect(initialGameState.players[0].hand.length).toBe(13);
  expect(initialGameState.players[1].hand.length).toBe(13);
  expect(initialGameState.players[2].hand.length).toBe(13);
  expect(initialGameState.players[3].hand.length).toBe(13);
  expect(tilesRemaining(initialGameState)).toBe(144 - 13 * 4); // 144 total tiles, 13 per player
});

test("drawTile should draw a tile for the specified player", () => {
  const initialGameState = initializeGame(4);
  const initialWallSize = tilesRemaining(initialGameState);
  const newGameState = drawTile(initialGameState, 0);
  expect(newGameState.players[0].hand.length).toBe(14);
  expect(tilesRemaining(newGameState)).toBe(initialWallSize - 1);
});

test("discardTile should discard a tile for the specified player", () => {
  const initialGameState = initializeGame(4);
  const gameStateAfterDraw = drawTile(initialGameState, 0);
  const tileToDiscard = gameStateAfterDraw.players[0].hand[0];
  const newGameState = discardTile(gameStateAfterDraw, 0, tileToDiscard);
  expect(newGameState.players[0].hand.length).toBe(13);
  expect(newGameState.discardPile.length).toBe(1);
  expect(newGameState.discardPile[0]).toBe(tileToDiscard);
});

test("nextTurn should move to the next player", () => {
  const initialGameState = initializeGame(4);
  const newGameState = nextTurn(initialGameState);
  expect(newGameState.currentPlayerIndex).toBe(1);
});
test("sortTiles should correctly sort tiles", () => {
  const unsortedTiles = [
    tileBamboo5,
    tileCharacter2,
    tileDot3,
    tileBamboo1,
    tileCharacter9,
    tileDot9,
  ];
  const expectedSortedTiles = [
    tileCharacter2,
    tileCharacter9,
    tileDot3,
    tileDot9,
    tileBamboo1,
    tileBamboo5,
  ];
  const sortedTiles = sortTiles(unsortedTiles);
  expect(sortedTiles).toEqual(expectedSortedTiles);
});

test("findValidChows should correctly identify valid chows", () => {
  const hand = [
    tileBamboo1,
    tileBamboo2,
    tileBamboo3,
    tileBamboo4,
    tileCharacter1,
    tileCharacter2,
    tileCharacter3,
    tileDot1,
    tileDot2,
    tileDot4,
    tileDot5,
    tileHonorEast,
    tileHonorSouth,
    tileHonorWest,
    tileHonorNorth,
  ];
  const validChows = findValidChows(hand, tileBamboo2);
  expect(validChows).toEqual([
    [tileBamboo1, tileBamboo2, tileBamboo3],
    [tileBamboo2, tileBamboo3, tileBamboo4],
  ]);
});

test("tilesToString should correctly convert tiles to strings", () => {});

test("findValidPong should correctly identify if able to pong", () => {
  const hand = [
    tileBamboo1,
    tileBamboo2,
    tileBamboo3,
    tileBamboo4,
    tileCharacter1,
    tileCharacter2,
    tileCharacter3,
    tileDot1,
    tileDot2,
    tileDot4,
    tileDot5,
    tileHonorEast,
    tileHonorSouth,
    tileHonorWest,
    tileHonorNorth,
  ];
  const validPong = findValidPongs(hand, tileBamboo1);
  expect(validPong).toBeFalsy();

  const hand2 = [
    tileBamboo1,
    tileBamboo2,
    tileBamboo2,
    tileBamboo4,
    tileCharacter1,
    tileCharacter2,
    tileCharacter3,
    tileDot1,
    tileDot2,
    tileDot4,
    tileDot5,
    tileHonorEast,
    tileHonorSouth,
    tileHonorWest,
    tileHonorNorth,
  ];
  const validPong2 = findValidPongs(hand2, tileBamboo2);
  expect(validPong2).toBeTruthy();

  const hand3 = [
    tileBamboo1,
    tileBamboo1,
    tileBamboo1,
    tileBamboo4,
    tileCharacter1,
    tileCharacter2,
    tileCharacter3,
    tileDot1,
    tileDot2,
    tileDot4,
    tileDot5,
    tileHonorEast,
    tileHonorSouth,
    tileHonorWest,
    tileHonorNorth,
  ];
  const validPong3 = findValidPongs(hand3, tileBamboo1);
  expect(validPong3).toBeFalsy();
});

test("findValidKongs should correctly identify valid kongs", () => {
  const hand2 = [
    tileBamboo1,
    tileBamboo2,
    tileBamboo2,
    tileBamboo4,
    tileCharacter1,
    tileCharacter2,
    tileCharacter3,
    tileDot1,
    tileDot2,
    tileDot4,
    tileDot5,
    tileHonorEast,
    tileHonorSouth,
    tileHonorWest,
    tileHonorNorth,
  ];
  const validPong2 = findValidKongs(hand2, tileBamboo2);
  expect(validPong2).toBeFalsy();

  const hand3 = [
    tileBamboo1,
    tileBamboo1,
    tileBamboo1,
    tileBamboo4,
    tileCharacter1,
    tileCharacter2,
    tileCharacter3,
    tileDot1,
    tileDot2,
    tileDot4,
    tileDot5,
    tileHonorEast,
    tileHonorSouth,
    tileHonorWest,
    tileHonorNorth,
  ];
  const validPong3 = findValidKongs(hand3, tileBamboo1);
  expect(validPong3).toBeTruthy();
});
