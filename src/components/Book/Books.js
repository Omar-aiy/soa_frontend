import React from "react";
import { addToCart } from "../../functions/functions";

import BookService from "../../services/book-service";
import ModalProduct from "../Modal/ModalProduct";
import ModalAddGeneral from "../Modal/ModalAddGeneral";
import ModalEditGeneral from "../Modal/ModalEditGeneral";
import Product from "../Product/Product";

const Books = ( { list, setList, setUsingList, setErrorModal, admin=false } ) => {
    const [openModal, setOpenModal] = React.useState(false);
    const [viewBook, setViewBook] = React.useState({});
    const [editModal, setEditModal] = React.useState(false);
    const [addModal, setAddModal] = React.useState(false);

    const triggerModal = (book) => {
        setViewBook(book);
        setOpenModal(!openModal);
    };

    const deleteProduct = (id) => {
        BookService.deleteBook(id).then((response) => {
            console.log("Book delete", response);
            setUsingList(id);
        })
        .catch((error) => setErrorModal(error.response.data.error));
    };

    const editProduct = (id, book) => {
        BookService.editBook(id, book).then((response) => {
            console.log("Book edit", {id , ...book});
            setViewBook({id , ...book});
        }).catch((error) => setErrorModal(error.response.data.error));
    };

    const addProduct = (book) => {
        BookService.addBook(book).then((response) => {
            console.log("Book add", response);
            getAll();
        }).catch((error) => {
            setAddModal(!addModal);
            setErrorModal(error.response.data.error)
        });
    };

    const triggerAddModal = (book) => {
        setViewBook(book);
        setAddModal(!addModal);
    };

    const triggerEditModal = (book) => {
        setViewBook(book);
        setEditModal(!editModal);
    };

    const getAll = () => {
        BookService.getBooks().then((books) => setList(books))
        .catch((error) => setErrorModal(error.response.data.error))
    };

    React.useEffect(() => { 
        getAll();
    }, [viewBook]);

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
            {
                admin && (
                    <>
                        <button className="btn btn-dark btn-sm w-100" onClick={() => setAddModal(!addModal)}>Add Book</button>
                        <ModalAddGeneral isOpen={addModal} toggle={triggerAddModal} addProduct={addProduct} type="Book"/>
            
                    </>
                )
            }
            <ModalEditGeneral isOpen={editModal} toggle={triggerEditModal} product={viewBook} editProduct={editProduct} />
            <ModalProduct isOpen={openModal} toggle={triggerModal} title={viewBook.title} text={getText()} image={viewBook.thumbnail} type={viewBook.type} price={viewBook.price} />
            <thead className="bg-danger text-white">
                <tr>
                    <th scope="col">Books</th>
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
                        image={item.thumbnail} text={item.title} 
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

export default Books;