import { create } from 'zustand';

type TransactionState = {
  counts: {
    bears: {
      count: number;
    };
  };

  increment: () => void;
};

const initState = {
  bears: {
    count: 0,
  },
};

export const useBearStore = create<TransactionState>((set) => ({
  counts: initState,

  increment: () => {
    set((state) => ({
      counts: {
        bears: {
          count: state.counts.bears.count + 1,
        },
      },
    }));
  },
}));
