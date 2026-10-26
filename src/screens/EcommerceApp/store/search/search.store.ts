// import { create } from 'zustand';
// import { createJSONStorage, persist } from 'zustand/middleware';

// import { zustandStorage } from '../MMKVstore/MMKV.store';

// const SEARCH_EXPIRE_TIME = 15 * 60 * 1000;

// let expireTimer: ReturnType<typeof setTimeout> | undefined;

// const scheduleHistoryCleanup = (clearHistory: () => void) => {
//   if (expireTimer) {
//     clearTimeout(expireTimer);
//   }
//   expireTimer = setTimeout(() => {
//     clearHistory();
//   }, SEARCH_EXPIRE_TIME);
// };

// // const MAX_HISTORY = 7;

// export type SearchHistoryItem = {
//   id: string;
//   keyword: string;
//   createdAt: number;
// };

// export type SearchState = {
//   history: SearchHistoryItem[];
//   addSearch: (keyword: string) => void;
//   removeSearch: (id: string) => void;
//   clearHistory: () => void;
//   cleanExpired: () => void;
// };

// type PersistedSearchState = Pick<SearchState, 'history'>;

// export const useSearchStore = create<SearchState>()(
//   persist<SearchState, [], [], PersistedSearchState>(
//     (set) => ({
//       history: [],
//       cleanExpired: () => {
//         const now = Date.now();
//         set((state) => ({
//           history: state.history.filter((item) => now - item.createdAt < SEARCH_EXPIRE_TIME),
//         }));
//       },
//       addSearch: (keyword) => {
//         const now = Date.now();
//         set((state) => {
//           // xoa nhung keyword da het time va keyword old
//           const history = state.history.filter(
//             (item) => now - item.createdAt < SEARCH_EXPIRE_TIME && item.keyword.toLowerCase() !== keyword.toLowerCase(),
//           );

//           return {
//             history: [
//               {
//                 id: `${now}-${Math.random()}`,
//                 keyword: keyword,
//                 createdAt: now,
//               },
//               ...history,
//             ],
//           };
//         });
//         scheduleHistoryCleanup(() => {
//           set({ history: [] });
//         });
//       },
//       removeSearch: (id) => {
//         set((state) => ({ history: state.history.filter((item) => item.id !== id) }));
//       },
//       clearHistory: () => {
//         set({
//           history: [],
//         });
//       },
//     }),
//     {
//       name: 'search-history-storage',
//       storage: createJSONStorage(() => zustandStorage),
//       partialize: (state) => ({ history: state.history }),
//       onRehydrateStorage: () => (state) => {
//         state?.cleanExpired();
//       },
//     },
//   ),
// );

import { create } from 'zustand';

const SEARCH_EXPIRE_TIME = 15 * 60 * 1000;

let expireTimer: ReturnType<typeof setTimeout> | undefined;

const scheduleHistoryCleanup = (clearHistory: () => void) => {
  if (expireTimer) {
    clearTimeout(expireTimer);
  }

  expireTimer = setTimeout(() => {
    clearHistory();
    expireTimer = undefined;
  }, SEARCH_EXPIRE_TIME);
};

export type SearchHistoryItem = {
  id: string;
  keyword: string;
  createdAt: number;
};

export type SearchState = {
  history: SearchHistoryItem[];
  addSearch: (keyword: string) => void;
  removeSearch: (id: string) => void;
  clearHistory: () => void;
  cleanExpired: () => void;
};

export const useSearchStore = create<SearchState>((set) => ({
  history: [],

  cleanExpired: () => {
    const now = Date.now();

    set((state) => ({
      history: state.history.filter((item) => now - item.createdAt < SEARCH_EXPIRE_TIME),
    }));
  },

  addSearch: (keyword) => {
    const now = Date.now();

    set((state) => {
      const history = state.history.filter(
        (item) => now - item.createdAt < SEARCH_EXPIRE_TIME && item.keyword.toLowerCase() !== keyword.toLowerCase(),
      );

      return {
        history: [
          {
            id: `${now}-${Math.random()}`,
            keyword,
            createdAt: now,
          },
          ...history,
        ],
      };
    });

    scheduleHistoryCleanup(() => {
      set({ history: [] });
    });
  },

  removeSearch: (id) => {
    set((state) => ({
      history: state.history.filter((item) => item.id !== id),
    }));
  },

  clearHistory: () => {
    set({ history: [] });

    if (expireTimer) {
      clearTimeout(expireTimer);
      expireTimer = undefined;
    }
  },
}));
