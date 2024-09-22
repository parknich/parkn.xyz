import React, { useEffect, useState } from 'react';

const ViewCounter = () => {
  const [views, setViews] = useState(0);

  useEffect(() => {
    // Fetch the current view count from the backend
    fetch('/api/views')
      .then((res) => res.json())
      .then((data) => {
        setViews(data.views);  // Update the state with the new count
      })
      .catch((err) => console.error('Error fetching views:', err));
  }, []);  // Empty array means this runs once when the component mounts

  return (
    <div>
      <p>Total Views: {views}</p>
    </div>
  );
};

export default ViewCounter;
