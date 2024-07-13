import React, { useState, useEffect } from 'react';
import styles from './Tay.module.css';
import Particle from './Particle'; // Import the Particle component

function Tay() {
  const [entered, setEntered] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [bioIndex, setBioIndex] = useState(0);
  const [bioMessages] = useState([
    "Founder @ Haven Community",
    "Community Support @ Cobblemon",
  ]);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [particles, setParticles] = useState([]);
  const [loading, setLoading] = useState(true); // State to manage loading screen

  useEffect(() => {
    if (!entered) return;

    const bioTextElement = document.querySelector(`.${styles.bioText}`);
    const currentMessage = bioMessages[bioIndex];
    const typingSpeed = 100; // the milliseconds between each character when typing
    const backspaceSpeed = 50; // the milliseconds between each character when backspacing
    const pauseBeforeTyping = 500; // pause before starting to type after backspacing finished
    const pauseBeforeDeleting = 1000; // pause before starting to backspace

    const type = () => {
      if (!isDeleting && charIndex < currentMessage.length) {
        bioTextElement.textContent = currentMessage.substring(0, charIndex + 1);
        setCharIndex((prev) => prev + 1);
      } else if (!isDeleting && charIndex === currentMessage.length) {
        setTimeout(() => setIsDeleting(true), pauseBeforeDeleting);
      } else if (isDeleting && charIndex > 0) {
        bioTextElement.textContent = currentMessage.substring(0, charIndex - 1);
        setCharIndex((prev) => prev - 1);
      } else if (isDeleting && charIndex === 0) {
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
      document.getElementById('background-video').play();
    }, 500); // Match this duration with the CSS transition duration
  };

  const handleMouseMove = (event) => {
    if (!entered) return; // Only create particles when entered

    const { clientX, clientY } = event;
    const particle = { id: Date.now(), x: clientX, y: clientY };
    setParticles((prevParticles) => [...prevParticles, particle]);
  };

  const profileLinks = [
    { name: 'Discord', icon: '/discord-icon.png', url: 'https://discord.gg/2UH5dYZck3' },
    { name: 'Roblox', icon: '/roblox-icon.svg', url: 'https://www.roblox.com/users/477601761/profile' },
    { name: 'NameMC', icon: '/namemc-icon.png', url: 'https://namemc.com/profile/MystixMew.1' },
    { name: 'Steam', icon: '/steam-icon.png', url: 'https://steamcommunity.com/id/nukashine/'},
    { name: 'Website', icon: '/website-icon.png', url: 'https://tay.is-a.dev/'}
  ];

  const handleVideoLoad = () => {
    setLoading(false); // Set loading to false when video is loaded
  };

  return (
    <div className={styles.Tay} onMouseMove={handleMouseMove}>
      {loading && (
        <div className={styles.loadingScreen}>
          <div className={styles.loadingSpinner}></div>
          <p className={styles.loadingScreenText}>Loading...</p>
        </div>
      )}
      {!loading && !entered && (
        <div
          className={`${styles.enterScreen} ${fadeOut ? styles.hidden : ''}`}
          style={{ opacity: fadeOut ? 0 : 1 }}
          onClick={handleEnterClick}
        >
          click to enter
        </div>
      )}
      
      <header className={styles.AppHeader}>
        <video id="background-video" className={styles.backgroundVideo} autoPlay loop preload="auto" onLoadedData={handleVideoLoad}>
          <source src="/taybg.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {(entered || fadeOut) && (
          <div className={styles.bioBox}>
            <div className={styles.profileHeader}>
              <img src="/taypfp.png" alt="pfp" className={styles.profileImage} />
              <div>
                <div className={styles.username}>tay</div>
                <div className={styles.bioText}></div>
              </div>
            </div>
            <div className={styles.profileLinks}>
              {profileLinks.map((link, index) => (
                <div className={styles.profileLink} key={index}>
                  <a href={link.url} target="_blank" rel="noopener noreferrer">
                    <img src={link.icon} alt={link.name} className={styles.profileLinkIcon} />
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}
      </header>
      {/* Render particles */}
      {particles.map((particle) => (
        <Particle key={particle.id} x={particle.x} y={particle.y} />
      ))}
    </div>
  );
}

export default Tay;
