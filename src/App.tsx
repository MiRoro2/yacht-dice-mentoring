import { useState } from "react";
import styled, { createGlobalStyle } from "styled-components";

import Logo from "./components/Logo";
import Message from "./components/Message";
import Table from "./components/tables/Table";

const GlobalStyle = createGlobalStyle`
  body {
    background: #F5F5F5;
  }
`;

const Wapper = styled.div`
  width: 315px;
  height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

function App() {
  const [message, setMessage] = useState<boolean>(false);

  return (
    <>
      <Message message={message} setMessage={setMessage} />
      <GlobalStyle />
      <Wapper>
        <Logo />
        <Table setMessage={setMessage} />
      </Wapper>
    </>
  );
}

export default App;
