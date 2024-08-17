import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HeadCard from "@/components/portal/HeadCard";
import { dateFormat } from '@/utils/dateUtils'
import { $get } from "@/api/RestUtils";
import "./index.less";

function index() {
  
  const navigate = useNavigate();

  const [archiveList, setArchiveList] = useState([]);

  useEffect(() => {
    loadArchives();
  }, [])

  const loadArchives = () => {
    $get("/article/findByArchive")
      .then((res) => {
        if (res.code === 0) {
          let archiveList = res.data.map((item, index) => {
            return {
              key: index,
              ...item,
            };
          });
          setArchiveList(archiveList);
        } else {
          message.error(res.msg);
        }
      })
      .catch((err) => {
        message.error("系统异常");
      });
  }

  const toDetail = (id) => {
    navigate('/article?articleId=' + id);
  };

  const renderArticles = (list) => {
    return list.map((item) => {
      return (
        <div
          className="article-item"
          key={item.id}
          onClick={() => toDetail(item.articleId)}
        >
          <div className="date">{dateFormat(item.ctime)}</div>
          <div className="title">{item.title}</div>
        </div>
      );
    });
  };

  const renderTimeline = () => {
    return archiveList.map((item) => {
      return (
        <div className="timeline-item" key={item.year}>
          <div className="year">{item.year}</div>
          <div className="article-list">{renderArticles(item.articles)}</div>
        </div>
      );
    });
  };

  return (
    <>
      <HeadCard />
      <div className="archives-portal">{renderTimeline()}</div>
    </>
  );
}

export default index;
