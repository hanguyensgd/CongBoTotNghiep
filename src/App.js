import React, { useState, useEffect } from "react";
import "./App.css";
import {
  ButtonToolbar,
  ButtonGroup,
  Button,
  Navbar,
  Nav
} from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import NhapLieu from "./NhapLieu";
import CapNhat from "./CapNhat";
import TracuuLogin from "./TracuuLogin";
import TraCuu from "./TraCuu";
import UploadFile from "./UploadFile";
import AdminLogin from "./AdminLogin";
import Home from "./Home";
import axios from "axios";

function FooterIntro() {
  return <div>Trung tâm Thông tin và Chương trình Giáo dục</div>;
}

function App() {
  //var Username = "";
  const [Username, setUsername] = useState("");
  const [Token, setToken] = useState("");

  // useEffect(() => {
  //   setUsername("Admin");
  // });

  const setTokenUsername = (t, u) => {
    setToken(t);
    setUsername(u);
  };

  const LogOut = async () => {
    var headers = null;
    headers = {
      HEADER_TOKEN: Token
    };
    const POSTapiURL = "http://localhost:60114/api/AdminLogout";
    await axios
      .post(
        POSTapiURL,
        {
          ID: Token
        },
        { headers: headers }
      )
      .then(function(response) {
        setToken("");
        setUsername("");
        console.log("logout");
        
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  var loginBanner = "";
  var NhapLieuhtml = "";
  var UploadFilehtml = "";
  var TraCuuhtml = (
    <Link className="nav-link" to="/TracuuLogin">
      Tra cứu
    </Link>
  );
  var CapNhathtml = "";

  var DangNhaphtml = (
    <Link className="nav-link" to="/AdminLogin">
      Đăng nhập
    </Link>
  );

  if (Username == "admin") {
    loginBanner = (
      <div
        style={{
          backgroundColor: "#066100",
          textAlign: "right",
          paddingRight: "10px"
        }}
      >
        <label>{Username}</label>
        <Button variant="link">Đổi mật khẩu</Button>
        <Button variant="link" onClick={LogOut}>
          Đăng xuất
        </Button>
      </div>
    );

    NhapLieuhtml = (
      <Link className="nav-link" to="/NhapLieu">
        Nhập liệu
      </Link>
    );
    UploadFilehtml = (
      <Link className="nav-link" to="/UploadFile">
        Tải File
      </Link>
    );

    TraCuuhtml = null;
    DangNhaphtml = null;
    CapNhathtml = (
      <Link className="nav-link" to="/CapNhat">
        Cập nhật
      </Link>
    );
  }

  return (
    <div className="App">
      <Router>
        <header className="App-header">
          <div className="m-4">
            <img
              alt=""
              width="100"
              height="100"
              src={"./logoso.12820b04.png"}
            />

            <div style={{ display: "inline-block", verticalAlign: "middle" }}>
              <label style={{ display: "block", textAlign: "center" }}>
                SỞ GIÁO DỤC VÀ ĐÀO TẠO TP HỒ CHÍ MINH
              </label>
            </div>
          </div>

          {loginBanner}

          <Navbar bg="primary" variant="dark" expand="lg">
            {/* <Navbar.Brand onClick={(event)=>{event.preventDefault()}}>Home</Navbar.Brand> */}
            <Navbar.Brand
              className="navbar-brand"
              onClick={event => {
                event.preventDefault();
              }}
            >
              CÔNG BỐ DỮ LIỆU TỐT NGHIỆP
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Link className="nav-link" to="/Home">
                  Home
                </Link>
                {NhapLieuhtml}
                {UploadFilehtml}
                {TraCuuhtml}
                {CapNhathtml}
                {DangNhaphtml}
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </header>
        <body className="App App-body">
          <div>
            <Switch>
              <Route path="/Home">
                <Home />
              </Route>
              <Route path="/NhapLieu">
                <NhapLieu getParentToken={Token}  />
              </Route>
              <Route path="/UploadFile">
                <UploadFile  getParentToken={Token} />
              </Route>
              <Route path="/TracuuLogin">
                <TracuuLogin setParentState={setTokenUsername} />
              </Route>
              <Route path="/TraCuu">
                <TraCuu getParentToken={Token} />
              </Route>
              <Route path="/CapNhat">
                <CapNhat getParentToken={Token} />
              </Route>
              <Route path="/AdminLogin">
                <AdminLogin setParentState={setTokenUsername} />
              </Route>
            </Switch>
          </div>
        </body>
      </Router>

      <footer style={{ textAlign: "center", backgroundColor: "wheat" }}>
        <p className="App-intro">
          <label style={{ fontWeight: "600" }}>
            SỞ GIÁO DỤC VÀ ĐÀO TẠO TP HỒ CHÍ MINH
          </label>
          <br></br>
          Địa chỉ: Số 66 - 68 Lê Thánh Tôn Q.1 TPHCM
          <br></br>
          Số điện thoại phòng tiếp công dân: (+84) 028.38 229 360
          <br></br>
          Email : sgddt@tphcm.gov.vn
        </p>
      </footer>
    </div>
  );
}

export default App;
