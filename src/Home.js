import React, { useState, useEffect } from 'react';
import './App.css';
import ButtonGroup from 'react-bootstrap/Button';
import Button from 'react-bootstrap/Button';
import ReCAPTCHA from "react-google-recaptcha";
import axios from "axios";
import { withRouter, Redirect } from 'react-router-dom'
import App from './App';


function Home(props) {


 
  //  useEffect(() => {
  //   console.log("home");
  //  props.action("Admin");
  
  // });



  return (

    <div className="App App-body">

      <p>Trang chủ</p>
     
    </div>
  );
}



export default withRouter(Home);
//export default TraCuu;
