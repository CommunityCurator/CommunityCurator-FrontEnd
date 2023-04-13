import Modal from 'react-bootstrap/Modal'
import { useState } from "react"
import Button from '@mui/material/Button';

export default function AddGroup(props){
    const [name, setName] = useState(props.name);
    const [city, setCity] = useState(props.city);
    const [state, setState] = useState(props.state);
    const [description, setDescription] = useState(props.description);
    const [category, setCategory] = useState(props.category);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    

    return(
        <>
        <Button 
             className="m-2 px-4 py-1 text-lg text-white font-semibold border border-blue-200 hover:text-white hover:bg-blue-200 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-200 focus:ring-offset-2"
            variant='contained' 
            onClick={handleShow}>
            + Create new group 
        </Button>

        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
            <Modal.Title>Add new group</Modal.Title>
            </Modal.Header>
                <Modal.Body>
                    <form id="addgroup" 
                          className="m-2 py-8 px-8 w-full max-w-sm" 
                          onSubmit={(e) => {
                            e.preventDefault();
                            setName('');
                            setCity('');
                            setState('');
                            setDescription('');
                            setCategory('');
                            props.newGroup(name, city, state, description, category);
                          }}>
                        <div className="md:flex md:items-center mb-6">
                            <div className="md:w-1/3">
                                <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="name">
                                    Group name
                                </label>
                            </div>
                            <div className="md:w-2/3">
                                <input 
                                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" 
                                    id="name" 
                                    type="text" 
                                    placeholder=""
                                    value={name}
                                    onChange={(e) => {
                                        setName(e.target.value);
                                }}
                                />
                            </div>
                        </div>
                        <div className="md:flex md:items-center mb-6">
                            <div className="md:w-1/3">
                                <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="city">
                                    City
                                </label>
                            </div>
                            <div className="md:w-2/3">
                                <input 
                                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" 
                                    id="city" 
                                    type="text" 
                                    placeholder=""
                                    value={city}
                                    onChange={(e) => {
                                        setCity(e.target.value);
                                }}
                                />
                            </div>
                        </div>
                        <div className="md:flex md:items-center mb-6">
                            <div className="md:w-1/3">
                                <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="state">
                                    State
                                </label>
                            </div>
                            <div className="md:w-2/3">
                                <input 
                                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" 
                                    id="city" 
                                    type="text" 
                                    value={state}
                                    onChange={(e) => {
                                        setState(e.target.value);
                                }}
                                />
                            </div>
                        </div>
                        <div className="md:flex md:items-center mb-6">
                            <div className="md:w-1/3">
                                <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="description">
                                    Description
                                </label>
                            </div>
                            <div className="md:w-2/3">
                                <input 
                                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" 
                                    id="name" 
                                    type="text" 
                                    placeholder=""
                                    value={description}
                                    onChange={(e) => {
                                        setDescription(e.target.value);
                                }}
                                />
                            </div>
                        </div>
                        <div className="md:flex md:items-center mb-6">
                            <div className="md:w-1/3">
                                <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="category">
                                    Category
                                </label>
                            </div>
                            <div className="md:w-2/3">
                                <input 
                                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" 
                                    id="name" 
                                    type="text" 
                                    placeholder=""
                                    value={category}
                                    onChange={(e) => {
                                        setCategory(e.target.value);
                                }}
                                />
                            </div>
                        </div>
                        
                    </form>    
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


