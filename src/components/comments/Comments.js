import { useState, useEffect } from "react";
import CommentsForm from "./CommentsForm";
import Comment from "./Comment";


const Comments = ({ commentsUrl, currentUserId, groupId }) => {
  const [backendComments, setBackendComments] = useState([]);
  const [activeComment, setActiveComment] = useState(null);
  const [rootComments, setRootComments] = useState([]);  

  const getReplies = (commentId) =>
    backendComments
      .filter((backendComment) => backendComment.parent_id === commentId)
      .sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.created_at).getTime()
      );


  const addComment = (text, parentId) => {
      console.log('About to add a comment...');
      console.log('text', text);
      console.log('parentId', parentId);



      if(parentId === undefined){parentId = 0;}
        
      //var raw = '{"content":"hi", "created_at": "1681789209109", "group_id": 18, "user_id":1,"parent_id":0}'
      var raw = '{"content":"' + text + '", "created_at": "' + Date.now() + '", "group_id":' + groupId + ', "user_id":' + currentUserId + ',"parent_id":' + parentId + '}';
      console.log('Post Body:', raw);
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      var requestOptions = {
        method: 'POST',
        headers: myHeaders ,
        body: raw ,
        redirect: 'follow'
      };
      
      fetch("http://127.0.0.1:8000/api/message/", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));


        GetComments();

  };



  const GetComments =()=>{
   

    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    
    fetch("http://127.0.0.1:8000/api/message/", requestOptions)
      .then(response => response.text())
      .then(result => {
       
        let JSONData = JSON.parse(result);
        
        setBackendComments(JSONData.messages);
        setRootComments( JSONData.messages.filter(
          (backendComment) => backendComment.parent_id === 0
        ));
      })
      .catch(error => console.log('error', error));

  }

  useEffect(() => {

    GetComments();
  }, []);

  return (
    <div className="comments">
      <h3 className="comments-title">Comments</h3>
      <div className="comment-form-title">Write comment</div>
      <CommentsForm submitLabel="Write" handleSubmit={addComment} />
      <div className="comments-container">
        {rootComments.map((rootComment) => (
          <Comment
            key={rootComment.id}
            comment={rootComment}
            replies={getReplies(rootComment.id)}
            activeComment={activeComment}
            setActiveComment={setActiveComment}
            addComment={addComment}
            currentUserId={currentUserId}
          />
        ))}
      </div>
    </div>
  );
};

export default Comments;
