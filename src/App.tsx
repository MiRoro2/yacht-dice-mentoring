import { useState } from "react";
import styled, { createGlobalStyle } from "styled-components";

import Keep from "../src/components/Keep.tsx";
import Result from "../src/components/Result.tsx";
import Roll from "../src/components/Roll.tsx";
import Logo from "./components/Logo";
import Message from "./components/Message";
import Table from "./components/tables/Table";
import { DiceProvider } from "./DiceContext.tsx";

const GlobalStyle = createGlobalStyle`
  body {
    background: #F5F5F5;
  }
`;

const WholeWapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Wapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const DiceCover = styled.div`
  height: 705px;
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const DiceBox = styled.div`
  width: 600px;
  height: 705px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

type crownType = {
  turn: number;
  chosenNumber: number;
  subTotal: number;
  total: number;
};

function App() {
  const [message, setMessage] = useState<boolean>(false);

  const [crown, setCrown] = useState<crownType>({
    turn: 1,
    chosenNumber: 0,
    subTotal: 0,
    total: 0,
  });

  const [count, setCount] = useState<number>(1);

  return (
    <>
      <Message message={message} setMessage={setMessage} crown={crown} />
      <GlobalStyle />
      <WholeWapper>
        <Logo />
        <Wapper>
          <Table
            setMessage={setMessage}
            crown={crown}
            setCrown={setCrown}
            setCount={setCount}
          />
          <DiceCover>
            <DiceBox>
              <DiceProvider>
                <Keep />
                <Result />
                <Roll
                  crown={crown}
                  setCrown={setCrown}
                  setMessage={setMessage}
                  count={count}
                  setCount={setCount}
                />
              </DiceProvider>
            </DiceBox>
          </DiceCover>
        </Wapper>
      </WholeWapper>
    </>
  );
}

export default App;
