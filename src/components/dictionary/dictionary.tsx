import { loadDictionaryFile } from '../../store/slices/dictionary/dictionary.slice';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { Button } from '../button/button';
import { Container } from '../container/container';
import { Buttons, Items } from '../layout/layout';
import { Textbox } from '../textbox/textbox';
import { Title } from '../title/title';
import { DocumentHeader } from './dictionary.styles';

export const Dictionary = () => {
  const { documents } = useAppSelector(({ dictionary }) => dictionary);
  const dispatch = useAppDispatch();

  return (
    <Container side='right'>
      <Title>Dictionary</Title>
      <Textbox placeholder='Search' />

      <Items subtractHeight='114px'>
        {documents.map(({id, name}) => (
          <DocumentHeader key={id}>{name}</DocumentHeader>     
        ))}
      </Items>

      <Buttons>
        <Button text='Add new file' onClick={() => dispatch(loadDictionaryFile())} />
        <Button text='Files' />
      </Buttons>
    </Container>
  );
};