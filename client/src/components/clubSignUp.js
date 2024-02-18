import React, { useState } from "react"
import { Modal, Button } from "react-bootstrap";


export default function ClubSignUp({selection}){
    const [show, setShow] = useState(false);
    const sel = [...selection]

    const hideModal = () => setShow(false);
    const showModal = () => setShow(true);

    return (
        <div className= "text-center text-3xl"  >
            <Button variant="outline-primary" size="lg" onClick = {showModal} >Sign Up for Clubs</Button>{' '}

            <Modal show={show} onHide={hideModal}>
                    <Modal.Header closeButton>
                    <Modal.Title>Confirm The Clubs</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {
                            sel.map(club => {
                                    return <p>{club}</p>;
                                })
                        }
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant = "primary" onClick = {hideModal}>
                        Confirm
                    </Button>
                    <Button variant="secondary" onClick={hideModal}>
                        Close
                    </Button>
                    </Modal.Footer>
            </Modal>
        </div>
    );    
}