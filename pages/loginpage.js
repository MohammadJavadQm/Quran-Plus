import React from 'react';
import Head from 'next/head';
import Layout from 'components/Layout';
// ما یک کامپوننت فرم جداگانه می‌سازیم تا کد تمیز باشد
import AuthForm from 'components/AuthForm';

const LoginPage = () => {
    return (
        <>
            <Head>
                <title>Login - QuranPlus</title>
            </Head>
            <Layout>
                <AuthForm isLogin />
            </Layout>
        </>
    );
};

export default LoginPage;