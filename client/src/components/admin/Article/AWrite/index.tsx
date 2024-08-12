import React, { useState } from 'react'
import { Input, Button } from 'antd'
import MDEditor from '@uiw/react-md-editor';
import "./index.less"

function index() {

  const [content, setContent] = useState("")

  return (
    <>
      <div className='title-area'>
        <Input size="large"></Input>
        <Button size='large' type='primary'>发布文章</Button>
      </div>
      <div className='write-area'>
          <MDEditor
            value={content}
            onChange={setContent}/>  
      </div>
    </>
  )
}

export default index