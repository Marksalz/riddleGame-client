import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import type { IRiddle } from "../interfaces/IRiddle";
import { fetchRiddles } from "../services/riddleService";

interface RiddleContextType {
  riddles: IRiddle[] | null;
  setRiddles: React.Dispatch<React.SetStateAction<IRiddle[] | null>>;
}

const RiddlesContext = createContext<RiddleContextType | undefined>({
  riddles: null,
  setRiddles: () => {},
});

export const RiddlesProvider = ({ children }: { children: ReactNode }) => {
  const [riddles, setRiddles] = useState<IRiddle[] | null>(null);

  useEffect(() => {
    const getRiddles = async () => {
      const fetchedRiddles = await fetchRiddles();

      if (fetchedRiddles) {
        setRiddles(fetchedRiddles);
      }
    };
    getRiddles();
  }, []);

  return (
    <RiddlesContext.Provider value={{ riddles, setRiddles }}>
      {children}
    </RiddlesContext.Provider>
  );
};

export const useRiddles = () => {
  const context = useContext(RiddlesContext);
  if (!context) {
    throw new Error("useRiddles must be used within a RiddlesProvider");
  }
  return context;
};
