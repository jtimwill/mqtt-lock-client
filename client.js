const MAIN_PASSWORD = process.env.MQTT_PW;
const IP = process.env.MQTT_IP;

if ( !MAIN_PASSWORD || !IP )
  throw new Error('FATAL ERROR: update ENV variables.');

const { Log } = require('./sequelize');
const mqtt = require('mqtt');
const date = require('date-and-time');
const Gpio = require('pigpio').Gpio;


const client  = mqtt.connect('mqtt://' + IP);

const randomstring = require("randomstring");
let temp_password;
let temp_active = false;

const STATES = {
  1 : { "system state" : "good", "lock state" : "unlocked", "door state" : "closed" },
  2 : { "system state" : "good", "lock state" : "unlocked", "door state" : "open" },
  3 : { "system state" : "good", "lock state" : "locked", "door state" : "closed" },
  4 : { "system state" : "error", "lock state" : "locked", "door state" : "open" },
};

// 2. set responses
const RESPONSES = {
  "success" : { "response" : "200 Sucess" },
  "error" : { "response" : "400 Client Error" },
  "danger" : { "response" : "500 System Failure" }
};

// Variables:
let system_state = 1;
// Set pins
const motor = new Gpio(10, {mode: Gpio.OUTPUT});
const sensor = new Gpio(4, {
  mode: Gpio.INPUT,
  pullUpDown: Gpio.PUD_UP,
  alert: true
});

button.glitchFilter(10000);

sensor.on('alert', (level) => {
  console.log("Sensor Level: " + level);
  if (level === 1) {
    if (system_state === 1)
      system_state = 2;
    if (system_state === 3) {
      system_state = 4;
      publishAlertMessage();
    }
  } else {
    if (system_state === 2)
      system_state = 1;
    if (system_state === 4)
      system_state = 3;
  }
});

function unlock() {
  motor.servoWrite(2000);
  console.log("Move motor to unlock position");
}
function lock() {
  motor.servoWrite(1000);
  console.log("Move motor to lock position");
}

client.on('connect', function() {
  client.subscribe('command', function(error) {
    if (!error) {
      client.publish('command', 'You can send commands now');
    }
  });
});

client.on('message', function (topic, message) {
  let data = { "command" : "", "password" : ""};
  try {
    data = JSON.parse(String(message));
  } catch (error) {
    console.log("Parsing Error: " + error);
  }

  console.log("Command Received: " + data["command"]);

  if (data["password"] === MAIN_PASSWORD || (data["password"] === temp_password && temp_active)) {
    if (data["command"] == "lock" || data["command"] == "unlock") {
      controlDoor(data["command"], data["password"]);
    } else if (data["command"] == "get state") {
      publishSystemState();
    } else if (data["command"] == "get temp"){
      publishTempPassword();
    } else if (data["command"] == "get logs") {
      publishLog();
    } else {
      publishErrorMessage('Invalid Command');
    }
  } else {
    publishErrorMessage('Unauthorized');
  }
  updateLog(data["command"]);
});


unlock();

function publishTempPassword() {
  temp_password = randomstring.generate({ length: 5 });
  if (temp_password === MAIN_PASSWORD)
    publishTempPassword();
  else {
    temp_active = true;
    publishSuccessMessage('Temp Password is: ' + temp_password );
  }
}

function controlDoor(command, password) {
  let response;

  if(system_state == 1) {
    if (command == "lock") {
      lock();
      system_state = 3;
      response = RESPONSES["success"];
    } else {
      response = RESPONSES["error"];
    }
  } else if (system_state == 2) {
    response = RESPONSES["error"];
  } else if (system_state == 3) {
    if (command == "unlock") {
      unlock();
      system_state = 1;
      response = RESPONSES["success"];
    } else {
      response = RESPONSES["error"];
    }
  } else if (system_state == 4) {
    if (command == "unlock") {
      unlock();
      system_state = 2;
      response = RESPONSES["success"];
    } else {
      response = RESPONSES["error"];
    }
  }
  if (password == temp_password) temp_active = false;
  client.publish('response', JSON.stringify(response));
}

async function updateLog(command) {
  const state_data = STATES[system_state];
  try {
    const user = await Log.create({
      command: command || "undefined",
      system_state: state_data["system state"],
      lock_state: state_data["lock state"],
      door_state: state_data["door state"]
    });
    console.log("Log updated");
  } catch (error) {
    console.log("ERROR: " + error);
  }

}

async function publishLog() {
  // Use sequelize to get the 10 most recent rows
  try {
    const query = await Log.findAndCountAll({ limit: 10 });
    publishSuccessMessage("Sucessful Query");
    client.publish('response', JSON.stringify(query));
  } catch(error) {
    client.publish('response', "Query Failed");
  }
}

function publishAlertMessage() {
  const now = new Date();
  const details = date.format(now, 'YYYY/MM/DD HH:mm:ss');

  const message = JSON.stringify(RESPONSES["danger"]) + " when: " + details;
  client.publish('danger', message);
}

function publishSuccessMessage(details) {
  const message = JSON.stringify(RESPONSES["success"]) + ": " + details;
  client.publish('response', message);
}

function publishErrorMessage(details) {
  const message = JSON.stringify(RESPONSES["error"]) + ": " + details;
  client.publish('response', message);
}

function publishSystemState() {
  client.publish('systemState', JSON.stringify(STATES[system_state]));
}

// Heartbeat
setInterval(() => {
  publishSystemState();
    // console.log('Message Sent');
}, 30000);
