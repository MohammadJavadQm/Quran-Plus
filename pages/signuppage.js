import React from 'react';
import { useRouter } from 'next/router';
import { SignupForm } from '../components/SignupForm';

export default function SignupPage() {
  const router = useRouter();
  
  const handleBack = () => {
    router.back();
  };

  const handleSignupSuccess = () => {
    // بعد از ثبت‌نام موفق، کاربر به صفحه ورود منتقل می‌شود
    router.push('/loginpage');
  };

  return (
    <SignupForm 
      onBack={handleBack} 
      onSwitchToLogin={() => router.push('/loginpage')}
      onSignupSuccess={handleSignupSuccess}
    />
  );
}