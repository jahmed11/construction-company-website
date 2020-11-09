import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import logo from "../assets/images/oobLogo.png";
import { StyledContainer } from "../styled-components/styled-components";
const Header = styled.div`
  width: 100%;
  background-color: white;
  height: 82px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  text-align: left;
`;
const StyledImg = styled.img`
  width: 212px;
  height: 56px;
`;
const StyledNav = styled.nav`
  margin-top: 16px;
`;
const LogoWrapper = styled.div`
  margin-left: 10px;
`;
const header = () => {
  return (
    <Header>
      <StyledContainer>
        <StyledNav>
          <LogoWrapper>
            <Link to="/">
              <StyledImg src={logo} alt="logo" />
            </Link>
          </LogoWrapper>
        </StyledNav>
      </StyledContainer>
    </Header>
  );
};

export default header;
