export interface User {
  id: number;
  email: string;
  password: string;
}

export interface Donor {
  id?: number;
  name: string;
  email: string;
  phone?: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface Donation {
  id?: number;
  donor_id: number;
  amount: number;
  donation_date?: Date;
  created_at?: Date;
  updated_at?: Date;
}

export interface Communication {
  id?: number;
  donor_id: number;
  message: string;
  communication_date?: Date;
  created_at?: Date;
  updated_at?: Date;
}