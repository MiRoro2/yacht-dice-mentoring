import styled from "styled-components";

import LogoImg from "../../public/img/yacht dice 🎲.png";

const LogoBlock = styled.div`
  width: 300px;
  height: 60px;

  display: flex;
  align-items: center;
`;

const LogoImage = styled.img`
  height: 34px;
`;

function Logo() {
  return (
    <LogoBlock>
      <LogoImage src={LogoImg}></LogoImage>
    </LogoBlock>
  );
}

export default Logo;
