
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SignupSchema, SigninSchema, SignupInput, SigninInput } from '../types';
import { useAuth } from '../App';
import { Link, useNavigate } from 'react-router-dom';

interface AuthPageProps {
  type: 'signin' | 'signup';
}

const AuthPage: React.FC<AuthPageProps> = ({ type }) => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<any>({
    resolver: zodResolver(type === 'signup' ? SignupSchema : SigninSchema)
  });

  const onSubmit = async (data: any) => {
    setError(null);
    try {
      // Simulating API latency
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Simulating JWT token generation
      const fakeToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
      
      if (type === 'signup') {
        login(data.email, data.name, fakeToken);
      } else {
        login(data.email, 'User', fakeToken);
      }
      
      navigate('/');
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center p-4 bg-slate-50">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200 p-8 md:p-12 border border-slate-100">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">
              {type === 'signup' ? 'Create Account' : 'Welcome Back'}
            </h1>
            <p className="text-slate-500">
              {type === 'signup' 
                ? 'Start your premium journey today' 
                : 'Sign in to access your bookings'}
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl text-sm font-medium border border-red-100">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {type === 'signup' && (
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Full Name</label>
                <input 
                  {...register('name')}
                  type="text"
                  placeholder="John Doe"
                  className={`w-full px-4 py-3 bg-slate-50 border ${errors.name ? 'border-red-300' : 'border-slate-200'} rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all`}
                />
                {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message as string}</p>}
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
              <input 
                {...register('email')}
                type="email"
                placeholder="john@example.com"
                className={`w-full px-4 py-3 bg-slate-50 border ${errors.email ? 'border-red-300' : 'border-slate-200'} rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all`}
              />
              {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message as string}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Password</label>
              <input 
                {...register('password')}
                type="password"
                placeholder="••••••••"
                className={`w-full px-4 py-3 bg-slate-50 border ${errors.password ? 'border-red-300' : 'border-slate-200'} rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all`}
              />
              {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password.message as string}</p>}
            </div>

            <button 
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all active:scale-[0.98] flex items-center justify-center disabled:opacity-70"
            >
              {isSubmitting ? (
                <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                type === 'signup' ? 'Sign Up' : 'Sign In'
              )}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-slate-100 text-center text-sm">
            <span className="text-slate-500">
              {type === 'signup' ? 'Already have an account?' : "Don't have an account?"}
            </span>
            <Link 
              to={type === 'signup' ? '/signin' : '/signup'}
              className="ml-1 text-blue-600 font-bold hover:underline"
            >
              {type === 'signup' ? 'Sign In' : 'Sign Up'}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
