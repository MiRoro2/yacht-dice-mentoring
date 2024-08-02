import styled from "styled-components";

import dice1Img from "../../public/img/Dice1.svg";
import dice2Img from "../../public/img/Dice2.svg";
import dice3Img from "../../public/img/Dice3.svg";
import dice4Img from "../../public/img/Dice4.svg";
import dice5Img from "../../public/img/Dice5.svg";
import dice6Img from "../../public/img/Dice6.svg";
import {
  diceActType,
  diceValueType,
  useDice,
} from "../contexts/DiceContext.tsx";

export interface diceState {
  id: number;
  diceValue: diceValueType;
  diceAct: diceActType;
}

const diceImgMap = {
  [diceValueType.one]: dice1Img,
  [diceValueType.two]: dice2Img,
  [diceValueType.three]: dice3Img,
  [diceValueType.four]: dice4Img,
  [diceValueType.five]: dice5Img,
  [diceValueType.six]: dice6Img,
};

export const getDiceImg = (value: diceValueType) => {
  return diceImgMap[value] || "";
};

const Result = () => {
  const { fiveDice, setFiveDice, keepValue, setKeepValue, count } = useDice();

  const activation = (id: number) => {
    fiveDice[id - 1].diceAct = diceActType.inactive;
    setFiveDice([...fiveDice]);
    setKeepValue([...keepValue, fiveDice[id - 1].diceValue]);
  };

  const diceAppearing = (dice: diceState) => {
    if (dice.diceAct === diceActType.active && count != 1)
      return (
        <li key={dice.id} onClick={() => activation(dice.id)}>
          <DiceImg src={getDiceImg(dice.diceValue)} />
        </li>
      );
    else return null;
  };

  return (
    <ResultBox>
      <ListOfDiceImg>
        {fiveDice.map((dice) =>
          dice.diceAct === diceActType.active ? (
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
