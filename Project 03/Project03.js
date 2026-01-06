function game() {
    // Variable initializations
    var canvas = document.getElementById('myCanvas');
    var context = canvas.getContext('2d');
    var dx = 0;
    var dy = 0;
    var dx2 = 0;
    var dir = 0;
    var sky = '#cceeff';
    var tod = 0;
    var rArrow = '#808080';
    var lArrow = '#808080';
    var uArrow = '#808080';
    var dArrow = '#808080';
    var stack;

    // Get key and move character
    function getKeyAndMove() {
        switch (event.keyCode) { // Get key code
            case 37: // Left arrow
                if (dx > -450) { // If character is not at the left edge of the canvas
                    if (dx <= 250 && dy != 250 && dy == 0) { // If character is in the middle of the canvas
                        dx = dx - 10;
                        dir = 0;
                        lArrow = '#808080';
                    }
                    else { // If character is at the edge of the canvas
                        if (dx > 250 && dy == -250) { // If character is at the top right corner of the canvas
                            dx = dx - 10;
                            dir = 0;
                            lArrow = '#808080';
                        }
                        lArrow = '#808080';
                    }
                }
                break;

            case 39: // Right arrow
                if (dx <= 480) { // If character is not at the right edge of the canvas
                    if (dx < 250 && dy != -250) { // If character is in the middle of the canvas
                        dx = dx + 10;
                        dir = 1;
                        rArrow = '#808080';
                    }
                    else { // If character is at the edge of the canvas
                        if (dy == -250) { // If character is at the top right corner of the canvas
                            dx = dx + 10;
                            dir = 1;
                            rArrow = '#808080';
                        }
                        dir = 1;
                        rArrow = '#808080';
                    }
                }
                break;

            case 38: // Up arrow
                uArrow = '#808080';
                if (dx == 250 && dy >= -240) { // If character is at the top of the canvas
                    dy = dy - 10;
                    dir = 1;
                }
                break;

            case 40: // Down arrow
                dArrow = '#808080';
                if (dx == 250 && dy < 0) { // If character is at the bottom of the canvas
                    dy = dy + 10;
                    dir = 1;
                }
                break;
        }
    }

    // Draw rectangle
    function rect(x, y, w, h, C) {
        context.setTransform(stack[0][0], stack[0][1], stack[0][3], stack[0][4], stack[0][6], stack[0][7]);
        context.fillStyle = C;
        context.fillRect(x, y, w, h);
    }

    // Draw Sky function
    function draw() {
        if (dx == 450) { // If character is at the right edge of the canvas
            sky = '#002233';
            tod = 1;
        }
        if (dx == -450) { // If character is at the left edge of the canvas
            sky = '#cceeff';
            tod = 0;
        }

        // Call functions
        window.requestAnimationFrame(draw);
        stack = [mat3.create()];
        canvas.width = canvas.width;
        dx2 = moveClouds(dx2);

        // Draw Steve (now a Pig)
        function Steve() {
            var tx = mat3.create();
            mat3.fromTranslation(tx, [500, 450]);
            mat3.translate(tx, tx, [-500, -450]);
            mat3.multiply(stack[0], stack[0], tx);

            if (dir == 0) { // Left orientation
                // Pig Body
                rect(450, 490, 60, 40, '#ffafaf');
                // Pig Head (Larger and offset)
                rect(415, 485, 35, 35, '#ffafaf');
                // Pig Snout
                rect(410, 505, 5, 15, '#db848c');
                // Pig Eye (White background + Black pupil)
                rect(425, 495, 10, 5, 'white');
                rect(425, 496, 4, 3, 'black');

                // Legs with Hooves
                rect(450, 530, 15, 15, '#ffafaf'); // Front Leg Top
                rect(450, 545, 15, 5, '#774045');  // Front Leg Hoof

                rect(490, 530, 15, 15, '#ffafaf'); // Back Leg Top
                rect(490, 545, 15, 5, '#774045');  // Back Leg Hoof
            } else { // Right orientation 
                // Pig Body
                rect(450, 490, 60, 40, '#ffafaf');
                // Pig Head
                rect(510, 485, 35, 35, '#ffafaf');
                // Pig Snout
                rect(545, 505, 5, 15, '#db848c');
                // Pig Eye
                rect(525, 495, 10, 5, 'white');
                rect(531, 496, 4, 3, 'black');

                // Legs with Hooves
                rect(450, 530, 15, 15, '#ffafaf'); // Back Leg Top
                rect(450, 545, 15, 5, '#774045');  // Back Leg Hoof

                rect(490, 530, 15, 15, '#ffafaf'); // Front Leg Top
                rect(490, 545, 15, 5, '#774045');  // Front Leg Hoof
            }
        }

        // Draw left arrow
        function DrawLArrow(color) {
            context.beginPath();
            context.fillStyle = color;
            context.strokeStyle = 'black';
            context.lineWidth = 2;
            context.moveTo(10, 60);
            context.lineTo(20, 80);
            context.lineTo(20, 70);
            context.lineTo(40, 70);
            context.lineTo(40, 50);
            context.lineTo(20, 50);
            context.lineTo(20, 40);
            context.closePath();
            context.stroke();
            context.fill();
        }

        // Draw right arrow
        function DrawRArrow(color) {
            context.beginPath();
            context.fillStyle = color;
            context.strokeStyle = 'black';
            context.lineWidth = 2;
            context.moveTo(110, 60);
            context.lineTo(100, 40);
            context.lineTo(100, 50);
            context.lineTo(80, 50);
            context.lineTo(80, 70);
            context.lineTo(100, 70);
            context.lineTo(100, 80);
            context.closePath();
            context.stroke();
            context.fill();
        }

        // Draw down arrow
        function DrawDArrow(color) {
            context.beginPath();
            context.fillStyle = color;
            context.strokeStyle = 'black';
            context.lineWidth = 2;
            context.moveTo(60, 110);
            context.lineTo(80, 100);
            context.lineTo(70, 100);
            context.lineTo(70, 80);
            context.lineTo(50, 80);
            context.lineTo(50, 100);
            context.lineTo(40, 100);
            context.closePath();
            context.stroke();
            context.fill();
        }

        // Draw up arrow
        function DrawUArrow(color) {
            context.beginPath();
            context.fillStyle = color;
            context.strokeStyle = 'black';
            context.lineWidth = 2;
            context.moveTo(60, 10);
            context.lineTo(40, 20);
            context.lineTo(50, 20);
            context.lineTo(50, 40);
            context.lineTo(70, 40);
            context.lineTo(70, 20);
            context.lineTo(80, 20);
            context.closePath();
            context.stroke();
            context.fill();
        }

        // Draw sun and moon
        function sunMoon() {
            context.setTransform(stack[0][0], stack[0][1], stack[0][3], stack[0][4], stack[0][6], stack[0][7]); // Reset transform

            if (tod == 0) { // Day
                context.fillStyle = '#ffea00';
                context.beginPath();
                context.rect(100, 100, 100, 100);
                context.fill();
            } else { // Night
                context.beginPath();
                context.rect(100, 100, 100, 100);
                context.fillStyle = '#ffff99';
                context.fill();
            }
        }

        // Draw clouds
        function clouds() {
            // Main body
            rect(200, 100, 200, 60, '#d9d9d9');
            // Top bump
            rect(230, 60, 140, 40, '#d9d9d9');
            // Side bumps
            rect(170, 110, 30, 40, '#d9d9d9');
            rect(400, 110, 40, 40, '#d9d9d9');
            // Extra details for blocky look
            rect(250, 40, 80, 20, '#d9d9d9');
        }

        // Move clouds
        function moveClouds(dx2) {
            if (dx2 > 1100) { // Reset clouds
                dx2 = -750;
            } else { // Move clouds
                dx2 = dx2 + 1.5;
            }

            return dx2
        }

        rect(0, 0, canvas.width, canvas.height, sky); // Draw sky
        stack.unshift(mat3.clone(stack[0])); // Save current transformation
        mat3.translate(stack[0], stack[0], [700, -50]); // Translate
        sunMoon(); // Draw sun or moon
        stack.shift(); // Restore previous transformation

        if (tod == 0) { // Day clouds
            stack.unshift(mat3.clone(stack[0]));
            mat3.translate(stack[0], stack[0], [dx2, 0]);
            clouds();
            mat3.translate(stack[0], stack[0], [500, 100]);
            mat3.scale(stack[0], stack[0], [0.5, .5]);
            clouds();
            mat3.translate(stack[0], stack[0], [-1200, -50]);
            clouds();
            stack.shift();
        }

        // Draw ground
        rect(0, 550, canvas.width, 50, '#86592d');
        rect(700, 300, 300, 300, '#86592d');
        rect(700, 300, 300, 10, '#339933');
        rect(0, 550, 760, 10, '#339933');
        rect(710, 295, 5, 250, '#663300');
        rect(750, 295, 5, 250, '#663300');
        rect(708, 315, 50, 5, '#663300');
        rect(708, 335, 50, 5, '#663300');
        rect(708, 355, 50, 5, '#663300');
        rect(708, 375, 50, 5, '#663300');
        rect(708, 395, 50, 5, '#663300');
        rect(708, 415, 50, 5, '#663300');
        rect(708, 435, 50, 5, '#663300');
        rect(708, 455, 50, 5, '#663300');
        rect(708, 475, 50, 5, '#663300');
        rect(708, 495, 50, 5, '#663300');
        rect(708, 515, 50, 5, '#663300');
        rect(708, 535, 50, 5, '#663300');

        // Draw arrow buttons
        DrawLArrow(lArrow);
        DrawRArrow(rArrow);
        DrawUArrow(uArrow);
        DrawDArrow(dArrow);

        stack.unshift(mat3.clone(stack[0])); // Save current transformation
        mat3.scale(stack[0], stack[0], [0.3, .3]); // Scale
        mat3.translate(stack[0], stack[0], [-281, -303]); // Translate
        Steve(); // Draw Steve
        stack.shift(); // Restore previous transformation
        mat3.translate(stack[0], stack[0], [dx, dy]); // Translate
        Steve(); // Draw Steve
    }

    // Function call and event listeners for arrow buttons
    draw();
    window.addEventListener('keydown', getKeyAndMove);
}

