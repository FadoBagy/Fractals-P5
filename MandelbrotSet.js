var slider;

function setup() {
    createCanvas(500, 500);
    slider = createSlider(1, 100, 1);
}

function draw() {
    loadPixels();
    var minVal = -2;
    var maxVal = 2;

    createMandelbrotSet(slider.value(), minVal, maxVal);
    updatePixels();
}

function createMandelbrotSet(iterations, minVal, maxVal) {
    // Looping through the canvas
    for (var x = 0; x < width; x++) {
        for (var y = 0; y < height; y++) {
            // Getting the position
            var a = map(x, 0, width, minVal, maxVal);
            var b = map(y, 0, height, minVal, maxVal);

            var originalA = a;
            var originalB = b;

            var n = 0;
            for (let i = 0; i < iterations; i++) {
                // Components for next generation
                var newA = a * a - b * b;
                var newB = 2 * a * b;
                a = newA + originalA;
                b = newB + originalB;
                if (a * a + b * b > 16) {
                    break;
                }
                n++;
            }

            // Setting colors
            var bright = map(n, 0, iterations, 0, 1);
            bright = map(sqrt(bright), 0, 1, 0, 255);
            if (n == iterations) {
                bright = 0;
            }

            // Coloring the canvas
            var pix = (x + y * width) * 4;
            pixels[pix + 0] = bright;
            pixels[pix + 1] = bright;
            pixels[pix + 2] = bright;
            pixels[pix + 3] = 255;
        }
    }
}