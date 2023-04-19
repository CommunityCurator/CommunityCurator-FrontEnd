import * as React from 'react';
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';


const Post = (props) => {

  const [username] = useState(props.user_name);
  const [content] = useState(props.content);
  const [created] = useState(props.created_at);

  const formattedDate = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  }).format(new Date(created));
 
  return (
<Card sx={{ maxWidth: 600, marginBottom: 2 }}>
      <CardHeader
        title={username}
        subheader={formattedDate}
      />
      <CardContent>
        <Typography variant="body1" >
          {content}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default Post;