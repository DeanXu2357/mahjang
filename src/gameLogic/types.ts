export enum SuitEnum {
  Honors = "honors",
  Dots = "dots",
  Bamboo = "bamboo",
  Characters = "characters",
  Flowers = "flowers",
}

export type GameState = {
  players: Player[];
  currentPlayerIndex: number;
  wallTiles: Wall;
  discardPile: Tile[];
  dora: Tile[];
  round: number;
  prevailingWind: string;
};

export type Tile = {
  id: number;
  value: number;
  suit: SuitEnum;
};

export interface Player {
  id: number;
  hand: Tile[];
  discards: Tile[];
  exposedSets: Tile[][];
}

export type Wall = {
  tiles: Tile[];
  nextTileIndex: number;
};

export const getValue = (tile: Tile): number => tile.value;

export const getSuit = (tile: Tile): SuitEnum => tile.suit;

export const toString = (tile: Tile): string => {
  return tileIdChineseMap[tile.id - 1];
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

const honorWindEast = 1;
const honorWindSouth = 2;
const honorWindWest = 3;
const honorWindNorth = 4;
const honorDragonRed = 5;
const honorDragonGreen = 6;
const honorDragonWhite = 7;

const flowerSpring = 8;
const flowerSummer = 9;
const flowerAutumn = 10;
const flowerWinter = 11;
const flowerPlum = 12;
const flowerOrchid = 13;
const flowerChrysanthemum = 14;
const flowerBamboo = 15;

const tileCharacter1 = { suit: SuitEnum.Characters, value: 1, id: 1 };
const tileCharacter2 = { suit: SuitEnum.Characters, value: 2, id: 2 };
const tileCharacter3 = { suit: SuitEnum.Characters, value: 3, id: 3 };
const tileCharacter4 = { suit: SuitEnum.Characters, value: 4, id: 4 };
const tileCharacter5 = { suit: SuitEnum.Characters, value: 5, id: 5 };
const tileCharacter6 = { suit: SuitEnum.Characters, value: 6, id: 6 };
const tileCharacter7 = { suit: SuitEnum.Characters, value: 7, id: 7 };
const tileCharacter8 = { suit: SuitEnum.Characters, value: 8, id: 8 };
const tileCharacter9 = { suit: SuitEnum.Characters, value: 9, id: 9 };

// prettier-ignore
export const characterTiles = [
  tileCharacter1, tileCharacter1, tileCharacter1, tileCharacter1,
  tileCharacter2, tileCharacter2, tileCharacter2, tileCharacter2,
  tileCharacter3, tileCharacter3, tileCharacter3, tileCharacter3,
  tileCharacter4, tileCharacter4, tileCharacter4, tileCharacter4,
  tileCharacter5, tileCharacter5, tileCharacter5, tileCharacter5,
  tileCharacter6, tileCharacter6, tileCharacter6, tileCharacter6,
  tileCharacter7, tileCharacter7, tileCharacter7, tileCharacter7,
  tileCharacter8, tileCharacter8, tileCharacter8, tileCharacter8,
  tileCharacter9, tileCharacter9, tileCharacter9, tileCharacter9,
];

const tileDot1 = { suit: SuitEnum.Dots, value: 1, id: 10 };
const tileDot2 = { suit: SuitEnum.Dots, value: 2, id: 11 };
const tileDot3 = { suit: SuitEnum.Dots, value: 3, id: 12 };
const tileDot4 = { suit: SuitEnum.Dots, value: 4, id: 13 };
const tileDot5 = { suit: SuitEnum.Dots, value: 5, id: 14 };
const tileDot6 = { suit: SuitEnum.Dots, value: 6, id: 15 };
const tileDot7 = { suit: SuitEnum.Dots, value: 7, id: 16 };
const tileDot8 = { suit: SuitEnum.Dots, value: 8, id: 17 };
const tileDot9 = { suit: SuitEnum.Dots, value: 9, id: 18 };

// prettier-ignore
export const dotTiles = [
  tileDot1, tileDot1, tileDot1, tileDot1,
  tileDot2, tileDot2, tileDot2, tileDot2,
  tileDot3, tileDot3, tileDot3, tileDot3,
  tileDot4, tileDot4, tileDot4, tileDot4,
  tileDot5, tileDot5, tileDot5, tileDot5,
  tileDot6, tileDot6, tileDot6, tileDot6,
  tileDot7, tileDot7, tileDot7, tileDot7,
  tileDot8, tileDot8, tileDot8, tileDot8,
  tileDot9, tileDot9, tileDot9, tileDot9,
];

const tileBamboo1 = { suit: SuitEnum.Bamboo, value: 1, id: 19 };
const tileBamboo2 = { suit: SuitEnum.Bamboo, value: 2, id: 20 };
const tileBamboo3 = { suit: SuitEnum.Bamboo, value: 3, id: 21 };
const tileBamboo4 = { suit: SuitEnum.Bamboo, value: 4, id: 22 };
const tileBamboo5 = { suit: SuitEnum.Bamboo, value: 5, id: 23 };
const tileBamboo6 = { suit: SuitEnum.Bamboo, value: 6, id: 24 };
const tileBamboo7 = { suit: SuitEnum.Bamboo, value: 7, id: 25 };
const tileBamboo8 = { suit: SuitEnum.Bamboo, value: 8, id: 26 };
const tileBamboo9 = { suit: SuitEnum.Bamboo, value: 9, id: 27 };

// prettier-ignore
export const bambooTiles = [
  tileBamboo1, tileBamboo1, tileBamboo1, tileBamboo1,
  tileBamboo2, tileBamboo2, tileBamboo2, tileBamboo2,
  tileBamboo3, tileBamboo3, tileBamboo3, tileBamboo3,
  tileBamboo4, tileBamboo4, tileBamboo4, tileBamboo4,
  tileBamboo5, tileBamboo5, tileBamboo5, tileBamboo5,
  tileBamboo6, tileBamboo6, tileBamboo6, tileBamboo6,
  tileBamboo7, tileBamboo7, tileBamboo7, tileBamboo7,
  tileBamboo8, tileBamboo8, tileBamboo8, tileBamboo8,
  tileBamboo9, tileBamboo9, tileBamboo9, tileBamboo9,
];

const tileHonorEast = { suit: SuitEnum.Honors, value: honorWindEast, id: 28 };
const tileHonorSouth = { suit: SuitEnum.Honors, value: honorWindSouth, id: 29 };
const tileHonorWest = { suit: SuitEnum.Honors, value: honorWindWest, id: 30 };
const tileHonorNorth = { suit: SuitEnum.Honors, value: honorWindNorth, id: 31 };
const tileHonorRed = { suit: SuitEnum.Honors, value: honorDragonRed, id: 32 };
const tileHonorGreen = {
  suit: SuitEnum.Honors,
  value: honorDragonGreen,
  id: 33,
};
const tileHonorWhite = {
  suit: SuitEnum.Honors,
  value: honorDragonWhite,
  id: 34,
};

// prettier-ignore
export const honorTiles = [
  tileHonorEast, tileHonorEast, tileHonorEast, tileHonorEast,
  tileHonorSouth, tileHonorSouth, tileHonorSouth, tileHonorSouth,
  tileHonorWest, tileHonorWest, tileHonorWest, tileHonorWest,
  tileHonorNorth, tileHonorNorth, tileHonorNorth, tileHonorNorth,
  tileHonorRed, tileHonorRed, tileHonorRed, tileHonorRed,
  tileHonorGreen, tileHonorGreen, tileHonorGreen, tileHonorGreen,
  tileHonorWhite, tileHonorWhite, tileHonorWhite, tileHonorWhite,
];

const tileFlowerPlum = { suit: SuitEnum.Flowers, value: flowerPlum, id: 35 };
const tileFlowerOrchid = {
  suit: SuitEnum.Flowers,
  value: flowerOrchid,
  id: 36,
};
const tileFlowerChrysanthemum = {
  suit: SuitEnum.Flowers,
  value: flowerChrysanthemum,
  id: 37,
};
const tileFlowerBamboo = {
  suit: SuitEnum.Flowers,
  value: flowerBamboo,
  id: 38,
};
const tileFlowerSpring = {
  suit: SuitEnum.Flowers,
  value: flowerSpring,
  id: 39,
};
const tileFlowerSummer = {
  suit: SuitEnum.Flowers,
  value: flowerSummer,
  id: 40,
};
const tileFlowerAutumn = {
  suit: SuitEnum.Flowers,
  value: flowerAutumn,
  id: 41,
};
const tileFlowerWinter = {
  suit: SuitEnum.Flowers,
  value: flowerWinter,
  id: 42,
};

export const flowerTiles = [
  tileFlowerPlum,
  tileFlowerOrchid,
  tileFlowerChrysanthemum,
  tileFlowerBamboo,
  tileFlowerSpring,
  tileFlowerSummer,
  tileFlowerAutumn,
  tileFlowerWinter,
];

const tileIdChineseMap = [
  "一萬",
  "二萬",
  "三萬",
  "四萬",
  "五萬",
  "六萬",
  "七萬",
  "八萬",
  "九萬",
  "一筒",
  "二筒",
  "三筒",
  "四筒",
  "五筒",
  "六筒",
  "七筒",
  "八筒",
  "九筒",
  "一條",
  "二條",
  "三條",
  "四條",
  "五條",
  "六條",
  "七條",
  "八條",
  "九條",
  "東",
  "南",
  "西",
  "北",
  "紅中",
  "青發",
  "白板",
  "梅花",
  "蘭花",
  "菊花",
  "竹花",
  "春",
  "夏",
  "秋",
  "冬",
];
