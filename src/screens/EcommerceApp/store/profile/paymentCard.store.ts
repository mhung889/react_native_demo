import { create } from 'zustand';

export interface PaymentCardItem {
  id: number;
  nameCard: string;
  cardNumber: string;
  expireDate: string;
  cvv: string;
  isDefault: boolean;
}

interface PaymentCardStoreProps {
  paymentList: PaymentCardItem[];
  addPaymentMethod: (newCard: PaymentCardItem) => void;
  deletePaymentMethod: (id: number) => void;
  setDefaultPayment: (id: number) => void;
  clearAll: () => void;
}

export const usePaymentCardStore = create<PaymentCardStoreProps>((set) => ({
  paymentList: [],

  addPaymentMethod: (newCard) => {
    set((state) => {
      // check existing cardNumber
      const existingCard = state.paymentList.find((item) => item.cardNumber === newCard.cardNumber);
      if (existingCard) {
        return state;
      }
      return {
        paymentList: newCard.isDefault
          ? [newCard, ...state.paymentList.map((item) => ({ ...item, isDefault: false }))]
          : [...state.paymentList, newCard],
      };
    });
  },

  deletePaymentMethod: (id) => {
    set((state) => {
      const deleteCard = state.paymentList.find((item) => item.id === id);
      if (!deleteCard) {
        return state;
      }
      const remainingCards = state.paymentList.filter((item) => item.id !== id);
      if (!deleteCard.isDefault) {
        return {
          paymentList: remainingCards,
        };
      }
      return {
        paymentList: remainingCards.map((item, index) => ({
          ...item,
          isDefault: index === 0,
        })),
      };
    });
  },

  setDefaultPayment: (id) => {
    set((state) => {
      const selectedCard = state.paymentList.find((item) => item.id === id);
      if (!selectedCard) {
        return state;
      }
      if (selectedCard.isDefault) {
        return {
          paymentList: state.paymentList.map((item) => ({
            ...item,
            isDefault: false,
          })),
        };
      }
      return {
        paymentList: state.paymentList.map((item) => ({
          ...item,
          isDefault: item.id === id,
        })),
      };
    });
  },

  clearAll: () => {
    set({
      paymentList: [],
    });
  },
}));