// Start game function
function start() {
    // Variable initializations
    var canvas = document.getElementById('myCanvas');
    canvas.style = 'position： top: 0px; left: 0px; right: 0px; bottom: 0px; margin: auto; border: 5px solid black;';
    var ctx = canvas.getContext('2d');
    var stack;

    // Draw rectangle
    function rect(x, y, w, h, C) {
        ctx.setTransform(stack[0][0], stack[0][1], stack[0][3], stack[0][4], stack[0][6], stack[0][7]);
        ctx.fillStyle = C;
        ctx.fillRect(x, y, w, h);
    }

    // Draw Steve (now a Pig)
    function Steve() {
        var tx = mat3.create(); // Create a 3x3 matrix
        mat3.fromTranslation(tx, [500, 450]); // Translate
        mat3.translate(tx, tx, [-500, -450]); // Translate
        mat3.multiply(stack[0], stack[0], tx); // Multiply

        // Pig Body
        rect(450, 490, 60, 40, '#ffafaf');
        // Pig Head
        rect(510, 485, 35, 35, '#ffafaf');
        // Pig Snout
        rect(545, 505, 5, 15, '#db848c');
        // Pig Eye
        rect(525, 495, 10, 5, 'white');
        rect(531, 496, 4, 3, 'black');

        // Legs with Hooves
        rect(450, 530, 15, 15, '#ffafaf'); // Back Leg Top
        rect(450, 545, 15, 5, '#774045');  // Back Leg Hoof

        rect(490, 530, 15, 15, '#ffafaf'); // Front Leg Top
        rect(490, 545, 15, 5, '#774045');  // Front Leg Hoof
    }

    // Draw function
    function draw() {
        window.requestAnimationFrame(draw); // Request animation frame
        stack = [mat3.create()]; // Create stack
        canvas.width = canvas.width; // Clear canvas
        rect(0, 0, canvas.width, canvas.height, '#cceeff'); // Draw sky

        // Draw ground
        rect(0, 550, canvas.width, 50, '#86592d');
        rect(700, 300, 300, 300, '#86592d');
        rect(700, 300, 300, 10, '#339933');
        rect(0, 550, 760, 10, '#339933');
        rect(710, 295, 5, 250, '#663300');
        rect(750, 295, 5, 250, '#663300');
        rect(708, 315, 50, 5, '#663300');
        rect(708, 335, 50, 5, '#663300');
        rect(708, 355, 50, 5, '#663300');
        rect(708, 375, 50, 5, '#663300');
        rect(708, 395, 50, 5, '#663300');
        rect(708, 415, 50, 5, '#663300');
        rect(708, 435, 50, 5, '#663300');
        rect(708, 455, 50, 5, '#663300');
        rect(708, 475, 50, 5, '#663300');
        rect(708, 495, 50, 5, '#663300');
        rect(708, 515, 50, 5, '#663300');
        rect(708, 535, 50, 5, '#663300');
        Steve();
    }

    // Function call
    draw();
}

window.onload = start; // Start game