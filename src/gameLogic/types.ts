export enum SuitEnum {
  Honors = "honors",
  Dots = "dots",
  Bamboo = "bamboo",
  Characters = "characters",
  Flowers = "flowers",
}

export interface Tile {
  // Get the numeric value of the tile (1-9 for suited tiles, or a special value for honor tiles)
  getValue(): number;

  // Get the suit of the tile (e.g., 'bamboo', 'characters', 'dots', or 'honor')
  getSuit(): SuitEnum;

  // Get a string representation of the tile (e.g., "5 of bamboo" or "Red Dragon")
  toString(): string;

  // Compare this tile to another tile for sequencing
  // Returns negative if this tile comes before, positive if after, 0 if same
  compareTo(other: Tile): number;

  // Check if this tile can form a sequence with two other tiles
  canFormSequence(second: Tile, third: Tile): boolean;

  // Check if this tile is a honor tile (winds or dragons)
  isHonorTile(): boolean;

  // Get the numeric order of this tile within its suit (1-9 for suited tiles, or a special order for honor tiles)
  getOrderInSuit(): number;

  // Check if this tile can form a pair with another tile
  canFormPair(other: Tile): boolean;
}

export interface Player {
  id: number;
  hand: Tile[];
  discards: Tile[];
  exposedSets: Tile[][];
}

export interface GameState {
  players: Player[];
  currentPlayerIndex: number;
  wallTiles: Wall;
  discardPile: Tile[];
  dora: Tile[];
  round: number;
  prevailingWind: "east" | "south" | "west" | "north";
}

export interface Wall {
  // Draw a tile from the wall
  drawTile(): Tile | undefined;

  // Shuffle the wall
  shuffle(): void;

  // Get the number of tiles remaining in the wall
  tilesRemaining(): number;
}

class MahjongTile implements Tile {
  private value: number;
  private suit: SuitEnum;

  constructor(value: number, suit: SuitEnum) {
    this.value = value;
    this.suit = suit;
  }

  getValue(): number {
    return this.value;
  }

  getSuit(): SuitEnum {
    return this.suit;
  }

  toString(): string {
    if (this.isHonorTile()) {
      return this.getHonorTileName();
    }
    return `${this.value} of ${this.suit}`;
  }

  compareTo(other: Tile): number {
    if (this.suit !== other.getSuit()) {
      return this.suit.localeCompare(other.getSuit());
    }
    return this.value - other.getValue();
  }

  canFormSequence(second: Tile, third: Tile): boolean {
    if (
      this.isHonorTile() ||
      second.getSuit() !== this.suit ||
      third.getSuit() !== this.suit
    ) {
      return false;
    }
    const values = [this.value, second.getValue(), third.getValue()].sort(
      (a, b) => a - b
    );
    return values[0] + 1 === values[1] && values[1] + 1 === values[2];
  }

  isHonorTile(): boolean {
    return this.suit === SuitEnum.Honors || this.suit === SuitEnum.Flowers;
  }

  getOrderInSuit(): number {
    if (this.isHonorTile()) {
      return this.getHonorTileOrder();
    }
    return this.value;
  }

  canFormPair(other: Tile): boolean {
    return this.suit === other.getSuit() && this.value === other.getValue();
  }

  private getHonorTileName(): string {
    if (this.suit === SuitEnum.Honors) {
      switch (this.value) {
        case 1:
          return "East Wind";
        case 2:
          return "South Wind";
        case 3:
          return "West Wind";
        case 4:
          return "North Wind";
        case 5:
          return "Red Dragon";
        case 6:
          return "Green Dragon";
        case 7:
          return "White Dragon";
        default:
          return "Unknown Honor Tile";
      }
    } else if (this.suit === SuitEnum.Flowers) {
      return `Flower ${this.value}`;
    }
    return "Unknown Tile";
  }

  private getHonorTileOrder(): number {
    if (this.suit === SuitEnum.Honors) {
      return this.value;
    } else if (this.suit === SuitEnum.Flowers) {
      return this.value + 7; // Assuming Flowers come after Honors
    }
    return 0;
  }
}

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

const honorAndFlowerTileMap = new Map<number, string>([
  [honorWindEast, "East Wind"],
  [honorWindSouth, "South Wind"],
  [honorWindWest, "West Wind"],
  [honorWindNorth, "North Wind"],
  [honorDragonRed, "Red Dragon"],
  [honorDragonGreen, "Green Dragon"],
  [honorDragonWhite, "White Dragon"],
  [flowerSpring, "Spring"],
  [flowerSummer, "Summer"],
  [flowerAutumn, "Autumn"],
  [flowerWinter, "Winter"],
  [flowerPlum, "Plum"],
  [flowerOrchid, "Orchid"],
  [flowerChrysanthemum, "Chrysanthemum"],
  [flowerBamboo, "Bamboo"],
]);

