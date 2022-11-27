import React from "react";
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import Footer from "../Footer";

import Header from "../Header";
import Products from "../Product/Products";

const ProductsOverview = () => {
    const [productChoices, setProductChoices] = React.useState("Movie");
    const [movies, setMovies] = React.useState([]);
    const [musics, setMusics] = React.useState([]);
    const [games, setGames] = React.useState([]);
    const [books, setBooks] = React.useState([]);
    const [mangas, setMangas] = React.useState([]);
    const [animes, setAnimes] = React.useState([]);

    React.useEffect(() => {
        setMovies(JSON.parse(localStorage.getItem("Movie")) || []);
        setMusics(JSON.parse(localStorage.getItem("Music")) || []);
        setGames(JSON.parse(localStorage.getItem("Game")) || []);
        setBooks(JSON.parse(localStorage.getItem("Book")) || []);
        setMangas(JSON.parse(localStorage.getItem("Manga")) || []);
        setAnimes(JSON.parse(localStorage.getItem("Anime")) || []);
    }, []);

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
                
                {productChoices.length === 0 ? (<p className="mt-5 text-center">Chose your search selection</p>) : null}
                {productChoices === "Movie" ? <Products lList={movies} type={productChoices} /> : null}
                {productChoices === "Music" ? <Products lList={musics} type={productChoices} /> : null}
                {productChoices === "Game" ? <Products lList={games} type={productChoices} /> : null}
                {productChoices === "Book" ? <Products lList={books} type={productChoices} /> : null}
                {productChoices === "Manga" ? <Products lList={mangas} type={productChoices} /> : null}
                {productChoices === "Anime" ? <Products lList={animes} type={productChoices} /> : null}
                <Footer />
            </Container>
        </>
    );
};

export default ProductsOverview;