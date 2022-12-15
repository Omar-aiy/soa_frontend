import React from "react";
import { addToCart } from "../../functions/functions";

import AnimeService from "../../services/anime-service";
import ModalProduct from "../Modal/ModalProduct";
import ModalEditGeneral from "../Modal/ModalEditGeneral";
import ModalAddGeneral from "../Modal/ModalAddGeneral";
import Product from "../Product/Product";

const Animes = ( { list, setList, setUsingList, setErrorModal, admin=false } ) => {
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

    const addProduct = (anime) => {
        AnimeService.addAnime(anime).then((response) => {
            console.log("Anime create", response)
            getAll();
        }).catch((error) => setErrorModal(error.response.data.error))
    };

    const deleteProduct = (id) => {
        AnimeService.deleteAnime(id).then((response) => {
            console.log("Anime delete", response);
            setUsingList(id);
        })
        .catch((error) => setErrorModal(error.response.data.error));
    };

    const editProduct = (id, anime) => {
        AnimeService.editAnime(id, anime).then((response) => {
            console.log("Anime edit", {id , ...anime});
            setView({id , ...anime});
        }).catch((error) => setErrorModal(error.response.data.error));
    };

    const triggerEditModal = (game) => {
        setView(game);
        setEditModal(!editModal);
    };

    const getAll = () => {
        AnimeService.getAnimes().then((animes) => setList(animes))
        .catch((error) => setErrorModal(error.response.data.error))
    };

    React.useEffect(() => {
        getAll();
    }, [view]);
    

    return (
        <>
            {
                admin && (
                    <>
                        <button className="btn btn-dark btn-sm w-100" onClick={() => setAddModal(!addModal)}>Add Anime</button>
                        <ModalAddGeneral isOpen={addModal} toggle={triggerAddModal} addProduct={addProduct} type="Anime"/>
            
                    </>
                )
            }
            <ModalEditGeneral isOpen={editModal} toggle={triggerEditModal} product={view} editProduct={editProduct} />
            <ModalProduct isOpen={openModal} toggle={triggerModal} title={view.title} text={view.desctiption} image={view.picture_url} type={view.type} price={view.price} />
            <thead className="bg-danger text-white">
                <tr>
                    <th scope="col">Animes</th>
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
                {list && list.map(item => (
                    <Product 
                        key={item.id} type={item.type} price={item.price} 
                        image={item.picture_url} text={item.desctiption} 
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

export default Animes;