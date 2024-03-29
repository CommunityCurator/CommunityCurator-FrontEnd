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
import Icon_Thumbup from '../../icons/Icon_thumbup';
import Icon_Thumbdown from '../../icons/Icon_thumbdown';


export default function GroupPage () {

  const [group, setGroup] = useState();
  const [notFound, setNotFound] = useState();
  const {id} = useParams();
  const [categories, setCategories] = useState();
  const [post, setPost] = useState();
  const [list, setList] = useState(false)
  const [isFetching, setUser] = useState();
  const [Likes, setLikes] = useState();
  const [Dislikes, setDislikes] = useState();
  const userId = localStorage.getItem('currentUser');

  function AddFeedback(isLike) {
    const url_like = 'http://localhost:8000/api/new_like/';
    const url_dislike = 'http://localhost:8000/api/new_dislike/';

    const data_like = {group: id, user: userId, like: true, dislike: false};
    const data_dislike = {group: id, user: userId, like: false, dislike: true};

    const url = isLike ? url_like : url_dislike;
    const data = isLike ? data_like : data_dislike;

    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then((response) => {
      if (!response.ok) {
        console.log('Error adding feedback');
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      console.log('Feedback is added');
      console.log(data);
      return data;
    })
    .catch((error) => {
      console.error('Error adding feedback:', error);
    });
  }


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

  return (
    <>
      <div className="showpage">
        {group ? (
          <Grid style={{marginLeft: '2em'}} container spacing={2}>
            <Grid item xs={3}>

            <div className="welcome-header">
              <Typography variant="h4" gutterBottom>

                {group.group_name}<br></br></Typography>
              <Typography variant="h6" gutterBottom>
                {group.description}
                {userId !== null ? (<div>
               
                <JoinGroupButton userId={userId} groupId={id}/>
                </div>) : ''}
              </Typography>
            </div>

            <div style={{height: '2em'}}></div>
              
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
                <div
                  style={{
                    height: '35vh',
                    width: '90%',
                    maxWidth: '600px', // Set the maximum width
                    maxHeight: '600px', // Set the maximum height
                    backgroundImage: `url(${group.image})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundPosition: '100%',
                    position: 'relative',
                  }}
                ></div>
              </Typography>  
              <div className="feedback">
                <div className='thumbsup' onClick={()=> AddFeedback(true)} ><Icon_Thumbup size={25} />
                <h4>{Likes}</h4>
                </div>
                
                <div className='thumbsdown' onClick={()=> AddFeedback(false)} > <Icon_Thumbdown size={25} /><h4>{Dislikes}</h4></div>

              </div>

              {userId ? (
                <>
                  <div style={{height: '20px'}}></div>  
              <Typography variant="h5" gutterBottom style={{marginBottom: '.8em'}}>
                Create new post
              </Typography> 
              <div style={{width: '90%'}}>
                <NewPost userID={userId} groupID={id}/>
              </div>
              
              <Grid item xs={1}></Grid>
                <Grid item xs={8}>
                  <div style={{height: '30px'}}></div>  
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
                </>
              ) : (
                <div style={{display: 'flex', justifyContent: 'center', marginTop: '10%'}}>
                  <Alert style={{fontSize: '1.5em'}} variant="filled" severity="warning">
                    Login Required To View Group
                  </Alert>
                </div>
              )}
              
              
            </Grid>
          </Grid>
          
        ): ''}
      </div>
    </>
)
}