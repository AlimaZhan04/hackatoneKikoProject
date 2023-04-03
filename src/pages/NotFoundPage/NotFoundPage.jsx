import React from "react";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import "./NotFound.css";

const NotFoundPage = () => {
  return (
    <div className="notFound_wrapper">
      <ErrorOutlineIcon sx={{ color: "#d11a6f" }} fontSize="large" />
      <span>SORRY, WE CANT FIND THIS KIND OF PAGE</span>
    </div>
  );
};

export default NotFoundPage;
