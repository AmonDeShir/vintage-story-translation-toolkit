import { Button } from "../button/button";
import { Container } from "../container/container";
import { Buttons, Items } from "../layout/layout";
import { Title } from "../title/title";

export const Words = () => {


  return (
    <Container side="left">
      <Title>Words</Title>

      <Items subtractHeight="70px">
        asdd
      </Items>

      <Buttons>
        <Button text='Load file' />
        <Button text='Save' />
      </Buttons>
    </Container>
  );
};