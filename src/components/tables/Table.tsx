import "../../index.css";

import { Dispatch, SetStateAction, useState } from "react";
import styled, { css } from "styled-components";

import Four_of_a_Kind from "../../../public/img/4_of_a_kind.svg";
import Aces from "../../../public/img/Aces.svg";
import Choice from "../../../public/img/Choice.svg";
import Deuces from "../../../public/img/Deuces.svg";
import Fives from "../../../public/img/Fives.svg";
import Fours from "../../../public/img/Fours.svg";
import Full_House from "../../../public/img/Full_House.svg";
import Large_Straight from "../../../public/img/Large_Straight.svg";
import Sixes from "../../../public/img/Sixes.svg";
import Small_Straight from "../../../public/img/Small_Straight.svg";
import Threes from "../../../public/img/Threes.svg";
import Yacht from "../../../public/img/Yacht.svg";
import TableBox from "./TableBox";

const Background = styled.div`
  width: 380px;
  height: 705px;

  background: white;

  border-radius: 15px;

  display: flex;
  justify-content: center;
  align-items: center;

  margin-left: 20px;
`;

const WholeTableWrapper = styled.div`
  width: 265px;
  height: 670px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const tableLine = css`
  border: solid #b3b3b3;
`;

const Cover = styled.div`
  ${tableLine};
  border-width: 0 0 1px 0;

  display: flex;
`;

const TopLeft = styled.div`
  ${tableLine};
  border-width: 1px 0 0 1px;

  width: 185px;
  height: 74px;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FontOne = styled.div`
  font-family: "pretendard-regular";
  font-size: 18px;
  color: grey;

  margin-top: 6px;
  margin-bottom: 4px;
`;

const FontTwo = styled.div`
  font-family: "pretendard-black";
  font-size: 35px;
  color: black;
`;

const TopRight = styled.div`
  ${tableLine};
  border-width: 1px 1px 0 1px;

  width: 80px;
  height: 74px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const FontThree = styled.div`
  font-family: "pretendard-extra-bold";
  font-size: 17px;
  color: grey;
`;

const FontFour = styled.div`
  font-family: "pretendard-medium";
  font-size: 12px;
  color: grey;
`;

const Left = styled.div`
  ${tableLine};
  border-width: 1px 0 0 1px;

  width: 183px;
  height: 36px;

  display: flex;
  align-items: center;

  font-family: "pretendard-extra-bold";
  font-size: 17px;
  color: grey;
`;

const LeftMargin = styled.div`
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

type tableType = {
  id: number;
  score: number;
  name: string;
  img: string;
  chosen: string;
};

type crownType = {
  turn: number;
  chosenNumber: number;
  subTotal: number;
  total: number;
};

type messageType = {
  setMessage: Dispatch<SetStateAction<boolean>>;
  crown: crownType;
  setCrown: Dispatch<SetStateAction<crownType>>;
  setCount: Dispatch<SetStateAction<number>>;
};

function Table({ setMessage, crown, setCrown, setCount }: messageType) {
  const [Boxes, setBoxes] = useState<tableType[]>([
    { id: 0, score: 0, name: "Aces", img: Aces, chosen: "no" },
    { id: 1, score: 0, name: "Deuces", img: Deuces, chosen: "no" },
    { id: 2, score: 0, name: "Threes", img: Threes, chosen: "no" },
    { id: 3, score: 0, name: "Fours", img: Fours, chosen: "no" },
    { id: 4, score: 0, name: "Fives", img: Fives, chosen: "no" },
    { id: 5, score: 0, name: "Sixes", img: Sixes, chosen: "no" },
    {
      id: 6,
      score: 0,
      name: "Choice",
      img: Choice,
      chosen: "no",
    },
    { id: 7, score: 0, name: "4 of a kind", img: Four_of_a_Kind, chosen: "no" },
    { id: 8, score: 0, name: "Full House", img: Full_House, chosen: "no" },
    {
      id: 9,
      score: 0,
      name: "Small Straight",
      img: Small_Straight,
      chosen: "no",
    },
    {
      id: 10,
      score: 0,
      name: "Large Straight",
      img: Large_Straight,
      chosen: "no",
    },
    { id: 11, score: 0, name: "Yacht", img: Yacht, chosen: "no" },
  ]);

  function editScore(name: string, id: number) {
    if (crown.turn > crown.chosenNumber && Boxes[id].chosen === "no") {
      const copy = Boxes;
      copy[id].score += 3;
      copy[id].chosen = "yes";
      setBoxes([...copy]);
      setCrown({
        ...crown,
        total: crown.total + Boxes[id].score,
        chosenNumber: crown.chosenNumber + 1,
      });
      if (
        name === "Aces" ||
        name === "Deuces" ||
        name === "Threes" ||
        name === "Fours" ||
        name === "Fives" ||
        name === "Sixes"
      ) {
        setCrown({
          ...crown,
          subTotal: crown.subTotal + Boxes[id].score,
          total: crown.total + Boxes[id].score,
          chosenNumber: crown.chosenNumber + 1,
        });
      }
      setCount(1); //누르면 0으로 바뀜.. 롤 안 했을 때 value를 설정해서 해결? --roll이 0이 되야지 turn이 0으로 안 바뀜
    } else if (crown.turn > crown.chosenNumber && Boxes[id].chosen === "yes")
      setMessage(true);
    else if (crown.turn <= crown.chosenNumber) setMessage(true);
  }

  function repeat(start: number, n: number) {
    const arr = [];
    for (let k = start; k < start + n; k++) {
      arr.push(
        <TableBox
          name={Boxes[k].name}
          id={Boxes[k].id}
          img={Boxes[k].img}
          score={Boxes[k].score}
          editScore={editScore}
          keyValue={k}
          key={k}
        />,
      );
    }
    return arr;
  }

  function test() {
    console.log(crown.turn);
  }

  return (
    <Background>
      <WholeTableWrapper>
        <Cover style={{ flexDirection: "column" }}>
          <div style={{ display: "flex" }}>
            <TopLeft>
              <FontOne>turn</FontOne>
              <div style={{ display: "flex" }}>
                <FontTwo>
                  {crown.turn - 1 === crown.chosenNumber
                    ? crown.turn
                    : crown.turn - 1}
                </FontTwo>
                <FontTwo style={{ fontSize: "25px", marginTop: "3px" }}>
                  /12
                </FontTwo>
              </div>
            </TopLeft>
            <TopRight>
              <FontThree onClick={test}>Crown1</FontThree>
              <FontFour>(you)</FontFour>
            </TopRight>
          </div>
          {repeat(0, 6)}
          <div style={{ display: "flex" }}>
            <Left style={{ background: "#F5F5F7" }}>
              <LeftMargin>Subtotal</LeftMargin>
            </Left>
            <Right style={{ background: "#F5F5F7" }}>{crown.subTotal}</Right>
          </div>
          <div style={{ display: "flex" }}>
            <Left style={{ background: "#F5F5F7" }}>
              <LeftMargin>+35 Bonus</LeftMargin>
            </Left>
            <Right style={{ background: "#F5F5F7" }}>0</Right>
          </div>
        </Cover>
        <Cover>{repeat(6, 1)}</Cover>
        <Cover style={{ flexDirection: "column" }}>{repeat(7, 5)}</Cover>
        <Cover>
          <Left style={{ background: "#F5F5F7" }}>
            <LeftMargin>Total</LeftMargin>
          </Left>
          <Right style={{ background: "#F5F5F7" }}>{crown.total}</Right>
        </Cover>
      </WholeTableWrapper>
    </Background>
  );
}

export default Table;
