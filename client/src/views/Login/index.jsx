import { Button, Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setToken } from "@/stores/actions";
import { encrypt } from "@/utils/RSAUtils";
import { $post } from "@/api/RestUtils";

import "./index.less";

function Login() {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const login = (formData) => {
    formData.password = encrypt(formData.password);
    console.log('formdata:', formData);
    $post("/user/login", formData)
      .then((res) => {
        if (res.code === 0) {
          dispatch(setToken(res.data))
          message.success(res.msg);
          navigate("/admin");
        } else {
          message.error(res.msg);
        }
      })
      .catch((err) => {
        console.log(err)
        message.error("系统异常");
      });
  };


  return (
    <div>
      <div className="form-area">
        <div className="title">Neat Blog</div>
        <Form
          name="basic"
          initialValues={{
            remember: true,
          }}
          onFinish={login}
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input size="large" placeholder="username" maxLength={10} />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password size="large" placeholder="password" maxLength={16} />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              span: 24,
            }}
          >
            <Button className="login-btn" type="primary" htmlType="submit">
              Login
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default Login;
