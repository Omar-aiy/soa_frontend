import React from "react";
import { Link } from "react-router-dom";
import { UncontrolledCollapse, NavbarBrand, Navbar, NavItem, NavLink, Nav, Container, Row, Col } from "reactstrap";

const NavbarMain = () => {
    const cart = JSON.parse(localStorage.getItem("Cart")) || [];

    return (      
        <Navbar className="navbar-top navbar-horizontal navbar-dark" expand="md">
            <Container className="p-0">
            <NavbarBrand to="/" tag={Link}>
                <p>Amazon 2.0</p>
            </NavbarBrand>
            <button className="navbar-toggler" id="navbar-collapse-main">
                <span className="navbar-toggler-icon" />
            </button>
            <UncontrolledCollapse navbar toggler="#navbar-collapse-main">
                <div className="navbar-collapse-header d-md-none">
                <Row>
                    <Col className="collapse-brand" xs="6">
                    <Link to="/">
                    Amazon 2.0
                    </Link>
                    </Col>
                    <Col className="collapse-close" xs="6">
                    <button className="navbar-toggler" id="navbar-collapse-main">
                        <span />
                        <span />
                    </button>
                    </Col>
                </Row>
                </div>
                <Nav className="ml-auto" navbar>
                <NavItem>
                    <NavLink className="nav-link-icon" to="/cart" tag={Link}>
                    <i className="ni ni-key-25" />
                    <span className="nav-link-inner--text"><i className="fa-solid fa-cart-shopping"/>({cart.length})</span>
                    </NavLink>
                </NavItem>
                </Nav>
            </UncontrolledCollapse>
            </Container>
        </Navbar>
    );
};

export default NavbarMain;