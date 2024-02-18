import React, {useState} from "react";
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router";

export default function Register(props) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [ID, setID] = useState('')

    const navigate = useNavigate();

    const handleSubmit=(e)=>{
        e.preventDefault();
        authenticateUser();
    }

    const authenticateUser = async () =>{
        const res = await fetch("http://localhost:5050/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    "schoolID": ID,
                    "name": name,
                    "email": username,
                    "password": password,
                    "clubs": [],
                    "officer": [],
                }),
        })
        .catch(error => {
            window.alert(error);
            return;
        });
        navigate("/");
    }

    return (
        
        <div className="popup pb-[5%] pt-[15%] flex place-content-center z-1">
            <div className=" bg-gray-700
            grid flex items-center grid-rows-1 grid-flow-col border-4 border-gray-900/50 rounded-xl place-content-center text-center w-1/5 h-4/5 pt-[5%] pb-[5%]">
                <form onSubmit={handleSubmit}>
                    <div className="text-slate-300 text-xl pb-[15%]">
                        Register
                    </div>
                <div className="w-full pb-[20%]">
                   <input type="text" placeholder="School ID" onChange={e => setID(e.target.value)} className="text-center rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"></input>
                </div>
                <div className="w-full pb-[20%]">
                   <input type="text" placeholder="Name" onChange={e => setName(e.target.value)} className="text-center rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"></input>
                </div>
                <div className="w-full pb-[20%]">
                   <input type="text" placeholder="Email Address" onChange={e => setUsername(e.target.value)} className="text-center rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"></input>
                </div>
                <div className="pb-[20%]">
                  <input type="text" placeholder="Password" onChange={e => setPassword(e.target.value)} className="text-center rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"></input>
                </div>
                <div className="w=4/5">
                    <div className="pt-1">
                    <Button variant="outline-light" type="submit">Register</Button>{' '}
                    </div>
                </div>
                </form>
            </div>
        </div>
    );
}