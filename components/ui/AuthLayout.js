// components/ui/AuthLayout.js
// components/ui/Layout.js
import Header from "components/home/Header";
import Footer from "components/Footer";
// ...
// این یک Layout بسیار ساده است که هیچ هدر و فوتری ندارد
// و فقط محتوای صفحه را در مرکز نمایش می‌دهد.
const AuthLayout = ({ children }) => {
  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-50">
      {children}
    </main>
  );
};

export default AuthLayout;