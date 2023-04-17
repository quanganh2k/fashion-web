import React from "react";
import { makeStyles } from "@mui/styles";
import get from "lodash/get";

import CommonStyles from "..";
import CommonIcons from "../../CommonIcons";
import { styled, TextareaAutosize } from "@mui/material";
// import MessageError from './MessageError';

const CustomTextArea = styled(TextareaAutosize)(({ theme }) => {
  return {
    borderRadius: "30px",
    borderColor: "#c3c3c3",
    padding: "20px",
    maxWidth: "100%",
    minWidth: "100%",
    "&:focus": {
      outline: "none",
      //   border: `2px solid ${theme.custom.colors.lightblue}`,
    },
  };
});

const useStyles = makeStyles((theme) => {
  return {
    rootInput: {
      display: "flex",
      flexDirection: "column",

      "& > label": {
        marginBottom: 8,
        fontWeight: 600,
      },
      "& > span": {
        color: "red",
        fontSize: "0.75rem",
        margin: "3px 14px 0",
      },
    },
    labelHeaderColorPrimary: {
      //   color: `${theme.custom.colors.darkblue} !important`,
    },
    errorMsg: {
      color: "#D14343",
      fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
      fontWeight: 400,
      fontSize: "0.75rem",
      lineHeight: 1.66,
      letterSpacing: "0.03333em",
      textAlign: "left",
      marginTop: "3px",
      marginRight: "14px",
      marginBottom: 0,
      marginLeft: "14px",
    },
  };
});

const TextAreaField = (props) => {
  //! State
  const {
    disabled,
    onKeyDown,
    className,
    size,
    field,
    form,
    sx,
    label,
    placeholder,
    minRows,
    maxRows,
    LabelColorPrimary,
  } = props;

  const classes = useStyles();

  const { onChange, onBlur, value, name } = field;
  const { errors, touched } = form || {};

  const errorMsg = get(errors, name);
  const isTouched = get(touched, name);
  const isShowMsg = isTouched && !!errorMsg;

  //! Function

  //! Render
  return (
    <div className={classes.rootInput}>
      {!!label && (
        <label
          className={LabelColorPrimary ? classes.labelHeaderColorPrimary : ""}
          htmlFor={name}
        >
          {label}
        </label>
      )}
      <CustomTextArea
        className={className}
        onChange={onChange}
        onBlur={onBlur}
        name={name}
        value={value}
        disabled={disabled}
        onKeyDown={onKeyDown}
        size={size}
        placeholder={placeholder}
        sx={sx}
        minRows={minRows}
        maxRows={maxRows}
      />
      {isShowMsg && <div className={classes.errorMsg}>{errorMsg}</div>}
    </div>
  );
};

export default TextAreaField;
