import React, { useState, useEffect, useCallback } from 'react';
import './ClickSpark.css'; // We'll create this file next

const ClickSpark = ({ children, sparkColor = '#FFC700', sparkSize = 15, sparkDuration = 600 }) => {
  const [sparks, setSparks] = useState([]);

  const handleClick = useCallback((event) => {
    const newSpark = {
      id: Date.now() + Math.random(),
      x: event.clientX,
      y: event.clientY,
      color: sparkColor,
      size: sparkSize,
      duration: sparkDuration,
    };
    setSparks((prevSparks) => [...prevSparks, newSpark]);
  }, [sparkColor, sparkSize, sparkDuration]);

  useEffect(() => {
    if (sparks.length === 0) return;

    // Remove the oldest spark after its duration
    const timer = setTimeout(() => {
      setSparks((prevSparks) => prevSparks.slice(1));
    }, sparks[0].duration); 

    return () => clearTimeout(timer);
  }, [sparks]);

  return (
    <div onClick={handleClick} style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
      {children}
      {sparks.map((spark) => (
        <div
          key={spark.id}
          className="spark"
          style={{
            position: 'fixed', // Use fixed to position relative to viewport
            left: spark.x - spark.size / 2,
            top: spark.y - spark.size / 2,
            width: spark.size,
            height: spark.size,
            backgroundColor: spark.color,
            borderRadius: '50%',
            pointerEvents: 'none', // Ensure sparks don't interfere with clicks
            animation: `spark-animation ${spark.duration}ms forwards ease-out`,
            zIndex: 9999, // Ensure sparks are on top
          }}
        />
      ))}
    </div>
  );
};

export default ClickSpark;
