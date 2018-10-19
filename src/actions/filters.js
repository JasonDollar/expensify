

// Filters actions
export const setTextFilter = (text = '') => ({
  type: 'SET_TEXT_FILTER',
  text
})

export const sortByDate = () => ({
  type: 'SORT_DATE'
})

export const sortByAmount = () => ({
  type: 'SORT_AMOUNT'
})

export const setStartDay = (date) => ({
  type: 'START_DATE',
  startDate: date
})

export const setEndDay = (date) => ({
  type: 'END_DATE',
  endDate: date
})

