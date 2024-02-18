import React, {useState,useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'reactjs-popup/dist/index.css';
import DatePicker from "react-datepicker";
import Navbar from '../navbar';

import "react-datepicker/dist/react-datepicker.css";

export default function Dashboard(name)  {
    const [club, setClub] = useState();
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);

    const showDate = () => setShow(true);
    const hideDate = () => setShow(false);

    const getClub = async() => {
        const response  = await fetch(`http://localhost:5050/users/clubs/get/${name}`)
        if(!response){
            const message = `An error occured: ${response.statusText}`;
            window.alert(message);
            return;
        }
        let res = await response.json();
        setClub(res);
    };

    useEffect(() => {
        getClub();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return(
        <div>
            <Navbar/>
            <title>{name}</title>
            <div>
                <div>
                    <h1> Event Creation </h1>
                    <input placeholder="TItle Event"/>
                    <h3>Date</h3>
                    <DatePicker selected = {date} onChange={(date) => setDate(date)}/>
                </div>

                <div>

                </div>
            </div>
        </div>
    );
}

