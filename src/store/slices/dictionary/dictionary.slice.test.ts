import { dictionaryReducer, loadDictionaryFile } from "./dictionary.slice"

import "@reduxjs/toolkit";
import "@tauri-apps/api/tauri";
import * as tauriImport from "@tauri-apps/api/tauri";
import * as reduxImport from "@reduxjs/toolkit";

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
    translation: "translation 1"
  },
  {
    key: "test_key_2",
    source: "source 2",
    translation: "translation 2"
  }
]

describe(`dictionaryReducer`, () => {
  it(`should return init state`, () => {
    expect(dictionaryReducer(undefined, { type: 'None' })).toEqual({
      words: [],
      documents: []
    });
  })

  describe(`dictionary/loadDictionaryFile/fulfilled`, () => {
    it(`should loaded data to the state`, () => {
      let i = 0;
      redux.nanoid.mockImplementation(() => 'id_' + (++i));

      expect(dictionaryReducer(undefined, { type: 'dictionary/loadDictionaryFile/fulfilled', payload: commandWords })).toEqual({
        words: [
          {
            id: "id_1",
            key: "test_key_1",
            source: "source 1",
            translation: "translation 1"
          },
          {
            id: "id_2",
            key: "test_key_2",
            source: "source 2",
            translation: "translation 2"
          }
        ],
        documents: [
          {
            id: "id_3",
            name: "Document 0",
            words: [
              "id_1",
              "id_2"
            ]
          }
        ]
      });
    })
  })
})

describe(`loadDictionaryFile`, () => {
  it(`should return an empty array if tauri command throws an error`, async () => {
    tauri.invoke.mockRejectedValueOnce("an Error");

    const result = await loadDictionaryFile()(() => {}, () => {}, () => {});

    expect(result).toEqual({
      type: 'dictionary/loadDictionaryFile/fulfilled',
      meta: expect.any(Object),
      payload: [],
    });
  })

  it(`should call result of tauri command`, async () => {
    tauri.invoke.mockResolvedValueOnce(commandWords);

    const result = await loadDictionaryFile()(() => {}, () => {}, () => {});

    expect(result).toEqual({
      type: 'dictionary/loadDictionaryFile/fulfilled',
      meta: expect.any(Object),
      payload: [
        {
          key: "test_key_1",
          source: "source 1",
          translation: "translation 1"
        },
        {
          key: "test_key_2",
          source: "source 2",
          translation: "translation 2"
        }
      ],
    });
  })


})