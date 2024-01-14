// Location.js

import React, { useEffect, useState } from 'react';

function Location() {
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    // Get the user's current location using the browser's geolocation API
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ latitude, longitude });
      },
      (error) => {
        console.error('Error getting user location:', error);
      }
    );
  }, []); // Run this effect only once on component mount

  return (
    <div>
      <h2>User's Location</h2>
      {userLocation ? (
        <p>
          Latitude: {userLocation.latitude}, Longitude: {userLocation.longitude}
        </p>
      ) : (
        <p>Loading user location...</p>
      )}
    </div>
  );
}

export default Location;
