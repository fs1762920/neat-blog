import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { MdPreview } from 'md-editor-rt';
import { dateFormat } from "@/utils/dateUtils";
import { $get } from "@/api/RestUtils";
import 'md-editor-rt/lib/preview.css';
import "./index.less";

function index() {
  
  const [searchParams] = useSearchParams();

  const [articleInfo, setArticleInfo] = useState({});

  useEffect(() => {
    let articleId = searchParams.get('articleId');
    if (articleId != undefined && articleId != null) {
      loadArticleInfo(articleId);
    }
  }, [])

  const loadArticleInfo = (articleId) => {
    let param = {
      articleId: articleId
    }
    $get("/article/content", param)
      .then((res) => {
        if (res.code === 0) {
          setArticleInfo(res.data);
        } else {
          message.error(res.msg);
        }
      })
      .catch((err) => {
        message.error("系统异常");
      });
  }

  return (
    <div className="article-main">
      <div className="info">
        <div className="title">
          {articleInfo.title}
        </div>
        <div className="foot">
          <span>{dateFormat(articleInfo.ctime)}</span>
          <span className="category">#{articleInfo.categoryName}</span>
        </div>
      </div>
      <div className="article-area">
        <MdPreview modelValue={articleInfo.content} />
      </div>
    </div>
  );
}

export default index;
