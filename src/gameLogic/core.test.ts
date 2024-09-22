import { initializeGame, drawTile, discardTile } from "./core";
import { GameState, Tile } from "./types";

describe("Core Game Logic", () => {
  let initialGameState: GameState;

  beforeEach(() => {
    initialGameState = initializeGame(4);
  });

  test("initializeGame creates correct initial state", () => {
    expect(initialGameState.players.length).toBe(4);
    expect(initialGameState.currentPlayerIndex).toBe(0);
    expect(initialGameState.wallTiles.length).toBe(144 - 13 * 4 - 14); // 144 total tiles, 13 per player, 14 for dead wall
    expect(initialGameState.discardPile.length).toBe(0);
  });

  test("drawTile removes a tile from wall and adds to player hand", () => {
    const initialWallSize = initialGameState.wallTiles.length;
    const initialHandSize = initialGameState.players[0].hand.length;

    const newGameState = drawTile(initialGameState, 0);

    expect(newGameState.wallTiles.length).toBe(initialWallSize - 1);
    expect(newGameState.players[0].hand.length).toBe(initialHandSize + 1);
  });

  test("discardTile moves a tile from player hand to discard pile", () => {
    const tileToDiscard: Tile = initialGameState.players[0].hand[0];
    const initialHandSize = initialGameState.players[0].hand.length;
    const initialDiscardPileSize = initialGameState.discardPile.length;

    const newGameState = discardTile(initialGameState, 0, tileToDiscard);

    expect(newGameState.players[0].hand.length).toBe(initialHandSize - 1);
    expect(newGameState.discardPile.length).toBe(initialDiscardPileSize + 1);
    expect(newGameState.discardPile[0]).toEqual(tileToDiscard);
  });
});
