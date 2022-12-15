import React from "react";
import { addToCart } from "../../functions/functions";
import MovieService from "../../services/movie-service";
import ModalProduct from "../Modal/ModalProduct";
import ModalEditGeneral from "../Modal/ModalEditGeneral";
import ModalAddGeneral from "../Modal/ModalAddGeneral";
import Product from "../Product/Product";

const Movies = ( { list, setList, setUsingList, setErrorModal, admin=false } ) => {
    const [openModal, setOpenModal] = React.useState(false);
    const [viewMovie, setViewMovie] = React.useState({});
    const [editModal, setEditModal] = React.useState(false);
    const [addModal, setAddModal] = React.useState(false);

    const triggerModal = (movie) => {
        setViewMovie(movie);
        setOpenModal(!openModal);
    };

    const deleteProduct = (id) => {
        MovieService.deleteMovie(id).then((response) => {
            console.log(response);
            setUsingList(id);
        })
        .catch((error) => setErrorModal(error.response.data.error));
    };

    const editProduct = (id, movie) => {
        MovieService.editMovie(id, movie).then((response) => {
            setViewMovie(response[0]);
        }).catch((error) => setErrorModal(error.response.data.error));
    };

    const triggerEditModal = (movie) => {
        setViewMovie(movie);
        setEditModal(!editModal);
    };

    const triggerAddModal = (movie) => {
        setViewMovie(movie);
        setAddModal(!addModal);
    };

    const addProduct = (movie) => {
        MovieService.addMovie(movie).then((response) => {
            console.log("Movie add", response.movie);
            getAll();
        }).catch((error) => setErrorModal(error.response.data.error));
    };
    

    const getAll = () => {
        MovieService.getMovies().then((movies) => {
            setList(movies);
        }) 
        .catch((error) => setErrorModal(error.response.data.error));
    };

    React.useEffect(() => { 
        getAll();
    }, [viewMovie]);

    return (
        <>
            <button className="btn btn-dark btn-sm w-100" onClick={() => setAddModal(!addModal)}>Add Movie</button>
            <ModalAddGeneral isOpen={addModal} toggle={triggerAddModal} addProduct={addProduct} type="Movie"/>
            <ModalProduct isOpen={openModal} toggle={triggerModal} title={viewMovie.title} text={viewMovie.description} image={viewMovie.picture_url} type={viewMovie.type} price={viewMovie.price} />
            <ModalEditGeneral isOpen={editModal} toggle={triggerEditModal} product={viewMovie} editProduct={editProduct} />
            <thead className="bg-danger text-white">
                <tr>
                    <th scope="col">Movies</th>
                    <th scope="col">Title</th>
                    <th scope="col">Price</th>
                    <th scope="col">Type</th>
                    { admin && <th scope="col">Edit</th>}
                    { admin && <th scope="col">Delete</th> }
                    { !admin && <th scope="col">View</th> }
                    { !admin && <th scope="col">Add To Cart</th> }
                </tr>
            </thead>
            <tbody>
                {list && list.map((movie) => (
                    <Product 
                        key={movie.id} type={movie.type} price={movie.price} 
                        image={movie.picture_url} text={movie.description} 
                        title={movie.title} addToCart={() => addToCart(movie)} 
                        view={() => triggerModal(movie)} showButtons={!admin} admin={admin} 
                        deleteProduct={() => deleteProduct(movie.id)} 
                        editProduct={() => triggerEditModal(movie)}
                    />
                ))}  
            </tbody>
        </>
    );
};

export default Movies;