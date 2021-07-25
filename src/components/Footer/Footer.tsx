import React from "react";
import "./Footer.scss";

export const Footer = () => {
  return (
    <div>
      <footer className="footer">
        <div className="footer-about">
          <h2>About us</h2>
          <ul>
            <li>
              <p>Introduction</p>
            </li>
            <li>
              <p>Tutors</p>
            </li>
            <li>
              <p>Blogs</p>
            </li>
          </ul>
        </div>
        <div className="footer-join">
          <h2>Join with us</h2>
          <ul>
            <li>
              <p>Our tutors</p>
            </li>
            <li>
              <p>Become a tutor</p>
            </li>
            <li>
              <p>Careers</p>
            </li>
          </ul>
        </div>
        <div className="footer-contact">
          <h2>Contact us</h2>
          <div className="footer-contact__socials">
            <ul>
              <div className="socials-icon">
                <img src="./images/facebook.png" alt="facebook icon" />
              </div>
              <div className="socials-icon">
                <img src="./images/instagram.png" alt="instagram icon" />
              </div>
              <div className="socials-icon">
                <img src="./images/twitter.png" alt="twitter icon" />
              </div>
            </ul>
          </div>
        </div>
      </footer>
      <div className="copyright">©copyright 2021. all rights reserved.</div>
    </div>
  );
};
