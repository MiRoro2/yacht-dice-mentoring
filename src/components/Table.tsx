import "../index.css";

import { Dispatch, SetStateAction, useState } from "react";
import styled, { css } from "styled-components";

import Four_of_a_Kind from "../../public/img/4_of_a_kind.svg";
import Aces from "../../public/img/Aces.svg";
import Choice from "../../public/img/Choice.svg";
import Deuces from "../../public/img/Deuces.svg";
import Fives from "../../public/img/Fives.svg";
import Fours from "../../public/img/Fours.svg";
import Full_House from "../../public/img/Full_House.svg";
import Large_Straight from "../../public/img/Large_Straight.svg";
import Sixes from "../../public/img/Sixes.svg";
import Small_Straight from "../../public/img/Small_Straight.svg";
import Threes from "../../public/img/Threes.svg";
import Yacht from "../../public/img/Yacht.svg";

const WholeTableBlock = styled.div`
  width: 300px;
  height: 705px;

  background: white;

  border-radius: 15px;

  display: flex;
  justify-content: center;
  align-items: center;
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

const hoverStyle = css`
  &:hover {
    background: #d9d9d9;
    cursor: pointer;
  }
`;

const TopTableBoxWrapper = styled.div`
  ${tableLine};
  border-width: 0 0 1px 0;

  display: flex;
  flex-direction: column;
`;

const TopTableTopBoxLeft = styled.div`
  ${tableLine};
  border-width: 1px 0 0 1px;

  width: 185px;
  height: 74px;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TopTableTopLeftBoxFirstFont = styled.div`
  font-family: "pretendard-regular";
  font-size: 18px;
  color: grey;

  margin-top: 6px;
  margin-bottom: 4px;
`;

const TopTableTopLeftBoxSecondFont = styled.div`
  font-family: "pretendard-black";
  font-size: 35px;
  color: black;
`;

const TopTableTopLeftBoxThirdFont = styled.div`
  font-family: "pretendard-black";
  font-size: 25px;
  color: black;

  margin-top: 3px;
`;

const TopTableTopBoxRight = styled.div`
  ${tableLine};
  border-width: 1px 1px 0 1px;

  width: 80px;
  height: 74px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const TopTableTopRightBoxFirstFont = styled.div`
  font-family: "pretendard-extra-bold";
  font-size: 17px;
  color: grey;
`;

const TopTableTopRightBoxSecondFont = styled.div`
  font-family: "pretendard-medium";
  font-size: 12px;
  color: grey;
`;

const TableClick = styled.div`
  ${hoverStyle};

  display: flex;
  background: white;
`;

const ChoiceBoxWrapper = styled.div`
  ${tableLine};
  border-width: 0 0 1px 0;

  ${hoverStyle};

  display: flex;

  height: 36px;
  background: white;
`;

const BottomTableWrapper = styled.div`
  ${tableLine};
  border-width: 0 0 1px 0;

  height: 185px;
`;

const TotalBoxWrapper = styled.div`
  ${tableLine};
  border-width: 0 0 1px 0;

  display: flex;

  height: 37px;
`;

const TableBoxLeft = styled.div`
  ${tableLine};
  border-width: 1px 0 0 1px;

  width: 183px;
  height: 36px;

  display: flex;
  align-items: center;
`;

const TableBoxLeftImg = styled.img`
  height: 24px;
  margin-left: 5px;
`;

const TableBoxLeftText = styled.div`
  font-family: "pretendard-extra-bold";
  font-size: 17px;
  color: grey;

  margin-left: 5px;
`;

const TableBoxRight = styled.div`
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

type messageType = {
  setMessage: Dispatch<SetStateAction<boolean>>;
};

