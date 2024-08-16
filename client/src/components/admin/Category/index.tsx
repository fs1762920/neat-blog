import React, { useEffect, useState } from 'react'
import { Button, Space, Modal, Table, Form, Input, InputNumber, message } from 'antd'
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleFilled,
} from "@ant-design/icons";
import { datetimeFormat } from '@/utils/dateUtils'
import { $get, $post } from "@/api/RestUtils";
import "./index.less"

function index() {

  const columnList = [
    {
      title: '分类名称',
      dataIndex: 'categoryName',
      key: 'categoryName',
      align: 'center'
    },
    {
      title: '排序值',
      dataIndex: 'sort',
      key: 'sort',
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
  const [categoryList, setCategoryList] = useState([]);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [infoModalShow, setInfoModalShow] = useState(false);
  const [infoModalTitle, setInfoModalTitle] = useState("");
  

  useEffect(() => {
    search(currentPage, 10);
  }, [])

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
  
  const search = (pageNo, pageSize) => {
    let param = {
      pageNo: pageNo,
      pageSize: pageSize,
    };
    $get("/category/findByPage", param)
      .then((res: any) => {
        if (res.code === 0) {
          let categoryList = res.data.list.map((item: any) => {
            return {
              key: item.categoryId,
              ...item
            }
          })
          setCategoryList(categoryList);
          setTotal(res.data.total);
          setCurrentPage(pageNo);
        } else {
          message.error(res.msg);
        }
      })
      .catch((err: any) => {
        message.error("系统异常");
      });
  };

  const saveOrUpdate = (formData) => {
    let url;
    if (formData.categoryId != null) {
      url = "/category/update";
    } else {
      url = "/category/save";
    }
    $post(url, formData)
      .then((res: any) => {
        if (res.code === 0) {
          message.success(res.msg);
          setCurrentPage(1);
          search(1, 10);
          closeModal();
        } else {
          message.error(res.msg);
        }
      })
      .catch((err: any) => {
        message.error("系统异常");
      });
  };

  const deleteConfirm = (id) => {
    Modal.confirm({
      title: "是否删除当前分类？",
      icon: <ExclamationCircleFilled />,
      okText: "是",
      cancelText: "否",
      onOk() {
        deleteCategory(id);
      },
    });
  };

  const deleteCategory = (id) => {
    let param = {
      categoryId: id,
    };
    $get("/category/delete", param)
      .then((res: any) => {
        if (res.code === 0) {
          message.success(res.msg);
          setCurrentPage(1);
          search(1, 10);
        } else {
          message.error(res.msg);
        }
      })
      .catch((err: any) => {
        message.error("系统异常");
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
          layout="vertical"
          labelAlign="right"
          colon={false}
          onFinish={saveOrUpdate}
        >
          <Form.Item name="categoryId" hidden={true}>
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
          <Form.Item
            name="sort"
            label="排序值"
            rules={[
              { required: true, type: "number", message: "排序值" },
              { type: 'number', min: 0, max: 99, message: "范围在0~99" }
            ]}
          >
            <InputNumber placeholder="排序值" maxLength={2} />
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