import { useEffect, useState } from "react";
import HeadCard from "@/components/portal/HeadCard";
import { $get } from "@/api/RestUtils";
import { useNavigate } from "react-router-dom";
import "./index.less";

function index() {
  
  const navigate = useNavigate();

  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    loadCategoryList();
  }, [])

  const loadCategoryList = () => {
    $get("/category/findAll")
      .then((res) => {
        if (res.code === 0) {
          let categoryList = res.data.map((item) => {
            return {
              key: item.categoryId,
              ...item,
            };
          });
          setCategoryList(categoryList);
        } else {
          message.error(res.msg);
        }
      })
      .catch((err) => {
        message.error("系统异常");
      });
  }

  const toArticleList = (categoryId) => {
    navigate("/index?categoryId=" + categoryId)
  }


  const renderCategorys = () => {
    return categoryList.map((item) => {
      return (
        <div
          className="category-item"
          key={item.id}
          style={{ fontSize: Math.random() + 1 + "rem" }}
        >
          <span onClick={() => toArticleList(item.categoryId)}>{item.categoryName}</span>
        </div>
      );
    });
  };

  return (
    <>
      <HeadCard />
      <div className="category">{renderCategorys()}</div>
    </>
  );
}

export default index;
