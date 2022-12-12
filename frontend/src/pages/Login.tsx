import React from 'react';

const Login = () => {
  console.log('login rendered...');
  return (
    <div className="wrapper h-screen w-screen flex items-center justify-center p-10">
      <div
        className={`w-96 mx-auto bg-white shadow-md p-7 border border-gray-100 space-y-4`}
      >
        Login
      </div>
    </div>
  );
};

export default Login;
