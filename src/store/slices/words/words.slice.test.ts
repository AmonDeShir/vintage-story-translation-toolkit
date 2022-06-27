import "@reduxjs/toolkit";
import "@tauri-apps/api/tauri";
import * as tauriImport from "@tauri-apps/api/tauri";
import * as reduxImport from "@reduxjs/toolkit";
import { generateTranslationFile, loadWordsFile, wordsReducer } from "./words.slice";


jest.mock('@tauri-apps/api/tauri', () => ({
  invoke: jest.fn()
}));

jest.mock('@reduxjs/toolkit', () => ({
  ...jest.requireActual('@reduxjs/toolkit'),
  nanoid: jest.fn()
}));

const tauri = jest.mocked(tauriImport, false)
const redux = jest.mocked(reduxImport, false)

const commandWords = [
  {
    key: "test_key_1",
    source: "source 1",
  },
  {
    key: "test_key_2",
    source: "source 2",
  }
]

describe(`wordsReducer`, () => {
  it(`should return init state`, () => {
    expect(wordsReducer(undefined, { type: 'None' })).toEqual({
      words: [],
      selected: undefined
    });
  })

  describe('select', () => {
    it(`should select a word`, () => {
      const state = { 
        words: [
          {
            id: "word_1",
            key: "test_key_1",
            source: "source 1",
            translation: "translation 1"
          },
        ],
        selected: undefined,
      };

      expect(wordsReducer(state, { type: 'words/select', payload: "word_1" })).toEqual({
        words: state.words,
        selected: "word_1"
      });
    })

    it(`should change selected to undefine if word to select not exist`, () => {
      const state = { 
        words: [
          {
            id: "word_1",
            key: "test_key_1",
            source: "source 1",
            translation: "translation 1"
          },
        ], 
        selected: "word_1",
      };

      expect(wordsReducer(state, { type: 'words/select', payload: "not_exist" })).toEqual({
        words: state.words,
        selected: undefined
      });
    })
  })

  describe(`words/loadWordsFile/fulfilled`, () => {
    it(`should loaded data to the state`, () => {
      let i = 0;
      redux.nanoid.mockImplementation(() => 'id_' + (++i));

      expect(wordsReducer(undefined, { type: 'words/loadWordsFile/fulfilled', payload: commandWords })).toEqual({
        selected: undefined,
        words: [
          {
            id: "id_1",
            key: "test_key_1",
            source: "source 1",
            translation: ""
          },
          {
            id: "id_2",
            key: "test_key_2",
            source: "source 2",
            translation: ""
          }
        ],
      });
    })
  })
})

describe(`loadWordsFile`, () => {
  it(`should return an empty array if tauri command throws an error`, async () => {
    tauri.invoke.mockRejectedValueOnce("an Error");

    const result = await loadWordsFile()(() => {}, () => {}, () => {});

    expect(result).toEqual({
      type: 'words/loadWordsFile/fulfilled',
      meta: expect.any(Object),
      payload: [],
    });
  })

  it(`should call result of tauri command`, async () => {
    tauri.invoke.mockResolvedValueOnce(commandWords);

    const result = await loadWordsFile()(() => {}, () => {}, () => {});

    expect(result).toEqual({
      type: 'words/loadWordsFile/fulfilled',
      meta: expect.any(Object),
      payload: [
        {
          key: "test_key_1",
          source: "source 1",
        },
        {
          key: "test_key_2",
          source: "source 2",
        }
      ],
    });
  });
})

describe("generateTranslationFile", () => {
  it(`should call the tauri invoke with the "generateTranslationFile" command`, async () => {
    tauri.invoke.mockClear();

    const state = () => ({
      words: {
        words: [
          {
            id: "word_1",
            key: "test_key_1",
            source: "source 1",
            translation: "translation 1"
          },
        ]
      }
    })

    await generateTranslationFile()(() => {}, state, () => {});

    expect(tauri.invoke).toBeCalledTimes(1);
    expect(tauri.invoke).toBeCalledWith("words_generate_translation_file", {
      words: [
        {
          id: "word_1",
          key: "test_key_1",
          source: "source 1",
          translation: "translation 1"
        },
      ]
    });
  })
})
