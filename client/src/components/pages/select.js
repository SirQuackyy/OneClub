import React, { useState, useEffect } from 'react';
import ClubSelect from "../clubSelect.js"
import { Badge } from 'react-bootstrap';
import ClubFilter from '../clubFilter.js';
import ClubSignUp from '../clubSignUp.js';
import Navbar from '../navbar';
import { useNavigate } from 'react-router-dom';

const Select = () => {
    const navigate = useNavigate();

    const [query, setQuery] = useState("");
    const [clubs, setClubs] = useState([]);
    const [filter, setFilter] = useState("None");
    const [selected, setSelected] = useState([]);

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const getAllInformation = async () => {
        setIsLoading(true);
        const response  = await fetch(`http://localhost:5050/users/clubs/all`)
        if(!response){
            const message = `An error occured: ${response.statusText}`;
            window.alert(message);
            return;
        }
        let res = await response.json();
        // console.log(res);
        setClubs(res);
        console.log(res);
        setIsLoading(false);
    };
    getAllInformation()
  }, []);

  const addClubs = async () => {
    console.log(selected);
    let newClubs = {
        clubs: selected,
        officer: JSON.parse(localStorage.getItem('officer')),
    }
    const res = await fetch(`http://localhost:5050/users/${localStorage.getItem('schoolID')}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newClubs),
    })
    .catch(error => {
        window.alert(error);
        return;
    });

    const response  = await fetch(`http://localhost:5050/users/u/${localStorage.getItem('schoolID')}`)
        if(!response){
            const message = `An error occured: ${response.statusText}`;
            window.alert(message);
            return;
        }
    let resp = await response.json();
    localStorage.setItem("schoolID", resp.schoolID);
    localStorage.setItem('name', resp.name);
    localStorage.setItem('email', resp.email);
    localStorage.setItem('clubs', JSON.stringify(resp.clubs));
    localStorage.setItem('officer', JSON.stringify(resp.officer));
    navigate('/clubslist');
  }
    
    return(
        <div>
            <Navbar/>
            {isLoading ? (<h1>Loading</h1>) : (
            <div>
            <div className="flex flex-row px-[5%] py-2" >
                <input className="text-4xl grow"placeholder="Search for Clubs..." onChange = {e=>setQuery(e.target.value)}/>
                <ClubFilter className=" order-last" filter = {filter} setFilter = {setFilter}/> 
            </div>
            <li className="flex grid grid-cols-3 gap-4 ">
                {clubs.map(club => {
                    if (club.name.includes(query) && (club.tags.toLowerCase() == filter.toLowerCase() ||  filter == "None")){
                        return (
                            
                            <ul className=" items-center flex-nowrap pl-[5%] p-[5%] text-center text-ellipsis overflow-hidden ">
                                <ClubSelect target={club} setSelected={setSelected} selected={selected}/>
                                
                            </ul>
                            
                        
                        );
                    }
                })}
            </li>
            <div>
                <br></br>
                <ClubSignUp  selection = {selected} addClubs = {addClubs}>Sign Up </ClubSignUp>
            </div>
            </div>
            )}
        </div>
    );
}

export default Select;