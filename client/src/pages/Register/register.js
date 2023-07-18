import React from "react";
import { useNavigate } from "react-router-dom";
import { Form, Col, Row, message } from "antd";
import { RegisterUser } from "../../apicalls/users";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../redux/LoaderSlice";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onfinish = async (values) => {
    try {
      dispatch(ShowLoading());
      const response = await RegisterUser(values);
      dispatch(HideLoading());
      if (response.success) {
        message.success(response.message);
        navigate("/login");
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(ShowLoading());
      message.error(error.message);
    }
  };
  return (
    <div className="m-5">
      <div className="flex ,items-center justify-between">
        <h1 className="text-2xl">SHEYWALLET - REGISTER</h1>
        <h1 className="text-sm underline" onClick={() => navigate("/login")}>
          already a member , Log in
        </h1>
      </div>
      <hr />
      <Form layout="vertical" onFinish={onfinish}>
        <Row gutter={16}>
          <Col span={6}>
            <Form.Item label="first Name" name="fname">
              <input type="text" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="Last Name" name="lname">
              <input type="text" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="Email" name="email">
              <input type="email" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="Mobile" name="phone">
              <input type="number" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="Identification Type" name="identificationtype">
              <select>
                <option value="National ID">National ID</option>
                <option value="Passport">Passport</option>
                <option value="Driving Licence">Driving Licence</option>
                <option value="Social Card">Social Card</option>
              </select>
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              label="Identification Number"
              name="identificationnumber"
            >
              <input type="number" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="Address" name="address">
              <textarea />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="Password" name="password">
              <input type="password" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="Confirm Password" name="cpassword">
              <input type="password" />
            </Form.Item>
          </Col>
        </Row>
        <div className="flex justify-end">
          <button
            className="primary-contained-btn"
            type="submit
        "
          >
            Register
          </button>
        </div>
      </Form>
    </div>
  );
};

export default Register;
