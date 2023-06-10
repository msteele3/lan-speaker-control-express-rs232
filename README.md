# LAN Speaker Control System with Express API and RS232 Integration

## Project Description
This project involves the development of a LAN-based speaker zone control system that enables remote control of speaker zones, including turning them on/off, adjusting volume levels, and managing audio sources. The system utilizes an Express API built on Node.js, which runs on a Linux web server. It also incorporates a webpage that can be accessed by any user on the LAN by entering a specific IP address.

## Features
- **Webpage Deployment:** Upon accessing the designated IP address on the LAN, users are presented with a webpage that allows them to interact with the speaker zone control system.
- **API Communication:** The webpage communicates with the Express API to send requests for various actions, such as turning on/off speaker zones, adjusting volume levels, and managing audio sources.
- **Socket Communication:** The Express API establishes a socket connection with a different IP device on the network. It sends the commands received from the front-end to this device.
- **RS232 Integration:** The IP device converts the digital signals received from the Express API into an RS232 analog format compatible with the amplifier. This enables seamless control of the speaker zones.
- **Remote Control:** The system facilitates remote control of the speaker zones, allowing users to manage audio settings conveniently from their devices connected to the LAN.

## Technologies Used
- Express: Used to communicate between the webpage and the back end server script
- Node.js: Used for the server side communication with the Amplifier
- Linux: The server script is hosted on a Linux machine.
- HTML/CSS/JavaScript: The webpage is built using these standard web technologies for user interaction and visual presentation.
- RS232: The system converts the digital signal into an RS232 signal in order to communicate with the amplifier

## Installation
1. Clone the project repository from [GitHub Repository URL].
2. Install Node.js on your Linux web server if not already installed.
3. Put the server.js file onto your Linux server, and run 'npm install'
4. Use 'sudo forever start server.js' in the same directory the server file is in
5. Add the webpage elements to whatever web hosting system you are using.
7. Access the webpage by entering a specific IP address in a web browser on the LAN.

## Usage
- Upon accessing the webpage, users will be presented with a user-friendly interface to control the speaker zones, volume levels, and audio sources.
- Interact with the controls provided on the webpage to send API requests to the Express API.
- The Express API will establish a socket connection with the designated IP device and send the corresponding commands to control the speaker zones.
- Enjoy the convenience of remotely managing the speaker zones and customizing the audio experience.

## Screenshots
![Screenshot (11)](https://github.com/msteele3/lan-speaker-control-express-rs232/assets/94016758/7615c523-f51d-44f3-a0e9-f29d43d94320)



## Authors
Matt Steele
