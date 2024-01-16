import React, { useState } from 'react';
import {Navbar, Nav, Container} from 'react-bootstrap'
import { Form, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";
const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => setIsLoggedIn(false);
return(
<Navbar bg="light" expand="lg">
<Container>
  <Link to="/" style={{ textDecoration: 'none' }}>
    <Navbar.Brand>당근마켓</Navbar.Brand>
  </Link>

    <Navbar.Toggle aria-controls="basic-navbar-nav" />

    <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto d-flex flex-column flex-lg-row">
            <Link to="/page1" className="nav-link nav-link-margin">중고거래</Link>
            <Link to="/page2" className="nav-link nav-link-margin">게시판</Link>
          </Nav>
        </Navbar.Collapse>

    <Navbar.Collapse className="justify-content-end">
      <Form inline className="d-flex flex-column flex-lg-row">
        <Form.Control className="me-sm-2" type="text" placeholder="Search" />
        <Button variant="outline-success" type="submit">Search</Button>
      </Form>

      <div className="d-lg-none my-2" style={{ borderTop: '2px solid #dee2e6' }}></div>

      <Nav className="ml-auto d-flex flex-column flex-lg-row">
            {isLoggedIn ? (
              <>
                <Nav.Link onClick={handleLogout}>로그아웃</Nav.Link>
                <Link to="/mypage" className="nav-link">마이페이지</Link>
              </>
            ) : (
              <>
                <Nav.Link onClick={handleLogin}>로그인</Nav.Link>
                <Link to="/signup" className="nav-link">회원가입</Link>
              </>
            )}
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>
);
}

export default Header;
