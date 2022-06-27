import { createAsyncThunk, createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";
import { invoke } from "@tauri-apps/api/tauri";
import { CommandWord, Word } from "./words.types"

export type WordsState = {
  words: Word[];
  selected?: string;
}

const initialState: WordsState = {
  words: [],
  selected: undefined
}

export const loadWordsFile = createAsyncThunk(
  'words/loadWordsFile',
  async () => {     
    try {
      return await invoke<CommandWord[]>("words_load_file");
    }
    catch (e) {
      return [];
    }
  }
);

type ThunkConfig = {
  state: {
    words: WordsState
  }
}

export const generateTranslationFile = createAsyncThunk<void, undefined, ThunkConfig>(
  'words/generateTranslationFile',
  async (_, payload) => {
    const { words } = payload.getState().words;

    await invoke<CommandWord[]>("words_generate_translation_file", { words });
  }
);


export const wordsSlice = createSlice({
  name: 'words',
  initialState,
  reducers: {
    select: (state, action: PayloadAction<string>) => {
      const id = action.payload;

      const word = state.words.find((word) => word.id === id);

      if (!word) {
        state.selected = undefined;
        return;
      }

      state.selected = id;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(loadWordsFile.fulfilled, (state, action) => {
      const words = action.payload.map((word) => ({
        ...word,
        translation: "",
        id: nanoid()
      }));

      state.words.push(...words);
    });
  },
});

export const wordsReducer = wordsSlice.reducer;
export const { select } = wordsSlice.actions;