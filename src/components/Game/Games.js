import React from "react";
import { addToCart } from "../../functions/functions";

import GameService from "../../services/game-service";
import ModalProduct from "../ModalProduct";
import Product from "../Product/Product";

const Games = ( { list, setList } ) => {
    const [openModal, setOpenModal] = React.useState(false);
    const [view, setView] = React.useState({});

    const triggerModal = (item) => {
        setView(item);
        setOpenModal(!openModal);
    };

    React.useEffect(() => {
        if (list == null || list.length === 0) {
            GameService.getGames().then((games) => {
                localStorage.setItem("Game", JSON.stringify(games));
                setList(games);
            });
        } else {
            setList(list);
        }
    }, []);
    

    return (
        <>
            <ModalProduct isOpen={openModal} toggle={triggerModal} title={view.title} text={view.description} image={view.picture_url} type={view.type} price={view.price} />
            <thead className="bg-danger text-white">
                <tr>
                    <th scope="col">Games</th>
                    <th scope="col">Title</th>
                    <th scope="col">Price</th>
                    <th scope="col">Type</th>
                    <th scope="col">View</th>
                    <th scope="col">Add To Cart</th>
                </tr>
            </thead>
            <tbody>
                {list && list.map(item => (
                    <Product key={item.id} type={item.type} price={item.price} image={item.picture_url} text={item.description} title={item.title} addToCart={() => addToCart(item)} view={() => triggerModal(item)} />
                ))}  
            </tbody>
        </>
    );
};

export default Games;