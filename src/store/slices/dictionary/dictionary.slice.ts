import { createAsyncThunk, createSlice, nanoid } from '@reduxjs/toolkit'
import { invoke } from '@tauri-apps/api/tauri'
import { CommandWord, Document, Word } from '../dictionary.types';

interface DictionaryState {
  words: Word[];
  documents: Document[];
}

const initialState: DictionaryState = {
  words: [],
  documents: []
}

export const loadDictionaryFile = createAsyncThunk(
  'dictionary/loadDictionaryFile',
  async () => {     
    try {
      return await invoke<CommandWord[]>("dictionary_load_file");
    }
    catch (e) {
      return [];
    }
  }
)

export const dictionarySlice = createSlice({
  name: 'dictionary',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loadDictionaryFile.fulfilled, (state, action) => {
      const words = action.payload.map((word) => ({
        ...word,
        id: nanoid()
      }));

      state.documents.push({
        id: nanoid(),
        name: `Document ${state.documents.length}`,
        words: words.map((word) => word.id)
      });

      state.words.push(...words);
    });
  }
});


export const dictionaryReducer = dictionarySlice.reducer;
