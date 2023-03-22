import React from 'react';
import { Tooltip as MuiTooltip } from '@mui/material';

const Tooltip = (props) => {
  const { children, ...rest } = props;
  return <MuiTooltip {...rest}>{children}</MuiTooltip>;
};

export default Tooltip;
