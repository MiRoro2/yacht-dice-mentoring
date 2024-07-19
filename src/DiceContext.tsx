import { createContext, ReactNode, useContext, useState } from "react";

export enum diceValueType {
  one = 1,
  two = 2,
  three = 3,
  four = 4,
  five = 5,
  six = 6,
}

export enum diceActType {
  active = "active",
  inactive = "inactive",
}

type diceState = {
  id: number;
  diceValue: diceValueType;
  diceAct: diceActType;
};

type DiceContextType = {
  fiveDice: diceState[];
  setFiveDice: React.Dispatch<React.SetStateAction<diceState[]>>;
  keepValue: number[];
  setKeepValue: React.Dispatch<React.SetStateAction<number[]>>;
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
  const [fiveDice, setFiveDice] = useState<diceState[]>([
    { id: 1, diceValue: diceValueType.one, diceAct: diceActType.active },
    { id: 2, diceValue: diceValueType.one, diceAct: diceActType.active },
    { id: 3, diceValue: diceValueType.one, diceAct: diceActType.active },
    { id: 4, diceValue: diceValueType.one, diceAct: diceActType.active },
    { id: 5, diceValue: diceValueType.one, diceAct: diceActType.active },
  ]);
  const [keepValue, setKeepValue] = useState<number[]>([]);

  return (
    <DiceContext.Provider
      value={{ fiveDice, setFiveDice, keepValue, setKeepValue }}
    >
      {children}
    </DiceContext.Provider>
  );
};
