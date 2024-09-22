import React from 'react';

// Badge component
function Badge({ image, hoverText }) {
  return (
    <div className="badge-container">
      <img src={image} alt="Badge" className="badge-image" />
      <div className="badge-hover-text">{hoverText}</div>
    </div>
  );
}

export default Badge;
