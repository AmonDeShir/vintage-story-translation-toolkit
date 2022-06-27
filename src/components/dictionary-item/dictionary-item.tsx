import { PropsWithChildren, useMemo, useState } from "react";
import { Button } from "../button/button";
import { Buttons } from "../layout/layout";
import { Textbox } from "../textbox/textbox";
import { DecoratedTitle } from "./dictionary-item.styles";

type HeaderProps = PropsWithChildren<{
  name: string;
  onRemove?: () => void;
  onRenamed?: (name: string) => void;
}>

export const DictionaryHeader = ({ children, name, onRemove, onRenamed }: HeaderProps) => {
  const [inEditMode, setInEditMode] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [newName, setNewName] = useState(name);

  const toggleHidden = () => setHidden((s) => !s);

  const enterEditMode = () => {
    setInEditMode(true);
    setHidden(true);
    setNewName(name);
  };

  const handleRemove = () => {
    setInEditMode(false);
    setHidden(false);

    if (onRemove) {
      onRemove();
    }
  }

  const handleDone = () => {
    setInEditMode(false);
    setHidden(false);
    
    if (name !== newName && onRenamed) {
      onRenamed(newName);
    }
  }

  const handleTextboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewName(event.target.value);
  }

  return (
    <>
      { !inEditMode && <DecoratedTitle onClick={toggleHidden} onDoubleClick={enterEditMode}>{name}</DecoratedTitle> }
      { inEditMode && (
        <>
          <Textbox role="textbox" value={newName} onChange={handleTextboxChange} />
          <Buttons>
            <Button text="Done" onClick={handleDone} />
            <Button text="Remove" onClick={handleRemove} />
          </Buttons>
        </>
      )}

      { !hidden && children }
    </>
  );
}

type ItemProps = {
  source: string;
  translation: string;
  onClick?: () => void;
}

export const DictionaryItem = ({ source, translation, onClick }: ItemProps) => {
  const [hidden, setHidden] = useState(true);
  const maxWidth = 25;
  const isLong = useMemo(() => source.length >= maxWidth || translation.length >= maxWidth, [source.length, translation.length])

  if (isLong) {
    const textA = hidden ? `${source.slice(0, maxWidth)}...` : source;
    const textB = hidden ? `${translation.slice(0, maxWidth)}...` : translation; 

    return (
      <div onClick={onClick} onDoubleClick={() => setHidden((s) => !s)}>
        <b>{textA}</b> - {textB} <br/>
      </div>
    );
  }

  return (
    <div onClick={onClick}>
      <b>{source}</b> - {translation}
    </div>
  );
}