import React, { memo } from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import { makeStyles } from "@mui/styles";
import classNames from "classnames";

const useStyles = makeStyles((theme) => ({
  root: {
    // borderRadius: `${theme.spacing(3)} !important`,
    borderRadius: "30px",
    textTransform: "none",
  },
  div: {
    // width: theme.spacing(3),
  },
}));

const StyledButton = (props) => {
  const { children, style, className, onClick, loading, ...rest } = props;
  const classes = useStyles();

  return (
    <LoadingButton
      {...rest}
      loading={loading}
      onClick={onClick}
      sx={{ ...style }}
      className={classNames(classes.root, className)}
    >
      {children}
    </LoadingButton>
  );
};

export default memo(StyledButton);
