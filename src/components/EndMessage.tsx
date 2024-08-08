import SCORE_PRESETS from "src/constants/scorePresets";
import { useTable } from "src/contexts/TableContext";
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

  font-weight: 900;
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

  font-weight: 900;
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

  font-weight: 800;

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
  font-weight: 700;
  font-size: 1rem;
`;

function EndMessage() {
  const { endMessage, setEndMessage, system, setSystem, boxes, setBoxes } =
    useTable();

  function resetGame() {
    boxes.map(
      (box) => ((boxes[box.id].score = 0), (boxes[box.id].isChosen = false)),
    );
    setBoxes([...boxes]);
    setSystem({
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
        <Score>총점: {system.total}</Score>
        <Body>
          <div>
            {boxes.map(
              (box) =>
                box.score != 0 && (
                  <BodyContent key={box.id}>
                    <BodyFont>
                      <img src={box.img} /> {box.name}: {box.score}
                    </BodyFont>
                  </BodyContent>
                ),
            )}
            {system.bonus === SCORE_PRESETS.bonusScore && (
              <BodyContent>
                <BodyFont>+35 Bonus</BodyFont>
              </BodyContent>
            )}
          </div>
        </Body>
        <OkButton onClick={resetGame}>다시하기</OkButton>
      </MessageBlock>
    </DarkBackground>
  );
}

export default EndMessage;
