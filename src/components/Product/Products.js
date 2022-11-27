import React from "react";
import Movies from "../Movie/Movies";
import Musics from "../Music/Musics";
import {default as PaginationCustom} from "../Pagination";
import { Table } from "reactstrap";
import Games from "../Game/Games";
import Books from "../Book/Books";
import Mangas from "../Manga/Mangas";
import Animes from "../Anime/Animes";


const Products = ({ lList, type }) => {
    const [list, setList] = React.useState(lList.length === 0 || lList == null ? [] : lList);
    const [currentPage, setCurrentPage] = React.useState(1);
    const [itemsPerPage] = React.useState(3);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = list.slice(indexOfFirstItem, indexOfLastItem);
    const usingList = list.length === 1 ? list : currentItems;
    
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const getProductHTML = () => {
        switch (type) {
            case "Music":
                return ( <Musics list={usingList} setList={setList} /> );
            case "Game":
                return ( <Games list={usingList} setList={setList} /> );
            case "Book":
                return ( <Books list={usingList} setList={setList} /> );
            case "Manga":
                return ( <Mangas list={usingList} setList={setList} /> );
            case "Anime":
                return ( <Animes list={usingList} setList={setList} /> );
            default:
                return ( <Movies list={usingList} setList={setList} /> );
        }
    };

    return (
        <>
            <Table className="align-items-center mt-4" responsive>
                {getProductHTML()}
            </Table>
            <PaginationCustom vidsPerPage={itemsPerPage} totalVids={list.length} paginate={paginate}/>
        </>
    );
};

export default Products;