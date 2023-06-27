import React, { useEffect, Fragment } from "react";
import { useInView } from "react-intersection-observer";

const ScrollWrapper = (props) => {
  //! State
  const { children, onScrollEnd, marginTop, classNameDetector, styleDetector } =
    props;
  const { ref, inView } = useInView();

  //! Function
  useEffect(() => {
    if (inView) {
      onScrollEnd && onScrollEnd();
    }
  }, [inView]);

  //! Render
  return (
    <Fragment>
      {children}
      <div
        ref={ref}
        className={classNameDetector}
        style={{
          display: "flex",
          //   visibility: "hidden",
        //   color: 'red',
          height: "1px",
          transform: `translateY(${marginTop}px)`,
          zIndex: -1,
          ...(styleDetector || {}),
        }}
      ></div>
    </Fragment>
  );
};

export default ScrollWrapper;
