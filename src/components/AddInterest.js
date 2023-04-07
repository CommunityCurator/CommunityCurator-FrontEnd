import { Button } from "react-bootstrap/Button"
import Modal from 'react-bootstrap/Modal'
import { useState } from "react"

export default function AddInterest(){
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    

    return(
        <>
        <button style={{width: '100%', background: 'purple'}} onClick={handleShow} className="m-2 px-4 py-1 text-lg text-white font-semibold border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2">
            + Add New Interest
        </button>

        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
            </Modal.Header>
                <Modal.Body>

                </Modal.Body>
            <Modal.Footer>
                <button className="shadow bg-slate-400 hover:bg-slate-300 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" 
                        onClick={handleClose}>
                            Close
                </button>
                <button className="shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" 
                        onClick={handleClose}
                        form="addgroup">
                            Add
                </button>
            </Modal.Footer>
        </Modal>
    </>

    )

}


