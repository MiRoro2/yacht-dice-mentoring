import styled, { createGlobalStyle } from "styled-components";

import Keep from "../src/components/Keep.tsx";
import Result from "../src/components/Result.tsx";
import Roll from "../src/components/Roll.tsx";
import Logo from "./components/Logo";
import Message from "./components/Message";
import Table from "./components/tables/Table";
import { DiceProvider } from "./DiceContext.tsx";
import { TableProvider } from "./TableContext.tsx";

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

function App() {
  return (
    <TableProvider>
      <DiceProvider>
        <Message />
        <GlobalStyle />
        <WholeWapper>
          <Logo />
          <Wapper>
            <Table />
            <DiceCover>
              <DiceBox>
                <Keep />
                <Result />
                <Roll />
              </DiceBox>
            </DiceCover>
          </Wapper>
        </WholeWapper>
      </DiceProvider>
    </TableProvider>
  );
}

export default App;
