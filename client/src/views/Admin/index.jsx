import React, { useEffect, useState, useRef } from "react";
import {
  DashboardOutlined,
  ProductOutlined,
  FileMarkdownOutlined,
  HighlightOutlined,
  AlignLeftOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Outlet, useNavigate } from "react-router-dom";
import { Layout, Menu, Image, message } from "antd";
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

function index() {

  const navigate = useNavigate();

  const [menuKey, setMenuKey] = useState(null);

  useEffect(() => {
    setMenuKey(menuList[0].key)
    navigate(menuList[0].path)
  }, [])
  
  const menuChange = ({item, key}) => {
    console.log("item: ", item)
    setMenuKey(key)
    navigate(item.props.path)
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
          
        </Header>
        <Content>
          <Outlet />
        </Content>
        <Footer>Copyright (c) 2024 voracious</Footer>
      </Layout>
    </Layout>
  )
}

export default index