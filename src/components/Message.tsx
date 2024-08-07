import { useDice } from "src/contexts/DiceContext";
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
  height: 220px;
  padding: 1.5rem;
  background: white;
  border-radius: 2px;
  font-size: 1.5rem;

  display: flex;
  justify-content: center;
  align-items: center;

  position: relative;
`;

const Content = styled.div`
  display: flex;
  justify-content: center;

  position: absolute;
  top: 3.8rem;

  flex-direction: column;
`;

const OkButton = styled.button`
  width: 70px;
  height: 40px;
  padding: 0;
  background: #228be6;
  border-radius: 2px;

  color: white;
  font-weight: 700;
  font-size: 1rem;

  position: absolute;
  right: 1.5rem;
  bottom: 1.5rem;
`;

function Message() {
  const { count } = useDice();
  const { message, setMessage } = useTable();

  function okCheck() {
    setMessage(false);
  }

  let content: string[] = [];

  if (1 < count && count < 4) {
    content = ["이미 선택한 족보입니다.", ""];
  } else if (count === 4) {
    content = ["족보 선택이 되지 않았습니다.", "새로운 족보를 선택해주세요"];
  } else if (count === 1) {
    content = ["주사위를 굴려주세요", ""];
  }

  if (!message) return null;
  return (
    <DarkBackground>
      <MessageBlock>
        <Content>
          <div
            style={{
              fontWeight: 900,
              fontSize: "2rem",
              textAlign: "center",
            }}
          >
            선택이 불가능합니다!
          </div>
          <div
            style={{
              fontSize: "1.4rem",
              marginTop: "30px",
              width: "320px",
              textAlign: "center",
            }}
          >
            <div style={{ marginBottom: "6px" }}></div>
            {content[0]}
            <div style={{ marginLeft: "6px" }}> </div>
            {content[1]}
          </div>
        </Content>
        <OkButton onClick={okCheck}>확인</OkButton>
      </MessageBlock>
    </DarkBackground>
  );
}

export default Message;
