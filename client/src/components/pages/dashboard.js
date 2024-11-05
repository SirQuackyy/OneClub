import React, {useState,useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'reactjs-popup/dist/index.css';
import DatePicker from "react-datepicker";
import Navbar from '../navbar';
import { Button } from "react-bootstrap";


import "react-datepicker/dist/react-datepicker.css";
import { useLocation } from "react-router-dom";

export default function Dashboard()  {
    const { state } = useLocation();
    const { name } = state;

    const [club, setClub] = useState({});
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);
    const [event, setEvent] = useState({
        name: "",
        description: "",
        date: "",
        time: ""
    });

    const showDate = () => setShow(true);
    const hideDate = () => setShow(false);

    // const updateClub = async() => {
    //     const response  = await fetch(`http://localhost:5050/users/clubs/get/${name}`)
    //     if(!response){
    //         const message = `An error occured: ${response.statusText}`;
    //         window.alert(message);
    //         return;
    //     }
    //     let res = await response.json();
        
    //     console.log(res);

    //     console.log(event.nativeEvent);

    //     let newEvent = {
    //         events : res.events.concat(event.nativeEvent),
    //         members : res.members,
    //         attendance : res.attendance
    //     }
    //     console.log(newEvent);
    //     const resu = await fetch(`http://localhost:5050/users/clubs/${name}`, {
    //         method: "PATCH",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify(newEvent),
    //     })
    //     .catch(error => {
    //         window.alert(error);
    //         return;
    //     });
    //     console.log(resu)
    // }

    return(
        <div>
            <Navbar/>
            <div className=" pb-[30%] bg-gradient-to-br from-cyan-500 to-blue-500 text-center" >
                <h1 className=" py-[5%] text-zinc-200 text-6xl underline underline-offset-8 ">
                    {name}
                </h1>
                <div>
                    <h1> Event Creation </h1>
                    <input onChange={(e) => {
                        setEvent({
                            name: e,
                            description: event.description,
                            date: event.date,
                            time: event.time
                        })
                    }} placeholder="Title Event"/>
                    <br></br>
                    <h3 className="pt-[2.5%]" >Date</h3>
                    <DatePicker selected = {date} onChange={(date) => setEvent({
                            name: event.name,
                            description: event.description,
                            date: date.toLocaleDateString,
                            time:event
                        })}/>
                    <br></br>
                    <h3 className="pt-[2.5%]" > Event Description </h3>
                    <input className="pb-[10%] px-[10%] text-center"  placeholder="Start Typing..." onChange={(e) => setEvent({
                            name: event.name,
                            description: e,
                            date: event.date,
                            time: event.time
                        })}/>
                    <br></br>
                    <h3 className="pt-[2.5%]" > Time Range </h3>
                    <input placeholder="9:00-15:00" onChange={(e) => setEvent({
                            name: event.name,
                            description: event.description,
                            date: event.date,
                            time: e,
                        })}/>
                    
                    <br></br>
                    <br></br>
                    
                    <Button size="lg" variant="outline-light">Create Event</Button>{' '}
                </div>
                </div>
            </div>        
    );
}

