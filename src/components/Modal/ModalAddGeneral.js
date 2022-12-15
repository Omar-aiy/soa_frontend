import React from "react";
import { Modal, Form, FormGroup, Input, Card, CardHeader, CardBody, CardFooter, ListGroup, ListGroupItem } from "reactstrap";

const ModalAddGeneral = ({ isOpen, toggle, type, addProduct }) => {
    const [product, setProduct] = React.useState({
        title: "",
        thumbnail: "",
        price: 0,
        authors: [],
        pageCount: 0,
        language: "",
        picture_url: "",
        description: ""
    });
    const [errors, setErrors] = React.useState([]);

    const handleInputChange = (name, value) => {
        setProduct({ ...product, [name]: value });
    };

    const validate = () => {
        const errors = [];
        product.title === "" && errors.push("Title is required");
        if (type === "Book")
            product.thumbnail === ""&& errors.push("Thumbnail is required");
        else if (type === "Movie" || type === "Game" || type === "Manga" || type === "Anime")
            product.picture_url === "" && errors.push("Picture url is required");
        else
            product.url === "" && errors.push("Url is required");
        product.price <= 0 && errors.push("Price is required");
        if (type !== "Book")
            product.description === "" && errors.push("Description is required");
        if (type === "Book") {
            product.authors.length <= 0 && errors.push("Author is required");
            product.pageCount <= 0 && errors.push("Page count is required");
            product.language === "" && errors.push("Language is required");
        }
        setErrors(errors);
        return errors.length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (isValid)
            if (type === "Book") {
                const book = {
                    title: product.title,
                    thumbnail: product.thumbnail,
                    price: Number(product.price),
                    authors: product.authors,
                    pageCount: product.pageCount,
                    language: product.language
                };
                addProduct(book);
                toggle(book);
            } else if (type === "Movie" || type === "Game" || type === "Manga" || type === "Anime") {
                const edit = {
                    title: product.title,
                    picture_url: product.picture_url,
                    price: Number(product.price),
                    description: product.description
                };
                addProduct(edit);
                toggle(edit);
            } else {
                const edit = {
                    title: product.title,
                    url: product.url,
                    price: Number(product.price),
                    description: product.description
                };
                addProduct(edit);
                toggle(edit);
            }
    };

    const getUrl = () => {
        if (type === "Book")
            return (
                <FormGroup>
                    <Input className="form-control-alternative" type="text" placeholder="Thumbnail" onChange={(e) => handleInputChange("thumbnail", e.target.value)} />
                </FormGroup>
            );
        else if (type === "Movie" || type === "Game" || type === "Manga" || type === "Anime")
            return (
                <FormGroup>
                    <Input className="form-control-alternative" type="text" placeholder="Picture Url" onChange={(e) => handleInputChange("picture_url", e.target.value)} />
                </FormGroup>
            );
        else
            return (
                <FormGroup>
                    <Input className="form-control-alternative" type="text" placeholder="Url" onChange={(e) => handleInputChange("url", e.target.value)} />
                </FormGroup>
            );
    };

    return (
        <Modal className="modal-dialog-centered modal-lg" isOpen={isOpen} toggle={toggle} >
        <div className="modal-body p-0">
            <Card className="card-profile bg-secondary shadow">
                <CardHeader className="text-center bg-transparent border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                    <div className="d-flex justify-content-between">
                        <h4 className="text-muted">Add {type}</h4>
                        <button aria-label="Close" className="close" data-dismiss="modal" type="button" onClick={toggle}>
                            <span aria-hidden={true}>×</span>
                        </button>
                    </div>
                </CardHeader>
                
                <CardHeader className="text-center bg-transparent border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                    {errors.length > 0 && (
                        <ListGroup className="text-center bg-danger border-0">
                            {errors.map((error, index) => (
                                <ListGroupItem key={index} className="bg-transparent border-0 text-white py-1">{error}</ListGroupItem>
                            ))}
                        </ListGroup>
                    )}
                </CardHeader>
                <CardBody className="pt-0 pt-md-4">
                    <Form>
                        <FormGroup>
                            <Input className="form-control-alternative" type="text" placeholder="Title" onChange={(e) => handleInputChange("title", e.target.value)} />
                        </FormGroup>
                        {getUrl()}
                        <FormGroup>
                            <Input className="form-control-alternative" type="number" min={0} placeholder="Price" onChange={(e) => handleInputChange("price", e.target.value)} />
                        </FormGroup>
                        {type === "Book" && (
                            <>
                                <FormGroup>
                                    <Input className="form-control-alternative" type="text" placeholder="Authors" onChange={(e) => handleInputChange("authors", e.target.value.split(","))} />
                                </FormGroup>
                                <FormGroup>
                                    <Input className="form-control-alternative" type="number" min={0} placeholder="Page count" onChange={(e) => handleInputChange("pageCount", e.target.value)} />
                                </FormGroup>
                                <FormGroup>
                                    <Input className="form-control-alternative" type="text" placeholder="Language" onChange={(e) => handleInputChange("language", e.target.value)} />
                                </FormGroup>
                            </>
                        ) || (
                            <FormGroup>
                                <Input className="form-control-alternative" type="textarea" rows="3" placeholder="Description" onChange={(e) => handleInputChange("description", e.target.value)} />
                            </FormGroup>
                        )}
                    </Form>
                </CardBody>
                
                <CardFooter className="bg-transparent border-0">
                    <div className="d-flex justify-content-between">
                        <button className="btn btn-dark" type="button" onClick={(e) => handleSubmit(e)}>
                            Save
                        </button>
                        <button className="btn btn-danger" type="button" onClick={toggle}>
                            Cancel
                        </button>
                    </div>
                </CardFooter>
            </Card>
        </div>
    </Modal>
    );
};

export default ModalAddGeneral;