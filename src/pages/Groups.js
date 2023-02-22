import React from 'react'
import '../App.css'
import Group from '../components/Group'
import { useEffect, useState } from "react";
import Comments from "../components/comments/Comments";

function Groups(){
  const [groupList, setgroupList] = useState(
    [
        {
            groupName: "Chess club",
            description: "Join if you like play chess",
            img: "./images/chess.jpg",
        },
        {
            groupName: "Yoga", 
            description: "Community of yogis",
            img: "./images/yoga.jpg",
        },
        {
            groupName: "Guitar lessons", 
            description: "Classes for everyone",
            img: "./images/guitar.jpg",
        },
    ]
  );

    return(
      <div>
      <div className="flex flex-wrap justify center">
        {groupList.map((group) => {
            return (<Group groupName={group.groupName} description={group.description} img={group.img} /> ) ;
        })}
      
      </div>
      <Comments
        commentsUrl="http://localhost:3004/comments"
        currentUserId="1"
      />
      </div>
    );

  
}

export default Groups;
