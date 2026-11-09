import { create } from 'zustand';

import { CartItem } from '../cart/cart.store';
import { OrderStatus } from '../../types/order';
import { AddressItem } from '../profile/address.store';
import { OrderPaymentMethod } from '../../types/payment-method';

export interface Order {
  id: string;
  items: CartItem[];
  address: AddressItem;
  paymentMethod: OrderPaymentMethod;
  paymentCard?: {
    nameCard: string;
    cardNumber: string;
    expireDate: string;
  };
  totalAmount: number;
  status: OrderStatus;
  createdAt: string;
}

type CreateOrderInput = Omit<Order, 'id' | 'createdAt' | 'status'>;

interface OrderStoreProps {
  orders: Order[];
  addOrder: (order: CreateOrderInput) => string;
  updateOrderStatus: (id: string, status: OrderStatus) => void;
  cancelOrder: (id: string) => void;
  clearOrders: () => void;
}

export const useOrderStore = create<OrderStoreProps>((set) => ({
  orders: [],

  addOrder: (order) => {
    const newOrder: Order = {
      ...order,
      id: `ORDER-${Date.now()}`,
      items: order.items.map((item) => ({ ...item })),
      address: {
        ...order.address,
      },
      paymentCard: order.paymentCard ? { ...order.paymentCard } : undefined,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };
    set((state) => ({
      orders: [newOrder, ...state.orders],
    }));
    return newOrder.id;
  },

  updateOrderStatus: (id, status) => {
    set((state) => ({
      orders: state.orders.map((order) => (order.id === id ? { ...order, status } : order)),
    }));
  },

  cancelOrder: (id) => {
    set((state) => ({
      orders: state.orders.map((order) =>
        order.id === id && order.status === 'pending' ? { ...order, status: 'cancelled' } : order,
      ),
    }));
  },

  clearOrders: () => {
    set({
      orders: [],
    });
  },
}));
