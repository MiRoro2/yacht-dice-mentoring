import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

export enum DiceValueType {
  one = 1,
  two = 2,
  three = 3,
  four = 4,
  five = 5,
  six = 6,
}

interface DiceState {
  id: number;
  diceValue: DiceValueType;
  isDiceActive: boolean;
}

type DiceContextType = {
  fiveDice: DiceState[];
  setFiveDice: React.Dispatch<React.SetStateAction<DiceState[]>>;
  keepValue: number[];
  setKeepValue: React.Dispatch<React.SetStateAction<number[]>>;
  count: number;
  setCount: Dispatch<SetStateAction<number>>;
};

const DiceContext = createContext<DiceContextType | undefined>(undefined);

export const useDice = (): DiceContextType => {
  const context = useContext(DiceContext);
  if (!context) {
    throw new Error("useDice must be used within a DiceProvider");
  }
  return context;
};

type DiceProviderProps = {
  children: ReactNode;
};

export const DiceProvider = ({ children }: DiceProviderProps) => {
  const [fiveDice, setFiveDice] = useState<DiceState[]>([
    { id: 1, diceValue: DiceValueType.one, isDiceActive: true },
    { id: 2, diceValue: DiceValueType.one, isDiceActive: true },
    { id: 3, diceValue: DiceValueType.one, isDiceActive: true },
    { id: 4, diceValue: DiceValueType.one, isDiceActive: true },
    { id: 5, diceValue: DiceValueType.one, isDiceActive: true },
  ]);
  const [keepValue, setKeepValue] = useState<number[]>([]);
  const [count, setCount] = useState<number>(1);

  return (
    <DiceContext.Provider
      value={{
        fiveDice,
        setFiveDice,
        keepValue,
        setKeepValue,
        count,
        setCount,
      }}
    >
      {children}
    </DiceContext.Provider>
  );
};
