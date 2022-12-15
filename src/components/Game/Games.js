import React from "react";
import { addToCart } from "../../functions/functions";

import GameService from "../../services/game-service";
import ModalProduct from "../Modal/ModalProduct";
import ModalEditGeneral from "../Modal/ModalEditGeneral";
import ModalAddGeneral from "../Modal/ModalAddGeneral";
import Product from "../Product/Product";

const Games = ( { list, setList, setUsingList, setErrorModal, admin=false } ) => {
    const [openModal, setOpenModal] = React.useState(false);
    const [view, setView] = React.useState({});
    const [editModal, setEditModal] = React.useState(false);
    const [addModal, setAddModal] = React.useState(false);

    const triggerModal = (item) => {
        setView(item);
        setOpenModal(!openModal);
    };

    const triggerAddModal = (item) => {
        setView(item);
        setAddModal(!addModal);
    };

    const addProduct = (game) => {
        GameService.addGame(game).then((response) => {
            console.log("Game create", response);
            getAll();
        }).catch((error) => {
            setAddModal(!addModal);
            setErrorModal(error.response.data.error)
        })
    };

    const deleteProduct = (id) => {
        GameService.deleteGame(id).then((response) => {
            console.log("Game delete", response);
            setUsingList(id);
        })
        .catch((error) => setErrorModal(error.response.data.error));
    };

    const editProduct = (id, game) => {
        GameService.editGame(id, game).then((response) => {
            console.log("Game edit", response);
            setView({id , ...game});
        }).catch((error) => setErrorModal(error.response.data.error));
    };

    const triggerEditModal = (game) => {
        setView(game);
        setEditModal(!editModal);
    };

    const getAll = () => {
        GameService.getGames().then((games) => setList(games))
        .catch((error) => setErrorModal(error.response.data.error))
    };

    React.useEffect(() => {
        getAll();
    }, [view]);
    

    return (
        <>
            <button className="btn btn-dark btn-sm w-100" onClick={() => setAddModal(!addModal)}>Add Game</button>
            <ModalAddGeneral isOpen={addModal} toggle={triggerAddModal} addProduct={addProduct} type="Game"/>
            <ModalEditGeneral isOpen={editModal} toggle={triggerEditModal} product={view} editProduct={editProduct} />
            <ModalProduct isOpen={openModal} toggle={triggerModal} title={view.title} text={view.description} image={view.picture_url} type={view.type} price={view.price} />
            <thead className="bg-danger text-white">
                <tr>
                    <th scope="col">Games</th>
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
                {list && list.map((item, index) => (
                    <Product 
                        key={index} type={item.type} price={item.price} 
                        image={item.picture_url} text={item.description} 
                        title={item.title} addToCart={() => addToCart(item)} 
                        view={() => triggerModal(item)} showButtons={!admin} admin={admin} 
                        deleteProduct={() => deleteProduct(item.id)} 
                        editProduct={() => triggerEditModal(item)}
                    />
                ))}  
            </tbody>
        </>
    );
};

export default Games;