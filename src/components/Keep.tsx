import styled from "styled-components";

import { useDice } from "../DiceContext.tsx";

const Keep = () => {
  const { keepValue } = useDice();

  return (
    <KeepBox>
      <KeepMessage>keep</KeepMessage>
      <KeepBorder>{keepValue}</KeepBorder>
    </KeepBox>
  );
};

const KeepBox = styled.div`
  width: 100%;
  height: 30%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const KeepMessage = styled.h2`
  color: #6e6e73;
  margin-bottom: 3px;
`;

const KeepBorder = styled.div`
  width: 70%;
  height: 120px;
  border-radius: 20px;
  border: 8px solid #6e6e73;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export default Keep;
