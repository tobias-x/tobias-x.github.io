import React, { useEffect, useRef } from 'react';
import { random } from 'mathjs';  // Import the random function from mathjs

function TimeSeries() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Fixed canvas height
    const height = 200;
    const width = canvas.width = window.innerWidth;  // Full width of the screen
    const dpr = window.devicePixelRatio || 1;

    // Set the canvas to device pixel ratio for sharpness
    canvas.height = height * dpr;
    canvas.width = width * dpr;

    // Scale the context to match device pixel ratio
    ctx.scale(dpr, dpr);

    // Time series data buffer
    let timeSeriesData = [];
    const stepSize = 2;  // Increase step size for fewer lines
    const maxDataPoints = width / stepSize;  // Limit data to canvas width

    // Pre-generate random steps to avoid recalculating on each frame
    const randomSteps = new Array(1000).fill(0).map(() => (random(0, 1) * 2 - 1) * 5);  // Steps between -3 and +3
    let randomStepIndex = 0;

    // Simplified random walk with bias toward 0
    const generateRandomData = () => {
      if (timeSeriesData.length === 0) {
        timeSeriesData.push(0); // Start from 0 if the data series is empty
      }

      const lastValue = timeSeriesData[timeSeriesData.length - 1];
      const randomStep = randomSteps[randomStepIndex % randomSteps.length];

      // Calculate the next value in the walk with some bias toward zero
      let nextValue = lastValue + randomStep;
      const biasFactor = 0.01;
      nextValue += (0 - nextValue) * biasFactor;

      // Enforce boundary limits to keep the data within the visible area
      const maxValue = height / 2;  // Maximum boundary value (half the canvas height)
      const minValue = -height / 2; // Minimum boundary value (half the canvas height)

      // Apply boundary correction
      if (nextValue > maxValue * 0.85) nextValue = maxValue * 0.82;
      if (nextValue < minValue * 0.85) nextValue = minValue * 0.82;

      // Store the next value
      timeSeriesData.push(nextValue);

      // Gradually remove data points if the length exceeds maxDataPoints
      if (timeSeriesData.length > maxDataPoints * stepSize) {
        const removeCount = Math.floor(stepSize);  // Remove some points gradually

        for (let i = 0; i < removeCount; i++) {
          timeSeriesData.shift();  // Gradually remove from the beginning
        }
      }

      randomStepIndex++;
    };

    const drawTimeSeries = () => {
      // Clear only the part of the canvas where the time series is drawn
      ctx.clearRect(0, 0, width, height);
    
      // Draw zero-line (horizontal line at y=0)
      // ctx.beginPath();
      // ctx.moveTo(0, height / 2);
      // ctx.lineTo(width, height / 2);
      // ctx.strokeStyle = 'gray';
      // ctx.lineWidth = 1;
      // ctx.stroke();
    
      // Set line style for the time series
      ctx.beginPath();
      ctx.lineJoin = 'round';  // Smooth transitions between lines
    
      // Draw fewer lines by increasing the horizontal step size
      for (let i = 0; i < timeSeriesData.length; i += stepSize) {
        const dataPoint = timeSeriesData[i];
        ctx.lineTo(i, height / 2 - dataPoint);  // Offset by dataPoint to simulate the "walk"
      }
    
      ctx.strokeStyle = 'white';
      ctx.lineWidth = 1;  // Default line thickness
      ctx.stroke();
    };
    

    const update = () => {
      generateRandomData();  // Generate new data
      drawTimeSeries();  // Draw it to the canvas
    };

    const renderLoop = () => {
      update();  // Update the data and redraw
      requestAnimationFrame(renderLoop);  // Sync with the next frame for smooth animation
    };

    renderLoop();  // Start the animation loop

    // Cleanup function
    return () => {
      // No need to cancel anything because `requestAnimationFrame` is self-cleaning
    };
  }, []);

  return (
    <div className="w-full bg-black mb-10">
      <canvas ref={canvasRef} className="w-full h-[200px]"></canvas>
    </div>
  );
}

export default TimeSeries;
