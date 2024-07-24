import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

import Four_of_a_Kind from "../public/img/4_of_a_kind.svg";
import Aces from "../public/img/Aces.svg";
import Choice from "../public/img/Choice.svg";
import Deuces from "../public/img/Deuces.svg";
import Fives from "../public/img/Fives.svg";
import Fours from "../public/img/Fours.svg";
import Full_House from "../public/img/Full_House.svg";
import Large_Straight from "../public/img/Large_Straight.svg";
import Sixes from "../public/img/Sixes.svg";
import Small_Straight from "../public/img/Small_Straight.svg";
import Threes from "../public/img/Threes.svg";
import Yacht from "../public/img/Yacht.svg";

type tableType = {
  id: number;
  score: number;
  name: string;
  img: string;
  chosen: string;
};

type crownType = {
  turn: number;
  chosenNumber: number;
  subTotal: number;
  total: number;
  bonus: number;
};

type preScoreType = {
  id: number;
  value: number | null;
};

type TableContextType = {
  Boxes: tableType[];
  setBoxes: Dispatch<SetStateAction<tableType[]>>;
  crown: crownType;
  setCrown: Dispatch<SetStateAction<crownType>>;
  message: boolean;
  setMessage: Dispatch<SetStateAction<boolean>>;
  preScore: preScoreType[];
  setPreScore: Dispatch<SetStateAction<preScoreType[]>>;
};

const TableContext = createContext<TableContextType | undefined>(undefined);

export const useTable = (): TableContextType => {
  const context = useContext(TableContext);
  if (!context) {
    throw new Error("useDice must be used within a DiceProvider");
  }
  return context;
};

type TableProviderProps = {
  children: ReactNode;
};

export const TableProvider = ({ children }: TableProviderProps) => {
  const [Boxes, setBoxes] = useState<tableType[]>([
    { id: 0, score: 0, name: "Aces", img: Aces, chosen: "no" },
    { id: 1, score: 0, name: "Deuces", img: Deuces, chosen: "no" },
    { id: 2, score: 0, name: "Threes", img: Threes, chosen: "no" },
    { id: 3, score: 0, name: "Fours", img: Fours, chosen: "no" },
    { id: 4, score: 0, name: "Fives", img: Fives, chosen: "no" },
    { id: 5, score: 0, name: "Sixes", img: Sixes, chosen: "no" },
    {
      id: 6,
      score: 0,
      name: "Choice",
      img: Choice,
      chosen: "no",
    },
    { id: 7, score: 0, name: "4 of a kind", img: Four_of_a_Kind, chosen: "no" },
    { id: 8, score: 0, name: "Full House", img: Full_House, chosen: "no" },
    {
      id: 9,
      score: 0,
      name: "Small Straight",
      img: Small_Straight,
      chosen: "no",
    },
    {
      id: 10,
      score: 0,
      name: "Large Straight",
      img: Large_Straight,
      chosen: "no",
    },
    { id: 11, score: 0, name: "Yacht", img: Yacht, chosen: "no" },
  ]);

  const [crown, setCrown] = useState<crownType>({
    turn: 1,
    chosenNumber: 0,
    subTotal: 0,
    total: 0,
    bonus: 0,
  });

  const [message, setMessage] = useState<boolean>(false);

  const [preScore, setPreScore] = useState<preScoreType[]>([
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
        crown,
        setCrown,
        message,
        setMessage,
        preScore,
        setPreScore,
      }}
    >
      {children}
    </TableContext.Provider>
  );
};
