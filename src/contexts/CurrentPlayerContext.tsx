import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

export interface Player {
  id: string;
  username: string;
  role: string;
  lowestTime: number;
}

interface CurrentPlayerContextType {
  currentPlayer: Player | null;
  setCurrentPlayer: (player: Player | null) => void;
}

const CurrentPlayerContext = createContext<
  CurrentPlayerContextType | undefined
>(undefined);

export const CurrentPlayerProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);

  return (
    <CurrentPlayerContext.Provider value={{ currentPlayer, setCurrentPlayer }}>
      {children}
    </CurrentPlayerContext.Provider>
  );
};

export const useCurrentPlayer = () => {
  const context = useContext(CurrentPlayerContext);
  if (!context) {
    throw new Error(
      "useCurrentPlayer must be used within a CurrentPlayerProvider"
    );
  }
  return context;
};
