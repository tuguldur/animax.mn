import React from "react";
import "./style.scss";
const Footer = () => {
  return (
    <div className="footer">
      <ul className="footer-links">
        <li className="footer-item">
          <a
            href="https://discord.gg/gXsF756"
            target="_blank"
            rel="noopener noreferrer"
          >
            Join Discord
          </a>
        </li>
        <li className="footer-item">
          <a
            href="https://github.com/tuguldur/animax.mn"
            target="_blank"
            rel="noopener noreferrer"
          >
            Source code
          </a>
        </li>
      </ul>
    </div>
  );
};
export default Footer;
