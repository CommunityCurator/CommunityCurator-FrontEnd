import React from 'react'
import '../App.css'


function Group(props){


    return (
        <div className="m-2 py-8 px-8 max-w-sm bg-white rounded-xl shadow-lg space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6">
            <img className="block mx-auto h-24 rounded-full sm:mx-0 sm:shrink-0" src={props.img} alt="avatar"/>
                <div className="text-center space-y-2 sm:text-left">
                    <div className="space-y-0.5">
                        <p className="text-lg text-black font-semibold">
                            {props.groupName}
                        </p>
                         <p className="text-slate-500 font-medium">
                            {props.description}
                        </p>
                     </div>
                     <button className="px-4 py-1 text-sm text-blue-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-blue-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2">
                        Join
                     </button>
                </div>
        </div>
    );
}

export default Group;