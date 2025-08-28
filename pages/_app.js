// pages/_app.js

import { ThemeProvider } from '../components/ThemeToggle';
import '../styles/globals.css';

// این فایل دیگر هیچ منطق Layoutـی ندارد
function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <div dir="rtl">
        <Component {...pageProps} />
      </div>
    </ThemeProvider>
  );
}

export default MyApp;
