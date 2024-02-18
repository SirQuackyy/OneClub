import React, {useState, useEffect} from "react";
import Login from "../login";
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { useNavigate } from 'react-router-dom';
import Navbar from '../navbar';

const ClubsList = () => {
    const navigate = new useNavigate();
    useEffect(() => {
    const checkToken = async () => {
        let token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:5050/users/verify/${token}`);
        if (!response.ok) {
            const message = `An error occurred: ${response.statusText}`;
            window.alert(message);
            return;
        }
        let res = await response.json();
        console.log(res);
        if(res.status !== "VALID"){
            navigate('/');
        }
    }
    
    if(!localStorage.getItem('token')){
        navigate('/');
    } else {
        checkToken().catch(console.error);
    }
  },[])

const [user, setUser] = useState(
    {
        schoolID: localStorage.getItem('schoolID'),
        name:localStorage.getItem('name'),
        email:localStorage.getItem('email'),
        clubs:JSON.parse(localStorage.getItem('clubs')),
        officer:JSON.parse(localStorage.getItem('officer')),
    }
);

const goDash = (nam) => {
    console.log(nam);
    navigate('/dashboard', { state: {name: nam} })
}

    return(
        <div>
            <Navbar/>
        <div>
            <div className=" pb-[30%] pt-[5%] bg-gradient-to-br from-cyan-500 to-blue-500 text-center" >
                <h1 className="text-zinc-200 text-8xl underline underline-offset-8 ">
                    {user.name}'s Clubs
                </h1>
                <div className="flex text-white text-5xl place-content-center">
                    <div className="flex-initial w-[45%]">
                        <p className="text-7xl font-bold py-[5%]">Club</p>
                        {/* <ul className="list-disc"> */}
                    {user.clubs.map((club, index) =>(
                    // <li key={index} className='flex text-white p-4 '>
                        // <div className = "flex-initial w-[45%]">
                            <p><button onClick={() => user.officer.includes(club) ? goDash(club) : null}>
                                {club}
                            </button></p>
                        // </div>

                    // </li>

                    )) }
                {/* </ul> */}
                    </div>

                    <div className="flex-initial w-[45%]">
                        <p className="text-7xl font-bold py-[5%]">Status</p>
                        {user.clubs.map((club, index) =>(
                        <p>{user.officer.includes(club) ? "Officer" : "Member"}</p>
                        ))}
                    </div>
                </div>

                <div>


            </div>

            </div>
            

        </div>
        </div>
    );
}

export default ClubsList;