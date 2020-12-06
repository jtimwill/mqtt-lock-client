# MQTT-LOCK-CLIENT

## Project Description
This project is a simple MQTT smart lock client. It is designed to run on a Raspberry Pi.

The basic technology stack is:
* MQTT (MQTT client)
* Pigpio (electronics control)
* Sequelize + SQLite (database)
* Node.js (run-time environment)

## Project Setup
1. Install Node.js: https://nodejs.org/
2. Download project files
3. ``` $ cd mqtt-lock-client ``` # navigate to project's root directory
4. ``` $ npm i ``` # install the packages listed in package.json
5. ``` $ node sequelize.js ``` # Create database
6. From the command line, set the value of the following environment variables:
    * MQTT_PW: set the main password used by the application.
        * Example (Mac): ``` $ export MQTT_PW=password ```
    * MQTT_IP: set the IP address of broker
        * Example (Mac): ``` $ export MQTT_IP=255.255.255.255 ```
7. ``` $ node client ``` # start client
8. ``` $ npm outdated ``` # check for outdated packages
9. ``` $ npm update ``` # update packages

## Project Architecture
<p align="center">
  <img alt="Image of App Structure" src="https://raw.github.com/jtimwill/diet-api/master/images/diet-api-diagram.png" />
</p>

## Entity Relationship Diagram
<p align="center">
  <img alt="Image of ERD" src="https://raw.github.com/jtimwill/diet-api/master/images/node-diet-erd.png"/>
</p>

## References
* Architecture
  * https://www.youtube.com/watch?v=Cs2vmAqSBHs&t=202s
  * https://github.com/simonmonk/electronics_cookbook
  * https://arduinogetstarted.com/tutorials/arduino-door-sensor
  * https://www.instructables.com/Arduino-Password-Security-System-With-Magnetic-Doo/
  * https://github.com/HackerShackOfficial/Smartphone-Doorlock/blob/master/doorlock.js
  * https://www.arduino.cc/en/Tutorial/BuiltInExamples/Blink
  * https://www.arduino.cc/en/Tutorial/LibraryExamples/Sweep
  * https://www.smarthomeblog.net/diy-door-sensors-arduino/
  * https://learn.adafruit.com/introducing-the-adafruit-bluefruit-spi-breakout?view=all
  * https://www.arduino.cc/en/tutorial/switch
  * https://www.arduino.cc/en/Tutorial/BuiltInExamples/StateChangeDetection
  * https://create.arduino.cc/example/builtin/02.Digital%5CStateChangeDetection/StateChangeDetection/preview
  * https://create.arduino.cc/example/library/servo_1_1_5/servo_1_1_5%5Cexamples%5CSweep/Sweep/preview
  * https://canvas.umd.umich.edu/courses/515627/pages/design-and-implement-an-application-messaging-protocol-for-smart-locks
  * https://create.arduino.cc/projecthub/xreef/send-email-with-esp8266-and-arduino-dfa5de
  * https://github.com/xreef/EMailSender
  * https://www.pluralsight.com/guides/exposing-your-local-node-js-app-to-the-world#comparison-table
  * https://nodemailer.com/about/
* Broker
  * https://mosquitto.org/
  * https://medium.com/@alifabdullah/setting-up-private-mqtt-broker-using-mosca-in-node-js-c61a3c74f952
  * https://github.com/moscajs/mosca
  * https://github.com/moscajs/mosca/wiki/Mosca-basic-usage
  * https://github.com/moscajs/mosca/wiki/Authentication-&-Authorization
  * https://medium.com/@alifabdullah/setting-up-private-mqtt-broker-using-mosca-in-node-js-c61a3c74f952
  * https://www.npmjs.com/package/aedes
* MQTT Client
  * https://github.com/adafruit/Adafruit_MQTT_Library
  * https://www.eclipse.org/paho/
  * https://www.arduino.cc/reference/en/libraries/mqtt-client/
  * https://learn.adafruit.com/bluefruit-le-connect/mqtt
  * https://www.arduino.cc/reference/en/libraries/mqtt-client/
  * https://www.arduino.cc/reference/en/libraries/mqtt-client/
  * https://bitbucket.org/amotzek/arduino/src/fab21e1e7785fe9473d83107048d4431c8fd25a9/src/main/cpp/MQTTClient/examples/PublishLightAndDark/  * PublishLightAndDark.ino?at=master
* Topic Design
http://www.steves-internet-guide.com/mqtt-topic-payload-design-notes/
* Node.js and JavaScript
  * https://www.npmjs.com/package/mqtt
  * https://sequelize.org/
  * https://www.npmjs.com/package/pigpio
  * https://www.w3schools.com/js/js_json_parse.asp  
  * https://sequelize.org/master/class/lib/model.js~Model.html#static-method-findAll
  * https://www.w3schools.com/jsref/met_win_setinterval.asp
  * https://www.npmjs.com/package/date-and-time
  * https://www.npmjs.com/package/randomstring
  * https://learn.adafruit.com/node-embedded-development/installing-node-dot-js
  * https://www.w3schools.com/nodejs/nodejs_raspberrypi.asp
  * https://stackoverflow.com/questions/26647412/homebrew-could-not-symlink-usr-local-bin-is-not-writable
  * https://stackoverflow.com/questions/46670727/homebrew-permissions-usr-local-sbin-not-writable
  * https://stevessmarthomeguide.com/install-mosquitto-raspberry-pi/
  * https://subscription.packtpub.com/book/application_development/9781787287815/1/ch01lvl1sec12/installing-a-mosquitto-broker-on-macos
  * https://github.com/HackerShackOfficial/Smartphone-Doorlock
  * https://www.npmjs.com/package/pigpio#buttons-and-interrupt-handling  
  * https://pi4j.com/1.2/pins/model-3b-rev1.html
  * https://www.raspberrypi-spy.co.uk/2012/06/simple-guide-to-the-rpi-gpio-header-and-pins/
* MQTT and TLS:
  * https://github.com/mqttjs/MQTT.js/blob/master/examples/tls%20client/mqttclient.js
  * https://github.com/mqttjs/MQTT.js/tree/master/examples/tls%20client
  * http://www.steves-internet-guide.com/using-node-mqtt-client/
  * http://www.steves-internet-guide.com/mosquitto-tls/
  * https://mosquitto.org/man/mosquitto-tls-7.html
  * https://codewithmosh.com/p/the-complete-node-js-course
* Misc.
  * https://github.com/jtimwill/diet-api
  * https://stackoverflow.com/questions/31472755/sudo-npm-command-not-found
  * https://stackoverflow.com/questions/28940335/how-to-use-mqtt-over-the-internet
  * https://www.hellotech.com/guide/for/how-to-find-ip-address-on-mac
* Diagram Creation
  * draw.io
