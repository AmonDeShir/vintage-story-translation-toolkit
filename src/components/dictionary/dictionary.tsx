import debounce from 'lodash.debounce';
import { useMemo, useState } from 'react';
import { loadDictionaryFile, remove, rename } from '../../store/slices/dictionary/dictionary.slice';
import { Document, Word } from '../../store/slices/dictionary/dictionary.types';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { Button } from '../button/button';
import { Container } from '../container/container';
import { DictionaryHeader, DictionaryItem } from '../dictionary-item/dictionary-item';
import { Buttons, Items } from '../layout/layout';
import { Textbox } from '../textbox/textbox';
import { Title } from '../title/title';

export const Dictionary = () => {
  const dictionary = useAppSelector(({ dictionary }) => dictionary);
  const dispatch = useAppDispatch();
  const [search, setSearch ] = useState('');

  const allWords = useMemo(() => {
    const filter = (word: string) => word.trim().toLowerCase().includes(search.trim().toLowerCase());

    if (search.trim().length === 0) {
      return [...dictionary.words];
    }

    return dictionary.words.filter(({ key, source, translation  }) => {
      return filter(key) || filter(source) || filter(translation)
    });
  }, [dictionary.words, search]);

  const documents = useMemo(() => {
    const result: (Omit<Document, "words"> & { words: Word[] })[] = []

    for(const document of dictionary.documents) {
      const words: Word[] = [];
      const allWordsCopy = [...allWords];

      for(const id of document.words) {
        const index = allWordsCopy.findIndex(word => word.id === id);

        if (index === -1) {
          continue;
        }
        
        words.push(allWordsCopy.splice(index, 1)[0]);
      }

      result.push({ ...document, words })
    }

    return result;
  }, [allWords, dictionary.documents])

  const eventHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const debouncedEventHandler = useMemo(() => debounce(eventHandler, 300), []);

  return (
    <Container side='right'>
      <Title>Dictionary</Title>
      <Textbox role="textbox" placeholder='Search' onChange={debouncedEventHandler}/>

      <Items subtractHeight='114px'>
        {documents.map(({id, name, words}) => (
          <DictionaryHeader 
            key={id} 
            name={name}
            onRemove={() => dispatch(remove(id))}
            onRenamed={(name) => dispatch(rename({ id, name }))}
          >
            {words.map(word => (
              <DictionaryItem 
                key={word.id} 
                source={word.source} 
                translation={word.translation}
              />
            ))}
          </DictionaryHeader>     
        ))}
      </Items>

      <Buttons>
        <Button text='Add new file' onClick={() => dispatch(loadDictionaryFile())} />
      </Buttons>
    </Container>
  );
};