import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function NewPost(props){
    const [groupID, setGroupID] = useState(props.groupID);
    const [userID, setUserID] = useState(props.userID);
    const [text, setText] = useState('');


    function handleSubmit(e){
        
        e.preventDefault();
        const data = {'group':groupID, 'user': userID, 'content': text}
        console.log(data);
        const url = 'http://localhost:8000/api/new_post/';
        fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          })
          .then((response) => {
            if (!response.ok) {
              throw new Error('Something went wrong');
            }
            return response.json();
          })
          .then((data) => {
            console.log("Success");

          });
    }

    return(
        <>
        <form onSubmit={handleSubmit}>
            <TextField
                type="new_post"
                style={{ width: '100%' }}
                label="New post"
                id="outlined-basic"
                variant="outlined"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Write your post here"
        />
            <Button type="submit">
                Post
            </Button>
        </form>
        </>
    )
}


