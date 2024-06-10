'use client'

import React, { useState, useEffect } from 'react';

function DateTimer() {
  const [time, setTime] = useState('');

  useEffect(() => {
    // Function to update time
    const updateTime = () => {
      const date = new Date();
      const fullYear = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      const seconds = String(date.getSeconds()).padStart(2, '0');
      setTime(`${day}:${month}:${fullYear} :: ${hours}:${minutes}:${seconds}`);
    };

    // Initial call to update time
    updateTime();

    // Set interval to update time every second
    const intervalId = setInterval(updateTime, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array ensures this runs only once

  return (
    <div>
      <p>{time}</p>
    </div>
  );
}

export default DateTimer;
