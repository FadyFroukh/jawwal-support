import Cookies from 'js-cookie';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import HeaderUser from './HeaderUser';
import { useEffect, useState } from 'react';
import { decodeToken } from 'react-jwt';

const MainHeader = () => {

  const [dashboardLink,setDashboardLink] = useState("login");

  useEffect(()=>{
    if (Cookies.get("token")){
      if (decodeToken(Cookies.get("token")).superUser){
        setDashboardLink("admin")
      }else{
        setDashboardLink("dashboard");
      }
    }
  },[]);

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
    <Container fluid>
      <Navbar.Brand href="/">Jawwal Support</Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarScroll" />
      <Navbar.Collapse id="navbarScroll">
        <Nav
          className="me-auto my-2 my-lg-0"
          style={{ maxHeight: '350px' }}
          navbarScroll
        >
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href={`/${dashboardLink}`}>Dashboard</Nav.Link>
        </Nav>
        <Nav>
            {
              Cookies.get("token") ? <HeaderUser/> : 
              <Nav.Link href='/login'>
                Sign In
              </Nav.Link>
            }
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  )
}

export default MainHeader
