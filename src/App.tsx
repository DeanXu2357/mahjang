import React from "react";
import { GameState, Player, Tile, SuitEnum } from "./gameLogic/types";
import { initializeGame } from "./gameLogic/core";
import { getSvgComponent, SvgNumber } from "./tiles";

const TileComponent: React.FC<{ tile: Tile; rotation?: string }> = ({
  tile,
  rotation = "0deg",
}) => (
  <div
    className="w-14 h-20 bg-gradient-to-br from-white to-gray-100 border border-gray-300 rounded-md shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center text-lg font-bold relative overflow-hidden"
    style={{ transform: `rotate(${rotation})` }}
  >
    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white to-transparent opacity-50"></div>
    <img
      src={getSvgComponent(tile.id as SvgNumber)}
      className="w-12 h-18 relative z-10"
    />
  </div>
);

const PlayerHand: React.FC<{ player: Player; position: string }> = ({
  player,
  position,
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
    <div className={`flex ${positionClasses[position]} p-4`}>
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
        } ${tileContainerClasses[position]}`}
      >
        {player.hand.map((tile, index) => (
          <div
            key={index}
            className={`${
              position === "right" || position === "left" ? "my-1" : "mx-1"
            }`}
          >
            <TileComponent tile={tile} rotation={rotations[position]} />
          </div>
        ))}
      </div>
    </div>
  );
};

const DiscardPile: React.FC<{ discardPile: Tile[] }> = ({ discardPile }) => (
  <div className="absolute inset-0 flex items-center justify-center">
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

const GameBoard: React.FC<{ gameState: GameState }> = ({ gameState }) => (
  <div className="relative w-full h-[calc(100vh-8rem)] bg-green-100 rounded-lg shadow-lg overflow-hidden">
    <div className="absolute inset-x-0 top-0 h-1/4 flex items-center justify-center">
      <PlayerHand player={gameState.players[0]} position="top" />
    </div>
    <div className="absolute inset-y-0 right-0 w-1/4 flex items-center justify-center">
      <PlayerHand player={gameState.players[1]} position="right" />
    </div>
    <div className="absolute inset-x-0 bottom-0 h-1/4 flex items-center justify-center">
      <PlayerHand player={gameState.players[2]} position="bottom" />
    </div>
    <div className="absolute inset-y-0 left-0 w-1/4 flex items-center justify-center">
      <PlayerHand player={gameState.players[3]} position="left" />
    </div>
    <DiscardPile discardPile={gameState.discardPile} />
  </div>
);

const MahjongGame: React.FC = () => {
  const gameState = initializeGame(4);
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold mb-6">Mahjong Game</h1>
      <GameBoard gameState={gameState} />
      <div className="mt-6 p-4 bg-yellow-100 rounded-lg flex items-center shadow-md">
        <div className="w-8 h-8 bg-yellow-500 rounded-full mr-3 flex items-center justify-center text-white font-bold text-lg">
          !
        </div>
        <p className="text-yellow-700 text-lg">
          Current player: Player{" "}
          {gameState.players[gameState.currentPlayerIndex].id}
        </p>
      </div>
    </div>
  );
};

export default MahjongGame;
