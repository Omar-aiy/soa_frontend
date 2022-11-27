import React from "react";
import NavbarMain from "./NavbarMain";
import { Container, Row, Col } from "reactstrap";

const Header = ({ title, description }) => {
    return (
        <header className="header bg-gradient-danger">
            <NavbarMain />
            <Container className="pb-5">
                <Row>
                    <Col className="text-center" lg="12">
                        <h1 className="display-2 text-white">{title}</h1>
                        <p className="text-white mt-0 mb-5">{description}</p>
                    </Col>
                </Row>
            </Container>
        </header>
    );
};

export default Header;