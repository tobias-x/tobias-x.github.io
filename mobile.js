const svg = document.getElementById('interactiveSvg');
const width = window.innerWidth;
const height = 400;

const rows = 10;
const cols = 20;
const pointRadius = 4;
const spacingX = 40;
const spacingY = (height - 50 * 2) / (rows - 1);
const orbitSpeed = 0.007;  // Speed of orbit (higher is faster)
const gridWidth = (cols - 1) * spacingX + spacingX / 2;
const offsetX = (width - gridWidth) / 2;

// Function to generate random values in a given range
function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
}

// Create an array of points
const points = [];
const lines = [];

for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
        const rowOffset = (row % 2 === 0) ? 0 : spacingX / 2;
        const x = col * spacingX + rowOffset + offsetX;
        const y = row * spacingY + 50;

        // Each point has its own random elliptical orbit
        const semiMajorAxis = randomInRange(3, 12);  // Horizontal radius (width of the ellipse)
        const semiMinorAxis = randomInRange(4, 9);  // Vertical radius (height of the ellipse)
        const orbitSpeedFactor = randomInRange(0.5, 1.5);  // Random speed factor for each point
        const initialAngle = Math.random() * Math.PI * 2;  // Random initial angle
        
        points.push({
            x: x,
            y: y,
            originalX: x,
            originalY: y,
            angle: initialAngle,  // Angle for elliptical movement
            semiMajorAxis: semiMajorAxis,  // Width of the ellipse
            semiMinorAxis: semiMinorAxis,  // Height of the ellipse
            orbitSpeedFactor: orbitSpeedFactor,  // Speed factor
            element: null
        });
    }
}

// Create SVG elements for the points
points.forEach((point, index) => {
    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('cx', point.x);
    circle.setAttribute('cy', point.y);
    circle.setAttribute('r', pointRadius);
    svg.appendChild(circle);
    point.element = circle;

    // Connect to the right neighbor
    if ((index + 1) % cols !== 0) {
        const rightNeighbor = points[index + 1];
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', point.x);
        line.setAttribute('y1', point.y);
        line.setAttribute('x2', rightNeighbor.x);
        line.setAttribute('y2', rightNeighbor.y);
        svg.appendChild(line);
        lines.push({ line: line, p1: point, p2: rightNeighbor });
    }

    // Connect to the bottom neighbor
    if (index + cols < points.length) {
        const bottomNeighbor = points[index + cols];
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', point.x);
        line.setAttribute('y1', point.y);
        line.setAttribute('x2', bottomNeighbor.x);
        line.setAttribute('y2', bottomNeighbor.y);
        svg.appendChild(line);
        lines.push({ line: line, p1: point, p2: bottomNeighbor });
    }
});

// Move points in elliptical orbits around their original position
function updatePoints() {
    points.forEach((point) => {
        // Update the angle of the point
        point.angle += orbitSpeed * point.orbitSpeedFactor;

        // Calculate the new x and y coordinates based on the elliptical orbit
        const newX = point.originalX + point.semiMajorAxis * Math.cos(point.angle);
        const newY = point.originalY + point.semiMinorAxis * Math.sin(point.angle);

        // Update the point's position
        point.x = newX;
        point.y = newY;

        // Update the SVG circle position
        point.element.setAttribute('cx', point.x);
        point.element.setAttribute('cy', point.y);
    });

    // Update lines based on the new positions of the points
    lines.forEach((connection) => {
        connection.line.setAttribute('x1', connection.p1.x);
        connection.line.setAttribute('y1', connection.p1.y);
        connection.line.setAttribute('x2', connection.p2.x);
        connection.line.setAttribute('y2', connection.p2.y);
    });

    requestAnimationFrame(updatePoints);
}

updatePoints();
