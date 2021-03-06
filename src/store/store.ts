import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { dictionaryReducer } from './slices/dictionary/dictionary.slice'
import { wordsReducer } from './slices/words/words.slice'

export const store = configureStore({
  reducer: {
    dictionary: dictionaryReducer,
    words: wordsReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