// character set of tiles
export const characterTiles: MahjongTile[] = [
  new MahjongTile(1, SuitEnum.Characters),
  new MahjongTile(1, SuitEnum.Characters),
  new MahjongTile(1, SuitEnum.Characters),
  new MahjongTile(1, SuitEnum.Characters),
  new MahjongTile(2, SuitEnum.Characters),
  new MahjongTile(2, SuitEnum.Characters),
  new MahjongTile(2, SuitEnum.Characters),
  new MahjongTile(2, SuitEnum.Characters),
  new MahjongTile(3, SuitEnum.Characters),
  new MahjongTile(3, SuitEnum.Characters),
  new MahjongTile(3, SuitEnum.Characters),
  new MahjongTile(3, SuitEnum.Characters),
  new MahjongTile(4, SuitEnum.Characters),
  new MahjongTile(4, SuitEnum.Characters),
  new MahjongTile(4, SuitEnum.Characters),
  new MahjongTile(4, SuitEnum.Characters),
  new MahjongTile(5, SuitEnum.Characters),
  new MahjongTile(5, SuitEnum.Characters),
  new MahjongTile(5, SuitEnum.Characters),
  new MahjongTile(5, SuitEnum.Characters),
  new MahjongTile(6, SuitEnum.Characters),
  new MahjongTile(6, SuitEnum.Characters),
  new MahjongTile(6, SuitEnum.Characters),
  new MahjongTile(6, SuitEnum.Characters),
  new MahjongTile(7, SuitEnum.Characters),
  new MahjongTile(7, SuitEnum.Characters),
  new MahjongTile(7, SuitEnum.Characters),
  new MahjongTile(7, SuitEnum.Characters),
  new MahjongTile(8, SuitEnum.Characters),
  new MahjongTile(8, SuitEnum.Characters),
  new MahjongTile(8, SuitEnum.Characters),
  new MahjongTile(8, SuitEnum.Characters),
  new MahjongTile(9, SuitEnum.Characters),
  new MahjongTile(9, SuitEnum.Characters),
  new MahjongTile(9, SuitEnum.Characters),
  new MahjongTile(9, SuitEnum.Characters),
];

// bamboo set of tiles
export const bambooTiles: MahjongTile[] = [
  new MahjongTile(1, SuitEnum.Bamboo),
  new MahjongTile(1, SuitEnum.Bamboo),
  new MahjongTile(1, SuitEnum.Bamboo),
  new MahjongTile(1, SuitEnum.Bamboo),
  new MahjongTile(2, SuitEnum.Bamboo),
  new MahjongTile(2, SuitEnum.Bamboo),
  new MahjongTile(2, SuitEnum.Bamboo),
  new MahjongTile(2, SuitEnum.Bamboo),
  new MahjongTile(3, SuitEnum.Bamboo),
  new MahjongTile(3, SuitEnum.Bamboo),
  new MahjongTile(3, SuitEnum.Bamboo),
  new MahjongTile(3, SuitEnum.Bamboo),
  new MahjongTile(4, SuitEnum.Bamboo),
  new MahjongTile(4, SuitEnum.Bamboo),
  new MahjongTile(4, SuitEnum.Bamboo),
  new MahjongTile(4, SuitEnum.Bamboo),
  new MahjongTile(5, SuitEnum.Bamboo),
  new MahjongTile(5, SuitEnum.Bamboo),
  new MahjongTile(5, SuitEnum.Bamboo),
  new MahjongTile(5, SuitEnum.Bamboo),
  new MahjongTile(6, SuitEnum.Bamboo),
  new MahjongTile(6, SuitEnum.Bamboo),
  new MahjongTile(6, SuitEnum.Bamboo),
  new MahjongTile(6, SuitEnum.Bamboo),
  new MahjongTile(7, SuitEnum.Bamboo),
  new MahjongTile(7, SuitEnum.Bamboo),
  new MahjongTile(7, SuitEnum.Bamboo),
  new MahjongTile(7, SuitEnum.Bamboo),
  new MahjongTile(8, SuitEnum.Bamboo),
  new MahjongTile(8, SuitEnum.Bamboo),
  new MahjongTile(8, SuitEnum.Bamboo),
  new MahjongTile(8, SuitEnum.Bamboo),
  new MahjongTile(9, SuitEnum.Bamboo),
  new MahjongTile(9, SuitEnum.Bamboo),
  new MahjongTile(9, SuitEnum.Bamboo),
  new MahjongTile(9, SuitEnum.Bamboo),
];

