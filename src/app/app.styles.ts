import { css } from "@emotion/react";
import styled from "@emotion/styled";
import background from "../assets/background.png";

export const Background = styled.div`
  width: 100%;
  height: 100%;
  background-image: url(${background});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
`;

type ToolProps = {
  side: "left" | "right"
}

export const Tool = styled.div<ToolProps>`
  position: absolute;
  max-width: 400px;
  width: 20%;
  height: 100%;
  top: 0;

  ${({side}) => side === "left" 
    ? css`left: 0;` 
    : css`right: 0;`
  }
`;