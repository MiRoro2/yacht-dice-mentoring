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

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const GameSpace = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
  width: 100%;
  align-items: flex-start;
  justify-content: space-between;
`;

const TableWrapper = styled.div`
  width: 320px;
  margin-right: 20px;
`;

const DiceWrapper = styled.div`
  width: calc(100% - 340px);
  height: 705px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function App() {
  return (
    <TableProvider>
      <DiceProvider>
        <Message />
        <GlobalStyle />
        <Wrapper>
          <Logo />
          <GameSpace>
            <TableWrapper>
              <Table />
            </TableWrapper>
            <DiceWrapper>
              <Keep />
              <Result />
              <Roll />
            </DiceWrapper>
          </GameSpace>
        </Wrapper>
      </DiceProvider>
    </TableProvider>
  );
}

export default App;
