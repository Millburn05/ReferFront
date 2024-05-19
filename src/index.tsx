import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import ReferralApp from './ReferralApp';
import Auth0ProviderWithHistory from './auth0-provider-with-history';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
      <Auth0ProviderWithHistory>
        <ReferralApp />
      </Auth0ProviderWithHistory>
  </React.StrictMode>
);

reportWebVitals();
