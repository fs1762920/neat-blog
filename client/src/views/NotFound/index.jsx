import React from 'react'
import { useNavigate } from "react-router-dom";
import { Button, Image } from "antd";
import notFound from "@/assets/404.png"
import "./index.less";

function index() {
    const navigate = useNavigate();
  
    return (
      <div>
        <div className="not-found-body">
          <div className="not-found-background">
            <Image src={notFound} preview={false}></Image>
          </div>
          <div className="not-found-content">您访问的页面不存在!</div>
          <div className="not-found-operate">
            <Button type="primary" onClick={() => navigate("/index")}>返回首页</Button>
          </div>
        </div>
      </div>
    );
}

export default index