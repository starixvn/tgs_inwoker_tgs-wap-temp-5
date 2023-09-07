import * as React from "react";
import styled from "styled-components";

const LogoHolderAppBar = styled.div`
  background: ${({ theme }) => theme.appbar};
  position: relative;
  height: 100px;
  display: flex;
  justify-content: center;
`;

const LogoHolder = styled.div<{ img: string }>`
  background: url("${({ img }) => img}") no-repeat left center;
  background-size: contain;
  width: 200px;
  height: 100px;
`;

type Props = {
  img: string;
};
const MobileHeader = ({ img }: Props) => {
  return (
    <LogoHolderAppBar>
      <LogoHolder img={img} />
    </LogoHolderAppBar>
  );
};

export default MobileHeader;
