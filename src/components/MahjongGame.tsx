import { useStore } from "../store";
import { GameBoard } from "./GameBoard";

export const MahjongGame: React.FC = () => {
  const { state } = useStore();
  return (
    <div className="container mx-auto p-6">
      <GameBoard gameState={state} />
      <div className="mt-6 p-4 bg-yellow-100 rounded-lg flex items-center shadow-md">
        <div className="w-8 h-8 bg-yellow-500 rounded-full mr-3 flex items-center justify-center text-white font-bold text-lg">
          !
        </div>
        <p className="text-yellow-700 text-lg">
          Current player: Player {state.players[state.currentPlayerIndex].id}
        </p>
      </div>
    </div>
  );
};
