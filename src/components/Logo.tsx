import styled from "styled-components";

import LogoImg from "../../public/img/yacht dice 🎲.png";

const LogoBlock = styled.div`
  width: 100vw;
  height: 70px;
  display: flex;
  align-items: center;
`;

const LogoImage = styled.img`
  height: 34px;
  margin-left: 25px;
`;

function Logo() {
  return (
    <LogoBlock>
      <LogoImage src={LogoImg}></LogoImage>
    </LogoBlock>
  );
}

export default Logo;
