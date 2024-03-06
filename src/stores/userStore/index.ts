import { persist, createJSONStorage } from 'zustand/middleware';
import { create } from 'zustand';
import { createStore } from 'zustand/vanilla';
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
};

export type UserActions = {
  setUser: (user: UserState) => void;
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
};

export const createUserStore = (initState: UserState = defaultInitialState) => {
  // Attempt to rehydrate state from session storage
  const rehydratedState = sessionStorage.getItem('user-storage');
  const rehydratedUserState = rehydratedState
    ? (JSON.parse(rehydratedState) as UserState)
    : {};

  // Merge rehydrated state with initial state
  const mergedState = { ...initState, ...rehydratedUserState };

  return createStore<UserStore>()(
    persist(
      (set) => ({
        ...mergedState,
        setUser: (user: UserState) => {
          set(user);
          console.log('State set:', user);
        },
      }),
      {
        name: 'user-storage', // name of item in the storage (must be unique)
        partialize: (state: UserStore) => ({ user: state.user }),
        getStorage: () => window.sessionStorage,
      }
    )
  );
};
