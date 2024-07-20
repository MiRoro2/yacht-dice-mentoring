import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";

import EndRollButton from "../../public/img/EndRollButton.svg";
import FirstRollButton from "../../public/img/FirstRollButton.svg";
import LastRollButton from "../../public/img/LastRollButton.svg";
import ReRollButton from "../../public/img/ReRollButton.svg";
import { diceValueType, useDice } from "../DiceContext.tsx";

type crownType = {
  turn: number;
  chosenNumber: number;
  subTotal: number;
  total: number;
};

type RollPropsType = {
  crown: crownType;
  setCrown: Dispatch<SetStateAction<crownType>>;
  setMessage: Dispatch<SetStateAction<boolean>>;
  count: number;
  setCount: Dispatch<SetStateAction<number>>;
};

const Roll = ({
  crown,
  setCrown,
  setMessage,
  count,
  setCount,
}: RollPropsType) => {
  const { fiveDice, setFiveDice } = useDice();

  const getRandomDicevalue = (id: number): diceValueType => {
    const values = Object.values(diceValueType).filter(
      (value) => typeof value === "number",
    ) as number[];
    const randomIndex = Math.floor(Math.random() * values.length);
    return fiveDice[id - 1].diceAct === "active"
      ? (values[randomIndex] as diceValueType)
      : fiveDice[id - 1].diceValue;
  };

  const checkCount = () => {
    if (count >= 3) {
      setCrown({ ...crown, turn: crown.turn + 1 });
    }
  };

  const updateDice = () => {
    if (crown.turn - 1 === crown.chosenNumber) {
      const newDiceState = fiveDice.map((dice) => ({
        ...dice,
        diceValue: getRandomDicevalue(dice.id),
      }));
      setFiveDice(newDiceState);
      setCount(count + 1);
      checkCount();
    } else setMessage(true);
  };

  return (
    <RollBox>
      <RollButton
        onClick={() => {
          updateDice();
        }}
      >
        {count === 1 && <LollButton src={FirstRollButton}></LollButton>}
        {count === 2 && <LollButton src={ReRollButton}></LollButton>}
        {count === 3 && <LollButton src={LastRollButton}></LollButton>}
        {count === 4 && <LollButton src={EndRollButton}></LollButton>}
      </RollButton>
    </RollBox>
  );
};

const RollBox = styled.div`
  width: 400px;
  height: 140px;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const LollButton = styled.img`
  width: 200px;
  height: 100px;
`;

const RollButton = styled.div`
  width: 100px;
  height: 40px;
  margin-top: 0;
  border-radius: 20px;
  background-color: #6e6e73;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default Roll;
