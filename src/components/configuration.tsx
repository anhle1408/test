import { Button, Table } from "antd";
import { title } from "process";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Configuration = () => {
  const navigate = useNavigate();
  const [dataSource, setdataSource] = useState<any>([]);
  useEffect(() => {
    const data = localStorage.getItem("historyConfigs") || "[]";

    var parsedData = JSON.parse(data);

    setdataSource(parsedData);

    // console.log(1, dataSource);
  }, []);

  const columns = [
    {
      title: "No.",
      render: (text: any, record: any, index: any) => index + 1,
    },

    {
      title: "block",
      dataIndex: "block",
    },
    {
      title: "configs",
      dataIndex: "configs",
      render: (data: any) => {
        var text = data.join("-");
        return <>{text}</>;
      },
    },
    {
      title: "creat time",
      dataIndex: "created",
    },
    {
      title: "Action",
      dataIndex: "",
      width: "10%",
      render: (data: any) => {
        return (
          <>
            <Button
              onClick={() => {
                localStorage.setItem(
                  "squareConfigs",
                  JSON.stringify(data.configs)
                );
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
    <div style={{ padding: 20 }}>
      <Button
        type="primary"
        onClick={() => {
          navigate("/");
        }}
      >
        back
      </Button>
      <Table dataSource={dataSource} columns={columns} />
    </div>
  );
};

export default Configuration;
