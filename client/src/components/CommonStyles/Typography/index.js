import React from 'react';
import { Typography as TypographyMui } from '@mui/material';


const Typography = (props) => {
  return <TypographyMui {...props}>{props.children}</TypographyMui>;
};

export default Typography;
