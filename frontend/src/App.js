// App.js

import React, { useState, useEffect } from 'react';
import './App.css';
import Particle from './Particle'; // Import the Particle component

function App() {
  const [entered, setEntered] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [bioIndex, setBioIndex] = useState(0);
  const [bioMessages] = useState([
    "Moderator @ Extralife.gg",
    "Fullstack Web Developer",
    "Experience in many languages",
    "Fuck guns.lol"
  ]);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [particles, setParticles] = useState([]);
  const [loading, setLoading] = useState(true); // State to manage loading screen

  useEffect(() => {
    if (!entered) return;

    const bioTextElement = document.querySelector('.bio-text');
    const currentMessage = bioMessages[bioIndex];
    const typingSpeed = 100; // the milliseconds between each character when typing
    const backspaceSpeed = 50; // the milliseconds between each character when backspacing
    const pauseBeforeTyping = 500; // pause before starting to type after backspacing finished
    const pauseBeforeDeleting = 1000; // pause before starting to backspace

    const type = () => {
      if (!isDeleting && charIndex < currentMessage.length) {
        bioTextElement.textContent = currentMessage.substring(0, charIndex + 1);
        setCharIndex((prev) => prev + 1);
        console.log("setCharIndex((prev) => prev + 1);")
        console.log(bioIndex)
      } else if (!isDeleting && charIndex === currentMessage.length) {
        setTimeout(() => setIsDeleting(true), pauseBeforeDeleting);
        console.log(bioIndex)
        console.log("setTimeout(() => setIsDeleting(true), pauseBeforeDeleting);")
      } else if (isDeleting && charIndex > 0) {
        console.log("setCharIndex((prev) => prev - 1);")
        console.log(bioIndex)
        bioTextElement.textContent = currentMessage.substring(0, charIndex - 1);
        setCharIndex((prev) => prev - 1);
      } else if (isDeleting && charIndex === 0) {
        console.log("setIsDeleting to false & setBioIndex((prev) => (prev + 1) % bioMessages.length);")
        console.log(bioIndex)
        setTimeout(() => {
          setIsDeleting(false);
          setBioIndex((prev) => (prev + 1) % bioMessages.length);
        }, pauseBeforeTyping);
      }
    };

    const interval = setInterval(type, isDeleting ? backspaceSpeed : typingSpeed);
    return () => clearInterval(interval);
  }, [entered, bioIndex, charIndex, isDeleting, bioMessages]);

  const handleEnterClick = () => {
    setFadeOut(true);
    setTimeout(() => {
      setEntered(true);
      document.getElementById('background-audio').play();
    }, 500); // Match this duration with the CSS transition duration
  };

  const handleMouseMove = (event) => {
    if (!entered) return; // Only create particles when entered

    const { clientX, clientY } = event;
    const particle = { id: Date.now(), x: clientX, y: clientY };
    setParticles((prevParticles) => [...prevParticles, particle]);
  };

  const profileLinks = [
    { name: 'Discord', icon: '/discord-icon.png', url: 'https://discord.com/users/556850704770138114' },
    { name: 'Roblox', icon: '/roblox-icon.svg', url: 'https://www.roblox.com/users/907533511/profile' },
    { name: 'NameMC', icon: '/namemc-icon.png', url: 'https://namemc.com/profile/parknich.1' },
    { name: 'YouTube', icon: '/youtube-icon.svg', url: 'https://www.youtube.com/parknich081' },
    { name: 'Reddit', icon: '/reddit-icon.svg', url: 'https://www.reddit.com/u/parknich081' },
  ];

  const handleVideoLoad = () => {
    setLoading(false); // Set loading to false when video is loaded
  };

  return (
    <div className="App" onMouseMove={handleMouseMove}>
      {loading && (
        <div className="loading-screen">
          <div className="loading-spinner"></div>
          <p>Loading...</p>
        </div>
      )}
      {!loading && !entered && (
        <div
          className={`enter-screen ${fadeOut ? 'hidden' : ''}`}
          style={{ opacity: fadeOut ? 0 : 1 }}
          onClick={handleEnterClick}
        >
          click to enter
        </div>
      )}
      <video className="background-video" autoPlay loop preload="auto" onLoadedData={handleVideoLoad}>
        <source src="/bg2.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <audio id="background-audio" muted>
        <source src="/bg2.mp3" type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>
      {(entered || fadeOut) && (
        <header className="App-header">
          <div className="bio-box">
            <div className="profile-header">
              <img src="/pfp2.png" alt="Profile" />
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
      {/* Render particles */}
      {particles.map((particle) => (
        <Particle key={particle.id} x={particle.x} y={particle.y} />
      ))}
    </div>
  );
}

export default App;
