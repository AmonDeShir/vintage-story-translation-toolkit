import { useMemo } from "react";
import { selectNext, selectPrevious, translate } from "../../store/slices/words/words.slice";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { Button } from "../button/button";
import { Container } from "../container/container";
import { Buttons } from "../layout/layout";
import { MultilineTextbox } from "../textbox/textbox";
import { Title } from "../title/title";
import { Size, Text, Editor, Source } from "./translation-editor.styles";

export const TranslationEditor = () => {
  const { selected, words } = useAppSelector(({ words }) => words);
  const dispatch = useAppDispatch();

  const word = useMemo(() => {
    return words.find(({ id }) => selected === id)
  }, [selected, words]);

  if (!word) {
    return (
      <Size>
        <Container>
          <Title>Editor</Title>
          <Text full>
            Click in one of the words from the list on the left. If it is empty, click the load file button to load the file you want to translate.
          </Text>
        </Container>
      </Size>
    )
  }

  return (
    <Size>
      <Container>
        <Title>Editor</Title>

        <Source>
          {`<${word.key}>`}
        </Source>

        <Text>
          {word.source}
        </Text>

        <Editor>
          <MultilineTextbox
            placeholder="Translation"
            value={word.translation}
            onChange={(e) => dispatch(translate({
              id: word.id,
              translation: e.target.value
            }))}
          />
        </Editor>

        <Buttons>
          <Button 
            text="Prev"
            onClick={() => dispatch(selectPrevious())}
          />

          <Button 
            text="Next"
            onClick={() => dispatch(selectNext())}
          />
        </Buttons>
      </Container>
    </Size>
  );
}