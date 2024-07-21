import { diceActType, useDice } from "src/DiceContext";
import { useTable } from "src/TableContext";
import styled, { css } from "styled-components";

import { CalcScore } from "../CalcScore";

const tableLine = css`
  border: solid #b3b3b3;
`;

const hoverStyle = css`
  &:hover {
    background: #d9d9d9;
    cursor: pointer;
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
  const { Boxes, setBoxes, crown, setCrown, setMessage } = useTable();

  function EditScore(name: string, id: number) {
    const resultScore = CalcScore(fiveDice, name, id);
    const setCrownDefault = (id: number, copy: crownType, Bonus: number) => {
      setCrown({
        ...copy,
        total: crown.total + Boxes[id].score + Bonus,
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
      let Bonus: number = 0;
      const copy = Boxes;
      copy[id].score += resultScore;
      copy[id].chosen = "yes";
      setBoxes([...copy]);
      if (crown.total + Boxes[id].score >= 35) {
        const crownCopy = crown;
        crownCopy.bonus = 35;
        setCrown(crownCopy);
        Bonus = 35;
        if (crown.bonus === 35) Bonus = 0;
      }
      setCrownDefault(id, crown, Bonus);
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
        setCrownDefault(id, copy, Bonus);
      }
      setCount(1);
      if (crown.turn === 12) {
        const copy = crown;
        copy.turn = 11;
        setCrownDefault(id, copy, Bonus);
      }
    } else setMessage(true);
    if (crown.chosenNumber === 11) setMessage(true);
  }

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
        <Right key={keyValue + 50}>{Boxes[keyValue].score}</Right>
      </TableClick>
    </div>
  );
}

export default TableBox;
