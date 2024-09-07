import { Button, Table } from "antd";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Configuration = () => {
  const navigate = useNavigate();
  const [dataSource, setdataSource] = useState();
  useEffect(() => {
    const data = localStorage.getItem("listConfig") || "[]";
    // console.log(1, data);

    var parsedData = JSON.parse(data);
    setdataSource(parsedData);
  }, []);

  const columns = [
    {
      title: "count",
      dataIndex: "numberOfSquares",
    },
    {
      title: "Config",
      dataIndex: "percentage",
    },
    {
      dataIndex: "",
      width: "10%",
      render: (data: any) => {
        return (
          <>
            <Button
              onClick={() => {
                localStorage.setItem("squareConfig", JSON.stringify(data));
                navigate("/");
              }}
            >
              apply
            </Button>
          </>
        );
      },
    },
  ];
  return (
    <div>
      <Table dataSource={dataSource} columns={columns} />
    </div>
  );
};

export default Configuration;
