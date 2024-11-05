import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

export default function ClubSelect({ target, setSelected, selected }) {
    const [show, setShow] = useState(false);
    const hideModal = () => {
        setShow(false);
    }
    const showModal = () => setShow(true);
    let sel = [...selected];
    const handleSelect = () => {
        
        if(sel.indexOf(target.name)==-1){
            setSelected([...selected, target.name])
            sel = [...selected]
            console.log(selected)
        } else {
            console.log([...sel.splice(sel.indexOf(target.name),1)])
            setSelected([...sel.splice(sel.indexOf(target.name),1)])
            sel = [...selected]
            console.log(selected)
        }
    }

    //className = {sel.indexOf(club.name) ? "bg-blue-500" : "bg-grey-500"} )
    
    return (
        <div className={sel.indexOf(target.name) > -1 ? " rounded bg-gradient-to-r from-indigo-500 to-blue-500 grid-cols-3 max-h-fit " : "grid-cols-3 max-h-fit rounded bg-gradient-to-br from-zinc-900 to-indigo-900"} onClick={handleSelect}>
            <h1 className=" text-slate-100 text-4xl truncate  mx-[20%] mt-[10%]">{target.name}</h1>
            <br></br>
            <button className="pb-[10%] text-slate-100" onClick = {showModal} >More Info</button>
            <Modal show={show} onHide={hideModal}>
                <Modal.Header closeButton>
                <Modal.Title>{target.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{target.description}</Modal.Body>
                <Modal.Footer>
                <Button  variant="secondary" onClick={hideModal}>
                    Close
                </Button>
                </Modal.Footer>
            </Modal>

        </div>
    );

}