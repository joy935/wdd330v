const mycanvas = document.getElementById('canvas');
const mycanvas2 = document.getElementById('canvas2');
const mycanvas3 = document.getElementById('canvas3');
const mycanvas4 = document.getElementById('canvas4');
const mycanvas5 = document.getElementById('canvas5');
const mycanvas6 = document.getElementById('canvas6');
const mycanvas7 = document.getElementById('canvas7');
const mycanvas8 = document.getElementById('canvas8');
const mycanvas9 = document.getElementById('canvas9');
const mycanvas10 = document.getElementById('canvas10');
const mycanvas11 = document.getElementById('canvas11');

function draw() {
    if (mycanvas.getContext) {
        const ctx = mycanvas.getContext('2d');

        ctx.fillStyle = 'rgb(200 0 0)';
        ctx.fillRect(10, 10, 50, 50);
        
        ctx.fillStyle = 'rgb(0 0 200 / 50%)';
        ctx.fillRect(30, 30, 50, 50);
    }
}

function drawRectangle () {
    if (mycanvas2.getContext) {
        const ctx = mycanvas2.getContext('2d');

        ctx.fillRect(25, 25, 100, 100); // draws a filled rectangle
        ctx.clearRect(45, 45, 60, 60); // clears the specified area and makes it fully transparent
        ctx.strokeRect(50, 50, 50, 50); // draws a rectangle outline
    }
}

function drawTriangle() {
    if (mycanvas3.getContext) {
        const ctx = mycanvas3.getContext('2d');

        ctx.beginPath();
        ctx.moveTo(75, 50);
        ctx.lineTo(100, 75);
        ctx.lineTo(100, 25);
        ctx.fill();
    }
}

function drawSmiley() {
    if (canvas4.getContext) {
        const ctx = canvas4.getContext('2d');

        ctx.beginPath();
        ctx.arc(75, 75, 50, 0, Math.PI * 2, true); // Outer circle
        ctx.moveTo(110, 75);
        ctx.arc(75, 75, 35, 0, Math.PI, false);  // Mouth (clockwise)
        ctx.moveTo(65, 65);
        ctx.arc(60, 65, 5, 0, Math.PI * 2, true);  // Left eye
        ctx.moveTo(95, 65);
        ctx.arc(90, 65, 5, 0, Math.PI * 2, true);  // Right eye
        ctx.stroke();
    }
}

function drawLines() {
    if (mycanvas5.getContext) {
        const ctx = mycanvas5.getContext('2d');

        // filled triangle
        ctx.beginPath();
        ctx.moveTo(25, 25);
        ctx.lineTo(105, 25);
        ctx.lineTo(25, 105);
        ctx.fill();

        // stroked triangle
        ctx.beginPath();
        ctx.moveTo(125, 125);
        ctx.lineTo(125, 45);
        ctx.lineTo(45, 125);
        
        ctx.closePath();
        ctx.stroke();
    }
}

function drawArcs() {
    if (mycanvas6.getContext) {
        const ctx = mycanvas6.getContext('2d');

        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 3; j++) {
                ctx.beginPath();
                const x = 25 + j * 50; // x coordinate
                const y = 25 + i * 50; // y coordinate
                const radius = 20; // Arc radius
                const startAngle = 0; // Starting point on circle
                const endAngle = Math.PI + (Math.PI * j) / 2; // End point on circle
                const anticlockwise = i % 2 !== 0; // clockwise or anticlockwise

                ctx.arc(x, y, radius, startAngle, endAngle, anticlockwise);

                if (i > 1) {
                    ctx.fill();
                } else {
                    ctx.stroke();
                }
            }}}}

function drawChatBuble() {
    if (mycanvas7.getContext) {
        const ctx = mycanvas7.getContext('2d');

        ctx.beginPath();
        ctx.moveTo(75, 25);
        ctx.quadraticCurveTo(25, 25, 25, 62.5);
        ctx.quadraticCurveTo(25, 100, 50, 100);
        ctx.quadraticCurveTo(50, 120, 30, 125);
        ctx.quadraticCurveTo(60, 120, 65, 100);
        ctx.quadraticCurveTo(125, 100, 125, 62.5);
        ctx.quadraticCurveTo(125, 25, 75, 25);
        ctx.stroke();
    }
}

function drawHeart() {
    if (mycanvas8.getContext) {
        const ctx = mycanvas8.getContext('2d');

        ctx.beginPath();
        ctx.moveTo(75, 40);
        ctx.bezierCurveTo(75, 37, 70, 25, 50, 25);
        ctx.bezierCurveTo(20, 25, 20, 62.5, 20, 62.5);
        ctx.bezierCurveTo(20, 80, 40, 102, 75, 120);
        ctx.bezierCurveTo(110, 102, 130, 80, 130, 62.5);
        ctx.bezierCurveTo(130, 62.5, 130, 25, 100, 25);
        ctx.bezierCurveTo(85, 25, 75, 37, 75, 40);
        ctx.fill();
    }
}

