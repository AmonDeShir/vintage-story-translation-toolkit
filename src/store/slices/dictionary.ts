import { createSlice } from '@reduxjs/toolkit'
import { Word } from './dictionary.types';

interface DictionaryState {
  words: Word[];
  documents: Document[];
}

const initialState: DictionaryState = {
  words: [],
  documents: []
}

export const dictionarySlice = createSlice({
  name: 'dictionary',
  initialState,
  reducers: {}
});


export const dictionaryReducer = dictionarySlice.reducer;
