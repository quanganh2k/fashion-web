import * as React from 'react';


const ArrowDropDown = (props) => (
  <svg
    width={16}
    height={11}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      transform="matrix(-.66897 .7433 .45167 .89219 15.6 2)"
      stroke="#B0ACAC"
      strokeWidth={2}
      strokeLinecap="round"
      d="M1-1h9.66"
    />
    <path
      transform="matrix(.66897 .7433 -.45167 .89219 0 2)"
      stroke="#B0ACAC"
      strokeWidth={2}
      strokeLinecap="round"
      d="M1-1h9.66"
    />
  </svg>
);

export default ArrowDropDown;
