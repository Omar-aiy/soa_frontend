import React from "react";
import Movies from "../Movie/Movies";
import Musics from "../Music/Musics";
import {default as PaginationCustom} from "../Pagination";
import { Table } from "reactstrap";
import Games from "../Game/Games";
import Books from "../Book/Books";
import Mangas from "../Manga/Mangas";
import Animes from "../Anime/Animes";
import ModalError from "../Modal/ModalError";

const Products = ({ type, admin }) => {
    const [list, setList] = React.useState([]);
    const [currentPage, setCurrentPage] = React.useState(1);
    const [itemsPerPage] = React.useState(3);
    const [errorMessage, setErrorMessage] = React.useState("An error has occurred.");
    const [error, setError] = React.useState(false);
    const [usingList, setUsingList] = React.useState([]);

    const setErrorModal = (error) => {
        setErrorMessage(error);
        setError(true);
    };

    const closeErrorModal = () => setError(false);

    const setUsingListFunction = (id) => {
        if (id) {
            setList(list.filter((item) => item.id !== id));
        }
        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        setUsingList(list.slice(indexOfFirstItem, indexOfLastItem));
    };

    React.useEffect(() => {
        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        setUsingList(list.slice(indexOfFirstItem, indexOfLastItem));
    }, [list, currentPage, itemsPerPage]);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const typeOfProduct = {
        "Game": ( <Games list={usingList} setList={setList} setUsingList={setUsingListFunction} setErrorModal={setErrorModal} admin={admin}/> ),
        "Book": ( <Books list={usingList} setList={setList} setUsingList={setUsingListFunction} setErrorModal={setErrorModal} admin={admin}/> ),
        "Manga": ( <Mangas list={usingList} setList={setList} setUsingList={setUsingListFunction} setErrorModal={setErrorModal} admin={admin}/> ),
        "Anime": ( <Animes list={usingList} setList={setList} setUsingList={setUsingListFunction} setErrorModal={setErrorModal} admin={admin}/> ),
        "Music": ( <Musics list={usingList} setList={setList} setUsingList={setUsingListFunction} setErrorModal={setErrorModal} admin={admin}/> ),
        "Movie": ( <Movies list={usingList} setList={setList} setUsingList={setUsingListFunction} setErrorModal={setErrorModal} admin={admin}/> ),
        "default": ( <Movies list={usingList} setList={setList} setUsingList={setUsingListFunction} setErrorModal={setErrorModal} admin={admin}/> )
    };

    return (
        <>
            <ModalError isOpen={error} toggle={closeErrorModal} text={errorMessage} />
            <Table className="align-items-center mt-4" responsive>
                {typeOfProduct[type] || typeOfProduct["default"]}
            </Table>
            <PaginationCustom itemsPerPage={itemsPerPage} totalVids={list.length} paginate={paginate}/>
        </>
    );
};

export default Products;