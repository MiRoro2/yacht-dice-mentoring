import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

import {
  INITIAL_PRESCORE_VALUES,
  INITIAL_TABLE_VALUES,
} from "./initialTableValues";

export interface Table {
  id: number;
  score: number;
  name: string;
  img: string;
  isChosen: boolean;
}

interface User {
  turn: number;
  chosenNumber: number;
  subTotal: number;
  total: number;
  bonus: number;
}

export interface PreScore {
  id: number;
  value: number | null;
}

interface TableContext {
  Boxes: Table[];
  setBoxes: Dispatch<SetStateAction<Table[]>>;
  crown: User;
  setCrown: Dispatch<SetStateAction<User>>;
  message: boolean;
  setMessage: Dispatch<SetStateAction<boolean>>;
  preScore: PreScore[];
  setPreScore: Dispatch<SetStateAction<PreScore[]>>;
  endMessage: boolean;
  setEndMessage: Dispatch<SetStateAction<boolean>>;
}

const TableContext = createContext<TableContext | undefined>(undefined);

interface TableProviderProps {
  children: ReactNode;
}

export const TableProvider = ({ children }: TableProviderProps) => {
  const [Boxes, setBoxes] = useState<Table[]>(INITIAL_TABLE_VALUES);
  const [crown, setCrown] = useState<User>({
    turn: 1,
    chosenNumber: 0,
    subTotal: 0,
    total: 0,
    bonus: 0,
  });
  const [message, setMessage] = useState<boolean>(false);
  const [endMessage, setEndMessage] = useState<boolean>(false);
  const [preScore, setPreScore] = useState<PreScore[]>(INITIAL_PRESCORE_VALUES);

  return (
    <TableContext.Provider
      value={{
        Boxes,
        setBoxes,
        crown,
        setCrown,
        message,
        setMessage,
        preScore,
        setPreScore,
        endMessage,
        setEndMessage,
      }}
    >
      {children}
    </TableContext.Provider>
  );
};

export const useTable = (): TableContext => {
  const context = useContext(TableContext);
  if (!context) {
    throw new Error("useDice must be used within a DiceProvider");
  }
  return context;
};
