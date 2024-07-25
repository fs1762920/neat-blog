import React from "react";
import HeadCard from "@/components/portal/HeadCard";
import "./index.less";

const info = {
  github: "https://github.com/fs1762920",
  gitee: "https://gitee.com/magic_fans/projects",
  email: "fs1762920@163.com",
};

function index() {
  return (
    <>
      <HeadCard />
      <div className="about">
        <div className="self-report">
          <p>记录日常生活、学习和技术文章。</p>
          <p>
            2020年开始自建Blog，之后由于资金、精力等问题，导致很长一段时间没有写博客。
          </p>
          <p>近些时间，打算重启Blog，并长期维护。</p>
          <p>源码保存于GitHub和Gitee，部署于AliCloud。</p>
          <p>本Blog旨在简洁、好用</p>
        </div>
        <div className="contact">
          <div className="title">社交媒体</div>
          <ul className="contact-list">
            <li>
              <span>GitHub: </span>
              <a href={info.github} target="blank">fs1762920</a>
            </li>
            <li>
              <span>Gitee: </span>
              <a href={info.gitee} target="blank">magic_fans</a>
            </li>
            <li>
              <span>E-Mail: </span>
              {info.email}
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default index;
