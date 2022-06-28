import { ThemeProvider } from "@emotion/react";
import { Action, configureStore } from "@reduxjs/toolkit";
import { fireEvent, render, screen } from "@testing-library/react";
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

  it(`should render Prev button`, () => {
    const { wrapper } = createWrapper();
    render(<TranslationEditor />, { wrapper });

    expect(screen.getByText("Prev")).toBeInTheDocument();
  });

  it(`should render Next button`, () => {
    const { wrapper } = createWrapper();
    render(<TranslationEditor />, { wrapper });

    expect(screen.getByText("Next")).toBeInTheDocument();
  });

  it(`should render Translation textbox`, () => {
    const { wrapper } = createWrapper();
    render(<TranslationEditor />, { wrapper });

    expect(screen.getByPlaceholderText("Translation")).toBeInTheDocument();
  });

  describe('item data', () => {
    it(`should render selection instruction if the selected item is undefined`, () => {
      const { wrapper } = createWrapper({ selected: undefined });
      render(<TranslationEditor />, { wrapper });

      expect(screen.getByText("Click in one of the words from the list on the left. If it is empty, click the load file button to load the file you want to translate.")).toBeInTheDocument();
    });

    it(`should render source of the selected item`, () => {
      const { wrapper } = createWrapper();
      render(<TranslationEditor />, { wrapper });
  
      expect(screen.getByText("source 1")).toBeInTheDocument();
    });

    it(`should render key of the selected item`, () => {
      const { wrapper } = createWrapper();
      render(<TranslationEditor />, { wrapper });
  
      expect(screen.getByText("<WORD_1>")).toBeInTheDocument();
    });

    it(`should render translation of the selected item`, () => {
      const { wrapper } = createWrapper();
      render(<TranslationEditor />, { wrapper });
  
      expect(screen.getByDisplayValue("translation 1")).toBeInTheDocument();
    });
  })

  describe(`redux integration`, () => {
    it(`should dispatch the "selectNext" action when the Next button is clicked`, async () => {
      const { wrapper, reduxActions } = createWrapper();
      render(<TranslationEditor />, { wrapper });
      
      fireEvent.click(await screen.findByText("Next"));

      expect(reduxActions["words/selectNext"]).toEqual({
        type: "words/selectNext",
        payload: undefined
      })
    });

    it(`should dispatch the "selectPrevious" action when the Next button is clicked`, async () => {
      const { wrapper, reduxActions } = createWrapper();
      render(<TranslationEditor />, { wrapper });
      
      fireEvent.click(await screen.findByText("Prev"));

      expect(reduxActions["words/selectPrevious"]).toEqual({
        type: "words/selectPrevious",
        payload: undefined
      })
    });

    it(`should dispatch the "translate" action when the textbox is edited`, async () => {
      const { wrapper, reduxActions } = createWrapper();
      render(<TranslationEditor />, { wrapper });
      
      fireEvent.select(await screen.findByRole("textbox"));
      fireEvent.change(await screen.findByRole("textbox"), { target: { value: "New translation" }});

      expect(reduxActions["words/translate"]).toEqual({
        type: "words/translate",
        payload: {
          id: "word_1",
          translation: "New translation"
        }
      })
    })
  })
});