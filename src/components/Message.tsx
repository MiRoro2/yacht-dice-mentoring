import { Dispatch, SetStateAction } from "react";
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
  font-family: "pretendard-semibold";
  font-size: 1rem;

  position: absolute;
  right: 1.5rem;
  bottom: 1.5rem;
`;

type messageType = {
  message: boolean;
  setMessage: Dispatch<SetStateAction<boolean>>;
};

function Message({ message, setMessage }: messageType) {
  function okCheck() {
    setMessage(false);
  }

  if (!message) return null;
  return (
    <DarkBackground>
      <MessageBlock>
        <Content>
          <div
            style={{
              fontFamily: "pretendard-black",
              fontSize: "2rem",
              textAlign: "center",
            }}
          >
            선택이 불가능합니다!
          </div>
          <div
            style={{
              fontFamily: "pretendard-regular",
              fontSize: "1.4rem",
              marginTop: "30px",
              width: "320px",
              textAlign: "center",
            }}
          >
            이미 다른 선택지를 클릭했거나 <br /> 조건에 맞는 주사위가 아닙니다.
          </div>
        </Content>
        <OkButton onClick={okCheck}>확인</OkButton>
      </MessageBlock>
    </DarkBackground>
  );
}

export default Message;
