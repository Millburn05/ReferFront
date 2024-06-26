import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import './Login.css';

const Login: React.FC = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <button onClick={() => loginWithRedirect()} className="Login-button">
      Log In
    </button>
  );
};

export default Login;
