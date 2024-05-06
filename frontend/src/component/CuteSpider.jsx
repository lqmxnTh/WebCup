import React from "react";
import "../styles/CuteSpider.css"; // Make sure to have your CSS file in the same directory

const CuteSpider = () => {
  return (
    <div className="spider">
      <div className="spiderweb"></div>
      <div className="body">
        <div className="eye left"></div>
        <div className="eye right"></div>
      </div>
      <div className="legs left">
        <div className="leg"></div>
        <div className="leg"></div>
        <div className="leg"></div>
      </div>
      <div className="legs right">
        <div className="leg"></div>
        <div className="leg"></div>
        <div className="leg"></div>
      </div>
    </div>
  );
};

export default CuteSpider;