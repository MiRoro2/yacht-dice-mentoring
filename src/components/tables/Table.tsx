import "../../index.css";

import { useTable } from "src/contexts/TableContext";
import styled, { css } from "styled-components";

import TableBox from "./TableBox";

const Background = styled.div`
  width: 290px;
  height: 700px;

  background: white;

  border-radius: 15px;

  display: flex;
  justify-content: center;
  align-items: center;

  margin-left: 20px;
`;

const WholeTableWrapper = styled.div`
  width: 265px;
  height: 675px;

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

function Table() {
  const { crown } = useTable();

  function repeat(start: number, n: number) {
    const arr = [];
    for (let k = start; k < start + n; k++) {
      arr.push(<TableBox keyValue={k} key={k} />);
    }
    return arr;
  }

  return (
    <Background>
      <WholeTableWrapper>
        <Cover style={{ flexDirection: "column" }}>
          <div style={{ display: "flex" }}>
            <TopLeft>
              <FontOne>turn</FontOne>
              <div style={{ display: "flex" }}>
                <FontTwo>{crown.turn}</FontTwo>
                <FontTwo style={{ fontSize: "25px", marginTop: "3px" }}>
                  /12
                </FontTwo>
              </div>
            </TopLeft>
            <TopRight>
              <FontThree>Crown1</FontThree>
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
            <Right style={{ background: "#F5F5F7" }}>{crown.bonus}</Right>
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
