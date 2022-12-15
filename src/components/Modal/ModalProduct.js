import React from "react";
import { Modal, Row, Col, Badge } from "reactstrap";

const ModalProduct = ({ price, type, image, text, title, toggle, isOpen, addToCart }) => {

    return (
      <Modal className="modal-dialog-centered" isOpen={isOpen} toggle={toggle} size="lg">
        <div className="modal-header">
            <h3 className="modal-title text-red" id="exampleModalLabel">
              {type}
            </h3>
            <button aria-label="Close" className="close" data-dismiss="modal" type="button" onClick={toggle}>
                <span aria-hidden={true}>×</span>
            </button>
        </div>
        <div className="modal-body">
          <Row className="justify-content-center">
            <Col xl="4">
              <div className="image-container">
                <img src={image} className="position-relative rounded img-fluid" alt="..." />
              </div> 
            </Col>
            <Col xl="7">
              <h1 className="text-red">{title}</h1>
              <p>{text}</p>
              <Badge className="badge bg-green px-3 py-1"><h4 className="m-0 text-white">€&nbsp;&nbsp;&nbsp;&nbsp;{price}</h4></Badge> 
              <br />
              <button className="btn btn-danger mt-3" type="button" onClick={addToCart}>
                  Add To Cart
              </button>
            </Col>
          </Row>
        </div>
      </Modal>
    );

};

export default ModalProduct;