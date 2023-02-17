import React from 'react'
import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import '../App.css'


function Group(){
    const [group, setGroup] = useState();
    const [notFound, setNotFound] = useState();
    const {id} = useParams();

    useEffect(() => {
        const url = 'http://localhost:8000/api/groups/' + id;
        fetch(url)
        .then((response) => {
            if(response.status === 404){
                setNotFound(true);
            }
            return response.json();
        })
        .then((data) => {
            setGroup(data.group);
        })
    });



    return (
        <>
            {notFound ? <p>The customer with id {id} was not found</p> : null}
            {group ? 
                <div>
                    <h1>Group name: {group.groupName}</h1>
                    <h2>Located in {group.city}</h2> 
                    <p>Description: {group.description}</p> 
                </div>                    
                    
                    : null }
            <Link to="/groups">Go back</Link>
        </>
    );
}

export default Group;