import { initializeGame } from "../gameLogic/core";
import { GameBoard } from "./GameBoard";

export const MahjongGame: React.FC = () => {
  const gameState = initializeGame(4);
  return (
    <div className="container mx-auto p-6">
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
