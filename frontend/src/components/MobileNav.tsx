import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

const MobileNavStyle = styled.div`
  display: flex;
  padding-right: 3.3em;
  cursor: pointer;

  @media only screen and (min-width: 600px) {
    display: none;
  }
`

const Menu = styled.div`
  position: absolute;
  background-color: #ffe74f;
  height: 25vh;
  width: 100vw;
  left: 0;
  top: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

function MobileNav() {
  const [menu, setMenu] = useState(false)
  const [icon, setIcon] = useState('bi bi-list')

  function toggleMenu() {
    setMenu((prev) => !prev)
    const shape = icon === 'bi bi-list' ? 'bi bi-x' : 'bi bi-list'
    setIcon(shape)
  }

  return (
    <>
      <MobileNavStyle>
        <i onClick={toggleMenu} className={icon} style={{ fontSize: '1.8em', zIndex: '1' }}></i>
        {menu && (
          <Menu>
            <NavLink onClick={toggleMenu} className={({ isActive }) => (isActive ? 'navLinkActive' : 'navLink')} to='/'>
              Hem
            </NavLink>
            <NavLink onClick={toggleMenu} className={({ isActive }) => (isActive ? 'navLinkActive' : 'navLink')} to='/books'>
              Böcker
            </NavLink>
            <NavLink onClick={toggleMenu} className={({ isActive }) => (isActive ? 'navLinkActive' : 'navLink')} to='/about'>
              Om
            </NavLink>
          </Menu>
        )}
      </MobileNavStyle>
    </>
  )
}

export default MobileNav
