import { GameState } from "../gameLogic/types";
import { DiscardPile } from "./DiscardPile";
import { PlayerHand } from "./PlayerHand";

export const GameBoard: React.FC<{ gameState: GameState }> = ({
  gameState,
}) => (
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
