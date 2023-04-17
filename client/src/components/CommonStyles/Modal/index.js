import * as React from "react";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import PropTypes from "prop-types";
import classNames from "classnames";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: '12px',
  },
  "& .MuiDialog-paper": {
    maxWidth: "80%",
    maxHeight: "85%",
    minHeight: "15%",
  },
  "& .MuiDialogTitle-root": {
    padding: '16px 24px'
  },
  "& .MuiDialogContent-root": {},
  "& .MuiDialogActions-root": {},
}));

const BootstrapDialogTitle = (props) => {
  //! State
  const { children, onClose, ...other } = props;

  //! Function

  //! Render
  return (
    <DialogTitle
      sx={{
        m: 0,
        p: 2,
        fontWeight: "bold",
      }}
      {...other}
    >
      {children}
    </DialogTitle>
  );
};

const propTypes = {
  id: PropTypes.string,
  open: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  header: PropTypes.any,
  content: PropTypes.any,
  footer: PropTypes.any,
  disableClickOutside: PropTypes.bool,
};

function Modal({
  id,
  open,
  toggle,
  header,
  content,
  footer,
  disableClickOutside,
  className,
  ...props
}) {
  //! Render
  return (
    <BootstrapDialog
      onClose={!disableClickOutside && toggle}
      aria-labelledby={id}
      open={open}
      {...props}
    >
      <BootstrapDialogTitle onClose={toggle}>{header}</BootstrapDialogTitle>
      <DialogContent className={classNames(className)}>{content}</DialogContent>
      <DialogActions>{footer}</DialogActions>
    </BootstrapDialog>
  );
}

Modal.propTypes = propTypes;
export default Modal;
