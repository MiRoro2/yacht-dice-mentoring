import styled from "styled-components";

import { diceActType, diceValueType, useDice } from "../DiceContext.tsx";

type diceState = {
  id: number;
  diceValue: diceValueType;
  diceAct: diceActType;
};

const Result = () => {
  const { fiveDice, setFiveDice, keepValue, setKeepValue, count } = useDice();

  const changeActive = (id: number) => {
    fiveDice[id - 1].diceAct = diceActType.inactive;
    setFiveDice([...fiveDice]);
    setKeepValue([...keepValue, fiveDice[id - 1].diceValue]);
  };

  const diceAppearing = (dice: diceState) => {
    if (dice.diceAct === diceActType.active && count != 1)
      return (
        <li key={dice.id} onClick={() => changeActive(dice.id)}>
          Value: {dice.diceValue}, Status: {dice.diceAct}
        </li>
      );
    else return null;
  };

  return (
    <ResultBox>
      <ul>
        {fiveDice.map((dice) => (
          <div key={dice.id}>{diceAppearing(dice)}</div>
        ))}
      </ul>
    </ResultBox>
  );
};

const ResultBox = styled.div`
  height: 430px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export default Result;
