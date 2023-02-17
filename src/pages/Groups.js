import React from 'react'
import '../App.css'
import { useEffect, useState } from "react";
import { json, Link } from 'react-router-dom';
import AddGroup from '../components/AddGroup';


export default function Groups(){
  const [list, setList] = useState();
  const url = 'http://localhost:8000/api/groups/';

  useEffect(() => {
    fetch(url)
      .then((response) => 
        response.json()
      )
      .then((data) => {
        console.log(data);
        setList(data.groups);
      })

  }, []);

  function newGroup(name, city, description){
    const data = {groupName: name, city: city, description: description};
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then((response) => {
      if(!response.ok){
        throw new Error("Something went wrong");
      }
      return response.json();
    })
    .then((data) => {
      //assume the add was succesful
    })
    .catch((e) => {
      console.log(e);
    });
  }

  return(
    <>
    <ul>
    {list ? list.map((group) => {
      return (
          <li key={group.id} className="m-2">
            <p><Link to={"/groups/" + group.id}>{group.groupName}</Link></p>
          </li>
      )
    }) : null}
    </ul>
    <AddGroup newGroup={newGroup}/>
    </>
  );
}

