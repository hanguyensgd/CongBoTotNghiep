import React, { Component, useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import vi from "date-fns/locale/vi";
import Select from "react-select";
import { Button, ButtonGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

registerLocale("vi", vi);

export default function NhapLieu(props) {

  var headers = null;
  if(props.getParentToken.length == 50){
    // console.log(props.getParentToken);
    headers = {
      'HEADER_TOKEN': props.getParentToken
     
    }
  }
  else{
      alert("Không tìm thấy phiên làm việc");
      props.history.push({pathname: '/Home'})
  
  }
  


  const [form, setForm] = useState({
    HoTen: "",
    HoiDongThi: "",
    SoHieu: "",
  });
  // const [HoTen, setHoTen] = useState("");
  const [isNam, setIsNam] = useState(true);
  const [startDate, setDate] = useState();
  const [NgayKhoaThi, setNgayKhoaThi] = useState();

  const [isPass, setIsPass] = useState(true);
  const [isPassSPK, setIsPassSPK] = useState(true);



  const toggleButton = e => {
    setForm({
      ...form,
      // [e.target.name]: e.target.value
      [e.target.name]: e.target.value

    });

    //   for (var i = 1; i <= 2; i++) {
    //     if(e.target.name == "SauPhucKhao" + i ){
    //       setButtonColor({
    //         ...ButtonColor,
    //         [e.target.name]: "blue", 
    //         //"SauPhucKhao1": "blue"    
    //       });
    //       console.log( e.target.name + i + "----" + ButtonColor.SauPhucKhao1 + "," +  ButtonColor.SauPhucKhao2);
    //     }

    //     else{
    //       setButtonColor({
    //         ...ButtonColor,
    //         // [e.target.name]: "blue",
    //         ["SauPhucKhao" + i]: "black"
    //         // "SauPhucKhao1": "blue"
    //       });
    //       console.log(e.target.name + i + "----" + ButtonColor.SauPhucKhao1  + "," + ButtonColor.SauPhucKhao2);
    //     }
    // } 
  };

  const updateField = e => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const GETNoiSinhURL = "http://localhost:60114/api/GetNoiSinh";
  const [NoiSinhLst, setNoiSinhLst] = useState([]);
  var [NoiSinh, setNoiSinh] = useState("");
  async function populateNoiSinh() {
    await axios.get(GETNoiSinhURL, {}).then(function (response) {
      const arr = [];
      JSON.parse(response.data).map(s => {
        let a = { label: s.TenTinh, value: s.TinhID };
        arr.push(a);
      });
      setNoiSinhLst(arr);
      console.log(arr);
    });
  }

  const GETDanTocURL = "http://localhost:60114/api/GetDanToc";
  const [DanTocLst, setDanTocLst] = useState([]);
  var [DanToc, setDanToc] = useState("");
  async function populateDanToc() {
    await axios.get(GETDanTocURL, {}).then(function (response) {
      const arr = [];
      JSON.parse(response.data).map(s => {
        let a = { label: s.TenDanToc, value: s.DanTocID };
        arr.push(a);
      });
      setDanTocLst(arr);
    });
  }

  const GETTruongURL = "http://localhost:60114/api/GetTruong";
  const [TruongLst, setTruongLst] = useState([]);
  var [Truong, setTruong] = useState("");
  async function populateTruong() {
    await axios.get(GETTruongURL, {}).then(function (response) {
      const arr = [];
      JSON.parse(response.data).map(s => {
        let a = { label: s.TenTruong, value: s.SchoolID };
        arr.push(a);
      });
      setTruongLst(arr);
    });
  }

  useEffect(() => {
    populateNoiSinh();
    populateDanToc();
    populateTruong();
  }, []);

  const POSTapiURL = "http://localhost:60114/api/PostResponse";

  async function fetchData() {
    await axios
      .post(POSTapiURL, {
        HoTen: form.HoTen,
        NgaySinh: startDate,
        NoiSinh: NoiSinh.value,
        GioiTinh: form.GioiTinh,
        DanToc: DanToc.value,
        Truong: Truong.value,
        KhoaThi: NgayKhoaThi,
        HoiDongThi: form.HoiDongThi,
        SoHieu: form.SoHieu,
        TruocPhucKhao: isPass,
        SauPhucKhao: isPassSPK
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }



  function HandleClick() {
    alert(": " + NoiSinh.label);
  }
  return (
    <div className="App App-body">
      <p> Form nhập liệu</p>

      <div className={"input-group input-group-sm mb-3"}>
        <div className={"input-group-prepend"}>
          <span className={"input-group-text"} id="inputGroup-sizing-sm">
            Họ tên:
          </span>
        </div>
        <input
          name="HoTen"
          value={form.HoTen}
          onChange={updateField}
          type="text"
          className={"form-control"}
        ></input>
      </div>

      <div className={"input-group input-group-sm mb-3"}>
        <div className={"input-group-prepend"}>
          <span className={"input-group-text"} id="inputGroup-sizing-sm">
            Ngày sinh:
          </span>
        </div>
        <DatePicker
          className={"form-control"}
          locale="vi"
          selected={startDate}
          onChange={setDate}
          dateFormat="dd/MM/yyyy"
        />
      </div>

      <div className={"input-group input-group-sm mb-3"}>
        <div className={"input-group-prepend"}>
          <label className={"input-group-text"}>Nơi sinh:</label>
        </div>
        <div
          className={"form-control"}
          style={{ padding: 0, height: "fit-content" }}
        >
          {/* <select> {NoiSinhLst.map(s => (<option value={s.value}>
            {s.label}</option>))}
        </select> */}
          <Select
            //defaultValue={NoiSinh}
            Value={NoiSinh}
            // isDisabled={isDisabled}
            // isLoading={isLoading}

            // isRtl={isRtl}
            onChange={setNoiSinh}
            isSearchable="true"
            name="NoiSinh"
            options={NoiSinhLst}
          />
        </div>
      </div>

      <div className={"input-group input-group-sm mb-3"}>
        <div className={"input-group-prepend"}>
          <span className={"input-group-text"} id="inputGroup-sizing-sm">
            Giới tính:
          </span>
        </div>
        <div
          className={"form-control"}
          style={{ height: "fit-content" , textAlign: "right"}}
        >
          <ButtonGroup >
            <Button variant={isNam ? "primary" : "dark"} onClick={() => setIsNam(true)} >Nam</Button>
            <Button variant={!isNam ? "primary" : "dark"} onClick={() => setIsNam(false)}>Nữ</Button>
          </ButtonGroup>
        </div>

      
      </div>
      <div className={"input-group input-group-sm mb-3"}>
        <div className={"input-group-prepend"}>
          <label className={"input-group-text"}>Dân tộc:</label>
        </div>
        <div
          className={"form-control"}
          style={{ padding: 0, height: "fit-content" }}
        >
          <Select
            Value={DanToc}
            onChange={setDanToc}
            isSearchable="true"
            name="DanToc"
            options={DanTocLst}
          />
        </div>
      </div>
      <div className={"input-group input-group-sm mb-3"}>
        <div className={"input-group-prepend"}>
          <label className={"input-group-text"}>Trường:</label>
        </div>
        <div
          className={"form-control"}
          style={{ padding: 0, height: "fit-content" }}
        >
          <Select
            Value={Truong}
            onChange={setTruong}
            isSearchable="true"
            name="Truong"
            options={TruongLst}
          />
        </div>
      </div>

      <div className={"input-group input-group-sm mb-3"}>
        <div className={"input-group-prepend"}>
          <span className={"input-group-text"} id="inputGroup-sizing-sm">
            Khóa thi:
          </span>
        </div>

        <DatePicker
          className={"form-control"}
          locale="vi"
          selected={NgayKhoaThi}
          onChange={setNgayKhoaThi}
          dateFormat="dd/MM/yyyy"
        />
      </div>

      <div className={"input-group input-group-sm mb-3"}>
        <div className={"input-group-prepend"}>
          <span className={"input-group-text"} id="inputGroup-sizing-sm">
            Hội đồng thi:
          </span>
        </div>

        <input
          name="HoiDongThi"
          value={form.HoiDongThi}
          type="text"
          onChange={updateField}
          className={"form-control"}
        ></input>
      </div>

      <div className={"input-group input-group-sm mb-3"}>
        <div className={"input-group-prepend"}>
          <span className={"input-group-text"} id="inputGroup-sizing-sm">
            Số hiệu:
          </span>
        </div>
        <input
          name="SoHieu"
          value={form.SoHieu}
          type="text"
          onChange={updateField}
          className={"form-control"}
        ></input>
      </div>

      <div className={"input-group input-group-sm mb-3"}>
        <div className={"input-group-prepend"}>
          <span className={"input-group-text"} id="inputGroup-sizing-sm">
            Kết quả:
          </span>
        </div>
        <div
          className={"form-control"}
          style={{ height: "fit-content" , textAlign: "right" }}
        >
          <ButtonGroup >
            <Button variant={isPass ? "primary" : "dark"} onClick={() => setIsPass(true)} >Đậu</Button>
            <Button variant={!isPass ? "primary" : "dark"} onClick={() => setIsPass(false)}>Rớt</Button>
          </ButtonGroup>
        </div>

      </div>

      <div className={"input-group input-group-sm mb-3"}>
        <div className={"input-group-prepend"}>
          <span className={"input-group-text"} id="inputGroup-sizing-sm">
            Sau phúc khảo:
          </span>
        </div>
        <div
          className={"form-control"}
          style={{ height: "fit-content" , textAlign: "right"}}
        >
          <ButtonGroup >
            <Button variant={isPassSPK ? "primary" : "dark"} onClick={() => setIsPassSPK(true)} >Đậu</Button>
            <Button variant={!isPassSPK ? "primary" : "dark"} onClick={() => setIsPassSPK(false)}>Rớt</Button>
          </ButtonGroup>
        </div>

      </div>

      <input
        type="submit"
        class="btn btn-primary btn-block"
        value="Lưu dữ liệu"
        onClick={fetchData}
      />
      {/* <input type="submit" value="Submit" onClick={HandleClick} /> */}
    </div>
  );
}
