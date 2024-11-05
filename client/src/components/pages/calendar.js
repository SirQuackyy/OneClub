import React, {useState, useEffect} from "react";
import { useNavigate } from 'react-router-dom';
import { Modal, Button } from "react-bootstrap";
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Navbar from '../navbar';

const localizer = momentLocalizer(moment)

const CalendarPage = () => {
    const [clubs, setClubs] = useState([]);

    const [show, setShow] = useState(false);
    const hideModal = () => {
        setShow(false);
    }
    const showModal = () => setShow(true);

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

  const [events, setEvents] = useState([]);

  const getClubs = async() => {
      const response  = await fetch(`http://localhost:5050/users/clubs/all`)
      if(!response){
          const message = `An error occured: ${response.statusText}`;
          window.alert(message);
          return;
      }
      let res = await response.json();
      setClubs(res);

      let temp = [];

      res.forEach((club) => {
        club.events.forEach((event) => {
            if(!(events.some(item => item.title === event.name) && events.some(item => item.start === event.date + event.time.split('-')[0] + ':00') && events.some(item => item.end === event.date + event.time.split('-')[1] + ':00'))){
                let ev = {
                    title: event.name,
                    start: moment(event.date + 'T' + event.time.split('-')[0] + ':00-07:00'),
                    end: moment(event.date + 'T' + event.time.split('-')[1] + ':00-07:00')
                };
                temp.push(ev);
            }
        })

        if(club.days.monday != "0"){
            for(let i = 0; i < 52; i ++){
                let ev = {
                    title: club.name,
                    start: moment().day(1).add(7 * i, 'days').set("hour", parseInt(club.days.monday.split("-")[0].split(":")[0])).set("minute", parseInt(club.days.monday.split("-")[0].split(":")[1])),
                    end: moment().day(1).add(7 * i, 'days').set("hour", parseInt(club.days.monday.split("-")[1].split(":")[0])).set("minute", parseInt(club.days.monday.split("-")[1].split(":")[1])),
                }
                temp.push(ev)
            }
        }
        if(club.days.tuesday != "0"){
            for(let i = 0; i < 52; i ++){
                let ev = {
                    title: club.name,
                    start: moment().day(2).add(7 * i, 'days').set("hour", parseInt(club.days.tuesday.split("-")[0].split(":")[0])).set("minute", parseInt(club.days.tuesday.split("-")[0].split(":")[1])),
                    end: moment().day(2).add(7 * i, 'days').set("hour", parseInt(club.days.tuesday.split("-")[1].split(":")[0])).set("minute", parseInt(club.days.tuesday.split("-")[1].split(":")[1])),
                }
                temp.push(ev)
            }
        }
        if(club.days.wednesday != "0"){
            for(let i = 0; i < 52; i ++){
                let ev = {
                    title: club.name,
                    start: moment().day(3).add(7 * i, 'days').set("hour", parseInt(club.days.wednesday.split("-")[0].split(":")[0])).set("minute", parseInt(club.days.wednesday.split("-")[0].split(":")[1])),
                    end: moment().day(3).add(7 * i, 'days').set("hour", parseInt(club.days.wednesday.split("-")[1].split(":")[0])).set("minute", parseInt(club.days.wednesday.split("-")[1].split(":")[1])),
                }
                temp.push(ev)
            }
        }
        if(club.days.thursday != "0"){
            for(let i = 0; i < 52; i ++){
                let ev = {
                    title: club.name,
                    start: moment().day(4).add(7 * i, 'days').set("hour", parseInt(club.days.thursday.split("-")[0].split(":")[0])).set("minute", parseInt(club.days.thursday.split("-")[0].split(":")[1])),
                    end: moment().day(4).add(7 * i, 'days').set("hour", parseInt(club.days.thursday.split("-")[1].split(":")[0])).set("minute", parseInt(club.days.thursday.split("-")[1].split(":")[1])),
                }
                temp.push(ev)
            }
        }
        if(club.days.friday != "0"){
            for(let i = 0; i < 52; i ++){
                let ev = {
                    title: club.name,
                    start: moment().day(5).add(7 * i, 'days').set("hour", parseInt(club.days.friday.split("-")[0].split(":")[0])).set("minute", parseInt(club.days.friday.split("-")[0].split(":")[1])),
                    end: moment().day(5).add(7 * i, 'days').set("hour", parseInt(club.days.friday.split("-")[1].split(":")[0])).set("minute", parseInt(club.days.friday.split("-")[1].split(":")[1])),
                }
                temp.push(ev)
            }
        }
      });
      setEvents(events.concat(temp));
  };

  useEffect(() => {
      getClubs();
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log(events);
  }, [events])

  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [time, setTime] = useState('');

  const onSelectEvent = (calEvent) => {
    let e;
    let time;
    console.log(calEvent);
    clubs.forEach(club => {
        if(!e){
            e = club.events[club.events.findIndex(x => x.name === calEvent.title)];
            if(e){
                time = e.time;
            }
        }
    })
    clubs.forEach(club => {
        if(!e && club.name === calEvent.title){
            e = club;
            console.log(calEvent.start.get('H'))
            time = calEvent.start.get('H') + ':' + calEvent.start.get('m') + '-' + calEvent.end.get('H') + ':' + calEvent.end.get('m');
        }
    })
    setTitle(e.name);
    setDesc(e.description);
    setTime(time);
    showModal();
  }

    return(
        <div className="p-[2%] ">
            <Navbar/>
            <Calendar
            onSelectEvent={onSelectEvent}
            localizer={localizer}
            events={events}
            startAccessor={(event) => { return new Date(event.start) }}
            endAccessor="end"
            style={{ height: 500 }}
            views={{
                month: true,
                week: true,
                day: true,
                agenda: false,
              }}
            />
            <Modal show={show} onHide={hideModal}>
                <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{desc + '\n\n' + time}</Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={hideModal}>
                    Close
                </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default CalendarPage;