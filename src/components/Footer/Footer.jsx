import React from "react";
import "./Footer.css";
import Button from "../Button/Button";
import { GithubOutlined, LinkedinOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="ant-icons">
        <Tooltip title="GitHub FontEnd">
          <a
            href="https://github.com/GaleGizmo/RockTheBarrioFront.git"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GithubOutlined className="ant-icon" />
          </a>
        </Tooltip>
        <Tooltip title="GitHub BackEnd">
          <a
            href="https://github.com/GaleGizmo/ROCK_DE_BARRIO_BACKEND"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GithubOutlined className="ant-icon" />
          </a>
        </Tooltip>
        <Tooltip title="Miguel 🎸">
          <a
            href="https://www.linkedin.com/in/miguelabelleira-fsd/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <LinkedinOutlined className="ant-icon" />
          </a>
        </Tooltip>
        <Tooltip title="Moha 🥁">
          <a
            href="https://www.linkedin.com/in/mohamed-nour-abdulla-743587176/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <LinkedinOutlined className="ant-icon" />
          </a>
        </Tooltip>
        <Tooltip title="Alex 🎷">
          <a
            href="https://www.linkedin.com/in/alejandro-rodriguez-asencio-full-stack-developer/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <LinkedinOutlined className="ant-icon" />
          </a>
        </Tooltip>
        <Tooltip title="Andrea 🎺">
          <a
            href="https://www.linkedin.com/in/andrea-de-faveri-dev/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <LinkedinOutlined className="ant-icon" />
          </a>
        </Tooltip>
      </div>
     
    </div>
  );
};

export default Footer;
