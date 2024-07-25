import './index.less'

const articleList = [
  {
    year: 2024,
    articles: [
      {
        id: 0,
        title: 'vue整合antd',
        introduction: 'This post is originated from here and is used for testing markdown style. This post contains nearly every markdown usage. Make sure all the markdown elements below show up correctly.',
        createTime: '01-23'
      },
      {
        id: 1,
        title: 'react整合antd',
        introduction: 'This post is originated from here and is used for testing markdown style. This post contains nearly every markdown usage. Make sure all the markdown elements below show up correctly.',
        createTime: '01-23'
      },
      {
        id: 2,
        title: 'Code Highlight Style test',
        introduction: 'Make sure all the code blocks highlighted correctly. All the code samples are come from the demo of https://highlightjs.org',
        createTime: '01-23'
      }
    ]
  },
  {
    year: 2023,
    articles: [
      {
        id: 3,
        title: 'Code Highlight Style test',
        introduction: 'Make sure all the code blocks highlighted correctly. All the code samples are come from the demo of https://highlightjs.org',
        createTime: '01-23'
      },
      {
        id: 4,
        title: 'Code Highlight Style test',
        introduction: 'Make sure all the code blocks highlighted correctly. All the code samples are come from the demo of https://highlightjs.org',
        createTime: '01-23'
      }
    ]
  },
]


function index() {

  const toDetail = (id) => {
    console.log("id: ", id)
  }


  const renderArticles = (list) => {
    return list.map(item => {
      return (
        <div className='article-item' key={item.id} onClick={() => toDetail(item.id)}>
          <div className='date'>{item.createTime}</div>
          <div className='title'>{item.title}</div>
        </div>
      )
    })
  }

  const renderTimeline = () => {
    return articleList.map(item => {
      return (
        <div className='timeline-item'  key={item.year}>
          <div className='year'>{item.year}</div>
          <div className='article-list'>
            {renderArticles(item.articles)}
          </div>
        </div>
      )
    })
  }

  return (
    <div className='archives'>
      {renderTimeline()}
    </div>
  )
}

export default index