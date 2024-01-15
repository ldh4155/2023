//import react from 'react';
import {Navbar, Nav, Container} from 'react-bootstrap'
import { Form, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";
const Header = () => {
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
        <Nav.Link>로그인</Nav.Link>
        <Nav.Link>회원가입</Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>
);
}

export default Header;