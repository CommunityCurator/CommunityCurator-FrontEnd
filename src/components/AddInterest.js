import Modal from 'react-bootstrap/Modal'
import { useEffect, useState } from "react"
import CategoryCard from "./CategoryCard/CatgegoryCard";
import { ThemeContext } from "@emotion/react";
import Button from '@mui/material/Button';
import AddCategoryCard from "./CategoryCard/AddCategoryCard";

export default function AddInterest(props){
    const [show, setShow] = useState(false);
    const [list, setList] = useState([]);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function getCategories() {
        const url = "http://127.0.0.1:8000/api/categories";
        const userId = parseInt(localStorage.getItem('currentUser'))
        let uUrl = `http://127.0.0.1:8000/api/user/${userId}/categories`;

        fetch(url)
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            var array = [];
            for (var key in data.categories) {
                array.push(data.categories[key])            
            }

            fetch(uUrl)
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                for(var key in data.categories) {
                    for (let index = 0; index < array.length; index++) {
                        if(array[index].id == data.categories[key].id) {
                            array.splice(index, 1)
                        }
                    }
                }
                setList(array)
            })
        })         
    }

    function clicked() {
        setShow(true)
        getCategories();
    }

    const updateList = (category) => {

        const userId = parseInt(localStorage.getItem('currentUser'))
        let url = `http://127.0.0.1:8000/api/user/${userId}/categories/${category.id}`;

        fetch(url, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
        }).then(response => response.json)
        .then(data => {
            let listClone = [...list]
            listClone = list.filter(cat => {
                if(cat.id !== category.id) {
                    return cat
                }
            })
            setList(listClone)
            props.addCategory(category)
        })
    }

    return(
        <>
        <Button 
             className="m-2 px-4 py-1 text-lg text-white font-semibold border border-blue-200 hover:text-white hover:bg-blue-200 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-200 focus:ring-offset-2"
            variant='contained' 
            onClick={clicked}>
            + Add New Interest
        </Button>

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
                    <div style={{height: '60vh', overflow: 'scroll'}}>
                        {list.length > 0 ? (
                            list.map(category => {
                                return <AddCategoryCard updateList={updateList} category={category} />
                            })
                        ): ''}
                      
                    </div>
                </Modal.Body>
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


