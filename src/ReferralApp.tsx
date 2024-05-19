import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './ReferralApp.css';  
import { useAuth0 } from '@auth0/auth0-react';
import Content from './components/Content';
import Login from './components/Login';
import LogoutButton from './components/Logout';
import LandingPage from './components/LandingPage';

const baseUrl = 'https://copy-paste-refer.azurewebsites.net';
/*const baseUrl = 'http://localhost:8000';*/

const ReferralApp: React.FC = () => {
  const [referralTo, setReferralTo] = useState('');
  const [reasonForReferral, setReasonForReferral] = useState('');
  const [notes, setNotes] = useState('');
  const [referralResponse, setReferralResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Loading state

  const { isAuthenticated, getAccessTokenSilently, logout } = useAuth0();

  const handleGenerateReferral = async () => {
    setIsLoading(true); // Set loading state to true
    const formattedNotes = `Referral to: ${referralTo}\nReason for referral: ${reasonForReferral}\n\n${notes}`;
    const payload = { content: formattedNotes };

    try {
      const token = await getAccessTokenSilently();
      const response = await fetch(`${baseUrl}/generate-referral/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      if (data.message) {
        setReferralResponse(data.message);
      } else {
        setReferralResponse(`Run Status: ${data.status}`);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error(`Failed to generate referral: ${error.message}`);
        setReferralResponse(`Error: ${error.message}`);
      }
    } finally {
      setIsLoading(false); // Set loading state to false
    }
  };

  return (
    <>
      {!isAuthenticated && <LandingPage />}
      {isAuthenticated && (
        <div className="App">
          <div className="App-header">
            <div className="Logout-container">
              <LogoutButton />
            </div>
            <h1>Copy-Paste-Refer</h1>
            <Content
              referralTo={referralTo}
              setReferralTo={setReferralTo}
              reasonForReferral={reasonForReferral}
              setReasonForReferral={setReasonForReferral}
              notes={notes}
              setNotes={setNotes}
              referralResponse={referralResponse}
              setReferralResponse={setReferralResponse}
              handleGenerateReferral={handleGenerateReferral}
              isLoading={isLoading} // Pass loading state
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ReferralApp;
