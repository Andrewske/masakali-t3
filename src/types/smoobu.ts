export type SmoobuReservation = {
  id: number;
  'reference-id': string;
  type: string;
  arrival: string;
  departure: string;
  'created-at': string;
  modifiedAt: string;
  apartment: {
    id: number;
    name: string;
  };
  channel: {
    id: number;
    name: string;
  };
  'guest-name': string;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  adults: number;
  children: number;
  'check-in': string;
  'check-out': string;
  notice: string;
  'assistant-notice': string;
  price: number;
  'price-paid': string;
  'commission-included': number;
  prepayment: string;
  'prepayment-paid': string;
  deposit: null;
  'deposit-paid': string;
  language: string;
  'guest-app-url': string;
  'is-blocked-booking': boolean;
  guestId: number;
};

export type SmoobuReservationsResponse = {
  page_count: number;
  page_size: number;
  total_items: number;
  page: 1;
  bookings: SmoobuReservation[];
};
