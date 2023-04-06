import React, { useState, useEffect } from 'react';

function JoinGroup(props) {
  const [isJoined, setIsJoined] = useState(false);
  const groupId = props.groupId;
  const userId = props.userId;
  const data = {groupId: groupId, userId: userId};

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
      const found = (data.groups.some(g => String(g.id) === String(groupId)));
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
      body: JSON.stringify(data)
    })
    .then((response) =>{
      if(!response.ok){
        console.log(data);
        throw new Error("Something went wrong");
      }
      return response.json();
    })
    .then((data) => {
      console.log('Successful');
    });
  }

  return (
    <button style={{width: '50%', background: 'blue'}} onClick={handleJoinClick} className="m-2 px-4 py-1 text-sm text-white font-semibold border border-blue-200 hover:text-white hover:bg-blue-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2">
      {isJoined ? 'Joined!' : 'Join Group'}
    </button>
  );
}

export default JoinGroup;