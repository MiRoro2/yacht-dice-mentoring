import styled, { css } from "styled-components";

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

type editScoreType = { (x: string, y: number): void };

type BoxType = {
  name: string;
  id: number;
  img: string;
  score: number;
  editScore: editScoreType;
};

function TableBox({ name, id, img, score, editScore }: BoxType) {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <TableClick
        onClick={() => {
          editScore(name, id);
        }}
      >
        <Left>
          <LeftImg src={img} />
          <LeftText>{name}</LeftText>
        </Left>
        <Right>{score}</Right>
      </TableClick>
    </div>
  );
}

export default TableBox;
