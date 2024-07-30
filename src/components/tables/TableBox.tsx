import { diceActType, useDice } from "src/DiceContext";
import { useTable } from "src/TableContext";
import styled, { css } from "styled-components";

import { CalcScore } from "../CalcScore";

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
  font-family: "pretendard-extra-bold";
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

  font-family: "pretendard-extra-bold";
  font-size: 17px;
  color: black;
`;

const PreScoreFont = styled.div`
  color: #d2d2d2;

  font-size 17px;
`;

type BoxType = {
  keyValue: number;
};

type crownType = {
  turn: number;
  chosenNumber: number;
  subTotal: number;
  total: number;
  bonus: number;
};

function TableBox({ keyValue }: BoxType) {
  const { fiveDice, setKeepValue, count, setCount } = useDice();
  const {
    Boxes,
    setBoxes,
    crown,
    setCrown,
    setMessage,
    preScore,
    setEndMessage,
  } = useTable();

  function EditScore(name: string, id: number) {
    const resultScore = CalcScore(fiveDice, name, id);
    const setCrownDefault = (id: number, copy: crownType) => {
      setCrown({
        ...copy,
        total: crown.total + Boxes[id].score,
        chosenNumber: crown.chosenNumber + 1,
        turn: crown.turn + 1,
      });
    };

    if (
      crown.turn > crown.chosenNumber &&
      Boxes[id].chosen === "no" &&
      count > 1
    ) {
      fiveDice.map((dice) => (dice.diceAct = diceActType.active));
      setKeepValue([]);
      const copy = Boxes;
      copy[id].score += resultScore;
      copy[id].chosen = "yes";
      setBoxes([...copy]);
      if (crown.total + Boxes[id].score >= 63 && crown.bonus === 0) {
        crown.bonus = 35;
        crown.total += 35;
        setCrown(crown);
      }
      setCrownDefault(id, crown);
      if (
        name === "Aces" ||
        name === "Deuces" ||
        name === "Threes" ||
        name === "Fours" ||
        name === "Fives" ||
        name === "Sixes"
      ) {
        const copy = crown;
        copy.subTotal += Boxes[id].score;
        setCrownDefault(id, copy);
      }
      setCount(1);
      preScore.map((score) => (score.value = null));
      if (crown.turn === 12) {
        const copy = crown;
        copy.turn = 11;
        setCrownDefault(id, copy);
        setEndMessage(true);
      }
    } else if (crown.turn > crown.chosenNumber && Boxes[id].chosen === "yes")
      setMessage(true);
    else if (crown.turn > crown.chosenNumber && count === 1) setMessage(true);
  }
  //값들 화면에 나타내는 함수

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <TableClick
        onClick={() => {
          EditScore(Boxes[keyValue].name, Boxes[keyValue].id);
        }}
        key={keyValue + 10}
      >
        <Left key={keyValue + 20}>
          <LeftImg src={Boxes[keyValue].img} key={keyValue + 30} />
          <LeftText key={keyValue + 40}>{Boxes[keyValue].name}</LeftText>
        </Left>
        <Right key={keyValue + 50}>
          {Boxes[keyValue].chosen === "no" ? (
            <PreScoreFont key={keyValue + 60}>
              {preScore[keyValue].value}
            </PreScoreFont>
          ) : (
            Boxes[keyValue].score
          )}
        </Right>
      </TableClick>
    </div>
  );
}

export default TableBox;
