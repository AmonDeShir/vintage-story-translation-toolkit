import styled from "@emotion/styled";

export const DecoratedTitle = styled.div`
  width: 100%;
  text-align: center;
  display: flex;
  flex-direction: row;
  
  &::before, &::after {
    content: " ";
    flex: 1 1;
    border-top: 1px solid #fff;
    margin: auto;
  }

  &::before {
    margin-right: 5px
  }

  &::after {
    margin-left: 5px
  }
`;