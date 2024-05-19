import React, { ReactNode } from 'react';
import { Auth0Provider } from '@auth0/auth0-react';

interface Auth0ProviderWithHistoryProps {
    children: ReactNode;
}

const Auth0ProviderWithHistory: React.FC<Auth0ProviderWithHistoryProps> = ({ children }) => {
    const domain = "dev-h5gcc3c3dv4q4jf0.us.auth0.com";
    const clientId = "oFHF2RWs0Qp7IK5T2Ty0UiivG1WH1b1v";

    return (
        <Auth0Provider
            domain={domain}
            clientId={clientId}
            authorizationParams={{
                redirect_uri: window.location.origin,
                audience: "https://dev-h5gcc3c3dv4q4jf0.us.auth0.com/api/v2/",
                scope: "openid profile email read:current_user",
                prompt: "login" 
            }}
        >
            {children}
        </Auth0Provider>
    );
};

export default Auth0ProviderWithHistory;
