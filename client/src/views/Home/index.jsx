import React, { useEffect, useState, useRef } from "react";
import { Button, Layout } from "antd";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useSize } from "ahooks";
import { UnorderedListOutlined } from "@ant-design/icons";
import "./index.less";

const { Header, Content, Footer } = Layout;

const menuList = [
  {
    id: 0,
    label: "Home",
    route: "/index",
  },
  {
    id: 1,
    label: "Category",
    route: "/category",
  },
  {
    id: 2,
    label: "Archives",
    route: "/archives",
  },
  {
    id: 3,
    label: "About",
    route: "/about",
  },
];

function Home() {
  const [menuShow, setMenuShow] = useState(false);

  const [menuId, setMenuId] = useState();

  const navigate = useNavigate();
  const location = useLocation();

  const ref = useRef(null);
  const size = useSize(ref);

  useEffect(() => {
    if ("/" == location.pathname) {
      // 针对根路由的处理
      setMenuId(menuList[0].id);
      navigate(menuList[0].route);
    } else {
      // 菜单active状态跟随路由变化而变化
      for (let menuItem of menuList) {
        if (location.pathname == menuItem.route) {
          setMenuId(menuItem.id);
          break;
        }
      }
    }
  }, [location]);

  useEffect(() => {
    // 视窗大小发生变化时，自动关闭移动端下拉菜单
    setMenuShow(false);
  }, [size]);

  const renderMenu = () => {
    let menuElements;
    if (size?.width <= 800) {
      // 移动端适配
      menuElements = (
        <Button
          type="link"
          size="large"
          onClick={() => setMenuShow(!menuShow)}
          icon={<UnorderedListOutlined />}
        ></Button>
      );
    } else {
      // pc端
      menuElements = menuList.map((item, index) => {
        return (
          <div
            className={
              item.id == menuId ? "menu-item menu-item-active" : "menu-item"
            }
            key={index}
            onClick={() => switchMenu(item)}
          >
            {item.label}
          </div>
        );
      });
    }
    return menuElements;
  };

  const renderDropdownMenu = () => {
    return menuList.map((item, index) => {
      return (
        <div
          className={
            item.id == menuId ? "menu-item menu-item-active" : "menu-item"
          }
          key={index}
          onClick={() => switchMenu(item)}
        >
          {item.label}
        </div>
      );
    });
  };

  const switchMenu = (menuItem) => {
    setMenuId(menuItem.id);
    navigate(menuItem.route);
    setMenuShow(false);
  };

  return (
    <Layout ref={ref}>
      {menuShow ? (
        <div className="dropdown-menu">{renderDropdownMenu()}</div>
      ) : (
        <></>
      )}
      <Header
        className="header"
        style={{
          alignItems: "center",
          backgroundColor: "#f4f4f4",
          height: "64px",
        }}
      >
        <div className="logo">NEAT-BLOG</div>
        <div className="menu">{renderMenu()}</div>
      </Header>
      <Content
        className="content"
        style={{
          padding: "0 40px",
          minHeight: "calc(100vh - 128px)",
        }}
      >
        <Outlet />
      </Content>
      <Footer
        style={{
          textAlign: "center",
          height: "64px",
        }}
      >
        Neat Blog ©{new Date().getFullYear()} Created by Neater
      </Footer>
    </Layout>
  );
}

export default Home;
