import styled from "styled-components";

const StyledTable = styled.table`
  width: 100%;
  th {
    text-align: left;
    text-transform: uppercase;
    color: #aaa;
    font-size: 0.7rem;
  }
`;

export default function Table({ children }) {
  return <StyledTable>{children}</StyledTable>;
}
