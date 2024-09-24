import React from "react";
import { Tile } from "../gameLogic/types";
import { getSvgComponent, SvgNumber } from "../tiles";

interface TileComponentProps {
  tile: Tile;
  rotation?: string;
  onDiscard?: (tile: Tile) => void;
  onSelect?: (tile: Tile) => void;
}

export const TileComponent: React.FC<TileComponentProps> = ({
  tile,
  rotation = "0deg",
  onDiscard,
  onSelect,
}) => {
  const handleDoubleClick = () => {
    console.log("das");
    if (onDiscard) {
      onDiscard(tile);
    }
  };

  const handleClick = () => {
    console.log("clio");
    if (onSelect) {
      onSelect(tile);
    }
  };

  return (
    <div
      className="w-14 h-20 bg-gradient-to-br from-white to-gray-100 border border-gray-300 rounded-md shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center text-lg font-bold relative overflow-hidden cursor-pointer"
      style={{ transform: `rotate(${rotation})` }}
      onDoubleClick={handleDoubleClick}
      onClick={handleClick}
    >
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white to-transparent opacity-50"></div>
      <img
        src={getSvgComponent(tile.id as SvgNumber)}
        className="w-12 h-18 relative z-10"
        alt={`Tile ${tile.id}`}
      />
    </div>
  );
};
