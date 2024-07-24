import { useEffect, useState } from "react";
import { useTable } from "src/TableContext.tsx";
import styled from "styled-components";

import Refresh from "../../public/img/Refresh.svg";
import { diceActType, diceValueType, useDice } from "../DiceContext.tsx";
import { CalcScore } from "./CalcScore.tsx";
import InactivateRoll from "./InactivateRoll.tsx";

type diceState = {
  id: number;
  diceValue: diceValueType;
  diceAct: diceActType;
};

const Roll = () => {
  const { fiveDice, setFiveDice, count, setCount } = useDice();
  const { Boxes, preScore, setPreScore, setMessage } = useTable();
  const [rollable, setRollable] = useState(true);

  useEffect(() => {
    const isAnyActive =
      fiveDice[0].diceAct === diceActType.active ||
      fiveDice[1].diceAct === diceActType.active ||
      fiveDice[2].diceAct === diceActType.active ||
      fiveDice[3].diceAct === diceActType.active ||
      fiveDice[4].diceAct === diceActType.active;
    setRollable(isAnyActive);
  }, [fiveDice, rollable]);

  const getRandomDicevalue = (id: number): diceValueType => {
    const values = Object.values(diceValueType).filter(
      (value) => typeof value === "number",
    ) as number[];
    const randomIndex = Math.floor(Math.random() * values.length);
    return fiveDice[id - 1].diceAct === "active"
      ? (values[randomIndex] as diceValueType)
      : fiveDice[id - 1].diceValue;
  };

  const settingPreScore = (newDiceState: diceState[]) => {
    Boxes.map(
      (box) =>
        (preScore[box.id].value = CalcScore(newDiceState, box.name, box.id)),
    );
    setPreScore([...preScore]);
  };

  const updateDice = () => {
    if (count < 4) {
      if (rollable || count === 1) {
        const newDiceState = fiveDice.map((dice) => ({
          ...dice,
          diceValue: getRandomDicevalue(dice.id),
        }));
        setFiveDice(newDiceState);
        setCount(count + 1);
        settingPreScore(newDiceState);
        return;
      } else if (!rollable && count != 1) {
        InactivateRoll();
        return;
      }
    } else setMessage(true);
  };

  function rollContent(upText: string, downText: string) {
    return (
      <>
        <RollAboveWrapper>
          <RefreshImg src={Refresh} />
          <RollText>{upText}</RollText>
        </RollAboveWrapper>
        <LeftText>{downText}</LeftText>
      </>
    );
  }

  function showRolling() {
    return (
      <div
        onClick={() => {
          updateDice();
        }}
      >
        {count === 1 && (
          <RollButton color={true}>
            {rollContent("Roll", `${4 - count} left`)}
          </RollButton>
        )}
        {count != 1 && count != 4 && rollable && (
          <RollButton color={false}>
            {rollContent("Reroll", `${4 - count} left`)}
          </RollButton>
        )}
        {count === 4 && rollable && (
          <RollButton color={false} center={true}>
            <RollText>Ended</RollText>
          </RollButton>
        )}
        {!rollable && count != 1 && (
          <RollButton color={false} center={true}>
            <RollText>Inactive</RollText>
          </RollButton>
        )}
      </div>
    );
  }
  return showRolling();
};

const RollButton = styled.div<{ color: boolean; center?: boolean }>`
  width: 193px;
  height: 82px;
  background: ${(props) => (props.color ? "#FF3B30" : "#6E6E73")};
  border-radius: 10px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: ${(props) => (props.center ? "center;" : ";")}

  &:hover {
    cursor: pointer;
  }
`;

const RollAboveWrapper = styled.div`
  height: 45%;
  width: 70%;
  display: flex;
  align-items: center;
  justify-content: center;

  margin-top: 12px;
`;

const RefreshImg = styled.img`
  width: 40px;
  margin-right: 5px;
`;

const RollText = styled.div`
  font-family: "Pretendard-Black";
  font-size: 30px;
  color: white;
`;

const LeftText = styled.div`
  height: 20%;
  width: 30%;
  display: flex;
  align-items: center;
  justify-content: center;

  font-family: "Pretendard-Regular";
  font-size: 15px;
  color: white;
`;

export default Roll;
