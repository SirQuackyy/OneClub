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

const Home = () => {

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

    const [seen, setSeen] = useState(false)
    
    function togglePop () {
        setSeen(!seen);
    };

    return(
        <div>
        <div className="text-center">
            <div className=" pb-[35%] pt-[15%] bg-gradient-to-br from-cyan-500 to-blue-500" >
                <h1 className="text-zinc-200 text-8xl ">
                    OneClub
                </h1>

                <Popup
  trigger={
    <Button onClick={togglePop} variant="primary" size="lg">
      Login
    </Button>
  }
  position="center"
  modal={false}
>
  <div position="center" className="w-screen z-50" style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-12.46%, -50%)' }}>
    <Login position="center" toggle={togglePop} />
  </div>
</Popup>

    

              {/* <div className="mt-8">
                    <Button onClick={togglePop} variant="primary" size="lg">
                        Login
                    </Button>
                    {seen ? <Login toggle={togglePop} /> : null}
                </div>
                {/* <br>
                </br>
                <Login/> */}
            </div>
        </div>
        </div>
    );
}

export default Home;