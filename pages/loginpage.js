// pages/loginpage.js (نسخه نهایی و تمیز)

import { useRouter } from 'next/router';
import Head from 'next/head';
import AuthForm from '../components/ui/AuthForm';

export default function LoginPage() {
  const router = useRouter();

  const handleBack = () => router.push('/');
  const handleSubmit = (e) => { e.preventDefault(); console.log('Login'); };
  const navigateToSignup = () => router.push('/signuppage');

  return (
    <>
      <Head>
        <title>ورود به حساب کاربری</title>
      </Head>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', padding: '1rem' }}>
        <AuthForm
          type="login"
          onBack={handleBack}
          title="ورود به حساب"
          onSubmit={handleSubmit}
          onToggleForm={navigateToSignup}
        />
      </div>
    </>
  );
}