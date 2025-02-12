import React from 'react';
import duckLogo from '../assets/duck.png';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  width: 100%;
  height: 60px;
  z-index: 2000;
  background-color: #cbdbfc;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.05), 0 1px 0 rgba(0, 0, 0, 0.05);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.a`
  display: inline-block;
  height: 36px;
  margin: 12px 0 12px 25px;

  img {
    height: 36px;
  }
`;

const Nav = styled.nav`
  float: right;
`;

const NavItems = styled.ul`
  display: inline-block;
  margin: 0;
  padding: 0;
  list-style: none;
  min-width: 500px;
`;

const NavItem = styled.li`
  display: inline-block;

  a {
    line-height: 60px;
    padding: 0 30px;
    color: #1657dd;
    text-decoration: none;

    &:hover {
      color: #092d77;
    }
  }
`;

const Header = () => {
  return (
    <HeaderContainer>
        <Logo href="#home">
        <img src={duckLogo} alt="Duck Logo" />
        </Logo>
        <Nav>
        <NavItems>
            <NavItem><a href="#home">Home</a></NavItem>
            <NavItem><a href="#news">Uploads</a></NavItem>
            <NavItem><a href="#contact">Contact</a></NavItem>
            <NavItem><a href="#about">About</a></NavItem>
        </NavItems>
        </Nav>
    </HeaderContainer>
  );
};

export default Header;