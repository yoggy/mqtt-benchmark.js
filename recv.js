#!/usr/bin/env node
var mqtt = require('mqtt');
var mqtt_client = mqtt.connect({
  host: 'mqtt-pi.local',
  port: 1883,
});

var st = new Date().getTime();
var count = 0;

mqtt_client.on('connect', function() {
  mqtt_client.subscribe('#');
});

mqtt_client.on('message', function(topic, message) {
  count ++;
  if (count == 1000) {
    var diff = (new Date().getTime() - st) / 1000.0;
    var t = diff / count;
    var mps = 1.0 / t;

    console.log("recv : message_per_second=" + mps);

    count = 0;
    st = new Date().getTime();
  }
});
