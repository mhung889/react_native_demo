import { create } from 'zustand';

export type AddressItem = {
  id: string;
  fullName: string;
  phoneNumber: string;
  address: {
    street: string;
    ward: string;
    province: string;
  };
  isDefault: boolean;
};

type AddressStoreType = {
  addressList: AddressItem[];
  addAddress: (address: AddressItem) => void;
  removeAddress: (id: string) => void;
  updateAddress: (address: Partial<AddressItem>) => void;
  clearAll: () => void;
};

export const useAddressStore = create<AddressStoreType>((set) => ({
  addressList: [],
  addAddress: (address) => {
    set((state) => {
      return {
        addressList: address.isDefault
          ? [address, ...state.addressList.map((item) => ({ ...item, isDefault: false }))]
          : [...state.addressList, address],
      };
    });
  },
  updateAddress: (address) => {
    set((state) => {
      const updatedList = state.addressList.map((item) => {
        if (item.id === address.id) {
          return {
            ...item,
            ...address,
            address: {
              ...item.address,
              ...address.address,
            },
            isDefault: address.isDefault ?? item.isDefault,
          };
        }

        if (address.isDefault === true) {
          return {
            ...item,
            isDefault: false,
          };
        }

        return item;
      });

      if (address.isDefault === true) {
        const defaultAddress = updatedList.find((item) => item.id === address.id);

        if (defaultAddress) {
          return {
            addressList: [defaultAddress, ...updatedList.filter((item) => item.id !== address.id)],
          };
        }
      }

      return {
        addressList: updatedList,
      };
    });
  },
  removeAddress: (id) => {
    set((state) => {
      const remaning = state.addressList.filter((item) => item.id !== id);
      if (remaning.length === 0) {
        return {
          addressList: [],
        };
      }
      const hasDefault = remaning.some((item) => item.isDefault);
      if (!hasDefault) {
        remaning[0] = {
          ...remaning[0],
          isDefault: true,
        };
      }
      return {
        addressList: remaning,
      };
    });
  },

  clearAll: () => {
    set({ addressList: [] });
  },
}));
