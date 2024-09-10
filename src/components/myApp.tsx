import React, { useState, useEffect } from "react";
import {
  InputNumber,
  Select,
  Button,
  Row,
  Col,
  Menu,
  Dropdown,
  message,
  Pagination,
} from "antd";
import { useNavigate } from "react-router-dom";
const { Option } = Select;

const MyApp = () => {
  const navigate = useNavigate();
  const [numberOfSquares, setNumberOfSquares] = useState(0);
  const [squareConfigs, setSquareConfigs] = useState<any>([]);

  //thông báo
  const [messageApi, contextHolder] = message.useMessage();

  const success = () => {
    messageApi.open({
      type: "success",
      content: "saved successfully",
    });
  };

  const warning = () => {
    messageApi.open({
      type: "warning",
      content: "configuration exists",
    });
  };

  // Lấy cấu hình từ localStorage
  useEffect(() => {
    const savedConfig = localStorage.getItem("squareConfigs");
    if (savedConfig) {
      setSquareConfigs(JSON.parse(savedConfig));
      setNumberOfSquares(JSON.parse(savedConfig).length);
    }
  }, []);

  // Thay đổi số lượng ô vuông
  const handleNumberChange = (value: any) => {
    setNumberOfSquares(value);
    setSquareConfigs(Array.from({ length: value }, () => 1));
  };

  // Thay đổi số phần của mỗi ô vuông
  const handleSelectChange = (key: any, index: any) => {
    const newConfigs = [...squareConfigs];
    newConfigs[index] = key;
    setSquareConfigs(newConfigs);
  };

  interface Iconfigs {
    id: number;
    block: number;
    configs: string;
    created: any;
  }

  // Lưu cấu hình vào localStorage
  var items = localStorage.getItem("historyConfigs") || "[]";
  var parsedItems = JSON.parse(items);
  const handleSave = () => {
    // new configs
    localStorage.setItem("squareConfigs", JSON.stringify(squareConfigs));
    //time
    var today = new Date();
    var date =
      today.getDate() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getFullYear();
    var time =
      today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date + " " + time;
    //
    var data: Iconfigs = {
      id: squareConfigs.join(""),
      block: squareConfigs.length,
      configs: squareConfigs,
      created: dateTime,
    };
    // console.log(12, data);

    // history cấu hình

    // console.log(1, parsedItems);

    let found = parsedItems.some((e: any) => e.id === data.id);
    if (found) {
      warning();
    } else {
      success();
      parsedItems.push(data);
      localStorage.setItem("historyConfigs", JSON.stringify(parsedItems));
    }
  };

  const menu = (index: any) => (
    <Menu onClick={(e) => handleSelectChange(e.key, index)}>
      <Menu.Item key="1">1</Menu.Item>
      <Menu.Item key="2">2</Menu.Item>
      <Menu.Item key="3">3</Menu.Item>
    </Menu>
  );

  return (
    <div style={{ padding: 20 }}>
      {contextHolder}
      <h2>Nhập số ô vuông</h2>
      <div style={{ display: "flex", gap: "20px" }}>
        <InputNumber
          min={1}
          value={numberOfSquares}
          onChange={handleNumberChange}
          style={{ marginBottom: 20 }}
        />
        <Button type="primary" onClick={handleSave}>
          Save
        </Button>

        <Button
          type="primary"
          onClick={() => {
            navigate("/configuration");
          }}
        >
          History
        </Button>
      </div>

      <Row gutter={[16, 16]}>
        {Array.from({ length: numberOfSquares }, (_, index) => (
          <Col span={24} key={index}>
            <Dropdown overlay={menu(index)} trigger={["click"]}>
              <div
                style={{
                  marginTop: 20,
                  display: "flex",
                  justifyContent: "space-around",
                }}
              >
                {Array.from(
                  { length: squareConfigs[index] },
                  (_, partIndex) => (
                    <div
                      key={partIndex}
                      style={{
                        width: `${100 / squareConfigs[index]}%`,
                        height: "50px",
                        backgroundColor: "#1890ff",
                        border: "2px solid #ffff",
                      }}
                    />
                  )
                )}
              </div>
            </Dropdown>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default MyApp;
