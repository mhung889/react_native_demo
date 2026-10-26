import { SearchState } from './search.store';

export const selectSearch = (state: SearchState) => ({
  history: state.history,
  addSearch: state.addSearch,
  removeSearch: state.removeSearch,
  clearHistory: state.clearHistory,
});
