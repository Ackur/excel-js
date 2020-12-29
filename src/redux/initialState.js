import {defaultStyles, defaultTitle} from '@/constants'

const defaultState = {
  title: defaultTitle,
  rowState: {},
  colState: {},
  dataState: {},
  stylesState: {},
  currentText: '',
  currentStyles: defaultStyles,
  lastUpdate: Date.now()
}

const normalize = state => ({
  ...state,
  currentStyles: defaultStyles,
  currentText: '',
  lastUpdate: Date.now()
})

export function normalizeInitialState(state) {
  return state ? normalize(state) : defaultState
}
