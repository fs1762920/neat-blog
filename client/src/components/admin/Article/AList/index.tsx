import React, { useEffect, useState } from 'react'
import { Button, Space, Modal, Table, message } from 'antd'
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleFilled,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { datetimeFormat } from '@/utils/dateUtils'
import { $get } from "@/api/RestUtils";
import "./index.less"

function index() {

  const columnList = [
    {
      title: '文章标题',
      dataIndex: 'title',
      key: 'title',
      width: 640,
      align: 'center'
    },
    {
      title: '分类',
      dataIndex: 'categoryName',
      key: 'categoryName',
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
              onClick={() => toEdit(record.articleId)}
            >
              修改
            </Button>
            <Button
              type="link"
              icon={<DeleteOutlined />}
              size="small"
              onClick={() => deleteConfirm(record.articleId)}
            >
              删除
            </Button>
          </Space>
        );
      },
    },
  ]
  
  const navigate = useNavigate();
  
  const [articleList, setArticleList] = useState(0);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    search(1, 10);
  }, [])
  
  const search = (pageNo, pageSize) => {
    let param = {
      pageNo: pageNo,
      pageSize: pageSize,
    };
    $get("/article/findByPage", param)
      .then((res: any) => {
        if (res.code === 0) {
          let articleList = res.data.list.map((item: any) => {
            return {
              key: item.articleId,
              ...item,
            };
          });
          setArticleList(articleList);
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

  const deleteConfirm = (id) => {
    Modal.confirm({
      title: "是否删除当前文章？",
      icon: <ExclamationCircleFilled />,
      okText: "是",
      cancelText: "否",
      onOk() {
        deleteArticle(id);
      },
    });
  };

  const deleteArticle = (id) => {
    let param = {
      articleId: id,
    };
    $get("/article/delete", param)
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

  const renderStatus = (status) => {
    let result = ""
    if (status == 0) {
      result = "草稿"
    } else if (status == 1) {
      result = "已发布"
    }
    return result;
  }

  const toEdit = (id) => {
    navigate("/admin/article/write?articleId=" + id);
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