import { ThemeProvider } from "@emotion/react";
import { Action, configureStore } from "@reduxjs/toolkit";
import { fireEvent, render, screen } from "@testing-library/react";
import { PropsWithChildren } from "react";
import { Provider } from "react-redux";
import { WordsState } from "../../store/slices/words/words.slice";
import { theme } from "../../theme/theme";
import { Words } from "./words";

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
    words: [],
    selected: undefined,
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

describe('Words', () => {
  it(`should display title`, () => {
    const { wrapper } = createWrapper();
    render(<Words />, { wrapper });

    expect(screen.getByText("Words")).toBeInTheDocument();
  });

  it(`should display the "Load file" button`, () => {
    const { wrapper } = createWrapper();
    render(<Words />, { wrapper });

    expect(screen.getByText("Load file")).toBeInTheDocument();
  });


  it(`should display the "Save" button`, () => {
    const { wrapper } = createWrapper();
    render(<Words />, { wrapper });

    expect(screen.getByText("Save")).toBeInTheDocument();
  });

  describe(`Words`, () => {
    it(`should display words from the redux store`, () => {
      const { wrapper } = createWrapper({ words });
      render(<Words />, { wrapper });

      expect(screen.getByText('source 1')).toBeInTheDocument();
      expect(screen.getByText('source 2')).toBeInTheDocument();
      expect(screen.getByText('source 3')).toBeInTheDocument();
    });
  });

  describe(`redux integration`, () => {
    it(`should dispatch the "translate/load" action when one of the words is clicked`, async () => {
      const { wrapper, reduxActions } = createWrapper({ words });
      render(<Words />, { wrapper });

      fireEvent.click(await screen.findByText('source 1'));

      expect(reduxActions["words/select"]).toEqual({
        type: "words/select",
        payload: "word_1"
      });
    });

    it(`should dispatch the "words/loadWordsFile" action when the "Load file" button is clicked`, async () => {
      const { wrapper, reduxActions } = createWrapper({ words });
      render(<Words />, { wrapper });

      fireEvent.click(await screen.findByText('Load file'));

      expect(reduxActions["words/loadWordsFile/pending"]).toEqual({
        type: "words/loadWordsFile/pending",
        payload: undefined,
        meta: expect.any(Object)
      });
    })

    it(`should dispatch the "words/generateTranslationFile" action when the "Save" button is clicked`, async () => {
      const { wrapper, reduxActions } = createWrapper({ words });
      render(<Words />, { wrapper });

      fireEvent.click(await screen.findByText('Save'));

      expect(reduxActions["words/generateTranslationFile/pending"]).toEqual({
        type: "words/generateTranslationFile/pending",
        payload: undefined,
        meta: expect.any(Object)
      });
    })
  })
})