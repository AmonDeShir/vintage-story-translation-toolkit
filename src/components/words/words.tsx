import { generateTranslationFile, loadWordsFile, select } from "../../store/slices/words/words.slice";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { Button } from "../button/button";
import { Container } from "../container/container";
import { DictionaryItem } from "../dictionary-item/dictionary-item";
import { Buttons, Items } from "../layout/layout";
import { Title } from "../title/title";

export const Words = () => {
  const { words } = useAppSelector((state) => state.words);
  const dispatch = useAppDispatch();

  return (
    <Container side="left">
      <Title>Words</Title>

      <Items subtractHeight="70px">
        {words.map(word => (
          <DictionaryItem 
            key={word.id} 
            source={word.source} 
            translation={word.translation}
            onClick={() => dispatch(select(word.id))}
          />
        ))}
      </Items>

      <Buttons>
        <Button 
          text='Load file' 
          onClick={() => dispatch(loadWordsFile())} 
        />
        <Button 
          text='Save'
          onClick={() => dispatch(generateTranslationFile())} 
        />
      </Buttons>
    </Container>
  );
};