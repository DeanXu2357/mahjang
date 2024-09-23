import { Player, Tile } from "../gameLogic/types";
import { TileComponent } from "./TileComponent";

interface TileComponentProps {
  player: Player;
  position: string;
  onDiscard?: (tile: Tile) => void;
}

export const PlayerHand: React.FC<TileComponentProps> = ({
  player,
  position,
  onDiscard,
}) => {
  const positionClasses = {
    top: "flex-row justify-center",
    right: "flex-col items-center",
    bottom: "flex-row justify-center",
    left: "flex-col items-center",
  };

  const rotations = {
    top: "0deg",
    right: "-90deg",
    bottom: "0deg",
    left: "90deg",
  };

  const tileContainerClasses = {
    top: "-space-x-0",
    right: "-space-y-6",
    bottom: "-space-x-0",
    left: "-space-y-6",
  };

  return (
    <div
      className={`flex ${
        positionClasses[position as keyof typeof positionClasses]
      } p-4`}
    >
      <h3
        className={`text-xl font-bold mb-3 ${
          position === "left" || position === "right"
            ? "transform -rotate-90"
            : ""
        }`}
      >
        Player {player.id}
      </h3>
      <div
        className={`flex ${
          position === "top" || position === "bottom" ? "flex-row" : "flex-col"
        } ${
          tileContainerClasses[position as keyof typeof tileContainerClasses]
        }`}
      >
        {player.hand.map((tile, index) => (
          <div
            key={index}
            className={`${
              position === "right" || position === "left" ? "my-1" : "mx-1"
            }`}
          >
            <TileComponent
              tile={tile}
              rotation={rotations[position as keyof typeof rotations]}
              onDiscard={onDiscard}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
