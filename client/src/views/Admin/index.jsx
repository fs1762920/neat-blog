import { useEffect, useState } from "react";
import {
  DashboardOutlined,
  ProductOutlined,
  FileMarkdownOutlined,
  HighlightOutlined,
  AlignLeftOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { Layout, Menu, Button, Modal, message } from "antd";
import { cleanToken, cleanUserInfo } from "@/stores/actions";
import { $get } from "@/api/RestUtils";
import { useDispatch } from "react-redux";
import './index.less'

const { Header, Content, Footer, Sider } = Layout;

const menuList = [
  {
    key: "0",
    label: "控制台",
    path: '/admin/dashboard',
    icon: <DashboardOutlined />
  },
  {
    key: "1",
    label: "文章管理",
    icon: <FileMarkdownOutlined />,
    children: [
      {
        key: "100",
        label: "文章列表",
        path: '/admin/article/list',
        icon: <AlignLeftOutlined />
      },
      {
        key: "101",
        label: "文章撰写",
        path: '/admin/article/write',
        icon: <HighlightOutlined />
      },
    ]
  },
  {
    key: "2",
    label: "分类管理",
    path: '/admin/category',
    icon: <ProductOutlined />
  },
  {
    key: "3",
    label: "个人中心",
    path: '/admin/person',
    icon: <UserOutlined />
  }
]

function Admin() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  
  const { confirm } = Modal;

  const [menuKey, setMenuKey] = useState(null);

  useEffect(() => {
    setMenuKey(menuList[0].key)
    navigate(menuList[0].path)
  }, [])

  useEffect(() => {
    for (let menuItem of menuList) {
      if (menuItem.path == undefined || menuItem.path == null || menuItem.path == '') {
        for (let childItem of menuItem.children) {
          if (location.pathname == childItem.path) {
            setMenuKey(childItem.key);
            break;
          }
        }
      } else {
        if (location.pathname == menuItem.path) {
          setMenuKey(menuItem.key);
          break;
        }
      }
    }
  }, [location])
  
  const menuChange = ({item}) => {
    navigate(item.props.path)
  }

  const logoutConfirm = () => {
    confirm({
      title: "是否注销？",
      okText: "确认",
      cancelText: "取消",
      onOk: () => logout(),
    });
  };

  const logout = () => {
    $get("/user/logout")
      .then((res) => {
        if (res.code === 0) {
          dispatch(cleanToken());
          dispatch(cleanUserInfo());
          message.success(res.msg);
          navigate("/login");
        } else {
          message.error(res.msg);
        }
      })
      .catch((err) => {
        message.error("系统异常");
      });
  }

  return (
    <Layout>
      <Sider>
        <div className="title">
          Neat Blog
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[menuKey]}
          onClick={menuChange}
          items={menuList}
        />
      </Sider>
      <Layout className="layout-right">
        <Header>
          <Button danger type="primary" onClick={() => logoutConfirm()}>注销</Button>
        </Header>
        <Content>
          <Outlet />
        </Content>
        <Footer>Copyright (c) 2024 Nightingale</Footer>
      </Layout>
    </Layout>
  )
}

export default Admin