import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Input, Button, Form, Modal, message, Select } from "antd";
import { MdEditor } from "md-editor-rt";
import { $get, $post } from "@/api/RestUtils";
import "md-editor-rt/lib/style.css";
import "./index.less";

function index() {
  
  const navigate = useNavigate();

  const titleRef = useRef(null);

  const [articleForm] = Form.useForm();
  const [searchParams] = useSearchParams();

  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const [categoryList, setCategoryList] = useState([]);
  const [infoModalShow, setInfoModalShow] = useState(false);

  useEffect(() => {
    getCategoryList();
    let articleId = searchParams.get('articleId');
    if (articleId != undefined && articleId != null) {
      articleForm.setFieldValue('articleId', articleId)
      loadArticleInfo(articleId);
    }
  }, [])

  const isEmpty = (value) => {
    if (value == undefined || value == null || value == "") {
      return true;
    }
    return false;
  };

  const loadArticleInfo = (articleId) => {
    let param = {
      articleId: articleId
    }
    $get("/article/content", param)
      .then((res) => {
        if (res.code === 0) {
          let articleInfo = res.data;
          setTitle(articleInfo.title);
          setContent(articleInfo.content);
          articleForm.setFieldValue('categoryId', articleInfo.categoryId);
          articleForm.setFieldValue('introduction', articleInfo.introduction);
        } else {
          message.error(res.msg);
        }
      })
      .catch((err) => {
        message.error("系统异常");
      });
  }

  const getCategoryList = () => {
    $get("/category/findAll", null)
      .then((res) => {
        if (res.code === 0) {
          setCategoryList(res.data);
        } else {
          message.error(res.msg);
        }
      })
      .catch((err) => {
        message.error("系统异常");
      });
  };

  const onUploadImg = async (files, callback) => {
    files.map((file) => {
      let formdata = new FormData();
      formdata.append("file", file);
      $post("/file/upload", formdata)
        .then((res) => {
          if (res.code == 0) {
            let url = import.meta.env.VITE_REMOTE_FILE_URL + res.data;
            callback([url]);
          } else {
            message.error("上传失败," + res.msg);
          }
        })
        .catch((err) => {
          message.error("无法连接到服务器");
        });
    });
  };

  const saveDraft = () => {
    let url;
    let articleId = articleForm.getFieldValue("articleId");
    if (articleId != undefined && articleId != null) {
      url = '/article/update'
    } else {
      url = '/article/save'
    }

    let param = {
      title: title,
      content: content,
      status: 0,
      articleId: articleForm.getFieldValue("articleId")
    };
    $post(url, param)
      .then((res) => {
        if (res.code == 0) {
          message.success(res.msg);
        } else {
          message.error("保存失败");
        }
      })
      .catch((err) => {
        message.error("无法连接到服务器");
      });
  };

  const saveArticle = () => {
    let url;
    let articleId = articleForm.getFieldValue("articleId");
    if (articleId != undefined && articleId != null) {
      url = '/article/update'
    } else {
      url = '/article/save'
    }
    console.log("articleForm.getFieldsValue(): ", articleForm.getFieldsValue())
    let param = {
      title: title,
      content: content,
      status: 1,
      ...articleForm.getFieldsValue()
    };
    $post(url, param)
      .then((res) => {
        if (res.code == 0) {
          message.success(res.msg);
          setInfoModalShow(false)
          navigate("/admin/article/list")
        } else {
          message.error("保存失败");
        }
      })
      .catch((err) => {
        message.error("无法连接到服务器");
      });
  };

  const renderCategorySelect = () => {
    let options = categoryList.map((option: any) => {
      return {
        label: option.categoryName,
        value: option.categoryId,
        key: option.categoryId,
      };
    });
    return <Select options={options} placeholder="文章分类" />;
  };

  return (
    <>
      <Modal
        title="文章信息"
        open={infoModalShow}
        closable={true}
        footer={null}
      >
        <Form
          form={articleForm}
          layout="vertical"
          labelAlign="right"
          colon={false}
          onFinish={saveArticle}
        >
          <Form.Item name="articleId" hidden={true}>
            <Input />
          </Form.Item>
          <Form.Item
            name="categoryId"
            label="文章分类"
            rules={[
              { required: true, message: "请选择文章分类" },
            ]}
          >
            {renderCategorySelect()}
          </Form.Item>
          <Form.Item
            name="introduction"
            label="文章概述"
            rules={[
              { required: true, type: "string", message: "文章概述" }
            ]}
          >
            <Input placeholder="文章概述" maxLength={256} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              保存
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <div className="title-area">
        <Input
          size="large"
          value={title}
          ref={titleRef}
          onChange={() => setTitle(titleRef.current.input.value)}
        ></Input>
        <Button
          size="large"
          type="default"
          disabled={isEmpty(title) || isEmpty(content)}
          onClick={saveDraft}
        >
          保存草稿
        </Button>
        <Button
          size="large"
          type="primary"
          disabled={isEmpty(title) || isEmpty(content)}
          onClick={() => setInfoModalShow(true)}
        >
          发布文章
        </Button>
      </div>
      <div className="write-area">
        <MdEditor
          modelValue={content}
          onUploadImg={onUploadImg}
          onChange={setContent}
        />
      </div>
      
    </>
  );
}

export default index;
