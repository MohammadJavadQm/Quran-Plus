import React from 'react';
import { useRouter } from 'next/router';
import { LoginForm } from '../components/LoginForm';

export default function LoginPage() {
  const router = useRouter();
  
  const handleBack = () => {
    router.back();
  };

  const handleLoginSuccess = () => {
    // You can add logic here to redirect the user to another page after a successful login.
    // For example:
    // router.push('/dashboard');
  };

  return (
    <LoginForm 
      onBack={handleBack} 
      onSwitchToSignup={() => router.push('/signuppage')}
      onLoginSuccess={handleLoginSuccess}
    />
  );
}