import React, { useEffect, useState } from "react";
import HeadCard from "@/components/portal/HeadCard";
import { $get } from "@/api/RestUtils";
import "./index.less";

const info = {
  nickname: "fs1762920",
  github: "https://github.com/fs1762920",
  gitee: "https://gitee.com/magic_fans/projects",
  email: "fs1762920@163.com",
};

function index() {

  const [websiteInfo, setWebsiteInfo] = useState({});

  useEffect(() => {
    loadWebsiteInfo();
  }, [])

  const loadWebsiteInfo = () => {
    $get("/user/website")
      .then((res) => {
        if (res.code === 0) {
          setWebsiteInfo(res.data);
        } else {
          message.error(res.msg);
        }
      })
      .catch((err) => {
        message.error("系统异常");
      });
  }

  return (
    <>
      <HeadCard />
      <div className="about-portal">
        <div className="self-report">
          <p>记录日常生活、学习和技术文章。</p>
          <p>
            2020年开始自建Blog，之后由于资金、精力等问题，导致很长一段时间没有写博客。
          </p>
          <p>近些时间，打算重启Blog，并长期维护。</p>
          <p>源码保存于GitHub，部署于AliCloud。</p>
          <p>旨在简洁且好用</p>
        </div>
        <div className="contact">
          <div className="title">社交媒体</div>
          <ul className="contact-list">
            <li>
              <span className="label">GitHub: </span>
              <a href={websiteInfo.github} target="blank" style={{"fontWeight": '600'}}>{websiteInfo.nickName}</a>
            </li>
            <li>
              <span className="label">E-Mail: </span>
              <font style={{"fontWeight": '600'}}>{websiteInfo.mail}</font>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default index;
