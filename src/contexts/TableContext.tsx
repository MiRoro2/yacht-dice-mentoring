import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";
import assets from "src/constants/assets";

interface Table {
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

interface PreScore {
  id: number;
  value: number | null;
}

type TableContextType = {
  Boxes: Table[];
  setBoxes: Dispatch<SetStateAction<Table[]>>;
  user: User;
  setUser: Dispatch<SetStateAction<User>>;
  message: boolean;
  setMessage: Dispatch<SetStateAction<boolean>>;
  preScore: PreScore[];
  setPreScore: Dispatch<SetStateAction<PreScore[]>>;
  endMessage: boolean;
  setEndMessage: Dispatch<SetStateAction<boolean>>;
};

const TableContext = createContext<TableContextType | undefined>(undefined);

interface TableProviderProps {
  children: ReactNode;
}

export const TableProvider = ({ children }: TableProviderProps) => {
  const [Boxes, setBoxes] = useState<Table[]>([
    { id: 0, score: 0, name: "Aces", img: assets.icons.aces, isChosen: false },
    {
      id: 1,
      score: 0,
      name: "Deuces",
      img: assets.icons.deuces,
      isChosen: false,
    },
    {
      id: 2,
      score: 0,
      name: "Threes",
      img: assets.icons.threes,
      isChosen: false,
    },
    {
      id: 3,
      score: 0,
      name: "Fours",
      img: assets.icons.fours,
      isChosen: false,
    },
    {
      id: 4,
      score: 0,
      name: "Fives",
      img: assets.icons.fives,
      isChosen: false,
    },
    {
      id: 5,
      score: 0,
      name: "Sixes",
      img: assets.icons.sixes,
      isChosen: false,
    },
    {
      id: 6,
      score: 0,
      name: "Choice",
      img: assets.icons.choice,
      isChosen: false,
    },
    {
      id: 7,
      score: 0,
      name: "4 of a kind",
      img: assets.icons.fourOfKind,
      isChosen: false,
    },
    {
      id: 8,
      score: 0,
      name: "Full House",
      img: assets.icons.fullHouse,
      isChosen: false,
    },
    {
      id: 9,
      score: 0,
      name: "Small Straight",
      img: assets.icons.smallStraight,
      isChosen: false,
    },
    {
      id: 10,
      score: 0,
      name: "Large Straight",
      img: assets.icons.largeStraight,
      isChosen: false,
    },
    {
      id: 11,
      score: 0,
      name: "Yacht",
      img: assets.icons.yacht,
      isChosen: false,
    },
  ]);

  const [user, setUser] = useState<User>({
    turn: 1,
    chosenNumber: 0,
    subTotal: 0,
    total: 0,
    bonus: 0,
  });

  const [message, setMessage] = useState<boolean>(false);
  const [endMessage, setEndMessage] = useState<boolean>(false);

  const [preScore, setPreScore] = useState<PreScore[]>([
    { id: 0, value: null },
    { id: 1, value: null },
    { id: 2, value: null },
    { id: 3, value: null },
    { id: 4, value: null },
    { id: 5, value: null },
    { id: 6, value: null },
    { id: 7, value: null },
    { id: 8, value: null },
    { id: 9, value: null },
    { id: 10, value: null },
    { id: 11, value: null },
  ]);

  return (
    <TableContext.Provider
      value={{
        Boxes,
        setBoxes,
        user,
        setUser,
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

export const useTable = (): TableContextType => {
  const context = useContext(TableContext);
  if (!context) {
    throw new Error("useDice must be used within a DiceProvider");
  }
  return context;
};
