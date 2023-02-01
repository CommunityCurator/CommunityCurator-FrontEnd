import React from 'react'
import '../../App.css'
import Group from '../Group'
import { useEffect, useState } from "react";


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
            description: "Communityu of yogis",
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
      <div className="flex flex-wrap justify center">
        {groupList.map((group) => {
            return (<Group groupName={group.groupName} description={group.description} img={group.img} /> ) ;
        })}
      </div>

    );

  
}

export default Groups;
