import type { PropsWithChildren } from 'react';
import { Navigate } from 'react-router';
import { useAuthStore } from '../../auth/store/auth.store';

export const AuthenticatedRoute = ({ children }: PropsWithChildren) => {
  const { authStatus } = useAuthStore();
  
  if (authStatus === 'checking') return null;

  if (authStatus === 'not-authenticated') return <Navigate to="/login" />;

  return children;
};

export const NotAuthenticatedRoute = ({ children }: PropsWithChildren) => {
  const { authStatus } = useAuthStore();
  
  if (authStatus === 'checking') return null;

  if (authStatus === 'authenticated') return <Navigate to="/debts" />;

  return children;
};