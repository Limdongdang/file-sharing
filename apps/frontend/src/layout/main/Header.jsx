import React from 'react';
import duckLogo from '../../assets/duck.png';
import styled from 'styled-components';
import { IoMdSettings } from "react-icons/io";
import { FaUserCircle } from 'react-icons/fa';
import IconButton from '../../components/common/IconButton';

const HeaderContainer = styled.header`
  width: 100%;
  height: 60px;
  z-index: 2000;
  background-color: #cbdbfc;
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
`;

const NavItems = styled.ul`
  margin-right: 24px;
`;

const NavItem = styled.li`
  display: inline-block;
  align-items: center;
  border-radius: 50%;
  margin: 0 8px;

  svg {
    vertical-align: middle;
  }

  &:hover {
    cursor: pointer;
    background-color: #a4c2f4;
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
            <NavItem><IconButton icon={FaUserCircle} size={24}></IconButton></NavItem>
            <NavItem><IconButton icon={IoMdSettings} size={24}></IconButton></NavItem>
        </NavItems>
        </Nav>
    </HeaderContainer>
  );
};

export default Header;