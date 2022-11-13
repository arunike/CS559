// Global Variables
precision highp float;
varying vec3 fNormal;
varying vec3 pos3d;
uniform float time;

// Phong shading
float phongShader(float intensity, vec3 normal, vec3 light, vec3 lightBounce, float phong, float diffuse, float Specular) {
    float resultDiffuse = diffuse * max(0.0, dot(normal, light)); // Diffuse component
    float resultSpecular = Specular * pow(dot(normal, lightBounce + light), phong); // Specular component

    return intensity * (resultDiffuse + resultSpecular);
}

// Rotate around Y axis
vec3 rotateY(vec3 vectorIn, float angle, float rotateSpeed) {
    vec3 result = vectorIn;
    result.x = vectorIn.x * (cos(rotateSpeed * angle)) + vectorIn.x * (sin(rotateSpeed * angle));
    result.z = vectorIn.z * (cos(rotateSpeed * angle)) - vectorIn.x * (sin(rotateSpeed * angle));

    return result;
}

// Rotate around X axis
vec3 rotateX(vec3 vectorIn, float angle, float rotateSpeed) {
    vec3 result = vectorIn;
    result.y = vectorIn.y * (cos(rotateSpeed * angle)) - vectorIn.z * (sin(rotateSpeed * angle));
    result.z = vectorIn.z * (cos(rotateSpeed * angle)) + vectorIn.y * (sin(rotateSpeed * angle));

    return result;
}

// Main function
void main() {
    // Variable Initalizations
    float rotateSpeed = 40.0;
    vec3 directionLight = vec3(0.3, 0.4, 1.0);
    vec3 directionalLight = vec3(1.0, 0.4, 0.2);
    directionLight = rotateY(directionLight, time, rotateSpeed);
    directionalLight = rotateX(directionalLight, time, rotateSpeed);
    float redSpeed = 3.0;
    float GreenSpeed = 4.0;
    float BlueSpeed = 2.0;
    float redColor = abs(sin(redSpeed * time + 3.14));
    float greenColor = abs(sin(GreenSpeed * time + 1.38) + 0.2);
    float blueColor = abs(sin(BlueSpeed * time + 6.28));
    vec3 color = vec3(pos3d.x * redColor, 0.5 * pos3d.y * greenColor, blueColor);
    vec3 lightDirection = normalize(directionLight);
    vec3 lightdirectional = normalize(directionalLight);
    vec3 normal = normalize(fNormal);
    vec3 viewVector = normalize(-1.0 * fNormal);
    float diffuseIntensity1 = 0.2;
    float diffuseIntensity2 = 0.1; 
    float specularIntensity1 = 0.2; 
    float specularIntensity2 = 0.1;
    float maxIntensity = 12.0;
    float diffuseFactor1 = dot(lightDirection, normal); 
    float diffuseFactor2 = dot(lightdirectional, normal);
    float intensityDiffuse1 = diffuseFactor1 * maxIntensity;
    float intensityDiffuse2 = diffuseFactor2 * maxIntensity;
    float phong = 6.0;
    float phong_color1 = phongShader(intensityDiffuse1, normal, lightDirection, viewVector, phong, diffuseIntensity1, diffuseIntensity2);
    float phong_color2 = phongShader(intensityDiffuse2, normal, lightdirectional, viewVector, phong, specularIntensity1, specularIntensity2);
    gl_FragColor = vec4(phong_color1 * phong_color2 * color, 1.0);
}