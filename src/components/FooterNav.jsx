import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaCompass, FaBolt, FaUser } from 'react-icons/fa';
import styled from '@emotion/styled';

const NavContainer = styled.nav`
  position: relative;
  width: 100%;
  background:rgba(56, 66, 255, 0.7);
  backdrop-filter: blur(12px);
  padding: 10px 0 12px;
  border-top: 1px solid rgba(255, 255, 255, 0.12);
  margin-top: auto;
  box-shadow: 0 -10px 20px rgba(0, 0, 0, 0.05);
`;

const NavList = styled.ul`
  display: flex;
  justify-content: space-around;
  align-items: center;
  list-style: none;
  margin: 0;
  padding: 0 20px;
  max-width: 400px;
  margin: 0 auto;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 40%;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
  }
`;

const NavItem = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  width: 42px;
`;

const NavLink = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  color: ${props => props.active ? '#ffffff' : 'rgba(255, 255, 255, 0.6)'};
  font-size: 0.6rem;
  gap: 4px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  padding: 2px 0;
  width: 100%;
  font-weight: ${props => props.active ? '600' : '400'};

  &:hover {
    color: #ffffff;
    transform: translateY(-1px);

    ${props => !props.active && `
      svg {
        transform: scale(1.1);
      }
    `}
  }

  &:active {
    transform: translateY(0);
  }

  svg {
    font-size: 1rem;
    filter: ${props => props.active ? 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.4))' : 'none'};
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    transform: ${props => props.active ? 'scale(1.1)' : 'scale(1)'};
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: ${props => props.active ? '4px' : '0'};
    height: 4px;
    background: #ffffff;
    border-radius: 50%;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    opacity: ${props => props.active ? '1' : '0'};
    box-shadow: 0 0 8px rgba(255, 255, 255, 0.4);
  }
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 10px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  background: ${props => props.active ? 'rgba(255, 255, 255, 0.15)' : 'transparent'};
  position: relative;
  overflow: hidden;

  ${props => props.active && `
    &::before {
      content: '';
      position: absolute;
      inset: 0;
      background: radial-gradient(circle at center, rgba(255, 255, 255, 0.2), transparent);
      opacity: 0.8;
    }
  `}

  &:hover {
    background: ${props => !props.active && 'rgba(255, 255, 255, 0.08)'};
  }
`;

const Label = styled.span`
  font-size: 9px;
  letter-spacing: 0.3px;
  white-space: nowrap;
  text-transform: uppercase;
  font-weight: inherit;
  opacity: ${props => props.active ? '1' : '0.9'};
`;

const FooterNav = () => {
  const location = useLocation();
  
  return (
    <NavContainer>
      <NavList>
        <NavItem>
          <NavLink to="/" active={location.pathname === '/'}>
            <IconWrapper active={location.pathname === '/'}>
              <FaCompass />
            </IconWrapper>
            <Label active={location.pathname === '/'}>Home</Label>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/create-habit" active={location.pathname === '/create-habit'}>
            <IconWrapper active={location.pathname === '/create-habit'}>
              <FaBolt />
            </IconWrapper>
            <Label active={location.pathname === '/create-habit'}>Create Habit</Label>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/profile" active={location.pathname === '/profile'}>
            <IconWrapper active={location.pathname === '/profile'}>
              <FaUser />
            </IconWrapper>
            <Label active={location.pathname === '/profile'}>Profile</Label>
          </NavLink>
        </NavItem>
      </NavList>
    </NavContainer>
  );
};

export default FooterNav; 