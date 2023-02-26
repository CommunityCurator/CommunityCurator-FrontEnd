import React from 'react'
import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import '../App.css'


function Group(){
    const [group, setGroup] = useState();
    const [notFound, setNotFound] = useState();
    const {id} = useParams();
    const [categories, setCategories] = useState();


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
            setCategories(data.group.categories);
        })
    });
      
    return (
        <>
            {notFound ? <p>The group with id {id} was not found</p> : null}
            {group ? 
                <div>
                    <h1>Group name: {group.group_name}</h1>
                    <h2>Located in {group.city}, {group.state}</h2> 
                    <p>Description: {group.description}</p> 
                    <p>Categories:</p>
                    {categories ? categories.map((category) => {
                        return (<>#{category.name} </> )
                    }) : null}
                    
                </div>                    
                    
                    : null }
            <Link to="/groups">Go back</Link>
        </>
    );
}

export default Group;