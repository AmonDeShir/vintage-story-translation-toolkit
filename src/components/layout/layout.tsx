import styled from "@emotion/styled";

type ItemsProps = {
  subtractHeight?: string;
}

export const Items = styled.div<ItemsProps>`
  --subtractHeight: ${({ subtractHeight = "0px" }) => subtractHeight};
  height: calc(100% - var(--subtractHeight));
  padding: 12px;
`;

export const Buttons = styled.div`
  height: 30px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;