import React from "react";
import { Media, Button } from "reactstrap";

const Product = ({ type, price, image, text, title, addToCart, view, showButtons=true }) => {

    const getButtons = (title) => {
        if (showButtons) {
            return (
                <>
                    <td>
                        <Button id={`${title}-view`} className="shadow-none" color="dark" type="button" size="sm" onClick={view}>
                            <i className="fa-solid fa-eye" />
                        </Button>
                    </td>
                    <td>
                        <Button id={`${title}-add`} className="shadow-none" color="danger" type="button" size="sm" onClick={addToCart}>
                            <i className="fa-solid fa-plus"/>
                        </Button>
                    </td>
                </>
            );
        }
    };

    return (
        <tr>
            <th scope="row">
                <Media className="align-items-center">
                  <a className="avatar rounded mr-3">
                    <img className="rounded" alt={title} src={image} />
                  </a>
                </Media>
            </th>
            <th scope="row">{title}</th>
            <td>€ {price}</td>
            <td>{type}</td>
            {getButtons(title.trim())}
        </tr>
    );
};

export default Product;