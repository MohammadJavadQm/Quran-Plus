// pages/index.js
import React, { useEffect, useState } from 'react';
import QuranPlusLoading from '../components/QuranPlusLoading';
import HomePage from '../components/HomePage'; // فقط یک بار ایمپورت شود

export default function Index() {
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    // نمایش لودینگ به مدت 3 ثانیه
    const loadingTimeout = setTimeout(() => {
      setShowLoading(false);
    }, 3000);

    // پاکسازی تایمر هنگام unmount شدن کامپوننت
    return () => {
      clearTimeout(loadingTimeout);
    };
  }, []);

  // اگر showLoading true بود، کامپوننت لودینگ را نمایش بده
  if (showLoading) {
    return <QuranPlusLoading />;
  }

  // پس از اتمام زمان لودینگ، کامپوننت HomePage را نمایش بده
  return <HomePage />;
}
