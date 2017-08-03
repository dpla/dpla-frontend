import React from "react";
import Link from "next/link";

import styles from "./Header.css";

const Header = () =>
  <div className="header">
    <div className="linksContainer">
      <div className="mainLinks">
        <Link href="/"><a>Home</a></Link>
        <Link href="/browse-by-topic"><a>Browse</a></Link>
        <Link href=""><a>Exhibitions</a></Link>
        <Link href="/primary-source-sets"><a>Primary Source Sets</a></Link>
      </div>
      <span className="divider" />
      <div className="secondaryLinks">
        <Link href=""><a>About Us</a></Link>
        <Link href=""><a>News</a></Link>
        <Link href=""><a>Pro Community</a></Link>
      </div>
      <button className="login">Log In</button>
    </div>
    <style jsx>{styles}</style>
  </div>;

export default Header;
