import styled from "styled-components";

import { diceActType, useDice } from "../DiceContext.tsx";

const Result = () => {
  const { fiveDice, setFiveDice, keepValue, setKeepValue } = useDice();

  const changeActive = (id: number) => {
    fiveDice[id - 1].diceAct = diceActType.inactive;
    setFiveDice([...fiveDice]);
    setKeepValue([...keepValue, fiveDice[id - 1].diceValue]);
  };

  return (
    <ResultBox>
      <ul>
        {fiveDice.map((dice) => (
          <li key={dice.id} onClick={() => changeActive(dice.id)}>
            Value: {dice.diceValue}, Status: {dice.diceAct}
          </li>
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
