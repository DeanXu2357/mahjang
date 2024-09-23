import { Tile } from "../gameLogic/types";
import { TileComponent } from "./TileComponent";

export const DiscardPile: React.FC<{ discardPile: Tile[] }> = ({
  discardPile,
}) => (
  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
    <div className="bg-green-200 p-6 rounded-lg shadow-md">
      <h3 className="text-2xl font-bold mb-4 text-center">Discard Pile</h3>
      <div className="flex flex-wrap -space-x-4 -space-y-4">
        {discardPile.map((tile, index) => (
          <div key={index} className="p-1">
            <TileComponent tile={tile} />
          </div>
        ))}
      </div>
    </div>
  </div>
);
