import React, { useState, useEffect } from "react";
import { InputNumber, Select, Row, Col, Button, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

const MyApp = () => {
  const navigate = useNavigate();

  const [numberOfSquares, setNumberOfSquares] = useState<number>(0);
  const [percentage, setPercentage] = useState<number>(100);

  // Hàm xử lý thay đổi số lượng ô vuông
  const handleNumberChange = (value: any) => {
    setNumberOfSquares(value);
  };

  // Hàm xử lý thay đổi tỷ lệ
  const handlePercentageChange = (value: number) => {
    setPercentage(value);
  };

  // Lưu cấu hình vào localStorage
  const saveConfig = () => {
    const config = {
      numberOfSquares,
      percentage,
    };
    localStorage.setItem("squareConfig", JSON.stringify(config));

    var items = localStorage.getItem("listConfig") || "[]";
    var parsedItems = JSON.parse(items);
    parsedItems.push(config);
    localStorage.setItem("listConfig", JSON.stringify(parsedItems));
    alert("Cấu hình đã được lưu!");
  };

  //  lấy cấu hình đã lưu từ localStorage
  useEffect(() => {
    const savedConfig = localStorage.getItem("squareConfig");
    if (savedConfig) {
      const { numberOfSquares, percentage } = JSON.parse(savedConfig);
      setNumberOfSquares(numberOfSquares);
      setPercentage(percentage);
    }
  }, []);

  // Render
  const renderSquares = () => {
    return Array.from({ length: numberOfSquares }, (_, index) => (
      <Col key={index} span={24}>
        <div
          style={{
            backgroundColor: "lightblue",
            height: "100px",
            border: "1px solid #000",
            marginBottom: "10px",
            width: `${percentage}%`,
          }}
        >
          Square {index + 1}
        </div>
      </Col>
    ));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Nhập số nguyên dương</h2>

      <InputNumber
        min={1}
        value={numberOfSquares}
        onChange={handleNumberChange}
        style={{ marginBottom: "20px", marginRight: "10px" }}
      />
      <Select
        value={percentage}
        onChange={handlePercentageChange}
        style={{ width: 120, marginBottom: "20px", marginRight: "20px" }}
      >
        <Option value={100}>1 (100%)</Option>
        <Option value={50}>2 (50%)</Option>
        <Option value={33}>3 (33%)</Option>
      </Select>
      <Button type="primary" onClick={saveConfig}>
        Save
      </Button>
      <Button
        type="primary"
        onClick={() => {
          navigate("/configuration");
        }}
        style={{ marginLeft: "20px" }}
      >
        configuration
      </Button>
      <Row gutter={[16, 16]} style={{ marginTop: "20px" }}>
        {renderSquares()}
      </Row>
    </div>
  );
};

export default MyApp;
