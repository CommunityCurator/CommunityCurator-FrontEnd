import React, { useState, useEffect } from 'react';
import { set } from 'react-hook-form';

function JoinGroup(props) {
  const [isJoined, setIsJoined] = useState(false);
  const groupId = props.groupId;
  const userId = props.userId;
  const ids = {groupId: groupId, userId: userId};
  const [listGroups, setListGroups] = useState([]);
  
  useEffect(() => {
    const url = 'http://localhost:8000/api/user/'+userId+'/groups/';
    fetch(url, {
      method:'GET',
      headers:{
      'Content-Type': 'application/json'
      },
    })
    .then((response) =>{
      if(!response.ok){
        throw new Error("Something went wrong");  
      }
      return response.json();
    })
    .then((data) => {
      setListGroups(data.groups);
      console.log(data.groups);
      const found = (data.groups.some(g => String(g.id) === String(groupId)));
      console.log(groupId);
      console.log(found);
      if(found){
        setIsJoined(true);
      }
    });   
  }, []);

  const handleJoinClick = () => {
      const url = 'http://localhost:8000/api/user/'+userId+'/groups/'+groupId;
      console.log(url);
      fetch(url, {
        method:'POST',
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(ids)
      })
      .then((response) =>{
        if(!response.ok){
          console.log(ids);
          throw new Error("Something went wrong");
        }
        return response.json();
      })
      .then((ids) => {
        console.log('Successful');
      });
  }
  
  
  return (
    <>
    <button style={{width: '50%', background: 'blue'}} onClick={handleJoinClick} className="m-2 px-4 py-1 text-sm text-white font-semibold border border-blue-200 hover:text-white hover:bg-blue-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2">
      {isJoined ? 'Joined!' : 'Join Group'}
    </button>
    </>
  );
}

export default JoinGroup;