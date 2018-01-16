#!/usr/bin/env node

var sprintf = require('sprintf').sprintf
var mqtt = require('mqtt');
var mqtt_client = mqtt.connect({
  host: 'mqtt-pi.local',
  port: 1883,
});

var st = new Date().getTime();
var count = 0;

var msg = Array(1024).join("A");
var count = 0;
var st = new Date().getTime();

mqtt_client.on('connect', function() {
  setInterval(on_timer, 1);
});

function on_timer() {
  var topic = sprintf("test/%02d", count % 100);
  mqtt_client.publish(topic, msg);
  count ++;

  if (count == 10000) {
    var diff = (new Date().getTime() - st) / 1000.0;
    var t = diff / count;
    var mps = 1.0 / t;
      
    console.log("send : message_per_second=" + mps);

    count = 0;
    st = new Date().getTime();
  }
}

