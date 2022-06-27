import { createAsyncThunk, createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit'
import { invoke } from '@tauri-apps/api/tauri'
import { CommandWord, Document, Word } from './dictionary.types';

export interface DictionaryState {
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
  reducers: {
    rename: (state, action: PayloadAction<{ id: string, name: string }>) => {
      const { name, id } = action.payload;
      
      const document = state.documents.find((document) => document.id === id);

      if (document) {
        document.name = name;
      }
    },
    
    remove: (state, action: PayloadAction<string>) => {
      const id = action.payload;

      state.documents = state.documents.filter((document) => document.id !== id);
    }
  },
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


export const { remove, rename } = dictionarySlice.actions;
export const dictionaryReducer = dictionarySlice.reducer;
