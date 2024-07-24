import './index.less'

const categoryList = [
  {
    id: 2,
    name: 'JAVA'
  },
  {
    id: 3,
    name: 'Node.js'
  },
  {
    id: 4,
    name: 'React'
  },
  {
    id: 5,
    name: 'Vite'
  },
  {
    id: 6,
    name: 'Webpack'
  },
  {
    id: 7,
    name: 'Kafka'
  },
  {
    id: 8,
    name: 'Websocket'
  },
  {
    id: 9,
    name: 'Websocket'
  }
]

function index() {

  const renderCategorys = () => {
    return categoryList.map(item => {
      return (
        <div className='category-item' key={item.id} style={{'fontSize': (Math.random() + 1) + 'rem'}}>
          <span>
            {item.name}
          </span>
        </div>
      )
    })
  }

  return (
    <div className='category'>
      {renderCategorys()}
    </div>
  )
}

export default index