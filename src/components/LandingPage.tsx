import React from 'react';
import './LandingPage.css'; // Import the LandingPage.css
import Login from './Login'; // Ensure Login component is imported

const LandingPage: React.FC = () => {
  return (
    <div className="LandingPage">
      <div className="HeaderImage">
        <img src="https://i.postimg.cc/6QhQjg9D/image.png" alt="Logo" />
      </div>
      <div className="Login-container">
        <Login />
      </div>
      <div className="HeroSection">
        <div className="HeroText">
          <h1>Instant referral letters</h1>
          <h2>Save hundreds of hours of GP and secretary time annually. Copy-paste your notes into the referral generator for succinct, high quality referral letters.</h2>
          <button className="WaitListButton">Join The Wait List</button>
        </div>
      </div>
      <div className="VideoContainer">
        <iframe
          width="1680"
          height="945"
          src="https://www.youtube.com/embed/iPqbVNHlR5I?si=ZeKaByiavQsDgSr9"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Demo Video"
        ></iframe>
      </div>
    </div>
  );
};

export default LandingPage;
