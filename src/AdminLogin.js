import React, { useState, useEffect } from "react";
import "./App.css";
import ButtonGroup from "react-bootstrap/Button";
import Button from "react-bootstrap/Button";
import ReCAPTCHA from "react-google-recaptcha";
import axios from "axios";
import { withRouter, Redirect } from "react-router-dom";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";



function AdminLogin(props) {
  function wait(ms) {
    var start = new Date().getTime();
    var end = start;
    while (end < start + ms) {
      end = new Date().getTime();
    }
  }

  const [Token, setToken] = useState("");
  const [form, setForm] = useState({
    UserName: "",
    Password: ""
  });

  const updateField = e => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
    console.log(e.target.value);
  };

  // var [UserNameHtml, setUserNameHtml] = useState("");
  // var [PasswordHtml, setPasswordHtml] = useState("");
  // var [LoginButtonHtml, setLoginButtonHtml] = useState("");
  const [ReCaptchaResult, setReCaptchaResult] = useState(false);
  var UserNameHtml = "";
  var PasswordHtml = "";
  var LoginButtonHtml = "";

  if (ReCaptchaResult && Token.length == 50) {
    UserNameHtml = (
      <div className={"input-group input-group-sm mb-3"}>
        <div className={"input-group-prepend"}>
          <span className={"input-group-text"} id="inputGroup-sizing-sm">
            Tên đăng nhập:
          </span>
        </div>
        <input
          name="UserName"
          value={form.UserName}
          onChange={updateField}
          type="text"
          className={"form-control"}
        ></input>
      </div>
    );

    PasswordHtml = (
      <div className={"input-group input-group-sm mb-3"}>
        <div className={"input-group-prepend"}>
          <span className={"input-group-text"} id="inputGroup-sizing-sm">
            Mật khẩu:
          </span>
        </div>
        <input
          name="Password"
          value={form.Password}
          type="text"
          onChange={updateField}
          className={"form-control"}
        ></input>
      </div>
    );

    LoginButtonHtml = (
      <div className={"input-group input-group-sm mb-3"}>
        <input
          type="submit"
          className="btn btn-primary btn-block"
          value="Đăng nhập"
          onClick={submitOnclick}
        />
      </div>
    );
  }

  const POSTapiURL = "http://localhost:60114/api/ReCaptchaVerify";

  async function onChange(value) {
    await axios
      .post(POSTapiURL, {
        ResponseKey: value
      })
      .then(function(response) {
        setToken(value.substr(0, 50));
        console.log(response);
        // setCaptchValue(JSON.parse(response.data).success)
        setReCaptchaResult(JSON.parse(response.data).success);
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  async function submitOnclick() {
    //const POSTapiURL = "http://localhost:60114/api/PostResponse";
    const POSTapiURL = "http://localhost:60114/api/AdminLogin";
    // console.log(moment(NgaySinh).format('DD/MM/YYYY'));

    var headers = null;
    headers = {
      HEADER_TOKEN: Token
    };

    await axios
      .post(
        POSTapiURL,
        {
          ID: Token,
          UserName: form.UserName,
          Password: form.Password
        },
        { headers: headers }
      )
      .then(function(response) {
        // debugger
        console.log(response);
        if (response.data.Result == true) {
          alert("Đăng nhập thành công");

          props.setParentState(response.data.ID, form.UserName);
          props.history.replace({
            pathname: '/Home'
          });
         
        }

        //results":[{"ID":"O4wbPaRMQl06xz88RfxbApNDp7Q88ohx0XIx983Q7E8TI4-YYn","Result":false}
      })
      .catch(function(error) {
        console.log(error);
        alert("Sai mật khẩu hoặc tên đăng nhập");
      });
  }
  return (
    <div className="App App-body">
      <p>Xác thực trước khi đăng nhập</p>
      <div className={"input-group input-group-sm mb-3"}>
        <ReCAPTCHA
          sitekey="6LdSD84UAAAAAD0L3p_jOigZeDnlzdtdskkJUATT"
          onChange={onChange}
        />
      </div>

      {UserNameHtml}
      {PasswordHtml}
      {LoginButtonHtml}


      {/* <Button onClick={handleLogin}>Login</Button> */}
    </div>
  );
}

export default withRouter(AdminLogin);
//export default TraCuu;
