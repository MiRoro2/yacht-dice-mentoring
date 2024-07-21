import { useTable } from "src/TableContext.tsx";
import styled from "styled-components";

import EndRollButton from "../../public/img/EndRollButton.svg";
import FirstRollButton from "../../public/img/FirstRollButton.svg";
import LastRollButton from "../../public/img/LastRollButton.svg";
import ReRollButton from "../../public/img/ReRollButton.svg";
import { diceValueType, useDice } from "../DiceContext.tsx";

const Roll = () => {
  const { fiveDice, setFiveDice, count, setCount } = useDice();
  const { setMessage } = useTable();

  const getRandomDicevalue = (id: number): diceValueType => {
    const values = Object.values(diceValueType).filter(
      (value) => typeof value === "number",
    ) as number[];
    const randomIndex = Math.floor(Math.random() * values.length);
    return fiveDice[id - 1].diceAct === "active"
      ? (values[randomIndex] as diceValueType)
      : fiveDice[id - 1].diceValue;
  };

  const updateDice = () => {
    if (count < 4) {
      const newDiceState = fiveDice.map((dice) => ({
        ...dice,
        diceValue: getRandomDicevalue(dice.id),
      }));
      setFiveDice(newDiceState);
      setCount(count + 1);
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
  width: 200px;
  height: 82px;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const LollButton = styled.img`
  width: 200px;
  height: 100px;
`;

const RollButton = styled.div`
  width: 200px;
  height: 82px;
  margin-top: 0;
  border-radius: 15px;
  background-color: #6e6e73;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  &:hover {
    cursor: pointer;
  }
`;

export default Roll;
