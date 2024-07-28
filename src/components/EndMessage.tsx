import { useTable } from "src/TableContext";
import styled from "styled-components";

const DarkBackground = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.8);
`;

const MessageBlock = styled.div`
  width: 320px;
  height: 380px;
  padding: 1.5rem;
  background: white;
  border-radius: 2px;
  font-size: 1.5rem;

  display: flex;
  align-items: center;

  flex-direction: column;
`;

const Title = styled.div`
  width: 300px;
  height: 50px;

  display: flex;
  justify-content: center;
  align-items: center;

  background: white;

  font-family: "Pretendard-Black";
`;

const Score = styled.div`
  width: 300px;
  height: 70px;

  border-width: 1px 0 1px 0;
  border-style: solid;
  border-color: black;

  display: flex;
  justify-content: center;
  align-items: center;

  font-family: "Pretendard-Black";
  font-size: 35px;
`;

const Body = styled.div`
  width: 300px;
  height: 190px;
  background: white;

  display: flex;
  align-items: center;

  flex-direction: column;

  border-width: 1px 2px 2px 2px;
  border-style: solid;
  border-color: black;

  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: grey;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-track {
    background: #d9d9d9;
  }
`;

const BodyContent = styled.div`
  width: 270px;
  height: 50px;
  background: #f5f5f7;

  display: flex;
  align-items: center;

  font-family: "Pretendard-Bold";

  margin-bottom: 10px;
  &:nth-child(1) {
    margin-top: 10px;
  }
`;

const BodyFont = styled.div`
  margin-left: 10px;

  color: grey;

  display: flex;
  gap: 10px;
  align-items: center;
`;

const OkButton = styled.button`
  width: 70px;
  height: 40px;
  padding: 0;
  background: #228be6;
  border-radius: 2px;

  margin-top: 10px;

  color: white;
  font-family: "pretendard-semibold";
  font-size: 1rem;
`;

function EndMessage() {
  const { endMessage, setEndMessage, crown, Boxes, setBoxes, setCrown } =
    useTable();

  function okCheck() {
    Boxes.map(
      (box) => ((Boxes[box.id].score = 0), (Boxes[box.id].chosen = "no")),
    );
    setBoxes([...Boxes]);
    setCrown({
      turn: 1,
      chosenNumber: 0,
      subTotal: 0,
      total: 0,
      bonus: 0,
    });
    setEndMessage(false);
  }

  if (!endMessage) return null;
  return (
    <DarkBackground>
      <MessageBlock>
        <Title>게임 결과</Title>
        <Score>총점: {crown.total}</Score>
        <Body>
          <div>
            {Boxes.map(
              (box) =>
                box.score != 0 && (
                  <BodyContent key={box.id}>
                    <BodyFont>
                      <img src={box.img} /> {box.name}: {box.score}
                    </BodyFont>
                  </BodyContent>
                ),
            )}
            {crown.bonus === 35 && (
              <BodyContent>
                <BodyFont>+35 Bonus</BodyFont>
              </BodyContent>
            )}
          </div>
        </Body>
        <OkButton onClick={okCheck}>다시하기</OkButton>
      </MessageBlock>
    </DarkBackground>
  );
}

export default EndMessage;
