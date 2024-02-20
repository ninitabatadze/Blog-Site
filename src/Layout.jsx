
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './components/Authorization ';
const Layout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("success");
    alert("Logged out");
    navigate('/');
  };
  const [navOpen, setNavOpen] = useState(false);
  const openNav = () => {
    setNavOpen(true);
    document.getElementById("mySidenav").style.width = "250px";
    document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
  };
  const closeNav = () => {
    setNavOpen(false);
    document.getElementById("mySidenav").style.width = "0";
    document.body.style.backgroundColor = "white";
  };
  return (
    <Navbar collapseOnSelect expand="lg" className="navbaris">
      <Navbar.Brand className="logo me-auto" href="#home">
        typology
      </Navbar.Brand>
      <Nav className="me-auto d-md-flex d-none nav-thing">
        <Nav.Link href="Home"> Home</Nav.Link>
        <Nav.Link href="blogs">Blogs</Nav.Link>
        <Nav.Link href="Contact">Contact</Nav.Link>
      </Nav>
      <div id="mySidenav" className={`sidenav ${navOpen ? 'open' : ''}`}>
        <div className='backi'>
          <Navbar.Brand className="logo me-auto" href="#home">
            typelogy
          </Navbar.Brand>
          <a href="javascript:void(0)" className="closebtn" onClick={closeNav}>
            &times;
          </a>
        </div>
        <div className='container'>
          <div className="col-12">
            <p className='namebar'>MADDISON BARNETT</p>
          </div>
          <div className='row'>
            <div className="col-4">
              <img className='madison' src={require('./images/madison_barnett-90x90.jpg')} />
            </div>
            <div className="col-8">
              <p className='yapping'>I get my inspiration from the fictional world. I'm a social geek. Completely exploit 24/365 catalysts for change whereas high standards in action items. Conveniently whiteboard multifunctional benefits without enabled leadership.</p>
            </div>
            <div>
              <Nav className="me-auto d-md-none d-flex nav-thing1">
                <Nav.Link className='navbar-1' href="Home"> Home</Nav.Link>
                <Nav.Link className='navbar-1' href="blogs">Blogs</Nav.Link>
                <Nav.Link className='navbar-1' href="Contact">Contact</Nav.Link>
              </Nav>
            </div>
            <div>
              <Nav className="me-auto">
                <Nav.Link className='logout' onClick={handleLogout}>Logout</Nav.Link>
              </Nav>
            </div>

          </div>
        </div>
      </div>
      <div className="hamburger" id="main" onClick={openNav}>
        <span>
          &#9776;
        </span>
      </div>
    </Navbar>

  );
}
export default Layout;