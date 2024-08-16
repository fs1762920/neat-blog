import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Space,
  Modal,
  Table,
  Form,
  Input,
  InputNumber,
  message,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { cleanToken, cleanUserInfo } from "@/stores/actions";
import { $get, $post } from "@/api/RestUtils";
import { encrypt } from "@/utils/RSAUtils";
import "./index.less";

function index() {
  const [infoForm] = Form.useForm();
  const [secretForm] = Form.useForm();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    getUserInfo();
  }, []);

  const getUserInfo = () => {
    $get("/user/info", null)
      .then((res: any) => {
        if (res.code === 0) {
          let info = res.data;
          infoForm.setFieldValue("username", info.username);
          infoForm.setFieldValue("nickName", info.nickName);
          infoForm.setFieldValue("mail", info.mail);
          infoForm.setFieldValue("github", info.github);
        } else {
          message.error(res.msg);
        }
      })
      .catch((err: any) => {
        message.error("系统异常");
      });
  };

  const checkRepeatPass = (_: any, value: string) => {
    if (value != secretForm.getFieldValue("newPass")) {
      return Promise.reject(new Error("两次输入密码不一致"));
    } else {
      return Promise.resolve();
    }
  };

  const updateInfo = (formData) => {
    $post("/user/updateSelf", formData)
      .then((res: any) => {
        if (res.code === 0) {
          message.success(res.msg);
        } else {
          message.error(res.msg);
        }
      })
      .catch((err: any) => {
        message.error("系统异常");
      });
  };

  const changePass = (formData: any) => {
    formData.oldPass = encrypt(formData.oldPass);
    formData.newPass = encrypt(formData.newPass);
    formData.checkPass = encrypt(formData.checkPass);
    $post("/user/changePass", formData)
      .then((res: any) => {
        if (res.code === 0) {
          dispatch(cleanToken());
          dispatch(cleanUserInfo());
          message.success(res.msg);
          navigate("/login");
        } else {
          message.error(res.msg);
        }
      })
      .catch((err: any) => {
        message.error("系统异常");
      });
  };

  const resetInfoForm = () => {
    infoForm.resetFields();
  };
  const resetSecretForm = () => {
    secretForm.resetFields();
  };

  return (
    <div className="person-main">
      <div className="person-info">
        <div className="title">修改个人信息</div>
        <div className="form">
          <Form
            form={infoForm}
            layout="vertical"
            labelAlign="right"
            colon={false}
            onFinish={updateInfo}
          >
            <Form.Item name="categoryId" hidden={true}>
              <Input />
            </Form.Item>
            <Form.Item name="username" label="账号">
              <Input placeholder="账号" disabled />
            </Form.Item>
            <Form.Item
              name="nickName"
              label="昵称"
              rules={[
                { required: true, type: "string", message: "昵称" },
                { max: 16, min: 2, message: "长度在2~16位之间" },
              ]}
            >
              <Input placeholder="昵称" maxLength={16} />
            </Form.Item>
            <Form.Item
              name="mail"
              label="邮箱"
              rules={[
                { required: true, type: "string", message: "邮箱" },
                { max: 32, min: 2, message: "长度在2~32位之间" },
              ]}
            >
              <Input placeholder="邮箱" maxLength={32} />
            </Form.Item>
            <Form.Item
              name="github"
              label="GitHub"
              rules={[
                { required: true, type: "string", message: "GitHub" },
                { max: 32, min: 2, message: "长度在2~32位之间" },
              ]}
            >
              <Input placeholder="GitHub" maxLength={32} />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                保存
              </Button>
              <Button onClick={resetInfoForm}>重置</Button>
            </Form.Item>
          </Form>
        </div>
      </div>
      <div className="person-safety">
        <div className="title">修改密码</div>
        <div className="form">
          <Form
            form={secretForm}
            layout="vertical"
            labelAlign="right"
            colon={false}
            onFinish={changePass}
          >
            <Form.Item
              name="oldPass"
              label="原密码"
              validateFirst
              rules={[
                { required: true, type: "string", message: "原密码" },
                { max: 20, min: 6, message: "长度在6~20位之间" },
              ]}
            >
              <Input placeholder="原密码" maxLength={20} />
            </Form.Item>
            <Form.Item
              name="newPass"
              label="新密码"
              validateFirst
              rules={[
                { required: true, type: "string", message: "新密码" },
                { max: 20, min: 6, message: "长度在6~20位之间" },
              ]}
            >
              <Input placeholder="新密码" maxLength={20} />
            </Form.Item>
            <Form.Item
              name="checkPass"
              label="确认密码"
              validateFirst
              rules={[
                {
                  required: true,
                  type: "string",
                  message: "请重复输入新密码",
                },
                { max: 20, min: 8, message: "密码长度在8~20位" },
                { validator: checkRepeatPass },
              ]}
            >
              <Input placeholder="新密码" maxLength={20} />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                保存
              </Button>
              <Button onClick={resetSecretForm}>重置</Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default index;
