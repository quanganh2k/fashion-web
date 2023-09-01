import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material/styles";
import classNames from "classnames";

const useStyles = makeStyles(() => {
  const theme = useTheme();
  return {
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 1,
      backgroundColor: "rgba(0, 0, 0, 0.7)",
    },
    containModal: {
      position: "fixed",
      top: "50%",
      left: "50%",
      transform: "translate(-50%,-50%)",
      zIndex: 2,
      width: "50%",
    },
  };
});

const Dialog = ({
  open,
  onClose,
  children,
  classNameBackDrop,
  classNameContainer,
}) => {
  //! State
  const classes = useStyles();

  //! Function

  //! Render
  if (!open) {
    return null;
  }

  return ReactDOM.createPortal(
    <>
      <Box
        className={classNames(classes.overlay, classNameBackDrop)}
        id="overlay"
        onClick={onClose}
      >
        <Box
          className={classNames(classes.containModal, classNameContainer)}
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </Box>
      </Box>
    </>,
    document.body
  );
};

export default React.memo(Dialog);
