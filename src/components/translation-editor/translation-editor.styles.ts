import styled from "@emotion/styled";

export const Size = styled.div`
  width: calc(60% - 50px);
  height: calc(100% - 162px);
  max-width: 450px;
`;

export const Source = styled.p`
  height: 20px;
  line-height: 20px;
  width: 100%;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-y: scroll;
  font-size: ${({ theme }) => theme.font.smaller};
`;

type TextProps = {
  full?: boolean;
} 

export const Text = styled.p<TextProps>`
  --other-items: ${({ full }) => full ? "40px" : "60px"};
  --size: ${({ full }) => full ? "100%" : "50%"};

  height: calc(var(--size) - var(--other-items));
  width: 100%;
  margin: 0;
  padding: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  overflow-y: scroll;
`;

export const Editor = styled.div`
  height: calc(50% - 30px);
  width: 100%;
`;