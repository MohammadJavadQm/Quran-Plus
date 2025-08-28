// AuthPage.js
import React, { useState } from 'react';
import AuthForm from './AuthForm'; // Import the AuthForm component
// To make the back button work with routing, you'd typically use this:
// import { useNavigate } from 'react-router-dom';

const AuthPage = () => {
  // 1. State to manage which form to show: 'login' or 'signup'
  const [formType, setFormType] = useState('login');
  // const navigate = useNavigate(); // Example for react-router-dom

  // 2. Function to toggle the form type
  const handleToggleForm = () => {
    setFormType(prevType => (prevType === 'login' ? 'signup' : 'login'));
  };
  
  // 3. Placeholder function to handle form submission
  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log(`Submitting ${formType} form...`);
    // Add your login or signup logic here
  };
  
  // 4. Placeholder for back button logic
  const handleBack = () => {
    console.log("Back button clicked!");
    // Example with react-router-dom: navigate(-1);
  };

  return (
    <div style={{ display: 'grid', placeItems: 'center', minHeight: '100vh' }}>
      <AuthForm
        type={formType}
        title={formType === 'login' ? 'Sign In' : 'Create Account'}
        onBack={handleBack}
        onSubmit={handleFormSubmit}
        onToggleForm={handleToggleForm} // Pass the toggle function
      />
    </div>
  );
};

export default AuthPage;