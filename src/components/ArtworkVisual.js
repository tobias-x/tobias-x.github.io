import React, { useEffect } from 'react';

const InteractiveSvg = () => {
  useEffect(() => {
    const svg = document.getElementById('interactiveSvg');
    const container = document.getElementById('animation-container');

    if (!svg || !container) return;

    // Set the container background color
    container.style.backgroundColor = 'black';

    const createInteractiveGrid = () => {
      const viewportWidth = window.innerWidth;
      const gridWidth = viewportWidth * 2; // Grid spans twice the viewport width
      const height = 250;
      const rows = Math.ceil(height / 40);
      const cols = Math.ceil(gridWidth / 40); // Dynamically calculate columns
      const pointRadius = 4;
      const spacingX = 40;
      const spacingY = (height - 50 * 2) / (rows - 1);
      const maxMovementDistance = 14;
      const returnSpeed = 0.05;

      // Set SVG dimensions
      svg.setAttribute('width', `${gridWidth}px`);
      svg.setAttribute('height', `${height}px`);
      svg.style.position = 'absolute';
      svg.style.left = '50%'; // Center the SVG horizontally
      svg.style.transform = 'translateX(-50%)'; // Offset to center

      // Helper functions
      const lerp = (start, end, t) => start + (end - start) * t;
      const randomNoise = () => (Math.random() - 0.5) * 10;
      const limitMovement = (dx, dy) => {
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance > maxMovementDistance) {
          const scale = maxMovementDistance / distance;
          return { dx: dx * scale, dy: dy * scale };
        }
        return { dx, dy };
      };

      const points = [];
      const lines = [];

      // Create points and lines
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const rowOffset = row % 2 === 0 ? 0 : spacingX / 2;
          const x = col * spacingX + rowOffset + randomNoise();
          const y = row * spacingY + 50 + randomNoise();

          points.push({
            x,
            y,
            originalX: x,
            originalY: y,
            targetX: x,
            targetY: y,
            element: null,
          });
        }
      }

      points.forEach((point, index) => {
        // Create circles for points
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', point.x);
        circle.setAttribute('cy', point.y);
        circle.setAttribute('r', pointRadius);
        circle.setAttribute('fill', 'white');
        svg.appendChild(circle);
        point.element = circle;

        // Create horizontal lines
        if ((index + 1) % cols !== 0) {
          const rightNeighbor = points[index + 1];
          const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
          line.setAttribute('x1', point.x);
          line.setAttribute('y1', point.y);
          line.setAttribute('x2', rightNeighbor.x);
          line.setAttribute('y2', rightNeighbor.y);
          line.setAttribute('stroke', 'white');
          line.setAttribute('stroke-width', '0.5');
          svg.appendChild(line);
          lines.push({ line, p1: point, p2: rightNeighbor });
        }

        // Create vertical lines
        if (index + cols < points.length) {
          const bottomNeighbor = points[index + cols];
          const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
          line.setAttribute('x1', point.x);
          line.setAttribute('y1', point.y);
          line.setAttribute('x2', bottomNeighbor.x);
          line.setAttribute('y2', bottomNeighbor.y);
          line.setAttribute('stroke', 'white');
          line.setAttribute('stroke-width', '0.5');
          svg.appendChild(line);
          lines.push({ line, p1: point, p2: bottomNeighbor });
        }
      });

      // Handle mouse interaction
      container.addEventListener('mousemove', (event) => {
        const svgRect = svg.getBoundingClientRect();
        const mouseX = event.clientX - svgRect.left;
        const mouseY = event.clientY - svgRect.top;

        points.forEach((point) => {
          const dx = mouseX - point.originalX;
          const dy = mouseY - point.originalY;
          const distanceToMouse = Math.sqrt(dx * dx + dy * dy);

          if (distanceToMouse < 20000) {
            const limitedMovement = limitMovement(dx, dy);
            point.targetX = point.originalX + limitedMovement.dx;
            point.targetY = point.originalY + limitedMovement.dy;
          } else {
            point.targetX = point.originalX;
            point.targetY = point.originalY;
          }
        });
      });

      // Animation loop
      const updatePoints = () => {
        points.forEach((point) => {
          point.x = lerp(point.x, point.targetX, returnSpeed);
          point.y = lerp(point.y, point.targetY, returnSpeed);
          point.element.setAttribute('cx', point.x);
          point.element.setAttribute('cy', point.y);
        });

        lines.forEach(({ line, p1, p2 }) => {
          line.setAttribute('x1', p1.x);
          line.setAttribute('y1', p1.y);
          line.setAttribute('x2', p2.x);
          line.setAttribute('y2', p2.y);
        });

        requestAnimationFrame(updatePoints);
      };

      updatePoints();
    };

    createInteractiveGrid();
  }, []);

  return (
    <div
      className="mt-[100px] bg-black"
      id="animation-container"
      style={{
        width: '100%',
        height: '250px',
        position: 'relative',
        overflow: 'hidden', // Prevent unwanted scrollbars
      }}
    >
      <svg id="interactiveSvg"></svg>
    </div>
  );
};

export default InteractiveSvg;
