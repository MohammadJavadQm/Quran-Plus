// pages/_app.js
import 'styles/globals.css';
function MyApp({ Component, pageProps }) {
  return (
    <div dir="ltr">
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;