import React, { useState } from 'react'
import { Input, Button } from 'antd'
import { MdEditor } from 'md-editor-rt';
import 'md-editor-rt/lib/style.css';
import "./index.less"

function index() {

  const [content, setContent] = useState("")

  return (
    <>
      <div className='title-area'>
        <Input size="large"></Input>
        <Button size='large' type='primary'>发布文章</Button>
      </div>
      {/* https://blog.csdn.net/Eternalyii/article/details/121742245 */}
      <div className='write-area'>
        <MdEditor
          modelValue={content}
          onChange={setContent}/>  
      </div>
    </>
  )
}

export default index