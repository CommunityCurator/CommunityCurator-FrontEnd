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
import SearchByCity from '../ShowPage/SearchByCity';
import NewPost from '../../components/Post/NewPost';
import Post from '../../components/Post/Post';
import { render } from '@testing-library/react';
import CircularProgress from '@material-ui/core/CircularProgress';

export default function GroupPage () {

  const [group, setGroup] = useState();
  const [notFound, setNotFound] = useState();
  const {id} = useParams();
  const [categories, setCategories] = useState();
  const [post, setPost] = useState();
  const [list, setList] = useState(false)
  const [isFetching, setUser] = useState();


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
        setCategories(data.group.categories);
      })
  },[]);

  useEffect(() => {
		fetch(`http://127.0.0.1:8000/api/posts/`+id)
    .then((response) => 
      response.json()
    )
    .then((data) => {
      console.log(data);
      setList(data.posts);
    })
  },[])

  const userId = localStorage.getItem('currentUser');


  return (
    <>
      <div className="showpage">
        {group ? (
          <Grid style={{marginLeft: '2em'}} container spacing={2}>
            <Grid item xs={3}>

            <div className="welcome-header">
              <Typography variant="h4" gutterBottom>
                Welcome {group.group_name} group!
                {userId !== null ? (<div>
                <JoinGroupButton userId={userId} groupId={id}/>
                </div>) : ''}
              </Typography>
            </div>

            <div style={{height: '3em'}}></div>
              
              <div style={{height: '1.5em'}}></div>
              <SearchByCity/>
              <div style={{height: '1.5em'}}></div>

              <div style={{height: '1.5em'}}></div>  
              <Typography variant="h5" gutterBottom>
                Categories
              </Typography>  
              <div style={{height: '1.5em'}}></div> 
              <div style={{display: 'flex', flexDirection: 'column'}}>
                {group.categories.length > 0 ? (
                  group.categories.map(category => {
                    return (
                      <Grid >
                        <CategoryCard name={category.name} />
                      </Grid>
                    )
                  })) : ''}
              </div>  
            </Grid>
            <Grid item xs={1}></Grid>
            <Grid item xs={8}>
              <div style={{height: '50px'}}></div>  
              <Typography variant="h5" gutterBottom style={{marginBottom: '.8em'}}>
                <img src={group.image} alt=""></img>
              </Typography>  
              
              <Grid style={{width: '100%', paddingRight: '5em'}} container spacing={1}>
                
              </Grid>
              
              <div style={{height: '50px'}}></div>  
              <Typography variant="h5" gutterBottom style={{marginBottom: '.8em'}}>
                Create new post
              </Typography>  
              <NewPost userID={userId} groupID={id}/>
              
              <Grid item xs={1}></Grid>
                <Grid item xs={8}>
                  <div style={{height: '50px'}}></div>  
                  <Typography variant="h5" gutterBottom style={{ marginBottom: '.8em' }}>
                    Posts
                  </Typography>

                  <Grid container spacing={1}>
                    {list.length > 0 ? (
                      list.map((post) => {
                        return (
                          <Grid item xs={12}>
                              <Post key={post.id}
                                user_name={post.user.user_name}
                                content={post.content}
                                created_at={post.created_at}
                              ></Post>
                          </Grid>
                        );
                      })
                    ) : (
                      'No posts yet'
                    )}
                  </Grid>

              </Grid>
            </Grid>
          </Grid>
          
        ): ''}
      </div>
    </>
)
}