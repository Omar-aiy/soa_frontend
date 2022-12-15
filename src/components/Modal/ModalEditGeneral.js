import React from "react";
import { Modal, Form, FormGroup, Input, Card, CardHeader, CardBody, CardFooter, ListGroup, ListGroupItem } from "reactstrap";

const ModalEditGeneral = ({ isOpen, toggle, product, editProduct}) => {
    const [productEdit, setProductEdit] = React.useState(product);
    const [errors, setErrors] = React.useState([]);

    const handleInputChange = (name, value) => {
        setProductEdit({ ...productEdit, [name]: value });
    };

    const validate = () => {
        const errors = [];
        productEdit.title === "" && errors.push("Title is required");
        if (productEdit.type === "Book")
            productEdit.thumbnail === ""&& errors.push("Thumbnail is required");
        else 
            productEdit.picture_url === "" && errors.push("Picture url is required");
        productEdit.price <= 0 && errors.push("Price is required");
        productEdit.description === "" && errors.push("Description is required");
        if (productEdit.type === "Book") {
            productEdit.authors.length <= 0 && errors.push("Author is required");
            productEdit.pageCount <= 0 && errors.push("Page count is required");
            productEdit.language === "" && errors.push("Language is required");
        }
        setErrors(errors);
        return errors.length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (isValid)
            if (productEdit.type === "Book") {
                const book = {
                    title: productEdit.title,
                    thumbnail: productEdit.thumbnail,
                    price: productEdit.price,
                    authors: productEdit.authors,
                    pageCount: productEdit.pageCount,
                    language: productEdit.language
                };
                editProduct(product.id, book);
                toggle(book);
            } else if (productEdit.type === "Movie" || productEdit.type === "Game" || productEdit.type === "Manga" || productEdit.type === "Anime") {
                const edit = {
                    title: productEdit.title,
                    picture_url: productEdit.picture_url,
                    price: productEdit.price,
                    description: productEdit.description
                };
                editProduct(product.id, edit);
                toggle(edit);
            } else {
                const edit = {
                    title: productEdit.title,
                    url: productEdit.url,
                    price: productEdit.price,
                    description: productEdit.description
                };
                editProduct(product.id, edit);
                toggle(edit);
            }
    };

    const getUrl = () => {
        if (productEdit.type === "Book")
            return (
                <FormGroup>
                    <Input className="form-control-alternative" type="text" value={productEdit.thumbnail} placeholder={product.thumbnail} onChange={(e) => handleInputChange("thumbnail", e.target.value)} />
                </FormGroup>
            );
        else if (productEdit.type === "Movie" || productEdit.type === "Game" || productEdit.type === "Manga" || productEdit.type === "Anime")
            return (
                <FormGroup>
                    <Input className="form-control-alternative" type="text" value={productEdit.picture_url} placeholder={product.picture_url} onChange={(e) => handleInputChange("picture_url", e.target.value)} />
                </FormGroup>
            );
        else
            return (
                <FormGroup>
                    <Input className="form-control-alternative" type="text" value={productEdit.url} placeholder={product.url} onChange={(e) => handleInputChange("url", e.target.value)} />
                </FormGroup>
            );
    };

    React.useEffect(() => {
        setErrors([]);
        setProductEdit(product);
    }, [product]);

    return (
        <Modal className="modal-dialog-centered modal-lg" isOpen={isOpen} toggle={toggle} >
            <div className="modal-body p-0">
                <Card className="card-profile bg-secondary shadow">
                    <CardHeader className="text-center bg-transparent border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                        <div className="d-flex justify-content-between">
                            <h4 className="text-muted">Edit {productEdit.type}</h4>
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
                                <Input className="form-control-alternative" type="text" value={productEdit.title} placeholder={product.title} onChange={(e) => handleInputChange("title", e.target.value)} />
                            </FormGroup>
                            {getUrl()}
                            <FormGroup>
                                <Input className="form-control-alternative" type="number" min={0} value={productEdit.price} placeholder={product.price} onChange={(e) => handleInputChange("price", e.target.value)} />
                            </FormGroup>
                            {productEdit.type === "Book" && (
                                <>
                                    <FormGroup>
                                        <Input className="form-control-alternative" type="text" value={productEdit.authors} placeholder={product.authors} onChange={(e) => handleInputChange("authors", e.target.value.split(","))} />
                                    </FormGroup>
                                    <FormGroup>
                                        <Input className="form-control-alternative" type="number" min={0} value={productEdit.pageCount} placeholder={product.pageCount} onChange={(e) => handleInputChange("pageCount", e.target.value)} />
                                    </FormGroup>
                                    <FormGroup>
                                        <Input className="form-control-alternative" type="text" value={productEdit.language} placeholder={product.language} onChange={(e) => handleInputChange("language", e.target.value)} />
                                    </FormGroup>
                                </>
                            ) || (
                                <FormGroup>
                                    <Input className="form-control-alternative" type="textarea" rows="3" value={productEdit.description} placeholder={product.description} onChange={(e) => handleInputChange("description", e.target.value)} />
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

export default ModalEditGeneral;