function drawPacman() {
    if (mycanvas9.getContext) {
        const ctx = mycanvas9.getContext('2d');

        roundedRect(ctx, 12, 12, 184, 168, 15);
        roundedRect(ctx, 19, 19, 170, 154, 9);
        roundedRect(ctx, 53, 53, 49, 33, 10);
        roundedRect(ctx, 53, 119, 49, 16, 6);
        roundedRect(ctx, 135, 53, 49, 33, 10);
        roundedRect(ctx, 135, 119, 25, 49, 10);

        ctx.beginPath();
        ctx.arc(37, 37, 13, Math.PI / 7, -Math.PI / 7, false);
        ctx.lineTo(31, 37);
        ctx.fill();

        for (let i = 0; i < 8; i++) {
            ctx.fillRect(51 + i * 16, 35, 4, 4);
        }

        for (i = 0; i < 6; i++) {
            ctx.fillRect(115, 51 + i * 16, 4, 4);
        }

        for (i = 0; i < 8; i++) {
            ctx.fillRect(51 + i * 16, 99, 4, 4);
        }

        ctx.beginPath();
        ctx.moveTo(83, 116);
        ctx.lineTo(83, 102);
        ctx.bezierCurveTo(83, 94, 89, 88, 97, 88);
        ctx.bezierCurveTo(105, 88, 111, 94, 111, 102);
        ctx.lineTo(111, 116);
        ctx.lineTo(106.333, 111.333);
        ctx.lineTo(101.666, 116);
        ctx.lineTo(97, 111.333);
        ctx.lineTo(92.333, 116);
        ctx.lineTo(87.666, 111.333);
        ctx.lineTo(83, 116);
        ctx.fill();

        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.moveTo(91, 96);
        ctx.bezierCurveTo(88, 96, 87, 99, 87, 101);
        ctx.bezierCurveTo(87, 103, 88, 106, 91, 106);
        ctx.bezierCurveTo(94, 106, 95, 103, 95, 101);
        ctx.bezierCurveTo(95, 99, 94, 96, 91, 96);
        ctx.moveTo(103, 96);
        ctx.bezierCurveTo(100, 96, 99, 99, 99, 101);
        ctx.bezierCurveTo(99, 103, 100, 106, 103, 106);
        ctx.bezierCurveTo(106, 106, 107, 103, 107, 101);
        ctx.bezierCurveTo(107, 99, 106, 96, 103, 96);
        ctx.fill();

        ctx.fillStyle = "black";
        ctx.beginPath();
        ctx.arc(101, 102, 2, 0, Math.PI * 2, true);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(89, 102, 2, 0, Math.PI * 2, true);
        ctx.fill();
    }
}

// to draw a rounded rectangle
function roundedRect(ctx, x, y, width, height, radius) {
    ctx.beginPath();
    ctx.moveTo(x, y + radius);
    ctx.arcTo(x, y + height, x + radius, y + height, radius);
    ctx.arcTo(x + width, y + height, x + width, y + height - radius, radius);
    ctx.arcTo(x + width, y, x + width - radius, y, radius);
    ctx.arcTo(x, y, x, y + radius, radius);
    ctx.stroke();
  }

function drawShapesWithHoles() {
    if (mycanvas10.getContext) {
        const ctx = mycanvas10.getContext("2d");

    ctx.beginPath();

    // Outer shape clockwise ⟳
    ctx.moveTo(0, 0);
    ctx.lineTo(150, 0);
    ctx.lineTo(75, 129.9);

    // Inner shape anticlockwise ↺
    ctx.moveTo(75, 20);
    ctx.lineTo(50, 60);
    ctx.lineTo(100, 60);

    ctx.fill();
    }
}

function drawPath2D() {
    if (mycanvas11.getContext) {
        const ctx = mycanvas11.getContext("2d");
    
        const rectangle = new Path2D();
        rectangle.rect(10, 10, 50, 50);
    
        const circle = new Path2D();
        circle.arc(100, 35, 25, 0, 2 * Math.PI);
    
        ctx.stroke(rectangle);
        ctx.fill(circle);
      }
}

function drawSmiley2() {
    const canvas = document.getElementById('canvas12');
    if (canvas.getContext) {
        const ctx = canvas.getContext('2d');

        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

        ctx.beginPath();
        ctx.arc(75, 75, 50, 0, Math.PI * 2, true); // Outer circle
        ctx.moveTo(110, 75);
        ctx.arc(75, 75, 35, 0, Math.PI, false);  // Mouth (clockwise)
        ctx.moveTo(65, 65);
        ctx.arc(60, 65, 5, 0, Math.PI * 2, true);  // Left eye
        ctx.moveTo(95, 65);
        ctx.arc(90, 65, 5, 0, Math.PI * 2, true);  // Right eye
        ctx.stroke();
    }
}

function drawFrawney() {
    const canvas = document.getElementById('canvas12');
    if (canvas.getContext) {
        const ctx = canvas.getContext('2d');

        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

        ctx.beginPath();
        ctx.arc(75, 75, 50, 0, Math.PI * 2, true); // Outer circle

        ctx.moveTo(105, 110);  // Move to the right corner of the mouth
        ctx.arc(75, 110, 30, 0, Math.PI, true);  // Reduced radius to 30 and moved to y = 110

        // Left eye
        ctx.moveTo(65, 65);  // Move to the left eye's position
        ctx.arc(60, 65, 5, 0, Math.PI * 2, true);  // Draw left eye

        // Right eye
        ctx.moveTo(95, 65);  // Move to the right eye's position
        ctx.arc(90, 65, 5, 0, Math.PI * 2, true);  // Draw right eye

        ctx.stroke();  // Render the drawing
    }
}

let isSmiley = true;
function toggleCanvas() {
    if (isSmiley) {
        drawFrawney();
    } else {
        drawSmiley2();
    }
    isSmiley = !isSmiley;
}

document.getElementById('canvas12').addEventListener('click', toggleCanvas);

draw();
drawRectangle();
drawTriangle();
drawSmiley();
drawLines();
drawArcs();
drawChatBuble();
drawHeart();
drawPacman();
drawShapesWithHoles();
drawPath2D();
drawSmiley2();