import React, { useRef, useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import quotes from './Quotes';  // Import quotes
import './Content.css';  // Import Content.css

interface ContentProps {
  referralTo: string;
  setReferralTo: React.Dispatch<React.SetStateAction<string>>;
  reasonForReferral: string;
  setReasonForReferral: React.Dispatch<React.SetStateAction<string>>;
  notes: string;
  setNotes: React.Dispatch<React.SetStateAction<string>>;
  referralResponse: string;
  setReferralResponse: React.Dispatch<React.SetStateAction<string>>;
  handleGenerateReferral: () => void;
  isLoading: boolean;
}

const Content: React.FC<ContentProps> = ({
  referralTo,
  setReferralTo,
  reasonForReferral,
  setReasonForReferral,
  notes,
  setNotes,
  referralResponse,
  setReferralResponse,
  handleGenerateReferral,
  isLoading,
}) => {
  const quillRef = useRef<ReactQuill | null>(null);
  const [copied, setCopied] = useState(false);
  const [quote, setQuote] = useState('');

  const handleCopyReferral = () => {
    if (quillRef.current) {
      const plainText = quillRef.current.getEditor().getText(); // Get plain text
      navigator.clipboard.writeText(plainText).then(() => {
        setCopied(true); // Show "Copied!" message
        setTimeout(() => setCopied(false), 2000); // Hide message after 2 seconds
      }).catch((err) => {
        console.error('Failed to copy text: ', err);
      });
    }
  };

  useEffect(() => {
    if (isLoading) {
      const interval = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        setQuote(quotes[randomIndex]);
      }, 6000);
      return () => clearInterval(interval);
    }
  }, [isLoading]);

  return (
    <>
       <div className="Confidential">
        <h3>Note: Do not enter any patient identifiable information</h3>
      </div>
      <textarea
        className="ReferralTo"
        value={referralTo}
        onChange={(e) => setReferralTo(e.target.value)}
        placeholder="Referral to"
        rows={1}
        cols={40}
      />
      <textarea
        className="ReasonForReferral"
        value={reasonForReferral}
        onChange={(e) => setReasonForReferral(e.target.value)}
        placeholder="Reason for referral"
        rows={1}
        cols={40}
      />
      <textarea
        className="Notes-input textarea-border"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Enter patient notes here"
        rows={10}
        cols={100}
      />
      {isLoading ? (
        <div className="LoadingQuotes">{quote}</div>
      ) : (
        <button className="GenerateButton" onClick={handleGenerateReferral}>Generate Referral</button>
      )}
      <h2>Referral Letter:</h2>
      <div className="ql-editor">
        <ReactQuill
          ref={quillRef}
          theme="snow"
          value={referralResponse}
          onChange={setReferralResponse}
          readOnly={false}
          modules={{ toolbar: true }}
        />
      </div>
      <button className="CopyReferral" onClick={handleCopyReferral}>Copy Referral</button>
      {copied && <div className="CopiedMessage">Copied!</div>}
    </>
  );
};

export default Content;
