import React from "react";

import { Navigate, Route, Routes }  from "react-router-dom";

import logo from './logo.svg';
import './App.css';
import Select from './components/pages/select';
import Home from "./components/pages/home";
import William from "./components/pages/william";
import styles from "./index.css"
import Navbar from "./components/navbar";
import Register from "./components/register";
import CalendarPage from "./components/pages/calendar";
import ClubsList from "./components/pages/clubslist";
import Dashboard from "./components/pages/dashboard";

function App() {
  return (
    <div>
      <Routes>
        <Route exact path = "/" element = {<Home/>}/>
        <Route exact path = "/clubs" element = {<Select/>}/>
        <Route exact path = "/william" element = {<William/>}/>
        <Route exact path = "/register" element = {<Register/>}/>
        <Route exact path = "/calendar" element = {<CalendarPage/>}/>
        <Route exact path = "/clubslist" element = {<ClubsList/>}/>
        <Route exact path = "/dashboard" element = {<Dashboard/>}/>
        <Route path= "*" element = {<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
