import React from "react";
import { GiTv } from "react-icons/gi";

const Header = () => (
  <div className="d-flex flex-row align-items-center">
    <h1 className="display-1 mt-3 mb-3">GUESS THE TV SHOW</h1>
    <div className="tv-icon">
      <GiTv className="display-1" />
    </div>
  </div>
);

export default Header;
