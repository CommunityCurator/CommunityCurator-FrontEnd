import { useState } from "react"
import { Button } from "react-bootstrap/Button"
import Modal from 'react-bootstrap/Modal'

export default function JoinGroup(props){
    const [groupId, setGroupId] = useState(props.groupId);
    const [userId, setUserId] = useState(props.userId);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    console.log(props);

    return(
        <>
        <button style={{width: '100%', background: 'blue'}} onClick={handleShow} className="m-2 px-4 py-1 text-sm text-white font-semibold border border-blue-200 hover:text-white hover:bg-blue-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2">
            + Join the group 
        </button>

        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
            <Modal.Title>You have joined {groupId.name}!</Modal.Title>
            </Modal.Header>
            <Modal.Footer>
                <button className="shadow bg-slate-400 hover:bg-slate-300 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" 
                        onClick={handleClose}>
                            Close
                </button>
            </Modal.Footer>
        </Modal>
    </>

    )

}


