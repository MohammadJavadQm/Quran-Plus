// pages/signuppage.js

import AuthLayout from 'components/ui/AuthLayout';
import AuthForm from 'components/ui/AuthForm'; // وارد کردن کامپوننت جدید

const SignupPage = () => {
  return (
    // به کامپوننت می‌گوییم که این صفحه، صفحه لاگین نیست (یعنی ثبت‌نام است)
    <AuthForm isLogin={false} />
  );
};

// این تابع به _app.js می‌گوید که برای این صفحه از AuthLayout استفاده کند
SignupPage.getLayout = function getLayout(page) {
  return <AuthLayout>{page}</AuthLayout>;
};

export default SignupPage;