function Table({ setMessage }: messageType) {
  const [topTableScore, setTopTableScore] = useState<tableType[]>([
    { id: 0, score: 0, name: "Aces", img: Aces, chosen: "no" },
    { id: 1, score: 0, name: "Deuces", img: Deuces, chosen: "no" },
    { id: 2, score: 0, name: "Threes", img: Threes, chosen: "no" },
    { id: 3, score: 0, name: "Fours", img: Fours, chosen: "no" },
    { id: 4, score: 0, name: "Fives", img: Fives, chosen: "no" },
    { id: 5, score: 0, name: "Sixes", img: Sixes, chosen: "no" },
  ]);

  const [choiceScore, setChoiceScore] = useState<tableType[]>([
    {
      id: 0,
      score: 0,
      name: "Choice",
      img: Choice,
      chosen: "no",
    },
  ]);

  const [bottomTableScore, setBottomTableScore] = useState<tableType[]>([
    { id: 0, score: 0, name: "4 of a kind", img: Four_of_a_Kind, chosen: "no" },
    { id: 1, score: 0, name: "Full House", img: Full_House, chosen: "no" },
    {
      id: 2,
      score: 0,
      name: "Small Straight",
      img: Small_Straight,
      chosen: "no",
    },
    {
      id: 3,
      score: 0,
      name: "Large Straight",
      img: Large_Straight,
      chosen: "no",
    },
    { id: 4, score: 0, name: "Yacht", img: Yacht, chosen: "no" },
  ]);

  const [turn, setTurn] = useState<number>(1);
  const [chosenNumber, setChosenNumber] = useState<number>(0);
  const [subTotal, setSubTotal] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);

  function calcFunction(id: number, type: string) {
    setChosenNumber(chosenNumber + 1);
    if (type === "top") {
      topTableScore[id].score += 3;
      topTableScore[id].chosen = "yes";
      setTotal(total + topTableScore[id].score);
      setTopTableScore([...topTableScore]);
      setSubTotal(subTotal + topTableScore[id].score);
    } else if (type === "choice") {
      choiceScore[id].score += 3;
      choiceScore[id].chosen = "yes";
      setTotal(total + choiceScore[id].score);
      setChoiceScore([...choiceScore]);
    } else if (type === "bottom") {
      bottomTableScore[id].score += 3;
      bottomTableScore[id].chosen = "yes";
      setTotal(total + bottomTableScore[id].score);
      setBottomTableScore([...bottomTableScore]);
    }
  }

  function editScore(lBox: string, lBoxId: number): void {
    if (turn > chosenNumber) {
      if (
        lBox === "Aces" ||
        lBox === "Deuces" ||
        lBox === "Threes" ||
        lBox === "Fours" ||
        lBox === "Fives" ||
        lBox === "Sixes"
      ) {
        if (topTableScore[lBoxId].chosen === "no") {
          calcFunction(lBoxId, "top");
        } else setMessage(true);
      } else if (lBox === "Choice") {
        if (choiceScore[lBoxId].chosen === "no") {
          calcFunction(lBoxId, "choice");
        } else setMessage(true);
      } else if (
        lBox === "4 of a kind" ||
        lBox === "Full House" ||
        lBox === "Small Straight" ||
        lBox === "Large Straight" ||
        lBox === "Yacht"
      ) {
        if (bottomTableScore[lBoxId].chosen === "no") {
          calcFunction(lBoxId, "bottom");
        } else setMessage(true);
      }
    } else if (turn <= chosenNumber) {
      setMessage(true);
    }
  }

  return (
    <WholeTableBlock>
      <WholeTableWrapper>
        <TopTableBoxWrapper>
          <div style={{ display: "flex" }}>
            <TopTableTopBoxLeft>
              <TopTableTopLeftBoxFirstFont>turn</TopTableTopLeftBoxFirstFont>
              <div style={{ display: "flex" }}>
                <TopTableTopLeftBoxSecondFont>
                  {turn}
                </TopTableTopLeftBoxSecondFont>
                <TopTableTopLeftBoxThirdFont>/12</TopTableTopLeftBoxThirdFont>
              </div>
            </TopTableTopBoxLeft>
            <TopTableTopBoxRight>
              <TopTableTopRightBoxFirstFont>
                Crown1
              </TopTableTopRightBoxFirstFont>
              <TopTableTopRightBoxSecondFont>
                (you)
              </TopTableTopRightBoxSecondFont>
            </TopTableTopBoxRight>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {topTableScore.map((Boxes) => (
              <TableClick
                key={Boxes.id}
                onClick={() => {
                  editScore(Boxes.name, Boxes.id);
                }}
              >
                <TableBoxLeft key={Boxes.id}>
                  <TableBoxLeftImg key={Boxes.id} src={Boxes.img} />
                  <TableBoxLeftText key={Boxes.id}>
                    {Boxes.name}
                  </TableBoxLeftText>
                </TableBoxLeft>
                <TableBoxRight key={Boxes.id}>{Boxes.score}</TableBoxRight>
              </TableClick>
            ))}
          </div>
          <div style={{ display: "flex" }}>
            <TableBoxLeft style={{ background: "#F5F5F7" }}>
              <TableBoxLeftText>Subtotal</TableBoxLeftText>
            </TableBoxLeft>
            <TableBoxRight style={{ background: "#F5F5F7" }}>
              {subTotal}
            </TableBoxRight>
          </div>
          <div style={{ display: "flex" }}>
            <TableBoxLeft style={{ background: "#F5F5F7" }}>
              <TableBoxLeftText>+35 Bonus</TableBoxLeftText>
            </TableBoxLeft>
            <TableBoxRight style={{ background: "#F5F5F7" }}>0</TableBoxRight>
          </div>
        </TopTableBoxWrapper>
        <ChoiceBoxWrapper
          onClick={() => {
            editScore(choiceScore[0].name, choiceScore[0].id);
          }}
        >
          <TableBoxLeft>
            <TableBoxLeftImg src={choiceScore[0].img} />
            <TableBoxLeftText>{choiceScore[0].name}</TableBoxLeftText>
          </TableBoxLeft>
          <TableBoxRight>{choiceScore[0].score}</TableBoxRight>
        </ChoiceBoxWrapper>
        <BottomTableWrapper>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {bottomTableScore.map((Boxes) => (
              <TableClick
                key={Boxes.id}
                onClick={() => {
                  editScore(Boxes.name, Boxes.id);
                }}
              >
                <TableBoxLeft key={Boxes.id}>
                  <TableBoxLeftImg key={Boxes.id} src={Boxes.img} />
                  <TableBoxLeftText key={Boxes.id}>
                    {Boxes.name}
                  </TableBoxLeftText>
                </TableBoxLeft>
                <TableBoxRight key={Boxes.id}>{Boxes.score}</TableBoxRight>
              </TableClick>
            ))}
          </div>
        </BottomTableWrapper>
        <TotalBoxWrapper>
          <TableBoxLeft style={{ background: "#F5F5F7" }}>
            <TableBoxLeftText>Total</TableBoxLeftText>
          </TableBoxLeft>
          <TableBoxRight style={{ background: "#F5F5F7" }}>
            {total}
          </TableBoxRight>
        </TotalBoxWrapper>
      </WholeTableWrapper>
    </WholeTableBlock>
  );
}

export default Table;
