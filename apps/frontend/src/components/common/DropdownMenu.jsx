import React, { useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

const MenuWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const MenuButton = styled.div`
  display: flex;
  justify-content: center;
  height: 40px;
  align-items: center;
  cursor: pointer;
  border-radius: 4px;

  background-color: #cbdbfc;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.15);
  width: 100%;

  &:hover {
    background-color: #a4c2f4;
  }

  svg {
    display: block;
  }
`;

const MenuList = styled.div`
  display: ${({ $isOpen }) => ($isOpen ? 'block' : 'none')};
  position: absolute;
  left: 0;
  top: 0;
  background-color: white;
  min-width: 160px;
  width: 100%;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 1000;
`;

const MenuItem = styled.div`
  padding: 8px 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    background-color: #f4f6f9;
  }
`;

const DropdownMenu = ({ icon: Icon, menuItems, title = '', size=20, isOpen, setIsOpen }) => {
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (e) => {
    if (menuRef.current && !menuRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    }
  }, []);

  return (
    <MenuWrapper ref={menuRef}>
      <MenuButton onClick={toggleMenu}>
        {Icon && <Icon size={size} />}
        {title && <span style={{marginLeft : "8px"}}>{title}</span>}
      </MenuButton>
      <MenuList $isOpen={isOpen}>
        {menuItems.map((item, index) => (
          <MenuItem key={index} onClick={item.onClick}>
            {item.icon && <item.icon size={18}/>}
            {item.label}
          </MenuItem>
        ))}
      </MenuList>
    </MenuWrapper>
  );
};

DropdownMenu.propTypes = {
  icon: PropTypes.elementType,
  menuItems: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      onClick: PropTypes.func.isRequired,
    })
  ).isRequired,
  text: PropTypes.string,
  title: PropTypes.string,
  circle: PropTypes.bool,
};

export default DropdownMenu;