function solarSystem() { // Create a new scene

    // Import the required modules
    const canvas = document.querySelector('canvas'); 
    const c = canvas.getContext('2d');
    var slider = document.getElementById('slider');
    slider.value = 5;

    // Variables
    const colors = ['#D6FFF6', '#231651', '#4DCCBD', '#2374AB', '#FF8484'];
    var planets;
    var satellites;
    var particles;

    // Create a mouse object
    const mouse = { 
        x: innerWidth / 2,
        y: innerHeight / 2
    };

    // Create a random integer function
    function randomIntFromRange(min, max) { 
        return Math.floor(Math.random() * (max - min + 1) + min); 
    }

    // Create a random color function
    function randomColor(colors) { 
        return colors[Math.floor(Math.random() * colors.length)];
    }

    // Create a particle object
    function Particle(x, y, radius, color) { 
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.radians = Math.random() * Math.PI * 2; // Random angle
        this.velocity = 0.05;
        this.distanceFromCenter = randomIntFromRange(20, 50); // Random distance from center
        this.lastMouse = { // Last mouse position
            x: x, y: y
        };

        // Create a last mouse point
        this.update = function () {  
            const lastPoint = {x: this.x, y: this.y};
            this.radians += this.velocity;

            // Move last mouse point towards mouse
            this.lastMouse.x += (mouse.x - this.lastMouse.x) * 0.05;
            this.lastMouse.y += (mouse.y - this.lastMouse.y) * 0.05; 

            // Move position
            this.x = this.lastMouse.x + Math.cos(this.radians) * this.distanceFromCenter; 
            this.y = this.lastMouse.y + Math.sin(this.radians) * this.distanceFromCenter;
            this.draw(lastPoint);
        };

        // Create a draw function to draw the particle 
        this.draw = function (lastPoint) { 
            c.beginPath();
            c.strokeStyle = randomColor(colors);
            c.lineWidth = this.radius;
            c.moveTo(lastPoint.x, lastPoint.y);
            c.lineTo(this.x, this.y);
            c.stroke();
            c.closePath();
        };
    }

    // Create an init function
    function init() { 
        particles = [];

        // Create a loop to generate particles
        for (var i = 0; i < 50; i++) { 
            const radius = (Math.random());
            particles.push(new Particle(canvas.width / 4, canvas.height / 4, radius, randomColor(colors))); 
        }
    }

    // Create a planet object
    function planet(x, y, radius, color, velocity, distanceFromMotherPlanet) { 
        // Variable declarations
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.radians = Math.random() * Math.PI * 2;
        this.color = color;
        this.velocity = velocity;
        this.distanceFromCenter = distanceFromMotherPlanet;

        // Create an update function
        this.update = function () { 
            // Variable declarations
            this.radians += this.velocity;
            this.x = x + Math.cos(this.radians) * this.distanceFromCenter; 
            this.y = y + Math.sin(this.radians) * this.distanceFromCenter;
        };

        // Create a draw function to draw the planet
        this.draw = function () { 
            // Draw Orbit Path
            c.beginPath();
            c.strokeStyle = 'rgba(255, 255, 255, 0.15)';
            c.lineWidth = 1;
            c.arc(x, y, Math.abs(this.distanceFromCenter), 0, Math.PI * 2, false);
            c.stroke();
            c.closePath();

            c.save();
            c.translate(this.x, this.y);
            c.rotate(this.radians);
            c.scale(1, 1);
            c.beginPath();
            c.arc(0, 0, this.radius, 0, Math.PI * 2, false);
            c.fillStyle = this.color;
            c.fill();
            c.closePath();
            c.restore();
        };
    }

    // Create a satellite object
    function satellite(x, y, radius, color, velocity, distanceFromMotherPlanet, pNum) {
        // Variable declarations
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.radians = Math.random() * Math.PI * 2;
        this.color = color;
        this.velocity = velocity;
        this.distanceFromCenter = distanceFromMotherPlanet;

        // Create an update function to update the satellite
        this.update = function () {
            // Variable declarations
            this.radians += this.velocity;
            this.x = planets[pNum].x + Math.cos(this.radians) * this.distanceFromCenter; 
            this.y = planets[pNum].y + Math.sin(this.radians) * this.distanceFromCenter;
        };

        // Create a draw function to draw the satellite
        this.draw = function () {
            c.save();
            c.translate(this.x, this.y);
            c.rotate(this.radians);
            c.scale(1, 1);
            c.beginPath();
            c.arc(0, 0, this.radius, 0, Math.PI * 2, false);
            c.fillStyle = randomColor(colors);
            c.fill();
            c.closePath();
            c.restore();
        };
    }

    // Create a planet array
    function initPlanet() { 
        planets = [];
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        
        // Sun
        planets[0] = new planet(centerX, centerY, 35, '#FFCC00', 0, 0); 

        // Mercury (Gray, fast, close)
        planets[1] = new planet(centerX, centerY, 4, '#A5A5A5', 0.04, 60);

        // Venus (Pale yellow, similar to Earth)
        planets[2] = new planet(centerX, centerY, 8, '#E3BB76', 0.025, 90);

        // Earth (Blue)
        planets[3] = new planet(centerX, centerY, 9, '#227ACA', 0.02, 125);

        // Mars (Red, smaller)
        planets[4] = new planet(centerX, centerY, 6, '#DD4C22', 0.015, 160);

        // Jupiter (Orange/Striped, Huge)
        planets[5] = new planet(centerX, centerY, 28, '#D6A666', 0.008, 220);

        // Saturn (Pale Gold, Large)
        planets[6] = new planet(centerX, centerY, 24, '#EBD796', 0.006, 280);

        // Uranus (Cyan)
        planets[7] = new planet(centerX, centerY, 16, '#80DEEA', 0.004, 325);

        // Neptune (Blue)
        planets[8] = new planet(centerX, centerY, 15, '#3D5AFE', 0.003, 370); // Might be slightly off canvas if 700x700
    }

    // Create a satellite array
    function initSat() { 
        satellites = [];
        // Moon for Earth
        satellites[0] = new satellite(planets[3].x, planets[3].y, 2, '#DDDDDD', 0.1, planets[3].radius + 10, 3);
        
        // Phobos/Deimos for Mars? Let's just do randoms or stick to major ones
        // Titan for Saturn
        satellites[1] = new satellite(planets[6].x, planets[6].y, 3, '#DDB417', 0.05, planets[6].radius + 15, 6);
        
        // Io/Europa for Jupiter
        satellites[2] = new satellite(planets[5].x, planets[5].y, 2.5, '#DDCC53', 0.08, planets[5].radius + 12, 5);
        satellites[3] = new satellite(planets[5].x, planets[5].y, 2, '#AAAAAA', 0.06, planets[5].radius + 20, 5);
    }

    // Create an animate function
    function animate() { 
        requestAnimationFrame(animate); // Create a loop
        c.fillStyle = '#000000'; // Set the background color
        c.fillRect(0, 0, canvas.width, canvas.height); // Fill the background

        particles.forEach(function (particle) { // Loop through the particles array
            particle.update();
        });
        planets.forEach(function (planet) { // Loop through the planets array
            planet.update();
        });
        satellites.forEach(function (satellite) { // Loop through the satellites array
            satellite.update();
        });
        planets.forEach(function (planet) { // Loop through the planets array
            planet.draw();
        });
        satellites.forEach(function (satellite) { // Loop through the satellites array
            satellite.draw();
        });
    }

    // Add a mousemove event listener
    addEventListener('mousemove', function (event) { 
        mouse.x = event.clientX;
        mouse.y = event.clientY;
    });

    // Use slider to change the speed of the animation
    slider.addEventListener('input', function () {
        var value = this.value; // Get the value of the slider
        
        planets.forEach(function (planet) { // Loop through the planets array
            planet.velocity = value / 1000;
        });
    });

    // Function calls
    init();
    initPlanet();
    initSat();
    animate();
}

solarSystem(); // Call the solarSystem function