import React from "react";
import Header from "../Header";
import { Container, Row, Col, Card, CardBody, CardFooter, Table, Media, Badge, Button } from "reactstrap";
import Footer from "../Footer";
import OrderService from "../../services/order-service";

const Cart = () => {
    const [cart, setCart] = React.useState(JSON.parse(localStorage.getItem("Cart")) || []);

    const totalPrice = cart.reduce((total, item) => {
        return total + item.price;
    }, 0);

    const removeItem = (title, type) => {
        const index = cart.findIndex((cartItem) => cartItem.title === title && cartItem.type === type);
        cart.splice(index, 1);
        localStorage.setItem("Cart", JSON.stringify(cart));
        setCart([...cart]);
        window.location.reload();
    };

    const onCheckout = () => {
        // OrderService.createOrder(cart);
        setCart([]);
        localStorage.setItem("Cart", JSON.stringify([]));
        alert("Order has been placed!");
    };

    return (
        <>
            <Header title="Shopping Cart" description="This is the cart page" />
            <Container className="mt--5">
                <Card className="shadow rounded">
                    <CardBody className="border-0">
                        <Row className="align-items-center justify-content-between">
                            <Col xl="2">
                                <h3 className="mb-0">Your products</h3>
                            </Col>
                            <Col xl="2" className="py-2">
                                <p className="mb-0"><span className="text-danger">{cart.length}</span> product(s)</p>
                            </Col>
                        </Row>
                    </CardBody>
                    <CardBody className="border-top">
                        <Table className="align-items-center table-flush" responsive>
                            <thead className="thead-light">
                                <tr>
                                    <th scope="col"></th>
                                    <th scope="col">Product</th>
                                    <th scope="col">Type</th>
                                    <th scope="col">Price</th>
                                    <th scope="col"></th>
                                    <th scope="col"></th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {cart.length === 0 ? (<p className="mt-5 text-center text-danger">Your cart is empty</p>) : null}
                                {cart.map((item, index) => (
                                    <tr>
                                        <th scope="">
                                            <Media className="align-items-center">
                                                <a className="avatar rounded mr-3">
                                                    <img className="rounded" alt={item.title} src={item.picture_url} />
                                                </a>
                                            </Media>
                                        </th>
                                        <th scope="row">{item.title}</th>
                                        <td>{item.type}</td>
                                        <td>€ {item.price}</td>
                                        <td></td>
                                        <td></td>
                                        <td>
                                            <Button className="shadow-none" color="danger" type="button" size="sm" onClick={() => removeItem(item.title, item.type)}>
                                                <i className="fas fa-trash"></i>
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </CardBody>
                    <CardFooter className="rounded px-3 py-2">
                        <Row className="align-items-center justify-content-between">
                            <Col xl="2">
                                <h2 className="mb-0">Pay</h2>
                            </Col>
                            <Col xl="2" className="py-2">
                                <h2 className="m-0 text-dark">€&nbsp;&nbsp;{totalPrice}</h2>
                            </Col>
                            <Col xl="2" className="py-2">
                                <Button className="w-100" color="dark" size="lg" onClick={onCheckout}>
                                    Order Now
                                </Button>
                            </Col>
                        </Row>
                    </CardFooter>
                </Card>
                <Footer />
            </Container>
        </>
    );
};

export default Cart;