# In The Zone - Zone System Companion App

A mobile app designed to help black and white film photographers understand and apply the Zone System developed by Ansel Adams and Fred Archer.

## Features

- **Zone Wheel UI**: Interactive, rotatable wheel showing all 11 zones (0-X)
- **Metering Helper**: Visually see how exposure adjustments shift the tonal range
- **Light/Dark Mode**: Adapts to your device theme settings
- **Educational Tool**: Descriptions of each zone to understand their tonal values

## Tech Stack

- React Native with TypeScript
- Expo framework
- React Native Reanimated for smooth animations
- React Native SVG for rendering the zone wheel
- React Native Gesture Handler for interactive rotation

## Installation

1. Clone this repository
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm start
   ```
4. Run on device or simulator:
   ```
   npm run android
   npm run ios
   ```

## About the Zone System

The Zone System is a method developed by Ansel Adams and Fred Archer in the 1930s for determining optimal film exposure and development. It provides a systematic way to map the luminance values in a scene to the final print.

The system divides the tonal range into 11 zones:
- **Zone 0**: Pure black, no detail
- **Zone V**: Middle gray (18% reflectance)
- **Zone X**: Pure white, no detail

Each zone represents a one-stop difference in exposure, allowing photographers to visualize and control the final tonal range of their images.

## Usage

1. Meter a specific area of your scene (e.g., shadow area)
2. Set this as the "Metered Zone" in the app
3. Decide where you want this tone to appear in your final image (e.g., Zone III for textured shadows)
4. The app will show you the necessary exposure adjustment
5. You can also see how the rest of the tonal range will be placed

## License

MIT 