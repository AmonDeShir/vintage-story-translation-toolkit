import { ThemeProvider } from "@emotion/react";
import { Action, configureStore } from "@reduxjs/toolkit";
import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import { PropsWithChildren } from "react";
import { Provider } from "react-redux";
import { DictionaryState } from "../../store/slices/dictionary/dictionary.slice";
import { theme } from "../../theme/theme";
import { Dictionary } from "./dictionary"

const words = [
  {
    id: "word_1",
    key: "WORD_1",
    source: "test source 1",
    translation: "translation 1"
  },
  {
    id: "word_2",
    key: "WORD_2",
    source: "source test 2",
    translation: "translation 2"
  },
  {
    id: "word_3",
    key: "WORD_3",
    source: "source 3",
    translation: "translation 3"
  }
];

const documents = [
  {
    id: "doc_1",
    name: "DOC_1",
    words: [
      "word_1",
      "word_3",
    ]
  },
  {
    id: "doc_2",
    name: "DOC_2",
    words: [
      "word_2"
    ]
  },
]

const createWrapper = (document: Partial<DictionaryState> = {}) => {
  let actions: { [key: string]: Action } = {};
  
  const state = {
    words: [],
    documents: [],
    ...document,
  };

  const store = configureStore({
    reducer: {
      dictionary: (_: any, action: Action) => {
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


describe(`Dictionary`, () => {
  it(`should display title`, () => {
    const { wrapper } = createWrapper();
    render(<Dictionary />, { wrapper });

    expect(screen.getByText("Dictionary")).toBeInTheDocument();
  });

  it(`should display search textbox`, () => {
    const { wrapper } = createWrapper();
    render(<Dictionary />, { wrapper });

    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it(`should display "Add new file" buttons`, () => {
    const { wrapper } = createWrapper();
    render(<Dictionary />, { wrapper });

    expect(screen.getByText("Add new file")).toBeInTheDocument();
  });

  describe("search", () => {
    it(`should display all documents`, () => {
      const { wrapper } = createWrapper({ documents, words });
      render(<Dictionary />, { wrapper });
  
  
      expect(screen.getByText('DOC_1')).toBeInTheDocument();
      expect(screen.getByText('DOC_2')).toBeInTheDocument();
    })
  
    it(`should display all items if search textbox is empty`, () => {
      const { wrapper } = createWrapper({ documents, words });
      render(<Dictionary />, { wrapper });
  
      expect(screen.getByRole<HTMLInputElement>("textbox").value).toEqual("");
  
      expect(screen.getByText('test source 1')).toBeInTheDocument();
      expect(screen.getByText('source test 2')).toBeInTheDocument();
      expect(screen.getByText('source 3')).toBeInTheDocument();
    });
  
    it(`should display only searched items`, async () => {
      const { wrapper } = createWrapper({ documents, words });
      render(<Dictionary />, { wrapper });
  
      fireEvent.select(await screen.findByRole("textbox"));
      fireEvent.change(await screen.findByRole("textbox"), { target: { value: "test" }});
  
      await waitFor(() => expect(screen.queryByText('source 3')).not.toBeInTheDocument());
  
      expect(screen.getByText('test source 1')).toBeInTheDocument();
      expect(screen.getByText('source test 2')).toBeInTheDocument();
      expect(screen.queryByText('source 3')).not.toBeInTheDocument();
    });
  });

  describe(`Redux integration`, () => {
    it(`should dispatch a "dictionary/remove" action when one of DictionaryHeaders call onRemove property`, async () => {
      const { wrapper, reduxActions } = createWrapper({ documents, words });
      render(<Dictionary />, { wrapper });

      fireEvent.dblClick(await screen.findByText('DOC_1'));
      fireEvent.click(await screen.findByText('Remove'));

      expect(reduxActions["dictionary/remove"]).toEqual({
        type: "dictionary/remove",
        payload: "doc_1"
      });
    });

    it(`should dispatch a "dictionary/rename" action when one of DictionaryHeaders call onRename property`, async () => {
      const { wrapper, reduxActions } = createWrapper({ documents, words });
      render(<Dictionary />, { wrapper });

      fireEvent.dblClick(await screen.findByText(`DOC_1`));

      fireEvent.select((await screen.findAllByRole(`textbox`))[1]);
      fireEvent.change((await screen.findAllByRole(`textbox`))[1], { target: { value: "New name" }});
  
      fireEvent.click(await screen.findByText(`Done`));

      expect(reduxActions["dictionary/rename"]).toEqual({
        type: "dictionary/rename",
        payload: {
          id: "doc_1",
          name: "New name"
        }
      });
    });

    it(`should dispatch a "dictionary/loadDictionaryFile" action when the "Add new file" button is clicked`, async () => {
      const { wrapper, reduxActions } = createWrapper({ documents, words });
      render(<Dictionary />, { wrapper });

      fireEvent.click(await screen.findByText('Add new file'));

      expect(reduxActions["dictionary/loadDictionaryFile/pending"]).toEqual({
        type: "dictionary/loadDictionaryFile/pending",
        payload: undefined,
        meta: expect.any(Object),
      });
    })
  })
})