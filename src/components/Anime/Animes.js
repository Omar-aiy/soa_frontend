import React from "react";
import { addToCart } from "../../functions/functions";

import AnimeService from "../../services/anime-service";
import ModalProduct from "../ModalProduct";
import Product from "../Product/Product";

const Animes = ( { list, setList } ) => {
    const [openModal, setOpenModal] = React.useState(false);
    const [view, setView] = React.useState({});

    const triggerModal = (item) => {
        setView(item);
        setOpenModal(!openModal);
    };

    React.useEffect(() => {
        if (list == null || list.length === 0) {
            AnimeService.getAnimes().then((animes) => {
                localStorage.setItem("Anime", JSON.stringify(animes));
                setList(animes);
            });
        } else {
            setList(list);
        }
    }, []);

    const getText = () => {
        return (
            <>
                <p>Author: {view.author}</p>
                <p>{view.description}</p>
            </>
        );
    };
    

    return (
        <>
            <ModalProduct isOpen={openModal} toggle={triggerModal} title={view.title} text={getText} image={view.picture_url} type={view.type} price={view.price} />
            <thead className="bg-danger text-white">
                <tr>
                    <th scope="col">Animes</th>
                    <th scope="col">Title</th>
                    <th scope="col">Price</th>
                    <th scope="col">Type</th>
                    <th scope="col">View</th>
                    <th scope="col">Add To Cart</th>
                </tr>
            </thead>
            <tbody>
                {list && list.map(item => (
                    <Product key={item.id} type={item.type} price={item.price} image={item.picture_url} text={getText} title={item.title} addToCart={() => addToCart(item)} view={() => triggerModal(item)} />
                ))}  
            </tbody>
        </>
    );
};

export default Animes;