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

  function AddFeedback(feedbackType){
    console.log('id', id);
    var raw = JSON.stringify(`{"like": "${feedbackType === 'like'? 1 : 0}", "dislike":"${feedbackType === 'dislike'? 1 : 0}", "report":"0", "details":"","created_at":"${new Date()}", "group":"${id}", "user":"${userId}"}`);
    console.log('body', raw);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.parse(raw)
    }

    fetch("http://localhost:8000/api/feedback/", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));

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


      
    fetch('http://localhost:8000/api/feedback/')
    .then((res) => 
    res.json()
    )
    .then((d) => {
      console.log(d)
      setLikes(d.feedbacks.filter(feedback => feedback.like === true && feedback.group.id ==id).length);
      setDislikes(d.feedbacks.filter(feedback => feedback.dislike === true && feedback.group.id ==id).length);

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

                {group.group_name}<br></br></Typography>
              <Typography variant="h6" gutterBottom>
                {group.description}
                {userId !== null ? (<div>
                Welcome {group.group_name} group!
                

                <div>

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

              {userId ? (
                <>
                  <div style={{height: '20px'}}></div>  
              <Typography variant="h5" gutterBottom style={{marginBottom: '.8em'}}>
                Create new post
              </Typography> 
              <div style={{width: '90%'}}>
                <NewPost userID={userId} groupID={id}/>
                <img src={group.image} alt=""></img>

              </Typography>  

              <div className="feedback">
                <div className='thumbsup' onClick={()=> AddFeedback('like')} ><Icon_Thumbup size={25} />
                <h4>{Likes}</h4>
                </div>
                
                <div className='thumbsdown' onClick={()=> AddFeedback('dislike')} > <Icon_Thumbdown size={25} /><h4>{Dislikes}</h4></div>

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