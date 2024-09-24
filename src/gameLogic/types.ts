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

export type Player = {
  id: number;
  hand: Tile[];
  discards: Tile[];
  exposedSets: Tile[][];
};

export type Wall = {
  tiles: Tile[];
  nextTileIndex: number;
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

export const tileCharacter1 = { suit: SuitEnum.Characters, value: 1, id: 1 };
export const tileCharacter2 = { suit: SuitEnum.Characters, value: 2, id: 2 };
export const tileCharacter3 = { suit: SuitEnum.Characters, value: 3, id: 3 };
export const tileCharacter4 = { suit: SuitEnum.Characters, value: 4, id: 4 };
export const tileCharacter5 = { suit: SuitEnum.Characters, value: 5, id: 5 };
export const tileCharacter6 = { suit: SuitEnum.Characters, value: 6, id: 6 };
export const tileCharacter7 = { suit: SuitEnum.Characters, value: 7, id: 7 };
export const tileCharacter8 = { suit: SuitEnum.Characters, value: 8, id: 8 };
export const tileCharacter9 = { suit: SuitEnum.Characters, value: 9, id: 9 };

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

export const tileDot1 = { suit: SuitEnum.Dots, value: 1, id: 10 };
export const tileDot2 = { suit: SuitEnum.Dots, value: 2, id: 11 };
export const tileDot3 = { suit: SuitEnum.Dots, value: 3, id: 12 };
export const tileDot4 = { suit: SuitEnum.Dots, value: 4, id: 13 };
export const tileDot5 = { suit: SuitEnum.Dots, value: 5, id: 14 };
export const tileDot6 = { suit: SuitEnum.Dots, value: 6, id: 15 };
export const tileDot7 = { suit: SuitEnum.Dots, value: 7, id: 16 };
export const tileDot8 = { suit: SuitEnum.Dots, value: 8, id: 17 };
export const tileDot9 = { suit: SuitEnum.Dots, value: 9, id: 18 };

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

export const tileBamboo1 = { suit: SuitEnum.Bamboo, value: 1, id: 19 };
export const tileBamboo2 = { suit: SuitEnum.Bamboo, value: 2, id: 20 };
export const tileBamboo3 = { suit: SuitEnum.Bamboo, value: 3, id: 21 };
export const tileBamboo4 = { suit: SuitEnum.Bamboo, value: 4, id: 22 };
export const tileBamboo5 = { suit: SuitEnum.Bamboo, value: 5, id: 23 };
export const tileBamboo6 = { suit: SuitEnum.Bamboo, value: 6, id: 24 };
export const tileBamboo7 = { suit: SuitEnum.Bamboo, value: 7, id: 25 };
export const tileBamboo8 = { suit: SuitEnum.Bamboo, value: 8, id: 26 };
export const tileBamboo9 = { suit: SuitEnum.Bamboo, value: 9, id: 27 };

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

export const tileHonorEast = {
  suit: SuitEnum.Honors,
  value: honorWindEast,
  id: 28,
};
export const tileHonorSouth = {
  suit: SuitEnum.Honors,
  value: honorWindSouth,
  id: 29,
};
export const tileHonorWest = {
  suit: SuitEnum.Honors,
  value: honorWindWest,
  id: 30,
};
export const tileHonorNorth = {
  suit: SuitEnum.Honors,
  value: honorWindNorth,
  id: 31,
};
export const tileHonorRed = {
  suit: SuitEnum.Honors,
  value: honorDragonRed,
  id: 32,
};
export const tileHonorGreen = {
  suit: SuitEnum.Honors,
  value: honorDragonGreen,
  id: 33,
};
export const tileHonorWhite = {
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

export const tileFlowerPlum = {
  suit: SuitEnum.Flowers,
  value: flowerPlum,
  id: 35,
};
export const tileFlowerOrchid = {
  suit: SuitEnum.Flowers,
  value: flowerOrchid,
  id: 36,
};
export const tileFlowerChrysanthemum = {
  suit: SuitEnum.Flowers,
  value: flowerChrysanthemum,
  id: 37,
};
export const tileFlowerBamboo = {
  suit: SuitEnum.Flowers,
  value: flowerBamboo,
  id: 38,
};
export const tileFlowerSpring = {
  suit: SuitEnum.Flowers,
  value: flowerSpring,
  id: 39,
};
export const tileFlowerSummer = {
  suit: SuitEnum.Flowers,
  value: flowerSummer,
  id: 40,
};
export const tileFlowerAutumn = {
  suit: SuitEnum.Flowers,
  value: flowerAutumn,
  id: 41,
};
export const tileFlowerWinter = {
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

export const TileIdChineseMap = [
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
