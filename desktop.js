const svg = document.getElementById('interactiveSvg');
const container = document.getElementById('animation-container');
const width = window.innerWidth;
const height = 400;

const rows = 10;
const cols = 20;
const pointRadius = 4;
const spacingX = 40;
const spacingY = (height - 50 * 2) / (rows - 1);
const maxMovementDistance = 14;
const returnSpeed = 0.05;

const gridWidth = (cols - 1) * spacingX + spacingX / 2;
const offsetX = (width - gridWidth) / 2;

function randomNoise() {
    return (Math.random() - 0.5) * 20;
}

function lerp(start, end, t) {
    return start + (end - start) * t;
}

const points = [];
const lines = [];

// Create points and lines
for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
        const rowOffset = (row % 2 === 0) ? 0 : spacingX / 2;
        const x = col * spacingX + rowOffset + offsetX + randomNoise();
        const y = row * spacingY + 50 + randomNoise();
        points.push({
            x: x,
            y: y,
            originalX: x,
            originalY: y,
            targetX: x,
            targetY: y,
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

// Mouse move listener to update the points
container.addEventListener('mousemove', (event) => {
    const svgRect = svg.getBoundingClientRect();
    const mouseX = event.clientX - svgRect.left;
    const mouseY = event.clientY - svgRect.top;

    points.forEach((point) => {
        const dx = mouseX - point.originalX;
        const dy = mouseY - point.originalY;
        const distanceToMouse = Math.sqrt(dx * dx + dy * dy);

        if (distanceToMouse < 200) {
            const limitedMovement = limitMovement(dx, dy);
            point.targetX = point.originalX + limitedMovement.dx;
            point.targetY = point.originalY + limitedMovement.dy;
        } else {
            point.targetX = point.originalX;
            point.targetY = point.originalY;
        }
    });
});

// Limit the movement of points towards the mouse
function limitMovement(dx, dy) {
    const distance = Math.sqrt(dx * dx + dy * dy);
    if (distance > maxMovementDistance) {
        const scale = maxMovementDistance / distance;
        return { dx: dx * scale, dy: dy * scale };
    }
    return { dx, dy };
}

// Update points and lines smoothly
function updatePoints() {
    points.forEach((point) => {
        point.x = lerp(point.x, point.targetX, returnSpeed);
        point.y = lerp(point.y, point.targetY, returnSpeed);
        point.element.setAttribute('cx', point.x);
        point.element.setAttribute('cy', point.y);
    });

    // Update lines based on current point positions
    lines.forEach((connection) => {
        connection.line.setAttribute('x1', connection.p1.x);
        connection.line.setAttribute('y1', connection.p1.y);
        connection.line.setAttribute('x2', connection.p2.x);
        connection.line.setAttribute('y2', connection.p2.y);
    });

    requestAnimationFrame(updatePoints);
}

updatePoints();
