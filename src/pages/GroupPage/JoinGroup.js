import React, { useState } from 'react';
import axios from 'axios';

function JoinGroup(props) {
  const [isJoined, setIsJoined] = useState(false);

  const handleJoinClick = () => {{
    console.log(props);
      };
  }

  return (
    <button style={{width: '50%', background: 'blue'}} onClick={handleJoinClick} className="m-2 px-4 py-1 text-sm text-white font-semibold border border-blue-200 hover:text-white hover:bg-blue-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2">
      {isJoined ? 'Joined!' : 'Join Group'}
    </button>
  );
}

export default JoinGroup;