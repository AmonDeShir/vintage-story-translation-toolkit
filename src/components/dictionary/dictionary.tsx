import { Button } from '../button/button';
import { Container } from '../container/container';
import { Buttons, Items } from '../layout/layout';
import { Textbox } from '../textbox/textbox';
import { Title } from '../title/title';

export const Dictionary = () => {

  return (
    <Container side='right'>
      <Title>Dictionary</Title>
      <Textbox placeholder='Search' />

      <Items subtractHeight='114px'>
        asdd
      </Items>

      <Buttons>
        <Button text='Add new file' />
        <Button text='Files' />
      </Buttons>
    </Container>
  );
};