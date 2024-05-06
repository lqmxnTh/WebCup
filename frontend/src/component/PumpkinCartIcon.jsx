import React from "react";
import "../styles/PumpkinCartIcon.css";

function Icon() {
  const iconStyle = {
    width: "50px",
    height: "50px",
    backgroundImage:
      'url("https://cdn-icons-png.freepik.com/512/249/249493.png")',
    backgroundSize: "cover",
  };

  return <div className="prodCartIcon" style={iconStyle}></div>;
}

export default Icon;