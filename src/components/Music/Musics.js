import React from "react";
import { addToCart } from "../../functions/functions";
import MusicService from "../../services/music-service";
import ModalProduct from "../Modal/ModalProduct";
import ModalAddGeneral from "../Modal/ModalAddGeneral";
import ModalEditGeneral from "../Modal/ModalEditGeneral";
import Product from "../Product/Product";

const Musics = ( { list, setList, setUsingList, setErrorModal, admin=false } ) => {
    const [openModal, setOpenModal] = React.useState(false);
    const [viewMusic, setViewMusic] = React.useState({});
    const [editModal, setEditModal] = React.useState(false);
    const [addModal, setAddModal] = React.useState(false);

    const triggerModal = (music) => {
        viewMusic(music);
        setOpenModal(!openModal);
    };

    const deleteProduct = (id) => {
        MusicService.deleteMusic(id).then((response) => {
            console.log(response);
            setUsingList(id);
        })
        .catch((error) => setErrorModal(error.response.data.error));
    };

    const editProduct = (id, music) => {
        MusicService.editMusic(id, music).then((response) => {
            console.log("Music edit", {id , ...music});
            setViewMusic({id , ...music});
        }).catch((error) => setErrorModal(error.response.data.error));
    };

    const triggerAddModal = (music) => {
        setViewMusic(music);
        setAddModal(!addModal);
    };

    const addProduct = (music) => {
        MusicService.addMusic(music).then((response) => {
            console.log(response);
            getAll();
        }).catch((error) => setErrorModal(error.response.data.error));
    };

    const triggerEditModal = (item) => {
        setViewMusic(item);
        setEditModal(!editModal);
    };

    const getAll = () => MusicService.getMusic().then((musics) => setList(musics))
                            .catch((error) => setErrorModal(error.response.data.error));

    React.useEffect(() => {
        getAll();
    }, [viewMusic]);

    return (
        <>
            <button className="btn btn-dark btn-sm w-100" onClick={() => setAddModal(!addModal)}>Add Music</button>
            <ModalAddGeneral isOpen={addModal} toggle={triggerAddModal} addProduct={addProduct} type="Music"/>
            <ModalProduct isOpen={openModal} toggle={triggerModal} title={viewMusic.title} text={viewMusic.description} image={viewMusic.url} type={viewMusic.type} price={viewMusic.price} />
            <ModalEditGeneral isOpen={editModal} toggle={triggerEditModal} product={viewMusic} editProduct={editProduct} />
            <thead className="bg-danger text-white">
                <tr>
                    <th scope="col">Musics</th>
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
                {list && list.map((music, index) => (
                    <Product 
                        key={index} type={music.type} 
                        price={music.price} image={music.url} 
                        text={music.description} title={music.title} 
                        addToCart={() => addToCart(music)} 
                        view={() => triggerModal(music)} showButtons={!admin} admin={admin} 
                        deleteProduct={() => deleteProduct(music.id)} 
                        editProduct={() => triggerEditModal(music)}
                    />
                ))}  
            </tbody>
        </>
    );
};

export default Musics;