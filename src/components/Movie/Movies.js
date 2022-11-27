import React from "react";
import { addToCart } from "../../functions/functions";
import movieService from "../../services/movie-service";
import ModalProduct from "../ModalProduct";
import Product from "../Product/Product";

const Movies = ( { list, setList } ) => {
    const [openModal, setOpenModal] = React.useState(false);
    const [viewMovie, setViewMovie] = React.useState({});

    const triggerModal = (movie) => {
        setViewMovie(movie);
        setOpenModal(!openModal);
    };

    React.useEffect(() => {
        if (list == null || list.length === 0) {
            movieService.getMovies().then((movies) => {
                localStorage.setItem("Movie", JSON.stringify(movies));
                setList(movies);
            });
        } else {
            setList(list);
        }
    }, []);

    return (
        <>
            <ModalProduct isOpen={openModal} toggle={triggerModal} title={viewMovie.title} text={viewMovie.description} image={viewMovie.picture_url} type={viewMovie.type} price={viewMovie.price} />
            <thead className="bg-danger text-white">
                <tr>
                    <th scope="col">Movies</th>
                    <th scope="col">Title</th>
                    <th scope="col">Price</th>
                    <th scope="col">Type</th>
                    <th scope="col">View</th>
                    <th scope="col">Add To Cart</th>
                </tr>
            </thead>
            <tbody>
                {list && list.map((movie, index) => (
                    <Product key={index} type={movie.type} price={movie.price} image={movie.picture_url} text={movie.description} title={movie.title} addToCart={() => addToCart(movie)} view={() => triggerModal(movie)} showButtons={true} />
                ))}  
            </tbody>
        </>
    );

    /*
    return (
        <Row>
            <ModalProduct isOpen={openModal} toggle={triggerModal} title={viewMovie.title} text={viewMovie.description} image={viewMovie.picture_url} type={viewMovie.type} price={viewMovie.price} />
            {movies && movies.map(movie => (
                <Col xl="4" className="mt-4" key={movie.title}>
                    <Product type={movie.type} price={movie.price} image={movie.picture_url} text={movie.description} title={movie.title} addToCart={() => {}} view={() => triggerModal(movie)} />
                </Col>
            ))}  
        </Row>  
    );
    */
};

export default Movies;