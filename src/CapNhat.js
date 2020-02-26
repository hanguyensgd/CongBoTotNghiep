import React, { useState, useEffect } from "react";
import "./App.css";
import ButtonGroup from "react-bootstrap/Button";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { withRouter, Redirect } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import styled from "styled-components";
import { useTable, useExpanded } from "react-table";
import Moment from "react-moment";
import moment from "moment";

function CapNhat(props) {
  const id = props.location.data;
  const [Option, setOption] = useState(0);
  const [form, setForm] = useState({
    HoTen: "",
    SoHieu: ""
  });
  
  const [NgaySinh, setNgaySinh] = useState(null);

  const updateField = e => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

    if (e.target.name == "HoTen" && e.target.value.length > 0) {
      setOption(1);
    }

    if (e.target.name == "SoHieu" && e.target.value.length > 0) {
      setOption(2);
    }

    if (e.target.value.length == 0) {
      setOption(0);
    }
  };

  function wait(ms) {
    var start = new Date().getTime();
    var end = start;
    while (end < start + ms) {
      end = new Date().getTime();
    }
  }

  // useEffect(() => {
  //   verifyCaptcha(id);
  // });

  async function verifyCaptcha(value) {
    const POSTapiURL = "http://localhost:60114/api/SessionVerify";
    await axios
      .post(POSTapiURL, {
        ResponseKey: value
      })
      .then(function(response) {
        console.log(response);
        // setCaptchValue(JSON.parse(response.data).success)
        const res = JSON.parse(response.data);
        if (res !== true) {
          console.log(res);
          props.history.push("/Home");
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  var HoTenHtml;
  if ((Option == 1) | (Option == 0)) {
    HoTenHtml = (
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
    );
  }
  var NgaySinhHtml;
  if ((Option == 1) | (Option == 0)) {
    NgaySinhHtml = (
      <div className={"input-group input-group-sm mb-3"}>
        <div className={"input-group-prepend"}>
          <span className={"input-group-text"} id="inputGroup-sizing-sm">
            Ngày sinh:
          </span>
        </div>
        <DatePicker
        
          className={"form-control"}
          locale="vi"
          dateFormat="dd/MM/yyyy"
          selected={NgaySinh}
          onChange={date => setNgaySinh(date)}
        />
      </div>
    );
  }

  var SoHieuHtml;
  if ((Option == 2) | (Option == 0)) {
    SoHieuHtml = (
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
    );
  }

  const Styles = styled.div`
    padding: 1rem;

    table {
      border-spacing: 0;
      border: 1px solid black;
      font-size: small;
      tr {
        :last-child {
          td {
            border-bottom: 0;
          }
        }
      }

      th {
        background-color: #007bff;
        border-bottom: 1px solid black;
        border-right: 1px solid black;
      }

      td {
        margin: 0;
        padding: 0.5rem;
        border-bottom: 1px solid black;
        border-right: 1px solid black;
        background-color: wheat;
        color: black;
        :last-child {
          border-right: 0;
        }
      }
    }
  `;

  function Table({ columns: userColumns, data, renderRowSubComponent }) {
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      rows,
      prepareRow,
      flatColumns
    } = useTable(
      {
        columns,
        data
      },
      useExpanded // We can useExpanded to track the expanded state
      // for sub components too!
    );

    return (
      <>
        {/* <pre>
          <code>{JSON.stringify({ expanded: expanded }, null, 2)}</code>
        </pre> */}
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row, i) => {
              prepareRow(row);
              return (
                // Use a React.Fragment here so the table markup is still valid
                <React.Fragment {...row.getRowProps()}>
                  <tr>
                    {row.cells.map(cell => {
                      return (
                        <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                      );
                    })}
                  </tr>
                  {/*
                      If the row is in an expanded state, render a row with a
                      column that fills the entire length of the table.
                    */}
                  {row.isExpanded ? (
                    <tr>
                      <td colSpan={flatColumns.length}>
                        {/*
                            Inside it, call our renderRowSubComponent function. In reality,
                            you could pass whatever you want as props to
                            a component like this, including the entire
                            table instance. But for this example, we'll just
                            pass the row
                          */}

                        {/* {renderRowSubComponent({ row })} */}
                        {renderRowSubComponent(data[i])}
                        {/* {JSON.stringify(data[i])} */}
                      </td>
                    </tr>
                  ) : null}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </>
    );
  }

  const columns = React.useMemo(
    () => [
      {
        // Make an expander cell
        Header: () => null, // No header
        id: "expander", // It needs an ID
        Cell: ({ row }) => (
          // Use Cell to render an expander for each row.
          // We can use the getExpandedToggleProps prop-getter
          // to build the expander.
          <span {...row.getExpandedToggleProps()}>
            {row.isExpanded ? "👇" : "👉"}
          </span>
        )
      },

      {
        Header: "Họ tên",
        accessor: "HoTen" // String-based value accessors!
      },
      {
        Header: "Ngày sinh",
        accessor: d => {
          //Moment.globalFormat = 'DD/MM/YYYY';
          return <Moment format="DD/MM/YYYY">{Date.parse(d.NgaySinh)}</Moment>;
          //return Date.parse(d.NgaySinh)
        }
      },
      // {
      //   Header: "Nơi sinh",
      //   accessor: "TenTinh" // String-based value accessors!
      // },
      // {
      //   Header: "Giới tính",
      //   accessor: d => {
      //     return d.GioiTinh == true ? "Nam" : d.GioiTinh == false ? "Nữ" : "";
      //   } // String-based value accessors!
      // },
      // {
      //   Header: "Dân tộc",
      //   accessor: "TenDanToc" // String-based value accessors!
      // },
      // {
      //   Header: "Trường",
      //   accessor: "TenTruong" // String-based value accessors!
      // },
      // {
      //   Header: "Khóa thi",
      //   accessor: d => {
      //     return <Moment format="DD/MM/YYYY">{Date.parse(d.KhoaThi)}</Moment>;
      //   }
      // },
      // {
      //   Header: "Hội đồng",
      //   accessor: "HoiDong" // String-based value accessors!
      // },
      {
        Header: "Số hiệu",
        accessor: "SoHieu" // String-based value accessors!
      }
      // {
      //   Header: "Kết quả",
      //   accessor: d => {
      //     return d.Rot == true ? "Rớt" : d.Rot == false ? "Đậu" : "";
      //   }
      // },
      // {
      //   Header: "Phúc khảo",
      //   accessor: d => {
      //     return d.DauSauPhucKhao == true
      //       ? "Đậu"
      //       : d.DauSauPhucKhao == false
      //       ? "Rớt"
      //       : "";
      //   }
      // }
    ],
    []
  );

  const renderRowSubComponent = data => (
    <div style={{ backgroundColor: "white", padding: "10px", border:"1px solid black" }}>
      <p>Họ và tên: {data.HoTen}</p>
      <p>
        Ngày sinh:{" "}
        {<Moment format="DD/MM/YYYY">{Date.parse(data.NgaySinh)}</Moment>}
      </p>
      <p>Nơi sinh: {data.TenTinh}</p>
      <p>
        Giới tính:{" "}
        {data.GioiTinh == true ? "Nam" : data.GioiTinh == false ? "Nữ" : ""}
      </p>
      <p>Dân tộc: {data.TenDanToc}</p>
      <p>Trường: {data.Truong}</p>
      <p>
        Khóa thi:{" "}
        {<Moment format="DD/MM/YYYY">{Date.parse(data.KhoaThi)}</Moment>}
      </p>
      <p>Hội đồng: {data.HoiDong}</p>
      <p>
        Kết quả: {data.Rot == true ? "Rớt" : data.Rot == false ? "Đậu" : ""}
      </p>
      <p>
        Phúc khảo:{" "}
        {data.DauSauPhucKhao == true
          ? "Đậu"
          : data.DauSauPhucKhao == false
          ? "Rớt"
          : ""}
      </p>
    </div>
  );
  const [ResultTable, setResultTable] = useState("");
  
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
  

  async function submitOnclick() {
    //const POSTapiURL = "http://localhost:60114/api/PostResponse";
    const POSTapiURL = "http://localhost:60114/api/PostTraCuu";
// console.log(moment(NgaySinh).format('DD/MM/YYYY'));
console.log(headers);
    await axios
      .post(POSTapiURL, {
        HoTen: form.HoTen,
        NgaySinh: moment(NgaySinh).toISOString(true) ,
        SoHieu: form.SoHieu
      }, {headers: headers})
      .then(function(response) {
        // debugger
        console.log(response);
        const a = JSON.parse(response.data);

        setResultTable(
          <Table
            columns={columns}
            data={a}
            renderRowSubComponent={renderRowSubComponent}
          />
        );
        //console.log(ResultTable);
      })
      .catch(function(error) {
        console.log(error);
        alert("Không tìm thấy phiên làm việc");
        props.history.push({pathname: '/Home'})
      });
  }

  return (
    <div className="App App-body">
      <p>Cập Nhật Dữ liệu</p>

      <div>
        {HoTenHtml}
        {NgaySinhHtml}
        {SoHieuHtml}

        <input
          type="submit"
          className="btn btn-primary btn-block"
          value="Tra cứu"
          onClick={submitOnclick}
        />
      </div>

      <div>
        <Styles>{ResultTable}</Styles>
      </div>
    </div>
  );
}

export default withRouter(CapNhat);
//export default TraCuu;
