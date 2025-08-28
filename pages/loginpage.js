// pages/loginpage.js

import AuthLayout from 'components/ui/AuthLayout';
import AuthForm from 'components/ui/AuthForm'; // وارد کردن کامپوننت جدید

const LoginPage = () => {
  return (
    // به کامپوننت می‌گوییم که این صفحه، صفحه لاگین است
    <AuthForm isLogin={true} />
  );
};

// این تابع به _app.js می‌گوید که برای این صفحه از AuthLayout استفاده کند
LoginPage.getLayout = function getLayout(page) {
  return <AuthLayout>{page}</AuthLayout>;
};

export default LoginPage;