import { Dictionary } from "../components/dictionary/dictionary";
import { TranslationEditor } from "../components/translation-editor/translation-editor";
import { Words } from "../components/words/words";
import { Background, Tool } from "./app.styles";

export const App = () => (
  <Background>
    <Tool side="left">
      <Words />
    </Tool>
    
    <TranslationEditor />

    <Tool side="right">
      <Dictionary />
    </Tool>
  </Background>
);