import { create } from "zustand";
import { GameState } from "../gameLogic/types";
import { initializeGame } from "../gameLogic/core";

type Updater = (state: GameState) => void;
type StoreState = { state: GameState; update: Updater };
export const useStore = create<StoreState>((set) => {
  return {
    state: { ...initializeGame(4) },
    update: (state: GameState) =>
      set(() => ({
        state,
      })),
  };
});
