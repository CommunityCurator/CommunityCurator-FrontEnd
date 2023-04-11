import { Button } from "react-bootstrap/Button"
import Modal from 'react-bootstrap/Modal'
import { useEffect, useState } from "react"
import CategoryCard from "./CategoryCard/CatgegoryCard";
import { ThemeContext } from "@emotion/react";

export default function AddInterest(){
    const [show, setShow] = useState(false);
    const [list, setList] = useState([]);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function getCategories() {
        const url = "http://127.0.0.1:8000/api/categories";

        fetch(url)
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            console.log(data)

            var array = []
            for (var key in data.categories) {
                console.log(data.categories[key])
                array.push(data.categories[key])            
            }

            setList(array)
        })
    }

    function clicked() {
        setShow(true)
        getCategories();
    }

    return(
        <>
        <button style={{width: '100%', background: 'purple'}} onClick={clicked} className="m-2 px-4 py-1 text-lg text-white font-semibold border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2">
            + Add New Interest
        </button>

        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>Add New Interest</Modal.Title>
            </Modal.Header>
                <Modal.Body>
                    {list.map(cat => {
                        return <CategoryCard name={cat.name} />
                    })}
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


