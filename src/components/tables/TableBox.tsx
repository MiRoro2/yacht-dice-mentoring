import SCORE_PRESETS from "src/constants/scorePresets";
import { Hands } from "src/constants/types";
import { useDice } from "src/contexts/DiceContext";
import { System, useTable } from "src/contexts/TableContext";
import styled, { css } from "styled-components";

import { calculateScore } from "../calculateScore";

const tableLine = css`
  border: solid #b3b3b3;
`;

const hoverStyle = css`
  &:hover {
    cursor: pointer;
    & > div > div {
      font-size: 20px;
      color: black;
    }
  }
`;

const TableClick = styled.div`
  ${hoverStyle};

  display: flex;
  background: white;
`;

const Left = styled.div`
  ${tableLine};
  border-width: 1px 0 0 1px;

  width: 183px;
  height: 36px;

  display: flex;
  align-items: center;
`;

const LeftImg = styled.img`
  height: 24px;
  margin-left: 5px;
`;

const LeftText = styled.div`
  font-weight: 800;
  font-size: 17px;
  color: grey;

  margin-left: 5px;
`;

const Right = styled.div`
  ${tableLine};
  border-width: 1px 1px 0 1px;

  width: 79px;
  height: 36px;

  display: flex;
  align-items: center;
  justify-content: center;

  font-weight: 800;
  font-size: 17px;
  color: black;
`;

const PreScoreFont = styled.div`
  color: #d2d2d2;

  font-size: 17px;
`;

type BoxType = {
  keyValue: number;
};

function TableBox({ keyValue }: BoxType) {
  const { fiveDice, setKeepValue, count, setCount } = useDice();
  const { boxes, setBoxes, system, setSystem, setMessage, preScore } =
    useTable();

  function writeScore(name: Hands, id: number) {
    const resultScore = calculateScore(fiveDice, name, id);

    const setSystemDefault = (id: number, system: System) => {
      setSystem({
        ...system,
        total: system.total + boxes[id].score,
        chosenNumber: system.chosenNumber + 1,
        turn: system.turn + 1,
      });
    };

    if (system.turn > system.chosenNumber && !boxes[id].isChosen && count > 1) {
      fiveDice.map((dice) => (dice.isDiceActive = true));

      setKeepValue([]);

      const _boxes = boxes;
      _boxes[id].score += resultScore;
      _boxes[id].isChosen = true;

      setBoxes([..._boxes]);

      const applyBonus = () => {
        if (system.total + boxes[id].score >= 35 && system.bonus === 0) {
          setSystem((system) => ({
            ...system,
            bonus: SCORE_PRESETS.bonusScore,
            total: (system.total += SCORE_PRESETS.bonusScore),
          }));
        }
        setSystemDefault(id, system);
      };
      applyBonus();

      if (
        name === Hands.Aces ||
        name === Hands.Deuces ||
        name === Hands.Threes ||
        name === Hands.Fours ||
        name === Hands.Fives ||
        name === Hands.Sixes
      ) {
        setSystemDefault(id, {
          ...system,
          subTotal: system.subTotal + boxes[id].score,
        });
      }
      setCount(1);
      preScore.map((score) => (score.value = null));

      if (system.turn === SCORE_PRESETS.maxTurn) {
        const _system = system;
        _system.turn = SCORE_PRESETS.maxTurn - 1;
        setSystemDefault(id, _system);
      }
    } else if (system.turn > system.chosenNumber && boxes[id].isChosen)
      setMessage(true);
    else if (system.turn > system.chosenNumber && count === 1) setMessage(true);
  }

  // 값들 화면에 나타내는 함수
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <TableClick
        onClick={() => {
          writeScore(boxes[keyValue].name, boxes[keyValue].id);
        }}
      >
        <Left>
          <LeftImg src={boxes[keyValue].img} />
          <LeftText>{boxes[keyValue].name}</LeftText>
        </Left>
        <Right>
          {!boxes[keyValue].isChosen ? (
            <PreScoreFont>{preScore[keyValue].value}</PreScoreFont>
          ) : (
            boxes[keyValue].score
          )}
        </Right>
      </TableClick>
    </div>
  );
}

export default TableBox;
