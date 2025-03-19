export type Booking = {
  _id?: string | undefined;
  email: string;
  phone: string;
  first_name: string;
  last_name: string;
  service_id: string | number;
  service_name: string;
  amount: number;
  date: string;
  transaction_id: string;
  status: "paid";
  admin_confirmation: "pending" | "confirmed";
  country: string;
  state: string;
  city: string;
  postal_code: string;
};
