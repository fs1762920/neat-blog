import React from 'react'
import './index.less'

const articleList = [
  {
    id: 0,
    title: 'vue整合antd',
    introduction: 'This post is originated from here and is used for testing markdown style. This post contains nearly every markdown usage. Make sure all the markdown elements below show up correctly.',
    createTime: '2024-01-23'
  },
  {
    id: 1,
    title: 'react整合antd',
    introduction: 'This post is originated from here and is used for testing markdown style. This post contains nearly every markdown usage. Make sure all the markdown elements below show up correctly.',
    createTime: '2024-01-23'
  },
  {
    id: 2,
    title: 'Code Highlight Style test',
    introduction: 'Make sure all the code blocks highlighted correctly. All the code samples are come from the demo of https://highlightjs.org',
    createTime: '2024-01-23'
  },
  {
    id: 3,
    title: 'Code Highlight Style test',
    introduction: 'Make sure all the code blocks highlighted correctly. All the code samples are come from the demo of https://highlightjs.org',
    createTime: '2024-01-23'
  },
  {
    id: 4,
    title: 'Code Highlight Style test',
    introduction: 'Make sure all the code blocks highlighted correctly. All the code samples are come from the demo of https://highlightjs.org',
    createTime: '2024-01-23'
  }
]

function index() {


  const renderArticles = () => {
    return articleList.map(item => {
      return (
        <div className='article-item' key={item.id}>
          <div className='title'>
            {item.title}
          </div>
          <div className='introduction'>
            {item.introduction}
          </div>
          <div className='date'>
            {item.createTime}
          </div>
        </div>
      )
    })
  }

  return (
    <>
      <div className='cover'>
        <div className='logo'>
          NEAT-BLOG
        </div>
        <div className='intro'>
          You dare use my own speech against me!
        </div>
      </div>
      <div className='article-list'>
        {renderArticles()}
      </div>
      <div className='page-bar'>
        
      </div>
    </>
  )
}

export default index