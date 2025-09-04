import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import type { IRiddle } from "../interfaces/IRiddle";
import { BASE_URL } from "../utils/URL";

interface RiddleContextType {
  riddles: IRiddle[] | null;
  setRiddles: React.Dispatch<React.SetStateAction<IRiddle[] | null>>;
}

const RiddlesContext = createContext<RiddleContextType | undefined>({
  riddles: null,
  setRiddles: () => {},
});

const fetchRiddles = async () => {
  try {
    const res = await fetch(`${BASE_URL}/api/riddles/read_all_riddles`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    if (!res.ok) {
      console.error("Failed to fetch riddles:", res.status, res.statusText);
      return;
    }
    const riddles = await res.json();
    localStorage.setItem("riddles", JSON.stringify(riddles));
    return riddles;
  } catch (error) {
    console.error("Error fetching riddles:", error);
  }
};

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
