import styled from "@emotion/styled";

type Props = {
  multiline?: boolean;
}

export const Textbox = styled.input<Props>`
  width: calc(100% - 24px);
  height: ${({ multiline = false }) => multiline ? "100%" : "40px" };
  font-size: ${({ theme }) => theme.font.normal};
  margin: 0 12px;
  background-color: #362D23;
  border: 2px solid #61584E;
  border-top-color:#362D23;
  border-left-color: #362D23;
  box-shadow: inset 2px 2px 4px rgba(0, 0, 0, 0.5);
  text-align: center;
  color: #fff;
`;