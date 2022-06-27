import { ThemeProvider } from "@emotion/react";
import { Action, configureStore } from "@reduxjs/toolkit";
import { render, screen } from "@testing-library/react";
import { PropsWithChildren } from "react";
import { Provider } from "react-redux";
import { WordsState } from "../../store/slices/words/words.slice";
import { theme } from "../../theme/theme";
import { TranslationEditor } from "./translation-editor";

const words = [
  {
    id: "word_1",
    key: "WORD_1",
    source: "source 1",
    translation: "translation 1"
  },
  {
    id: "word_2",
    key: "WORD_2",
    source: "source 2",
    translation: "translation 2"
  },
  {
    id: "word_3",
    key: "WORD_3",
    source: "source 3",
    translation: ""
  }
]

const createWrapper = (document: Partial<WordsState> = {}) => {
  let actions: { [key: string]: Action } = {};
  
  const state = {
    words: words,
    selected: "word_1",
    ...document,
  };

  const store = configureStore({
    reducer: {
      words: (_: any, action: Action) => {
        actions[action.type] = action;
        
        return state;
      },
    },
  });

  return {
    wrapper:  ({ children }: PropsWithChildren<{}>) => (
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          { children }
        </ThemeProvider>
      </Provider>
    ),
    reduxActions: actions,
  }
}

describe('TranslationEditor', () => {
  it(`should display title`, () => {
    const { wrapper } = createWrapper();
    render(<TranslationEditor />, { wrapper });

    expect(screen.getByText("Editor")).toBeInTheDocument();
  });
});