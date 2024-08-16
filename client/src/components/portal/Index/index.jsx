import React, { useEffect, useState } from "react";
import { Pagination } from "antd";
import { useNavigate } from "react-router-dom";
import HeadCard from "@/components/portal/HeadCard";
import { dateFormat } from '@/utils/dateUtils'
import { $get } from "@/api/RestUtils";
import "./index.less";

function index() {
  
  const navigate = useNavigate();

  const [articleList, setArticleList] = useState([]);
  const [total, setTotal] = useState();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    search(currentPage, 5);
  }, [])

  const search = (pageNo, pageSize) => {
    let param = {
      pageNo: pageNo,
      pageSize: pageSize,
    };
    $get("/article/findPortalByPage", param)
      .then((res) => {
        if (res.code === 0) {
          let articleList = res.data.list.map((item) => {
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
      .catch((err) => {
        message.error("系统异常");
      });
  };

  const toDetail = (id) => {
    navigate('/article?articleId=' + id);
  };


  const renderArticles = () => {
    return articleList.map((item) => {
      return (
        <div className="article-item" key={item.articleId} onClick={() => toDetail(item.articleId)}>
          <div className="title">{item.title}</div>
          <div className="introduction">{item.introduction}</div>
          <div className="foot">
            <span className="category">{"#" + item.categoryName}</span>
            <span className="date">{dateFormat(item.ctime)}</span>
          </div>
        </div>
      );
    });
  };

  return (
    <>
      <HeadCard />
      <div className="index">
        <div className="article-list">{renderArticles()}</div>
        <div className="page-bar">
          <Pagination simple current={currentPage} pageSize={5} total={total} onChange={search} />
        </div>
      </div>
    </>
  );
}

export default index;
