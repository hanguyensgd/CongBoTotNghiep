import React, { useState, useEffect } from 'react';
import './App.css';
import ButtonGroup from 'react-bootstrap/Button';
import Button from 'react-bootstrap/Button';
import ReCAPTCHA from "react-google-recaptcha";
import axios from "axios";
import { withRouter, Redirect } from 'react-router-dom'


function TracuuLogin(props) {

  function wait(ms) {
    var start = new Date().getTime();
    var end = start;
    while (end < start + ms) {
      end = new Date().getTime();
    }
  }

 
  const POSTapiURL = "http://localhost:60114/api/ReCaptchaVerify";

  async function onChange(value) {
    await axios
      .post(POSTapiURL, {
        ResponseKey: value,
        
      })
      .then(function (response) {
        console.log(response);
        // setCaptchValue(JSON.parse(response.data).success)
        const res = JSON.parse(response.data).success;

        if (res) {
          props.setParentState(value.substr(0, 50), "");
          props.history.push({
            pathname: '/TraCuu',
            state: { detail: value.substr(0, 50) }
           
          })

        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }



  // function submitOnclick() {
  //   // console.log("before");
  //   wait(2000);
  //   props.history.push('/NhapLieu');
  //   //  console.log('adwadasds');
  // }


  return (

    <div className="App App-body">

      <p>Xác thực trước khi tra cứu</p>
      <ReCAPTCHA
        sitekey="6LdSD84UAAAAAD0L3p_jOigZeDnlzdtdskkJUATT"
        onChange={onChange}
      />

    </div>
  );
}



export default withRouter(TracuuLogin);
//export default TraCuu;
