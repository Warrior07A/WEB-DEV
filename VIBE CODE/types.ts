
import { z } from 'zod';

// --- Zod Schemas for Validation ---

export const SignupSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
});

export const SigninSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

export const BookingSchema = z.object({
  carId: z.string().uuid(),
  startDate: z.string(),
  endDate: z.string(),
  totalPrice: z.number().positive(),
});

export type SignupInput = z.infer<typeof SignupSchema>;
export type SigninInput = z.infer<typeof SigninSchema>;
export type BookingInput = z.infer<typeof BookingSchema>;

// --- Application Types ---

export interface User {
  id: string;
  email: string;
  name: string;
}

export interface Car {
  id: string;
  brand: string;
  model: string;
  year: number;
  type: 'SUV' | 'Sedan' | 'Luxury' | 'Sports' | 'EV';
  pricePerDay: number;
  imageUrl: string;
  transmission: 'Automatic' | 'Manual';
  seats: number;
}

export interface Booking {
  id: string;
  userId: string;
  carId: string;
  car?: Car;
  startDate: string;
  endDate: string;
  totalPrice: number;
  status: 'confirmed' | 'cancelled' | 'completed';
}

export interface AuthState {
  user: User | null;
  token: string | null;
}
