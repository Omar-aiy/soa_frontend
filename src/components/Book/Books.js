import React from "react";
import { addToCart } from "../../functions/functions";

import BookService from "../../services/book-service";
import ModalProduct from "../ModalProduct";
import Product from "../Product/Product";

const Books = ( { list, setList } ) => {
    const [openModal, setOpenModal] = React.useState(false);
    const [viewBook, setViewBook] = React.useState({});

    const triggerModal = (book) => {
        setViewBook(book);
        setOpenModal(!openModal);
    };

    React.useEffect(() => {
        if (list == null || list.length === 0) {
            BookService.getBooks().then((books) => {
                localStorage.setItem("Book", JSON.stringify(books));
                setList(books);
            });
        } else {
            setList(list);
        }
    }, []);

    const getText = () => {
        return (
            <>
                <p>Author(s): {viewBook.authors}</p>
                <p>Pages: {viewBook.pageCount}</p>
                <p>Language: {viewBook.language}</p>
            </>
        );
    };
    

    return (
        <>
            <ModalProduct isOpen={openModal} toggle={triggerModal} title={viewBook.title} text={getText()} image={viewBook.thumbnail} type={viewBook.type} price={viewBook.price} />
            <thead className="bg-danger text-white">
                <tr>
                    <th scope="col">Books</th>
                    <th scope="col">Title</th>
                    <th scope="col">Price</th>
                    <th scope="col">Type</th>
                    <th scope="col">View</th>
                    <th scope="col">Add To Cart</th>
                </tr>
            </thead>
            <tbody>
                {list && list.map((item, index) => (
                    <Product key={index} type={item.type} price={item.price} image={item.thumbnail} text={item.title} title={item.title} addToCart={() => addToCart(item)} view={() => triggerModal(item)} />
                ))}  
            </tbody>
        </>
    );
};

export default Books;