// dot set of tiles
export const dotTiles: MahjongTile[] = [
  new MahjongTile(1, SuitEnum.Dots),
  new MahjongTile(1, SuitEnum.Dots),
  new MahjongTile(1, SuitEnum.Dots),
  new MahjongTile(1, SuitEnum.Dots),
  new MahjongTile(2, SuitEnum.Dots),
  new MahjongTile(2, SuitEnum.Dots),
  new MahjongTile(2, SuitEnum.Dots),
  new MahjongTile(2, SuitEnum.Dots),
  new MahjongTile(3, SuitEnum.Dots),
  new MahjongTile(3, SuitEnum.Dots),
  new MahjongTile(3, SuitEnum.Dots),
  new MahjongTile(3, SuitEnum.Dots),
  new MahjongTile(4, SuitEnum.Dots),
  new MahjongTile(4, SuitEnum.Dots),
  new MahjongTile(4, SuitEnum.Dots),
  new MahjongTile(4, SuitEnum.Dots),
  new MahjongTile(5, SuitEnum.Dots),
  new MahjongTile(5, SuitEnum.Dots),
  new MahjongTile(5, SuitEnum.Dots),
  new MahjongTile(5, SuitEnum.Dots),
  new MahjongTile(6, SuitEnum.Dots),
  new MahjongTile(6, SuitEnum.Dots),
  new MahjongTile(6, SuitEnum.Dots),
  new MahjongTile(6, SuitEnum.Dots),
  new MahjongTile(7, SuitEnum.Dots),
  new MahjongTile(7, SuitEnum.Dots),
  new MahjongTile(7, SuitEnum.Dots),
  new MahjongTile(7, SuitEnum.Dots),
  new MahjongTile(8, SuitEnum.Dots),
  new MahjongTile(8, SuitEnum.Dots),
  new MahjongTile(8, SuitEnum.Dots),
  new MahjongTile(8, SuitEnum.Dots),
  new MahjongTile(9, SuitEnum.Dots),
  new MahjongTile(9, SuitEnum.Dots),
  new MahjongTile(9, SuitEnum.Dots),
  new MahjongTile(9, SuitEnum.Dots),
];

// honor set of tiles
export const honorTiles: MahjongTile[] = [
  new MahjongTile(honorWindEast, SuitEnum.Honors),
  new MahjongTile(honorWindEast, SuitEnum.Honors),
  new MahjongTile(honorWindEast, SuitEnum.Honors),
  new MahjongTile(honorWindEast, SuitEnum.Honors),
  new MahjongTile(honorWindSouth, SuitEnum.Honors),
  new MahjongTile(honorWindSouth, SuitEnum.Honors),
  new MahjongTile(honorWindSouth, SuitEnum.Honors),
  new MahjongTile(honorWindSouth, SuitEnum.Honors),
  new MahjongTile(honorWindWest, SuitEnum.Honors),
  new MahjongTile(honorWindWest, SuitEnum.Honors),
  new MahjongTile(honorWindWest, SuitEnum.Honors),
  new MahjongTile(honorWindWest, SuitEnum.Honors),
  new MahjongTile(honorWindNorth, SuitEnum.Honors),
  new MahjongTile(honorWindNorth, SuitEnum.Honors),
  new MahjongTile(honorWindNorth, SuitEnum.Honors),
  new MahjongTile(honorWindNorth, SuitEnum.Honors),
  new MahjongTile(honorDragonRed, SuitEnum.Honors),
  new MahjongTile(honorDragonRed, SuitEnum.Honors),
  new MahjongTile(honorDragonRed, SuitEnum.Honors),
  new MahjongTile(honorDragonRed, SuitEnum.Honors),
  new MahjongTile(honorDragonGreen, SuitEnum.Honors),
  new MahjongTile(honorDragonGreen, SuitEnum.Honors),
  new MahjongTile(honorDragonGreen, SuitEnum.Honors),
  new MahjongTile(honorDragonGreen, SuitEnum.Honors),
  new MahjongTile(honorDragonWhite, SuitEnum.Honors),
  new MahjongTile(honorDragonWhite, SuitEnum.Honors),
  new MahjongTile(honorDragonWhite, SuitEnum.Honors),
  new MahjongTile(honorDragonWhite, SuitEnum.Honors),
];

// flower set of tiles
export const flowerTiles: MahjongTile[] = [
  new MahjongTile(flowerPlum, SuitEnum.Flowers),
  new MahjongTile(flowerOrchid, SuitEnum.Flowers),
  new MahjongTile(flowerChrysanthemum, SuitEnum.Flowers),
  new MahjongTile(flowerBamboo, SuitEnum.Flowers),
  new MahjongTile(flowerSpring, SuitEnum.Flowers),
  new MahjongTile(flowerSummer, SuitEnum.Flowers),
  new MahjongTile(flowerAutumn, SuitEnum.Flowers),
  new MahjongTile(flowerWinter, SuitEnum.Flowers),
];
