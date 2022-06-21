import { Dictionary } from "../components/dictionary/dictionary";
import { Translate } from "../components/translate/translate";
import { Words } from "../components/words/words";
import { Background, Tool } from "./app.styles";

export const App = () => (
  <Background>
    <Tool side="left">
      <Words />
    </Tool>
    
    <Translate />

    <Tool side="right">
      <Dictionary />
    </Tool>
  </Background>
);