import React, { useEffect, useState } from 'react'
import { Layout } from 'antd';
import { Outlet, useNavigate } from "react-router-dom";
import './index.less'

const { Header, Content, Footer } = Layout;

const menuList = [
  {
    'id': 0,
    'label': 'Home',
    'route': '/index'
  },
  {
    'id': 1,
    'label': 'Category',
    'route': '/category'
  },
  {
    'id': 2,
    'label': 'Archives',
    'route': '/archives'
  },
  {
    'id': 3,
    'label': 'Links',
    'route': '/links'
  },
  {
    'id': 4,
    'label': 'About',
    'route': '/about'
  }
]

function Home() {

  const [menuId, setMenuId] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    setMenuId(menuList[0].id)
    navigate(menuList[0].route);
  }, [])

  const renderMenu = () => {
    return menuList.map((item, index) => {
       return (
        <div className={item.id == menuId ? 'menu-item menu-item-active' : 'menu-item'} key={index} onClick={() => switchMenu(item)}>
            {item.label}
        </div>
       )
    })
  }

  const switchMenu = (menuItem) => {
    setMenuId(menuItem.id);
    navigate(menuItem.route);
  }

  return (
    <Layout>
      <Header
        className='header'
        style={{
          alignItems: 'center',
          backgroundColor: '#f4f4f4',
          height: '64px'
        }}
      >
        <div className='logo'>NEAT-BLOG</div>
        <div className='menu'>
          {renderMenu()}
        </div>
      </Header>
      <Content
        className='content'
        style={{
          padding: '0 48px',
          minHeight: 'calc(100vh - 128px)'
        }}
      >
        <div className='cover'>
          <div className='logo'>
            NEAT-BLOG
          </div>
          <div className='intro'>
            You dare use my own speech against me!
          </div>
        </div>
        <Outlet />
      </Content>
      <Footer
        style={{
          textAlign: 'center',
          height: '64px'
        }}
      >
        Neat Blog ©{new Date().getFullYear()} Created by Neater
      </Footer>
    </Layout>
  )
}

export default Home