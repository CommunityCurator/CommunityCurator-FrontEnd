import React, { useEffect, useState } from 'react'
import Snackbar from '@mui/material/Snackbar';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Typography from '@mui/material/Typography';
import './GroupPage.css'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MyGroupCard from '../../components/MyGroupCard/MyGroupCard';
import AddGroup from '../../components/AddGroup';
import { useParams, Link } from 'react-router-dom';
import CategoryCard from '../../components/CategoryCard/CatgegoryCard'
import JoinGroupButton from './JoinGroup';

export default function GroupPage () {

  const [group, setGroup] = useState();
  const [notFound, setNotFound] = useState();
  const {id} = useParams();
  const [categories, setCategories] = useState();


  useEffect(() => {
    const url = 'http://localhost:8000/api/group/' + id;
    fetch(url)
      .then((response) => {
        if(response.status === 404){
          setNotFound(true);
        }
        return response.json();
      })
      .then((data) => {
        setGroup(data.group);
        console.log(group);
        setCategories(data.group.categories);
      })
  });

  const userId = localStorage.getItem('currentUser');


  return (
    <>
      {group ? 
        <>
          <div className="welcome-header">
            <div className='image-right-top'>
              <img src={group.image} alt=""></img>
            </div>
            <Typography variant="h4" gutterBottom>
                <div>
                  {group.group_name}
                </div>
                <div>{group.city} {group.state}</div> 
                <div>{group.description}</div>
                <h6>Categories:</h6>
                {categories ? categories.map((category) => {
                        return (
                          <>
                            <Grid item xs={3} >
                              <CategoryCard name={category.name} />
                            </Grid>
                          </> )
                    }) : null}
                <JoinGroupButton userID={userId} groupId={id}/>
            </Typography>
          
        
          </div>

        </>                  
                    
        : null }
    </>
  )
}