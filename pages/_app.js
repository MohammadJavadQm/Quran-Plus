// pages/_app.js
import Layout from 'components/Layout';
// ThemeProvider را از فایل ThemeToggle وارد می‌کنیم
import { ThemeProvider } from 'components/ThemeToggle';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => <Layout>{page}</Layout>);

  return (
    <ThemeProvider>
      {getLayout(<Component {...pageProps} />)}
    </ThemeProvider>
  );
}

export default MyApp;