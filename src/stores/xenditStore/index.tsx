import { create } from 'zustand';

interface XenditState {
  payerAuthUrl: string | null;
  showModal: boolean;
  error: string | null;
  token: string | null;
  paymentSuccess: boolean;
  setPayerAuthUrl: (url: string | null) => void;
  setShowModal: (show: boolean) => void;
  setError: (error: string | null) => void;
  setToken: (token: string | null) => void;
  setPaymentSuccess: (success: boolean) => void;
}

export const useXenditStore = create<XenditState>((set) => ({
  payerAuthUrl: null,
  showModal: false,
  error: null,
  token: null,
  paymentSuccess: false,
  setPayerAuthUrl: (url) => set({ payerAuthUrl: url }),
  setShowModal: (show) => set({ showModal: show }),
  setError: (error) => set({ error }),
  setToken: (token) => set({ token }),
  setPaymentSuccess: (success) => set({ paymentSuccess: success }),
}));
