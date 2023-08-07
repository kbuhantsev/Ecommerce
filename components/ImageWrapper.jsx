import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const ImageWrapper = ({ children, ...props }) => {
  return <Wrapper {...props}>{children}</Wrapper>;
};

export default ImageWrapper;
