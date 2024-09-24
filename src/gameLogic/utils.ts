import { Tile, Wall, SuitEnum, TileIdChineseMap } from "./types";

export function tilesToString(hand: Tile[]): string[] {
  const result: string[] = [];
  for (const tile of hand) {
    result.push(toString(tile));
  }
  return result;
}

// findValidChows finds all valid chows that can be formed from the hand
export function findValidChows(hand: Tile[], claimTile: Tile): Tile[][] {
  const result: Tile[][] = [];

  const handSorted = sortTiles(hand);
  for (let i = 0; i < handSorted.length; i++) {
    for (let j = i + 1; j < handSorted.length; j++) {
      if (canFormSequence(handSorted[i], handSorted[j], claimTile)) {
        result.push(sortTiles([handSorted[i], handSorted[j], claimTile]));
      }
    }
  }

  return result;
}

// findValidPongs finds all valid pongs that can be formed from the hand
export function findValidPongs(hand: Tile[], claimTile: Tile): Tile[][] {
  // Mock implementation
  return [];
}

// findValidKongs finds all valid kongs that can be formed from the hand
export function findValidKongs(hand: Tile[], claimTile: Tile): Tile[][] {
  // Mock implementation
  return [];
}

export const getValue = (tile: Tile): number => tile.value;

export const getSuit = (tile: Tile): SuitEnum => tile.suit;

export const toString = (tile: Tile): string => {
  return TileIdChineseMap[tile.id - 1];
};

export const compareTo = (tile: Tile, other: Tile): number => {
  if (tile.suit !== other.suit) {
    return tile.suit.localeCompare(other.suit);
  }
  return tile.value - other.value;
};

export const canFormSequence = (
  tile: Tile,
  second: Tile,
  third: Tile,
): boolean => {
  if (
    isHonorTile(tile) ||
    second.suit !== tile.suit ||
    third.suit !== tile.suit
  ) {
    return false;
  }
  const values = [tile.value, second.value, third.value].sort((a, b) => a - b);
  return values[0] + 1 === values[1] && values[1] + 1 === values[2];
};

export const isHonorTile = (tile: Tile): boolean =>
  tile.suit === SuitEnum.Honors || tile.suit === SuitEnum.Flowers;

export const getOrderInSuit = (tile: Tile): number => {
  if (isHonorTile(tile)) {
    return getHonorTileOrder(tile);
  }
  return tile.value;
};

export const canFormPair = (tile: Tile, other: Tile): boolean =>
  tile.suit === other.suit && tile.value === other.value;

const getHonorTileOrder = (tile: Tile): number => {
  if (tile.suit === SuitEnum.Honors) {
    return tile.value;
  } else if (tile.suit === SuitEnum.Flowers) {
    return tile.value + 7; // Assuming Flowers come after Honors
  }
  return 0;
};

export function createWall(tiles: Tile[]): Wall {
  return {
    tiles: shuffleTiles([...tiles]),
    nextTileIndex: 0,
  };
}

export function drawTileFromWall(wall: Wall): [Tile | undefined, Wall] {
  if (wall.nextTileIndex < wall.tiles.length) {
    const tile = wall.tiles[wall.nextTileIndex];
    return [tile, { ...wall, nextTileIndex: wall.nextTileIndex + 1 }];
  }
  return [undefined, wall];
}

export function shuffleTiles(tiles: Tile[]): Tile[] {
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

export function sortTiles(tiles: Tile[]): Tile[] {
  const suitOrder = {
    [SuitEnum.Characters]: 0,
    [SuitEnum.Dots]: 1,
    [SuitEnum.Bamboo]: 2,
    [SuitEnum.Honors]: 3,
    [SuitEnum.Flowers]: 4,
  };

  return tiles.sort((a, b) => {
    if (a.suit !== b.suit) {
      return suitOrder[a.suit] - suitOrder[b.suit];
    }
    return a.value - b.value;
  });
}
