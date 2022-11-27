import React from "react";
import { addToCart } from "../../functions/functions";
import musicService from "../../services/music-service";
import ModalProduct from "../ModalProduct";
import Product from "../Product/Product";

const Musics = ( { list, setList } ) => {
    const [openModal, setOpenModal] = React.useState(false);
    const [viewMusic, setViewMusic] = React.useState({});

    const triggerModal = (music) => {
        setViewMusic(music);
        setOpenModal(!openModal);
    };

    React.useEffect(() => {
        if (list == null || list.length === 0) {
            musicService.getMusic().then((musics) => {
                localStorage.setItem("Music", JSON.stringify(musics));
                setList(musics);
            });
        } else {
            setList(list);
        }
    }, []);

    return (
        <>
            <ModalProduct isOpen={openModal} toggle={triggerModal} title={viewMusic.title} text={viewMusic.description} image={viewMusic.url} type={viewMusic.type} price={viewMusic.price} />
            <thead className="bg-danger text-white">
                <tr>
                    <th scope="col">Musics</th>
                    <th scope="col">Title</th>
                    <th scope="col">Price</th>
                    <th scope="col">Type</th>
                    <th scope="col">View</th>
                    <th scope="col">Add To Cart</th>
                </tr>
            </thead>
            <tbody>
                {list && list.map((music, index) => (
                    <Product key={index} type={music.type} price={music.price} image={music.url} text={music.description} title={music.title} addToCart={() => addToCart(music)} view={() => triggerModal(music)} />
                ))}  
            </tbody>
        </>
    );
};

export default Musics;