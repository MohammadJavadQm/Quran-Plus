import React from 'react';
import Head from 'next/head';
import Layout from 'components/Layout';
import AuthForm from 'components/AuthForm';

const SignupPage = () => {
    return (
        <>
            <Head>
                <title>Signup - QuranPlus</title>
            </Head>
            <Layout>
                <AuthForm isLogin={false} />
            </Layout>
        </>
    );
};

export default SignupPage;
