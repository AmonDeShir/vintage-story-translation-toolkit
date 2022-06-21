import styled from "@emotion/styled";

type Props = {
  text: string;
  onClick?: () => void;
}

const StyledInput = styled.input`
  text-align: center;
  padding: 0px 5px;
  font-size: ${({ theme }) => theme.font.small};
  color: #fff;
  background-color: rgba(0, 0, 0, 0);
  border: none;
  cursor: pointer;
  transition: color 0.25s, transform 0.1s;

  &:hover {
    color: #757575;
  }

  &:active {
    transform: scale(1.2);
  }
`;

export const Button = ({ text, onClick }: Props) => (
  <StyledInput 
    type="button"
    value={text}
    onClick={onClick} 
  />
);