//REMEMBER
//THE LIST OF VOLUMES IS A JSON

let isMuted = false;


// Check if the session storage has the portData object
let portData = sessionStorage.getItem("portData");
if (!portData) {
  // If the portData object doesn't exist in session storage, initialize it with default values
  portData = {
    "ip": "10.0.0.66",
    "port": "3080"
  };

  // Store the portData object in session storage
  sessionStorage.setItem("portData", JSON.stringify(portData));
} else {
  // If the portData object exists in session storage, parse the JSON string back into an object
  portData = JSON.parse(portData);
}

// Use the portData object as needed
console.log(portData.ip); // Output: "10.0.0.66"
console.log(portData.port); // Output: "3080"

let commandCodes = {
  power_on: "PR01",
  power_off: "PR00",
  mute_on: "MU00",
  mute_off: "MU01",
  volume: "VO",
  bass: "BS",
  treble: "TR",
  source: "CH",
};

let volumes = {
  10: "NA",
  11: "NA",
  12: "NA",
  13: "NA",
  14: "NA",
  15: "NA",
  16: "NA",
  20: "NA",
  21: "NA",
  22: "NA",
  23: "NA",
  24: "NA",
  25: "NA",
  26: "NA",
  30: "NA",
  31: "NA",
  32: "NA",
  33: "NA",
  34: "NA",
  35: "NA",
  36: "NA",
  41: "NA",
  42: "NA",
  43: "NA",
};

let zones = {
  master: "41",
  zone1: "11",
  zone2: "12",
  zone3: "13",
  zone4: "14",
  zone5: "15",
  zone6: "16",
  zone7: "21",
  zone8: "22",
  zone9: "23",
  zone10: "24",
  zone11: "25",
  zone12: "26",
  zone13: "31",
  zone14: "32",
  zone15: "33",
  zone16: "34",
  zone17: "35",
  zone18: "36",
  allOne: "10",
  allTwo: "20",
  secondunit: "42",
  thirdunit: "43",
};

let sources = {
  source1: "01",
  source2: "02",
  source3: "03",
  source4: "04",
  source5: "05",
  source6: "06",
};
/*
//THE LIST OF ACTIVE SOURCES PER ZONE IS A JSON
//THE ZONE DICTIONARY IS A JSON

/**
 * The following gets the zone value from the zone dropdown
 * @returns the command value necessary for the zone
 */
function getZoneValue() {
  let dropdown = document.getElementById("zone-dropdown-menu");
  let selectionValue = dropdown.value;
  let convertedZoneValue = zones[selectionValue];
  return convertedZoneValue;
}

/**
 * The following gets the souirce value from the source dropdown
 * @returns The source to input into the source control database with
 */
function getSourceValue() {
  let dropdown = document.getElementById("source-dropdown-menu");
  let sourceValue = dropdown.value;
  let convertedSourceValue = sources[sourceValue];
  return convertedSourceValue;
}

function updateSource() {
  let command = "<";
  command += getZoneValue();
  command += commandCodes["source"]
  command += getSourceValue();
  command += "\r";
  console.log('Command: ' + command);
  sendCommand(command);
  //SEND COMMAND HERE

}

function onClickMute() {
  if (isMuted) {
    //unMuteZone();
    let command = getSimpleCommand(commandCodes["mute_off"]);
    sendCommand(command);
    //send command
    isMuted = false;
    console.log("UnMuted");
  } else {
    //muteZone();
    let command = getSimpleCommand(commandCodes["mute_on"]);
    //send command
    sendCommand(command);
    isMuted = true;
    console.log("muted");
  }
}

function onVolumeUp() {
  let command = assembleVolumeCommand(true);
  sendCommand(command);
  //SEND HERE
  updateVolumeValue();
}

function onVolumeDown() {
  let command = assembleVolumeCommand(false);
  sendCommand(command);
  //SEND HERE
  updateVolumeValue();
}

function powerOn() {
  let command = getSimpleCommand(commandCodes["power_on"]);
  if(volumes[getZoneValue()] === "NA") {
    let volumeCommand = setVolumeCommand(10)
    sendCommand(volumeCommand);
    //send volume command
  }
  sendCommand(command);
  //check if zone is initialized if not turn on and also set volume to 10
  //SEND HERE
}

function powerOff() {
  let command = getSimpleCommand(commandCodes["power_off"]);
  sendCommand(command);
  //SEND HERE
}

//Will need to update on zone change for the GUI, remember for later. Need to keep track of each zone and it being muted

//getCommand
/**
 * Assembles the commands for POWER, MUTE
 * @param {string} commandCode is the command code to be passed in
 * @returns command to be sent to server
 */
function getSimpleCommand(commandCode) {
  let command = "<";
  command += getZoneValue();
  command += commandCode;
  command += "\r";
  console.log('Command: ' + command);
  return command;
}

/**
 * @param {boolean} increaseVolume is volume going up or down
 * @returns command to be sent to server
 */
function assembleVolumeCommand(increaseVolume) {
  if (increaseVolume) {
    volumeUp();
  } else {
    volumeDown();
  }
  let command = "<";
  command += getZoneValue();
  command += "VO";
  if(volumes[getZoneValue()] < 10) {
    command += "0" + volumes[getZoneValue()]
  } else {
    command += volumes[getZoneValue()];
  }
  command += "\r";
  console.log('Command: ' + command);
  return command;
}

/**
 * Takes the volume number in the dictionary and increases it by 1 for the current zone.
 */
function volumeUp() {
  checkVolumeInitialized();
  if (volumes[getZoneValue()] >= 22) {
    console.log("No higher");
  } else {
    volumes[getZoneValue()] += 1;
  }
}
/**
 * Take the volume number in the dictionary, and decreases it by one for the current zone
 */
function volumeDown() {
  checkVolumeInitialized();
  if (volumes[getZoneValue()] != 0) {
    volumes[getZoneValue()] -= 1;
  } else {
    console.log("no lower");
  }
}

/**
 * 
 * @param {int} volumeNumber the number to set the volume to
 * @returns 
 */
function setVolumeCommand(volumeNumber) {
  volumes[getZoneValue()] = volumeNumber;
  let command = "<";
  command += getZoneValue();
  command += "VO";
  if(volumes[getZoneValue()] < 10) {
    command += "0" + volumes[getZoneValue()]
  } else {
    command += volumes[getZoneValue()];
  }
  command += "\r";
  return command;
}
/**
 * Checks if volume is initialized, and if not sets it to 10
 */
function checkVolumeInitialized() {
  if (volumes[getZoneValue()] === "NA") {
    volumes[getZoneValue()] = 10;
    let command = setVolumeCommand(10);
    sendCommand(command);
  }
}


function updatePortData(){
  var ip = document.getElementById("ip-input").value;
  var port = document.getElementById("port-input").value;


  portData = {
    "ip": ip,
    "port": port
  };
  sessionStorage.setItem("portData", JSON.stringify(portData));
  console.log("Changed to address " + portData["ip"] + ":" + portData["port"])
}


function updateVolumeValue(){
  let volumeDisplay = document.getElementById("volume-output");
  volumeDisplay.textContent = "Volume: " + volumes[getZoneValue()];
}


function updateDisplay() {
  updateVolumeValue();
}


////localhost:3080"
// http://localhost:3080
//10.0.0.66:8080
function sendCommand(command) {
  var http_address = "http://" + portData.ip + ":" + portData.port;
  fetch(http_address, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message: command }),
  });
}