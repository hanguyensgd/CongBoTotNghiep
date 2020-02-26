import React, { Component, useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import { withRouter, Redirect } from "react-router-dom";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import { Button, ButtonGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Papa from "papaparse";
import styled from "styled-components";
import { useTable, useExpanded } from "react-table";


function UploadFile(props) {



  const [file, setFile] = useState(null);
  const [data, setData] = useState(null);

  const config = {
    delimiter: "",	// auto-detect
    newline: "",	// auto-detect
    quoteChar: '"',
    escapeChar: '"',
    header: true,
    transformHeader: undefined,
    dynamicTyping: false,
    preview: 0,
    encoding: "",
    worker: false,
    comments: false,
    step: undefined,
    complete: undefined,
    error: undefined,
    download: false,
    downloadRequestHeaders: undefined,
    skipEmptyLines: false,
    chunk: undefined,
    fastMode: undefined,
    beforeFirstChunk: undefined,
    withCredentials: undefined,
    transform: undefined,
    delimitersToGuess: [',', '\t', '|', ';', Papa.RECORD_SEP, Papa.UNIT_SEP]
  }

  const onFileSelected = (e) => {
    //console.log(e.target.files[0])
    const file = e.target.files[0];
    Papa.parse(file, { header: true, complete: function (results, file) { setData(results.data); }, });
  }

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

  async function pressbutton() {

    // let arrOfObj = [
    //   { HoTen: 'Nguyễn Hà Nguyên', NgaySinh: '27/11/1987', KhoaThi:'20-06-2005' },
    //   { HoTen: 'Phạm Thị Thanh Hà', NgaySinh: '20/11/1991' , KhoaThi:'20-06-2009' }
    // ]
    const POSTapiURL = "http://localhost:60114/api/PostDataSet";
    await axios
      .post(POSTapiURL, data, headers)
      .then(function (response) {
        const b = JSON.parse(response.data);
        console.log(b);
        
        setResultTable(
          <Table
            columns={columns}
            //data={response.config.data}
            data={b.results}
            renderRowSubComponent={renderRowSubComponent}
          />
        );
      })
      .catch(function (error) {
        console.log(error);
      });
  }


  const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;
    font-size: medium;
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
      useExpanded 
    );

    return (
      <>
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
                <React.Fragment {...row.getRowProps()}>
                  <tr>
                    {row.cells.map(cell => {
                      return (
                        <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                      );
                    })}
                  </tr>
                  {row.isExpanded ? (
                    <tr>
                      <td colSpan={flatColumns.length}>
                        {renderRowSubComponent(data[i])}
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
        Header: () => null, // No header
        id: "expander", // It needs an ID
        Cell: ({ row }) => (
          <span {...row.getExpandedToggleProps()}>
            {row.isExpanded ? "👇" : "👉"}
          </span>
        )
      },

      {
        Header: "Kết quả",
        accessor: d => {
             return d.Error == 0 ? d.Rows + " dòng đăng tải thành công"   : d.Error > 0 ? d.Error +  " lỗi tìm thấy" : "";
         }
      },
    ],
    []
  );

  const renderRowSubComponent = data => (
    <div style={{ backgroundColor: "white", padding: "10px", border: "1px solid black" }}>
      <p>Tổng số dòng: {data.Rows}</p> 
      <p>Tổng số lỗi: {data.Error}</p>
      <p>Dòng lỗi cột HoTen: {data.HoTen}</p>    
      <p>Dòng lỗi cột NgaySinh: {data.NgaySinh}</p>       
      <p>Dòng lỗi cột NoiSinh: {data.NoiSinh}</p>       
      <p>Dòng lỗi cột GioiTinh: {data.GioiTinh}</p>       
      <p>Dòng lỗi cột DanToc: {data.DanToc}</p>       
      <p>Dòng lỗi cột Truong: {data.Truong}</p>       
      <p>Dòng lỗi cột KhoaThi: {data.KhoaThi}</p>       
      <p>Dòng lỗi cột HoiDong: {data.HoiDong}</p>       
      <p>Dòng lỗi cột SoHieu: {data.SoHieu}</p>       
      <p>Dòng lỗi cột Rot: {data.Rot}</p>     
      <p>Dòng lỗi cột DauSauPhucKhao: {data.DauSauPhucKhao}</p>             
    </div>
  );
  const [ResultTable, setResultTable] = useState("");


  return (
    <div className="App App-body">
      <p>Đăng tải File CSV</p>
      <div className={"input-group input-group-sm mb-3"}>
        <div className={"input-group-prepend"}>
         
        </div>
        <input style={{ border: "White 1px solid" }} type='file' onChange={onFileSelected} />
      </div>

      <input
        type="submit"
        className="btn btn-primary btn-block"
        value="Xác nhận"
        onClick={pressbutton}
      />


      <div>
        <Styles>{ResultTable}</Styles>
      </div>
    </div>
  );
}
export default withRouter(UploadFile);
