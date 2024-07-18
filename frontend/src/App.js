import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Particle from './Particle';
import Tay from './Tay';

function App() {
  const [entered, setEntered] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [bioIndex, setBioIndex] = useState(0);
  const [bioMessages] = useState([
    "Moderator @ Extralife.gg",
    "Fullstack Web Developer",
    "Experience in many languages",
    "Fuck guns.lol",
  ]);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [particles, setParticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [discordInfo, setDiscordInfo] = useState({
    name: "Failed to fetch server info",
    onlineMembers: "?",
    members: "?",
    icon: "",
  });

  const discordInviteId = "KA6aTRcbXD";
  const discordInvite = `discord.gg/${discordInviteId}`;

  useEffect(() => {
    fetchDiscordInfo(); // Fetch Discord server info on component mount
  }, []);

  const fetchDiscordInfo = () => {
    fetch(`https://discord.com/api/v8/invites/${discordInviteId}?with_counts=true`)
      .then((response) => response.json())
      .then((json) => {
        const guild = json.guild;
        const discordGuildId = guild.id;
        const discordName = guild.name;
        const discordIconHash = guild.icon;
        const discordIcon = `https://cdn.discordapp.com/icons/${discordGuildId}/${discordIconHash}.png`;
        const discordMembers = json.approximate_member_count;
        const discordOnlineMembers = json.approximate_presence_count;

        setDiscordInfo({
          name: discordName,
          onlineMembers: discordOnlineMembers,
          members: discordMembers,
          icon: discordIcon,
        });

        console.log("Guild ID:", discordGuildId);
        console.log("Guild Name:", discordName);
        console.log("Guild Icon URL:", discordIcon);
        console.log("Member Count:", discordMembers);
        console.log("Online Member Count:", discordOnlineMembers);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const handleEnterClick = () => {
    setFadeOut(true);
    setTimeout(() => {
      setEntered(true);
      document.getElementById('background-video').play();
    }, 500);
  };

  const handleMouseMove = (event) => {
    if (!entered) return;

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
    setLoading(false);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={
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
            <video className="background-video" id='background-video' autoPlay loop preload="auto" onLoadedData={handleVideoLoad}>
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
                      <div className="bio-text">{bioMessages[bioIndex]}</div>
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
                  <div className="divider"></div>
                  <div className="discord-invite">
                    <div className="discord-info">
                      <img className="discord-server-image" src={discordInfo.icon} alt="Icon" />
                      <div className="discord-text">
                        <p className="discordName">{discordInfo.name}</p>
                        <p className="discordOnlineMembers">{`${discordInfo.onlineMembers} Online`}</p>
                        <p className="discordMembers">{`${discordInfo.members} Members`}</p>
                      </div>
                    </div>
                    <a className="join-button" href={`https://discord.gg/${discordInviteId}`} target="_blank" rel="noopener noreferrer">Join Server</a>
                  </div>
                </div>
              </header>
            )}
            {particles.map((particle) => (
              <Particle key={particle.id} x={particle.x} y={particle.y} />
            ))}
          </div>
        } />
        <Route path="/tay" element={<Tay />} />
      </Routes>
    </Router>
  );
}

export default App;
