import styled from "styled-components";

const StyledBox = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 30px;
`;

export default function Box({ children }) {
  return <StyledBox>{children}</StyledBox>;
}
