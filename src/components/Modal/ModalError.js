import React from "react";
import { Modal, Button } from "reactstrap";

const ModalError = ({ isOpen, toggle, text }) => {

    return (
        <Modal className="modal-dialog-centered modal-danger" contentClassName="bg-danger" isOpen={isOpen} toggle={toggle} >
            <div className="modal-header">
                <h6 className="modal-title" id="modal-title-default">
                  Error
                </h6>
                <button aria-label="Close" className="close" data-dismiss="modal" type="button" onClick={toggle}>
                  <span aria-hidden={true}>×</span>
                </button>
            </div>
            <div className="modal-body">
                <p>{text}</p>
            </div>
        </Modal>
    );

};

export default ModalError;