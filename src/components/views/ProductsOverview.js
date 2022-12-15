import React from "react";
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import Footer from "../Footer";

import Header from "../Header";
import Products from "../Product/Products";

const ProductsOverview = () => {
    const [productChoices, setProductChoices] = React.useState("Movie");

    return (
        <>
            <Header title="Amazon 2.0" description="This is the Amazon 2.0 admin dashboard. You can manage your products, orders, and users here." />
            <Container className="mt--5">
                <Card className="shadow rounded">
                    <CardBody className="border-0">
                        <Row className="align-items-center justify-content-between">
                            <Col xl="2">
                                <h3 className="mb-0">Filter On</h3>
                            </Col>
                            <Col xl="5" className="py-2">
                            <select className="custom-select" aria-label="Default select example" onChange={(e) => setProductChoices(e.target.value)}>
                                <option defaultValue="Movie">Movie</option>
                                <option value="Music">Music</option>
                                <option value="Book">Book</option>
                                <option value="Game">Game</option>
                                <option value="Manga">Manga</option>
                                <option value="Anime">Anime</option>
                            </select>
                            </Col>
                        </Row>
                    </CardBody>
                </Card> 
                
                {productChoices.length === 0 ? (<p className="mt-5 text-center">Chose your search selection</p>) : <Products type={productChoices} />}
                <Footer />
            </Container>
        </>
    );
};

export default ProductsOverview;