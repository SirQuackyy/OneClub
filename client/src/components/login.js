import React, {useState} from "react";
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router";

export default function Login(props) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate();

    const handleSubmit=(e)=>{
        e.preventDefault();
        authenticateUser();
    }

    const authenticateUser = async () =>{
        const response = await fetch(`http://localhost:5050/users/account/${username}/${password}/30d`);
        
        if (!response.ok) {
            const message = `An error occurred: ${response.statusText}`;
            window.alert(message);
            return;
        }

        let res = await response.json();
        let verified = res.verified;

        if(verified) {
            localStorage.setItem("schoolID", res.schoolID);
            localStorage.setItem('name', res.name);
            localStorage.setItem('email', res.email);
            localStorage.setItem('clubs', JSON.stringify(res.clubs));
            localStorage.setItem('officer', JSON.stringify(res.officer));
            localStorage.setItem('token', res.token);
            console.log(localStorage.getItem('name') + " " + localStorage.getItem('email') + " " + localStorage.getItem('clubs') + " " + localStorage.getItem('token'));
            navigate("/clubslist");
        } else {
            window.alert(res.reason);
        }
    }

    return (
        
        
            <div className=" bg-gray-700 
            grid  border-4 border-gray-900/50 rounded-xl place-content-center text-center w-1/4  ">
                <form onSubmit={handleSubmit}>
                    <div className="text-slate-300 text-2xl pt-[15%]">
                        Login Into Your Account
                    </div>
                <div className="w-full py-[20%]">
                   <input type="text" placeholder="Email Address" onChange={e => setUsername(e.target.value)} className="text-center rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"></input>
                </div>
                <div className="pb-[20%]">
                  <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} className="text-center rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"></input>
                </div>
                <div className="w=4/5 pb-[20%]" >
                    <div className="pt-1">
                    <Button variant="outline-light" type="submit">Login</Button>{' '}
                    </div>
                </div>
                </form>
            </div>
        
    );
}