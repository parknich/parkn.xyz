import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Particle from "./Particle"; // Import the Particle component
import Tay from "./Tay";
import Badge from "./Badge"; // Import the Badge component
import ViewCounter from './ViewCounter';  // Import the counter

function App() {
  const [entered, setEntered] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [bioIndex, setBioIndex] = useState(0);
  const [bioMessages] = useState([
    "Moderator @ SMOTrickjumping",
    "Trackmania Player",
    "Dogshit programmer",
    "Genderfluid & Bisexual",
    "Fuck guns.lol",
  ]);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [particles, setParticles] = useState([]);
  const [loading, setLoading] = useState(true); // State to manage loading screen

  const [discordData, setDiscordData] = useState({
    name: "Failed to fetch server info",
    icon: "",
    members: "? Members",
    onlineMembers: "? Online",
  });

  const discordInviteId = "KA6aTRcbXD";
  const discordInvite = `https://discord.gg/${discordInviteId}`;

  // Add badges here in an array for easier management
  const badges = [
    // { image: "/steam-icon.png", hoverText: "Owner" },
    // Add more badges easily by adding more objects
  ];

  function getDiscordStuff() {
    fetch(
      `https://discord.com/api/v8/invites/${discordInviteId}?with_counts=true`
    )
      .then((response) => response.json())
      .then((json) => {
        const jsonObjectGuild = json.guild;
        const discordGuildId = jsonObjectGuild.id;
        const discordName = jsonObjectGuild.name;
        const discordIconHash = jsonObjectGuild.icon;
        const discordIcon = `https://cdn.discordapp.com/icons/${discordGuildId}/${discordIconHash}.png`;
        const discordMembers = `${json.approximate_member_count} Members`;
        const discordOnlineMembers = `${json.approximate_presence_count} Online`;

        setDiscordData({
          name: discordName,
          icon: discordIcon,
          members: discordMembers,
          onlineMembers: discordOnlineMembers,
        });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  useEffect(() => {
    getDiscordStuff(); // Call the function only once when the component mounts
  }, []);

  useEffect(() => {
    if (!entered) return;

    const bioTextElement = document.querySelector(".bio-text");
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

    const interval = setInterval(
      type,
      isDeleting ? backspaceSpeed : typingSpeed
    );
    return () => clearInterval(interval);
  }, [entered, bioIndex, charIndex, isDeleting, bioMessages]);

  const handleEnterClick = () => {
    setFadeOut(true);
    setTimeout(() => {
      setEntered(true);
      document.getElementById("background-video").play();
    }, 500); // Match this duration with the CSS transition duration
  };
  const bioBox = document.querySelector(".bio-box");
  const app = document.querySelector(".App");
  let tiltTimeout;
  // Handle mouse movement for tilt and particle effects
  const handleMouseMove = (event) => {
    if (!entered) return;

    const { clientX, clientY } = event;
    const { left, top, width, height } = bioBox.getBoundingClientRect();

    if (
      clientX > left &&
      clientX < left + width &&
      clientY > top &&
      clientY < top + height
    ) {
      const xPos = clientX - (left + width / 2);
      const yPos = clientY - (top + height / 2);

      const rotateX = (-yPos / height) * 20;
      const rotateY = (xPos / width) * 20;

      bioBox.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      bioBox.style.transition = "transform 0.1s"; // Smooth while moving
      clearTimeout(tiltTimeout);
    } else {
      bioBox.style.transition = "transform 0.3s ease"; // Smooth snap-back
      bioBox.style.transform = `rotateX(0deg) rotateY(0deg)`;

      tiltTimeout = setTimeout(() => {
        bioBox.style.transition = ""; // Reset transition after snapping back
      }, 300);
    }

    const particle = { id: Date.now(), x: clientX, y: clientY };
    setParticles((prevParticles) => [...prevParticles, particle]);
  };
  const profileLinks = [
    {
      name: "Discord",
      icon: "/dicsord-icon.png",
      url: "https://discord.com/users/556850704770138114",
    },
    {
      name: "Roblox",
      icon: "/roblox-icon.svg",
      url: "https://www.roblox.com/users/907533511/profile",
    },
    {
      name: "NameMC",
      icon: "/namemc-icon.png",
      url: "https://namemc.com/profile/parknich.1",
    },
    {
      name: "YouTube",
      icon: "/youtube-icon.svg",
      url: "https://www.youtube.com/parknich081",
    },
    {
      name: "Reddit",
      icon: "/reddit-icon.svg",
      url: "https://www.reddit.com/u/parknich081",
    },
  ];

  const handleVideoLoad = () => {
    setLoading(false); // Set loading to false when video is loaded
  };

  useEffect(() => {
    const app = document.querySelector(".App");
    app.addEventListener("mousemove", handleMouseMove);

    return () => {
      // Clean up the event listener when the component unmounts
      app.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(tiltTimeout);
    };
  }, [entered]);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div className="App" onMouseMove={handleMouseMove}>
              <script
                async
                src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9394690619698484"
                crossorigin="anonymous"
              ></script>
              {loading && (
                <div className="loading-screen">
                  <div className="loading-spinner"></div>
                  <p>Loading...</p>
                </div>
              )}
              {!loading && !entered && (
                <div
                  className={`enter-screen ${fadeOut ? "hidden" : ""}`}
                  style={{ opacity: fadeOut ? 0 : 1 }}
                  onClick={handleEnterClick}
                >
                  click to enter
                </div>
              )}
              <video
                className="background-video"
                id="background-video"
                autoPlay
                loop
                preload="auto"
                onLoadedData={handleVideoLoad}
              >
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
                        <div className="username-badges-container">
                          <div className="username">park</div>
                          <div className="badges">
                            {badges.map((badge, index) => (
                              <Badge
                                key={index}
                                image={badge.image}
                                hoverText={badge.hoverText}
                              />
                            ))}
                          </div>
                        </div>
                        <div className="bio-text"></div>
                      </div>
                    </div>
                    <div className="profile-links">
                      {profileLinks.map((link, index) => (
                        <div
                          className={`profile-link ${link.name.toLowerCase()}`}
                          key={index}
                        >
                          <a
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <img
                              src={link.icon}
                              alt={link.name}
                              className={`profile-link-icon ${link.name.toLowerCase()}`}
                            />
                          </a>
                        </div>
                      ))}
                    </div>
                    <div className="divider"></div>
                    <div className="discord-invite">
                      <div className="discord-info">
                        <img
                          className="discord-server-image"
                          src={discordData.icon}
                          alt="Icon"
                        />
                        <div className="discord-text">
                          <p className="discordName">{discordData.name}</p>
                          <p className="discordOnlineMembers">
                            {discordData.onlineMembers}
                          </p>
                          <p className="discordMembers">
                            {discordData.members}
                          </p>
                        </div>
                      </div>
                      <a
                        className="join-button"
                        href={discordInvite}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Join Server
                      </a>
                    </div>
                    <div className="webad">
                      <p>
                        Want a website like this? Contact me on discord or via
                        contact@parknich.xyz
                      </p>
                    </div>
                  </div>
                </header>
              )}
              {/* Render particles */}
              {particles.map((particle) => (
                <Particle key={particle.id} x={particle.x} y={particle.y} />
              ))}
            </div>
          }
        />
        <Route path="/tay" element={<Tay />} />
      </Routes>
    </Router>
  );
}

export default App;
