import React from 'react'
import { Input, Button } from 'antd'
import "./index.less"

function index() {
  return (
    <>
      <div className='title-area'>
        <Input size="large"></Input>
        <Button size='large' type='primary'>发布文章</Button>
      </div>
      <div className='write-area'>
        
      </div>
    </>
  )
}

export default index