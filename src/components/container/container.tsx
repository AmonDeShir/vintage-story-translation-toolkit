import styled from "@emotion/styled";

type Props = {
  side?: 'left' | 'right' | 'center';
}

export const Container = styled.div<Props>`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.primary};
  box-shadow: ${({ side = "center" }) => ({ 
    left: '4px 0px 8px rgba(0, 0, 0, 0.5)', 
    right: '-4px 0px 8px rgba(0, 0, 0, 0.5)',
    center: '4px 4px 8px rgba(0, 0, 0, 0.5)' 
  })[side] };
`;