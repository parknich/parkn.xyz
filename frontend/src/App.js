import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [entered, setEntered] = useState(false);
  const [bioIndex, setBioIndex] = useState(0);
  const [bioMessages, setBioMessages] = useState([
    "Moderator @ Extralife.gg",
    "Fullstack Web Developer",
    "Experience in many languages",
  ]);

  useEffect(() => {
    if (entered) {
      const bioTextElement = document.querySelector('.bio-text');
      const currentMessage = bioMessages[bioIndex];
      const typingSpeed = 100; // Typing speed (milliseconds per character)
      const backspaceSpeed = 50; // Backspacing speed (milliseconds per character)
      const pauseBeforeTyping = 1000; // Pause before starting to backspace (milliseconds)
      const backspaceDelay = 1000; // Delay before starting backspace (milliseconds)
      let charIndex = 0;
      let isDeleting = false;

      const typingInterval = setInterval(() => {
        if (charIndex <= currentMessage.length && !isDeleting) {
          bioTextElement.textContent = currentMessage.substring(0, charIndex);
          charIndex++;
        } else if (charIndex > 0) {
          setTimeout(() => {
            bioTextElement.textContent = currentMessage.substring(0, charIndex - 1);
            charIndex--;
            isDeleting = true;
          }, backspaceDelay);
        } else {
          isDeleting = false;
          clearInterval(typingInterval);
          setTimeout(() => {
            setBioIndex((prevIndex) => (prevIndex + 1) % bioMessages.length);
            charIndex = 0; // Reset charIndex to start typing new message
          }, pauseBeforeTyping);
        }
      }, typingSpeed);

      return () => clearInterval(typingInterval);
    }
  }, [entered, bioIndex, bioMessages]);

  const handleEnterClick = () => {
    setEntered(true);
    document.getElementById('background-audio').play();
  };

  const profileLinks = [
    { name: 'Discord', icon: '/discord-icon.png', url: 'https://discord.com/users/556850704770138114' },
    { name: 'Roblox', icon: '/roblox-icon.svg', url: 'https://www.roblox.com/users/907533511/profile' },
    { name: 'NameMC', icon: '/namemc-icon.svg', url: 'https://namemc.com/profile/parknich.1' },
    { name: 'YouTube', icon: '/youtube-icon.svg', url: 'https://www.youtube.com/parknich081' },
    { name: 'Reddit', icon: '/reddit-icon.svg', url: 'https://www.reddit.com/u/parknich081' },
    { name: 'Guns', icon: '/guns-icon.png', url: 'https://www.guns.lol/parkn' }
  ];

  return (
    <div className="App">
      {!entered && (
        <div className="enter-screen" onClick={handleEnterClick}>
          click to enter
        </div>
      )}
      <video className="background-video" autoPlay loop>
        <source src="/bg2.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <audio id="background-audio" muted>
        <source src="/bg2.mp3" type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>
      {entered && (
        <header className="App-header">
          <div className="bio-box">
            <div className="profile-header">
              <img src="/pfp.png" alt="Profile" />
              <div>
                <div className="username">park</div>
                <div className="bio-text"></div>
              </div>
            </div>
            <div className="profile-links">
              {profileLinks.map((link, index) => (
                <div className={`profile-link ${link.name.toLowerCase()}`} key={index}>
                  <a href={link.url} target="_blank" rel="noopener noreferrer">
                    <img src={link.icon} alt={link.name} className={`profile-link-icon ${link.name.toLowerCase()}`} />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </header>
      )}
    </div>
  );
}

export default App;
