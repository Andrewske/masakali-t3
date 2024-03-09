import { persist } from 'zustand/middleware';
import { create } from 'zustand';

export type UserState = {
  user: {
    fullName: string;
    email: string;
    phone: string;
    adults: number;
    children: number;
    address: {
      address1: string;
      address2: string | undefined;
      city: string;
      region: string;
      zip_code: string;
      country: string;
    };
  };
  _hasHydrated?: boolean;
};

export type UserActions = {
  setUser: (user: UserState['user']) => void;
  setHasHydrated: (hasHydrated: boolean) => void;
};

export type UserStore = UserState & UserActions;

export const initUserStore = (): UserState => {
  return {
    user: {
      fullName: '',
      email: '',
      phone: '',
      adults: 2,
      children: 0,
      address: {
        address1: '',
        address2: '',
        city: '',
        region: '',
        country: '',
        zip_code: '',
      },
    },
    _hasHydrated: false,
  };
};

export const defaultInitialState: UserState = {
  user: {
    fullName: '',
    email: '',
    phone: '',
    adults: 0,
    children: 0,
    address: {
      address1: '',
      address2: '',
      city: '',
      region: '',
      zip_code: '',
      country: '',
    },
  },
  _hasHydrated: false,
};
export const createUserStore = (initState: UserState = defaultInitialState) => {
  return create(
    persist(
      (set) => ({
        ...initState,
        setUser: (user: UserState['user']) => {
          set({ user });
          console.log('State set:', user);
        },
      }),
      {
        name: 'user-storage', // name of item in the storage (must be unique)
        // partialize: (state: UserStore) => ({ user: state.user }),
        // storage: sessionStorage,
      }
    )
  );
};
