import React, { useState } from 'react'
import { Button, Space, Modal, Table, Form, Input } from 'antd'
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleFilled,
} from "@ant-design/icons";
import { datetimeFormat } from '@/utils/dateUtils'
import "./index.less"

// status: 0已删除  1草稿  2已发布
const articleList = [
  {
    id: 0,
    articleName: "vue入门到入土",
    status: 0,
    ctime: new Date(),
    mtime: new Date()
  },
  {
    id: 1,
    articleName: "BBC6分钟-讨论素食主义如何提高",
    status: 1,
    ctime: new Date(),
    mtime: new Date()
  },
  {
    id: 2,
    articleName: "文化差异和肢体语言",
    status: 2,
    ctime: new Date(),
    mtime: new Date()
  },
  {
    id: 3,
    articleName: "我们能相信智能扬声器吗",
    status: 2,
    ctime: new Date(),
    mtime: new Date()
  }
]



function index() {

  const columnList = [
    {
      title: '文章标题',
      dataIndex: 'articleName',
      key: 'articleName',
      width: 800,
      align: 'center'
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      render: (record) => renderStatus(record),
    },
    {
      title: '创建时间',
      dataIndex: 'ctime',
      key: 'ctime',
      align: 'center',
      render: (record) => datetimeFormat(record),
    },
    {
      title: '更新时间',
      dataIndex: 'mtime',
      key: 'mtime',
      align: 'center',
      render: (record) => datetimeFormat(record),
    },
    {
      title: "操作",
      key: "action",
      fixed: "right",
      align: "center",
      width: 400,
      render: (record: any) => {
        return (
          <Space size="middle">
            <Button
              type="link"
              icon={<EditOutlined />}
              size="small"
              onClick={() => toEdit(record.id)}
            >
              修改
            </Button>
            <Button
              type="link"
              icon={<DeleteOutlined />}
              size="small"
              onClick={() => deleteConfirm(record.id)}
            >
              删除
            </Button>
          </Space>
        );
      },
    },
  ]


  const [dataForm] = Form.useForm();
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [infoModalShow, setInfoModalShow] = useState(false);
  const [infoModalTitle, setInfoModalTitle] = useState("");
  
  const search = (pageNum, pageSize) => {
    let param = {
      pageNum: pageNum,
      pageSize: pageSize,
    };
    
  };

  const saveOrUpdate = (formData) => {
    let url;
    if (formData.userId != null) {
      url = "/article/update";
    } else {
      url = "/article/save";
    }
    
  };

  const deleteConfirm = (id) => {
    Modal.confirm({
      title: "是否删除当前文章？",
      icon: <ExclamationCircleFilled />,
      okText: "是",
      cancelText: "否",
      onOk() {
        console.log("delete id: ", id)
      },
    });
  };

  const renderStatus = (status) => {
    let result = ""
    if (status == 0) {
      result = "已删除"
    } else if (status == 1) {
      result = "草稿"
    } else if (status == 2) {
      result = "已发布"
    }
    return result;
  }

  const toEdit = (id) => {

  }

  return (
    <>
    <div className='category-main'>
      <div className='table-area'>
        <Table
              dataSource={articleList}
              columns={columnList}
              scroll={{ x: 1200 }}
              pagination={{
                current: currentPage,
                total: total,
                onChange: search,
              }}
            />
      </div>
    </div>
    </>
  )
}

export default index