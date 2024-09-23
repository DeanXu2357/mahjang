import Svg1 from "./assets/tiles/1.svg";
import Svg2 from "./assets/tiles/2.svg";
import Svg3 from "./assets/tiles/3.svg";
import Svg4 from "./assets/tiles/4.svg";
import Svg5 from "./assets/tiles/5.svg";
import Svg6 from "./assets/tiles/6.svg";
import Svg7 from "./assets/tiles/7.svg";
import Svg8 from "./assets/tiles/8.svg";
import Svg9 from "./assets/tiles/9.svg";
import Svg10 from "./assets/tiles/10.svg";
import Svg11 from "./assets/tiles/11.svg";
import Svg12 from "./assets/tiles/12.svg";
import Svg13 from "./assets/tiles/13.svg";
import Svg14 from "./assets/tiles/14.svg";
import Svg15 from "./assets/tiles/15.svg";
import Svg16 from "./assets/tiles/16.svg";
import Svg17 from "./assets/tiles/17.svg";
import Svg18 from "./assets/tiles/18.svg";
import Svg19 from "./assets/tiles/19.svg";
import Svg20 from "./assets/tiles/20.svg";
import Svg21 from "./assets/tiles/21.svg";
import Svg22 from "./assets/tiles/22.svg";
import Svg23 from "./assets/tiles/23.svg";
import Svg24 from "./assets/tiles/24.svg";
import Svg25 from "./assets/tiles/25.svg";
import Svg26 from "./assets/tiles/26.svg";
import Svg27 from "./assets/tiles/27.svg";
import Svg28 from "./assets/tiles/28.svg";
import Svg29 from "./assets/tiles/29.svg";
import Svg30 from "./assets/tiles/30.svg";
import Svg31 from "./assets/tiles/31.svg";
import Svg32 from "./assets/tiles/32.svg";
import Svg33 from "./assets/tiles/33.svg";
import Svg34 from "./assets/tiles/34.svg";

const svgComponents = {
  1: Svg1,
  2: Svg2,
  3: Svg3,
  4: Svg4,
  5: Svg5,
  6: Svg6,
  7: Svg7,
  8: Svg8,
  9: Svg9,
  10: Svg10,
  11: Svg11,
  12: Svg12,
  13: Svg13,
  14: Svg14,
  15: Svg15,
  16: Svg16,
  17: Svg17,
  18: Svg18,
  19: Svg19,
  20: Svg20,
  21: Svg21,
  22: Svg22,
  23: Svg23,
  24: Svg24,
  25: Svg25,
  26: Svg26,
  27: Svg27,
  28: Svg28,
  29: Svg29,
  30: Svg30,
  31: Svg31,
  32: Svg32,
  33: Svg33,
  34: Svg34,
};

export type SvgNumber = keyof typeof svgComponents;

export function getSvgComponent(number: SvgNumber) {
  console.log(number);
  return svgComponents[number];
}

export type SvgComponentType = ReturnType<typeof getSvgComponent>;
