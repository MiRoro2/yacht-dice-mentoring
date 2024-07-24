import styled from "styled-components";

import { diceActType, useDice } from "../DiceContext.tsx";
import { diceState, getDiceImg, ListOfDiceImg } from "./Result.tsx";

const Keep = () => {
  const { fiveDice, setFiveDice, keepValue, setKeepValue, count } = useDice();

  const inactivation = (id: number) => {
    fiveDice[id - 1].diceAct = diceActType.active;
    setFiveDice([...fiveDice]);
    setKeepValue([...keepValue, fiveDice[id - 1].diceValue]);
  };

  const diceAppearing = (dice: diceState) => {
    if (dice.diceAct === diceActType.inactive && count != 1)
      return (
        <li key={dice.id} onClick={() => inactivation(dice.id)}>
          <DiceImg src={getDiceImg(dice.diceValue)} />
        </li>
      );
    else return null;
  };

  return (
    <KeepBox>
      <KeepMessage>keep</KeepMessage>
      <KeepBorder>
        <ListOfDiceImg>
          {fiveDice.map((dice) =>
            dice.diceAct === diceActType.inactive ? (
              <div key={dice.id}>{diceAppearing(dice)}</div>
            ) : null,
          )}
        </ListOfDiceImg>
      </KeepBorder>
    </KeepBox>
  );
};

const DiceImg = styled.img`
  margin-left: 5px;
  margin-right: 5px;
  &:hover {
    cursor: pointer;
    box-shadow: 0 0 15px #d9d9d9;
    border-radius: 20px;
  }
`;

const KeepBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const KeepMessage = styled.h2`
  color: #6e6e73;
  margin: 0;
  margin-bottom: 3px;
`;

const KeepBorder = styled.div`
  width: 615px;
  height: 122px;
  border-radius: 20px;
  border: 8px solid #6e6e73;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  & > ul > div > li > img {
    width: 100px;
  }
`;

export default Keep;
