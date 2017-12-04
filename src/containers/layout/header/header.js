import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Header = () => (
  <header>
    <Navbar inverse fixedTop>
      <Navbar.Header>
        <Navbar.Brand>
          <a href="/">Alojate Aquí</a>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav>
          <LinkContainer to="/admin/events">
            <NavItem eventKey={2}>Events</NavItem>
          </LinkContainer>
          <LinkContainer to="/admin/help">
            <NavItem eventKey={3}>Help</NavItem>
          </LinkContainer>
        </Nav>
        <Nav pullRight>
          <LinkContainer to="/admin/logout">
            <NavItem eventKey={4}>Logout</NavItem>
          </LinkContainer>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  </header>
);

export default Header;

