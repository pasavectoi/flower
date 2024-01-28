// An array to store all the flower objects
let flowers = [];
// Flag to control the start of the program
let startProgram = false;

function setup() {
    createCanvas(800, 600); // Create a canvas of the specified size
    colorMode(HSB, 360, 100, 100); // Set color mode to HSB
    textSize(20); // Set text size
    textAlign(CENTER, CENTER); // Align text to center
}

function draw() {
    if (!startProgram) {
        background(0, 0, 100); // Set background to white
        fill(0); // Set text color to black
        // Display the instruction text
        text("Press any alphabet key to create a flower.\nPress SPACE to start.", width / 2, height / 2);
    } else {
        background(0, 0, 100); // Set background to white
        // Display all flowers
        for (let i = 0; i < flowers.length; i++) {
            flowers[i].display();
        }
    }
}

function keyPressed() {
    if (key == ' ') {
        startProgram = true; // Start the program when space is pressed
    } else if (startProgram && ((key >= 'a' && key <= 'z') || (key >= 'A' && key <= 'Z'))) {
        // Map the key press to a petal size
        let petalSize = map(key.charCodeAt(0), 'a'.charCodeAt(0), 'z'.charCodeAt(0), 10, 40);
        let newFlower = createFlowerWithSize(petalSize);
        flowers.push(newFlower); // Add new flower to the array
    }
}

// Function to create a flower with a specified petal size
function createFlowerWithSize(petalSize) {
    let x = random(width); // Random x position
    let y = random(height); // Random y position
    let hue = random(360); // Random hue for color
    let petalCount = int(random(6, 15)); // Random number of petals

    return new Flower(x, y, petalSize, 100, hue, petalCount);
}

// Flower class
class Flower {
    constructor(x, y, petalSize, saturation, hue, petalCount) {
        this.x = x;
        this.y = y;
        this.petalSize = petalSize;
        this.saturation = saturation;
        this.hue = hue;
        this.petalCount = petalCount;
    }

    display() {
        push();
        translate(this.x, this.y);
        noStroke();
        for (let i = 0; i < this.petalCount; i++) {
            let angle = TWO_PI / this.petalCount * i;
            fill(this.hue, this.saturation, 100);
            push();
            rotate(angle);
            this.drawPetal();
            pop();
        }
        pop();
    }

    drawPetal() {
        beginShape();
        for (let angle = 0; angle < TWO_PI; angle += 0.1) {
            let r = sin(3 * angle) * this.petalSize;
            let petalX = cos(angle) * r;
            let petalY = sin(angle) * r;
            vertex(petalX, petalY);
        }
        endShape(CLOSE);
    }
}
