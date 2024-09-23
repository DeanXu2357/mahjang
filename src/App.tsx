import React from "react";
import { GameState, Player, Tile, SuitEnum } from "./gameLogic/types";
import { initializeGame } from "./gameLogic/core";
import { getSvgComponent } from "./tiles";

const TileComponent: React.FC<{ tile: Tile }> = ({ tile }) => (
  <div className="w-12 h-16 bg-white border border-gray-300 rounded flex items-center justify-center text-lg font-bold">
    <img src={getSvgComponent(1)} className="w-10 h-14" />
  </div>
);

const PlayerHand: React.FC<{ player: Player }> = ({ player }) => (
  <div className="flex flex-col items-center">
    <h3 className="text-xl font-bold mb-3">Player {player.id}</h3>
    <div className="flex space-x-2 mb-3">
      {player.hand.map((tile, index) => (
        <TileComponent key={index} tile={tile} />
      ))}
    </div>
    <div className="flex flex-wrap justify-center gap-2 max-w-md">
      {player.discards.map((tile, index) => (
        <TileComponent key={index} tile={tile} />
      ))}
    </div>
  </div>
);

const GameBoard: React.FC<{ gameState: GameState }> = ({ gameState }) => (
  <div className="flex flex-col items-center bg-green-100 p-6 rounded-lg">
    <div className="grid grid-cols-2 gap-12 mb-12">
      {gameState.players.map((player) => (
        <PlayerHand key={player.id} player={player} />
      ))}
    </div>
    <div className="flex space-x-8 mb-6">
      <div>
        <h3 className="text-xl font-bold mb-3">Discard Pile</h3>
        <div className="flex flex-wrap gap-2 max-w-md">
          {gameState.discardPile.map((tile, index) => (
            <TileComponent key={index} tile={tile} />
          ))}
        </div>
      </div>
      <div>
        <h3 className="text-xl font-bold mb-3">Dora Indicators</h3>
        <div className="flex space-x-2">
          {gameState.dora.map((tile, index) => (
            <TileComponent key={index} tile={tile} />
          ))}
        </div>
      </div>
    </div>
    <div className="text-center">
      <p className="text-xl font-bold">Round: {gameState.round}</p>
      <p className="text-xl font-bold">
        Prevailing Wind: {gameState.prevailingWind}
      </p>
    </div>
  </div>
);

const MahjongGame: React.FC = () => {
  const gameState = initializeGame(4);
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold mb-6">Mahjong Game</h1>
      <GameBoard gameState={gameState} />
      <div className="mt-6 p-4 bg-yellow-100 rounded-lg flex items-center">
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
