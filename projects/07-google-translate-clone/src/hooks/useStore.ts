import { useReducer } from 'react'
import { type Action, type State, type Language, type FromLanguage } from '../types'
import { AUTO_LANGUAGE } from '../constants'

// 1 - Create a initialState
export const initialState: State = {
  fromLanguage: 'auto',
  toLanguage: 'en',
  fromText: '',
  result: '',
  isLoading: false
}

// 2 - Create a reducer function
export function reducer (state: State, action: Action) {
  const { type } = action

  switch (type) {
    case 'INTERCHANGE_LANGUAGES': {
      if (state.fromLanguage === AUTO_LANGUAGE || state.fromLanguage === state.toLanguage) return state

      const isLoading = state.fromText !== ''

      return {
        ...state,
        fromLanguage: state.toLanguage,
        toLanguage: state.fromLanguage,
        fromText: state.result,
        isLoading,
        result: ''
      }
    }

    case 'SET_FROM_LANGUAGE': {
      if (state.fromLanguage === action.payload) return state

      const isLoading = state.fromText !== ''

      return {
        ...state,
        fromLanguage: action.payload,
        result: '',
        isLoading
      }
    }

    case 'SET_TO_LANGUAGE': {
      if (state.toLanguage === action.payload) return state

      const isLoading = state.fromText !== ''

      return {
        ...state,
        toLanguage: action.payload,
        result: '',
        isLoading
      }
    }

    case 'SET_FROM_TEXT': {
      const isLoading = action.payload !== ''

      return {
        ...state,
        isLoading,
        fromText: action.payload,
        result: ''
      }
    }

    case 'SET_RESULT':
      return {
        ...state,
        isLoading: false,
        result: action.payload
      }
  }

  return state
}

export function useStore () {
  // 3 - Use "useReducer" hook
  const [{
    fromLanguage,
    toLanguage,
    fromText,
    result,
    isLoading
  }, dispatch] = useReducer(reducer, initialState)

  const interchangeLanguages = () => {
    dispatch({ type: 'INTERCHANGE_LANGUAGES' })
  }

  const setFromLanguage = (payload: FromLanguage) => {
    dispatch({ type: 'SET_FROM_LANGUAGE', payload })
  }

  const setToLanguage = (payload: Language) => {
    dispatch({ type: 'SET_TO_LANGUAGE', payload })
  }

  const setFromText = (payload: string) => {
    dispatch({ type: 'SET_FROM_TEXT', payload })
  }

  const setResult = (payload: string) => {
    dispatch({ type: 'SET_RESULT', payload })
  }

  return {
    fromLanguage,
    toLanguage,
    fromText,
    result,
    isLoading,
    interchangeLanguages,
    setFromLanguage,
    setToLanguage,
    setFromText,
    setResult
  }
}
