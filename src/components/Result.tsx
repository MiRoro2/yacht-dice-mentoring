import assets from "src/constants/assets.ts";
import styled from "styled-components";

import { DiceValueType, useDice } from "../contexts/DiceContext.tsx";
import { DiceState } from "./Roll.tsx";

const diceImgMap = {
  [DiceValueType.One]: assets.dices.dice1,
  [DiceValueType.Two]: assets.dices.dice2,
  [DiceValueType.Three]: assets.dices.dice3,
  [DiceValueType.Four]: assets.dices.dice4,
  [DiceValueType.Five]: assets.dices.dice5,
  [DiceValueType.Six]: assets.dices.dice6,
};

export const getDiceImg = (value: DiceValueType) => {
  return diceImgMap[value];
};

const Result = () => {
  const { fiveDice, setFiveDice, keepValue, setKeepValue, count } = useDice();

  const deactivateDice = (id: number) => {
    fiveDice[id - 1].isDiceActive = false;
    setFiveDice([...fiveDice]);
    setKeepValue([...keepValue, fiveDice[id - 1].diceValue]);
  };

  const diceAppearing = (dice: DiceState) => {
    if (dice.isDiceActive && count > 1)
      return (
        <li key={dice.id} onClick={() => deactivateDice(dice.id)}>
          <DiceImg src={getDiceImg(dice.diceValue)} />
        </li>
      );
    else return null;
  };

  return (
    <ResultBox>
      <ListOfDiceImg>
        {fiveDice.map((dice) =>
          dice.isDiceActive ? (
            <div key={dice.id}>{diceAppearing(dice)}</div>
          ) : null,
        )}
      </ListOfDiceImg>
    </ResultBox>
  );
};

const DiceImg = styled.img`
  width: 160px;
  height: 160px;
  margin-left: 10px;
  margin-right: 10px;
  &:hover {
    margin-left: 0;
    margin-right: 0;
    width: 180px;
    height: 180px;
    cursor: pointer;
    box-shadow: 0 0 15px #d9d9d9;
    border-radius: 20px;
  }
`;

const ResultBox = styled.div`
  width: 100%;
  height: 400px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const ListOfDiceImg = styled.ul`
  width: 100%;
  list-style: none;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 0;
  margin: 0;
`;

export default Result;
