import { useRouter } from 'next/router';
import Head from 'next/head';
import AuthForm from '../components/ui/AuthForm';

export default function SignupPage() {
  const router = useRouter();

  const handleBack = () => router.push('/');
  const handleSubmit = (e) => { e.preventDefault(); console.log('Signup'); };
  const navigateToLogin = () => router.push('/loginpage');

  return (
    <>
      <Head>
        <title>ایجاد حساب کاربری</title>
      </Head>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', padding: '1rem' }}>
        <AuthForm
          type="signup"
          onBack={handleBack}
          title="ایجاد حساب جدید"
          onSubmit={handleSubmit}
          onToggleForm={navigateToLogin}
        />
      </div>
    </>
  );
}