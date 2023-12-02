import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useStore = create(
  persist(
    (set, get) => ({
      guestInfo: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
      },
      address: {
        address1: '',
        address2: '',
        city: '',
        state: '',
        country: '',
        zip_code: '',
      },
      reservation: {
        villaId: 0,
        checkIn: '',
        checkOut: '',
        adults: 0,
        children: 0,
      },
      pricing: {
        pricePerNight: 0,
        taxes: 0,
        discount: 0,
      },
    }),
    { name: 'store' }
  )
);
