import {useState} from "react";
import { Pagination ,PaginationItem, PaginationLink } from "reactstrap";

const PaginationCustom = ({ itemsPerPage, totalVids, paginate }) => {
    const pageNumbers = Array(Math.ceil(totalVids / itemsPerPage)).fill().map((_, i) => i + 1);

    const [currentPage, setCurrentPage] = useState(1);

    const paginateAction = (pageNumber) => {
        setCurrentPage(pageNumber);
        paginate(pageNumber);
    };

    if (pageNumbers.length === 1)
        return null;

    return (
        <nav>
          <Pagination>
            {pageNumbers.map(number => (
                <PaginationItem key={number}>
                    <PaginationLink className={`${currentPage === number ? "bg-secondary text-muted" : ""} `} onClick={() => paginateAction(number)}>
                        {number}
                    </PaginationLink>
                </PaginationItem>
            ))}
          </Pagination>
        </nav>
    );

};

export default PaginationCustom;
