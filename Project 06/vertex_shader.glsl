// Global Variables
precision highp float;
attribute vec3 position;
attribute vec3 normal;
uniform mat3 normalMatrix;
uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
varying vec3 fNormal;
varying vec3 pos3d;
uniform float time;

// Rotate a vector by an angle
vec3 rotate(vec3 vectorIn, float angle) {
    vec3 vectorOut = vectorIn; // Initialize the output vector
    vectorOut.x = cos(angle) * vectorIn.x - sin(angle) * vectorIn.y; // Rotate the x component
    vectorOut.y = sin(angle) * vectorIn.x + cos(angle) * vectorIn.y; // Rotate the y component

    return vectorOut;
}

// Scale a vector by a factor
vec3 scale(vec3 vectorIn, float factor) {
    vec3 vectorOut = factor * vectorIn; // Scale the vector

    return vectorOut;
}

// Main function
void main() {
    // Variable Initalizations
    vec3 model = position;
    vec3 new_normal = normal;
    float rotSpeed = 10.0;
    float scaleSpeed = 6.0;
    float scaleFactor = 1.2;
    float rotateFactor = 2.0;
    model = scale(model, scaleFactor * abs(sin(scaleSpeed * time) + 0.3));
    model = rotate(model, rotateFactor * sin(time * rotSpeed));
    fNormal = normalize(normalMatrix * new_normal);
    vec4 pos = modelViewMatrix * vec4(model, 1.0);
    gl_Position = projectionMatrix * pos;
    pos3d = gl_Position.xyx / gl_Position.w;
}