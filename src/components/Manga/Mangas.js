import React from "react";
import { addToCart } from "../../functions/functions";

import MangaService from "../../services/manga-service";
import ModalEditGeneral from "../Modal/ModalEditGeneral";
import ModalAddGeneral from "../Modal/ModalAddGeneral";
import ModalProduct from "../Modal/ModalProduct";
import Product from "../Product/Product";

const Mangas = ( { list, setList, setUsingList, setErrorModal, admin=false } ) => {
    const [openModal, setOpenModal] = React.useState(false);
    const [view, setView] = React.useState({});
    const [editModal, setEditModal] = React.useState(false);
    const [addModal, setAddModal] = React.useState(false);

    const triggerModal = (item) => {
        setView(item);
        setOpenModal(!openModal);
    };

    const deleteProduct = (id) => {
        MangaService.deleteManga(id).then((response) => {
            console.log("Manga delete", response);
            setUsingList(id);
        })
        .catch((error) => setErrorModal(error.response.data.error));
    };

    const editProduct = (id, game) => {
        MangaService.editManga(id, game).then((response) => {
            console.log("Manga edit", response);
            setView({id , ...game});
        }).catch((error) => setErrorModal(error.response.data.error));
    };

    const triggerAddModal = (manga) => {
        setView(manga);
        setAddModal(!addModal);
    };

    const addProduct = (manga) => {
        MangaService.addManga(manga).then((response) => {
            console.log("Manga add", response);
            getAll();
        }).catch((error) => setErrorModal(error.response.data.error));
    };

    const triggerEditModal = (game) => {
        setView(game);
        setEditModal(!editModal);
    };

    const getAll = () => {
        MangaService.getMangas().then((mangas) => setList(mangas))
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
                        <button className="btn btn-dark btn-sm w-100" onClick={() => setAddModal(!addModal)}>Add Manga</button>
                        <ModalAddGeneral isOpen={addModal} toggle={triggerAddModal} addProduct={addProduct} type="Manga"/>
            
                    </>
                )
            }
            <ModalEditGeneral isOpen={editModal} toggle={triggerEditModal} product={view} editProduct={editProduct} />
            <ModalProduct isOpen={openModal} toggle={triggerModal} title={view.title} text={view.description} image={view.picture_url} type={view.type} price={view.price} />
            <thead className="bg-danger text-white">
                <tr>
                    <th scope="col">Mangas</th>
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

export default Mangas;