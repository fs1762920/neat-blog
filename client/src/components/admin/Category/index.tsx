import React, { useState } from 'react'
import { Button, Space, Modal, Table, Form, Input } from 'antd'
import {
  SearchOutlined,
  ReloadOutlined,
  PlusOutlined,
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleFilled,
} from "@ant-design/icons";
import { datetimeFormat } from '@/utils/dateUtils'
import "./index.less"


const categoryList = [
  {
    id: 0,
    categoryName: "语言学习",
    ctime: new Date()
  },
  {
    id: 1,
    categoryName: "技术",
    ctime: new Date()
  },
  {
    id: 2,
    categoryName: "生活",
    ctime: new Date(),
    mtime: new Date()
  },
  {
    id: 3,
    categoryName: "阅读杂谈",
    ctime: new Date()
  },
  {
    id: 4,
    categoryName: "其他",
    ctime: new Date()
  }
]



function index() {

  const columnList = [
    {
      title: '分类名称',
      dataIndex: 'categoryName',
      key: 'categoryName',
      align: 'center'
    },
    {
      title: '创建时间',
      dataIndex: 'ctime',
      key: 'ctime',
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
              onClick={() => switchDataModalShow(true, 1, record)}
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

  const switchDataModalShow = (show, model, formData) => {
    setInfoModalShow(show);
    if (model === 0) {
      // 新增
      setInfoModalTitle("新增分类");
    } else {
      // 修改
      setInfoModalTitle("修改分类");
      dataForm.setFieldsValue(formData);
    }
  };

  const closeModal = () => {
    setInfoModalShow(false);
    resetDataForm();
  };
  
  const search = (pageNum, pageSize) => {
    let param = {
      pageNum: pageNum,
      pageSize: pageSize,
    };
    
  };

  const saveOrUpdate = (formData) => {
    let url;
    if (formData.userId != null) {
      url = "/user/update";
    } else {
      url = "/user/save";
    }
    
  };

  const deleteConfirm = (id) => {
    Modal.confirm({
      title: "是否删除当前分类？",
      icon: <ExclamationCircleFilled />,
      okText: "是",
      cancelText: "否",
      onOk() {
        console.log("delete id: ", id)
      },
    });
  };

  const resetDataForm = () => {
    dataForm.resetFields();
  };


  return (
    <>
      <Modal
        title={infoModalTitle}
        open={infoModalShow}
        closable={true}
        onCancel={closeModal}
        footer={null}
      >
        <Form
          form={dataForm}
          labelAlign="right"
          colon={false}
          onFinish={saveOrUpdate}
        >
          <Form.Item name="id" hidden={true}>
            <Input />
          </Form.Item>
          <Form.Item
            name="categoryName"
            label="分类名称"
            rules={[
              { required: true, type: "string", message: "分类名称" },
              { max: 10, min: 2, message: "长度在2~10位之间" },
            ]}
          >
            <Input placeholder="分类名称" maxLength={10} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              保存
            </Button>
            <Button onClick={resetDataForm}>重置</Button>
          </Form.Item>
        </Form>
      </Modal>
    <div className='category-main'>
      <div className='operate-area'>
        <Button type="primary" onClick={() => switchDataModalShow(true, 0, null)}>新增分类</Button>
      </div>
      <div className='table-area'>
        <Table
              dataSource={categoryList}
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