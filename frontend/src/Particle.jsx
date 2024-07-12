// Particle.jsx

import React, { useEffect } from 'react';
import './Particle.css';

const Particle = ({ x, y }) => {
  useEffect(() => {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;
    document.body.appendChild(particle);

    setTimeout(() => {
      particle.remove();
    }, 1000); // Remove particle after 1 second

    return () => {
      particle.remove();
    };
  }, [x, y]);

  return null;
};

export default Particle;
